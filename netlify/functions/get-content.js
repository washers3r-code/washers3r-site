const { getBlobStore } = require('./_shared/get-store');
const { DEFAULT_CONTENT } = require('./_shared/default-content');

exports.handler = async () => {
  try {
    const store = getBlobStore('site-content');
    const raw = await store.get('content.json');
    const content = raw ? JSON.parse(raw) : DEFAULT_CONTENT;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
      body: JSON.stringify(content),
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(DEFAULT_CONTENT),
    };
  }
};
