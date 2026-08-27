const { getStore } = require('@netlify/blobs');
const { DEFAULT_CONTENT } = require('./_shared/default-content');

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BASE64_LENGTH = 6 * 1024 * 1024; // ~4.5MB de fichier reel

exports.handler = async (event) => {
  const code = event.headers['x-admin-code'] || event.headers['X-Admin-Code'];
  const expected = process.env.ADMIN_CODE;

  if (!expected) {
    return { statusCode: 500, body: JSON.stringify({ error: 'ADMIN_CODE not configured on server.' }) };
  }
  if (!code || code !== expected) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let contentType, dataBase64;
  try {
    const body = JSON.parse(event.body || '{}');
    contentType = body.contentType;
    dataBase64 = body.dataBase64;
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!contentType || !ALLOWED_TYPES.includes(contentType)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Type de fichier non supporte.' }) };
  }
  if (!dataBase64 || typeof dataBase64 !== 'string') {
    return { statusCode: 400, body: JSON.stringify({ error: 'Fichier manquant.' }) };
  }
  if (dataBase64.length > MAX_BASE64_LENGTH) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Photo trop volumineuse (max ~4.5 Mo).' }) };
  }

  try {
    const photoStore = getStore('site-photos');
    const key = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const buffer = Buffer.from(dataBase64, 'base64');
    await photoStore.set(key, buffer, { metadata: { contentType } });

    const contentStore = getStore('site-content');
    const raw = await contentStore.get('content.json');
    const current = raw ? JSON.parse(raw) : { ...DEFAULT_CONTENT };
    if (!current.gallery) current.gallery = DEFAULT_CONTENT.gallery;
    const entry = { id: key, type: 'blob', key, contentType };
    current.gallery = [...current.gallery, entry];
    await contentStore.set('content.json', JSON.stringify(current));

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true, entry }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
