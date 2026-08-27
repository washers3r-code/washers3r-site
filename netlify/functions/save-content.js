const { getBlobStore } = require('./_shared/get-store');
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

  let mpv;
  try {
    const body = JSON.parse(event.body || '{}');
    mpv = body.mpv;
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }
  if (!mpv || typeof mpv !== 'object') {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing mpv data' }) };
  }

  try {
    const store = getBlobStore('site-content');
    const raw = await store.get('content.json');
    const current = raw ? JSON.parse(raw) : { ...DEFAULT_CONTENT };
    current.mpv = mpv;
    if (!current.gallery) current.gallery = DEFAULT_CONTENT.gallery;
    await store.set('content.json', JSON.stringify(current));
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
