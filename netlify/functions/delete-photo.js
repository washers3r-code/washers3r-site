const { getStore } = require('@netlify/blobs');
const { DEFAULT_CONTENT } = require('./_shared/default-content');

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

  let id;
  try {
    const body = JSON.parse(event.body || '{}');
    id = body.id;
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing photo id' }) };
  }

  try {
    const contentStore = getStore('site-content');
    const raw = await contentStore.get('content.json');
    const current = raw ? JSON.parse(raw) : { ...DEFAULT_CONTENT };
    if (!current.gallery) current.gallery = DEFAULT_CONTENT.gallery;

    const entry = current.gallery.find((g) => g.id === id);
    current.gallery = current.gallery.filter((g) => g.id !== id);
    await contentStore.set('content.json', JSON.stringify(current));

    if (entry && entry.type === 'blob' && entry.key) {
      const photoStore = getStore('site-photos');
      await photoStore.delete(entry.key);
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
