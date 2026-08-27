const { getBlobStore } = require('./_shared/get-store');

exports.handler = async (event) => {
  const key = event.queryStringParameters && event.queryStringParameters.key;
  if (!key) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing key' }) };
  }

  try {
    const store = getBlobStore('site-photos');
    const result = await store.getWithMetadata(key, { type: 'arrayBuffer' });
    if (!result) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
    }
    const contentType = (result.metadata && result.metadata.contentType) || 'application/octet-stream';
    return {
      statusCode: 200,
      headers: { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=31536000, immutable' },
      body: Buffer.from(result.data).toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
