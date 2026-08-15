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

  const token = process.env.NETLIFY_API_TOKEN;
  if (!token) {
    return { statusCode: 500, body: JSON.stringify({ error: 'NETLIFY_API_TOKEN not configured on server.' }) };
  }

  let submissionId;
  try {
    const body = JSON.parse(event.body || '{}');
    submissionId = body.id;
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!submissionId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing submission id' }) };
  }

  try {
    const res = await fetch(`https://api.netlify.com/api/v1/submissions/${submissionId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok && res.status !== 404) {
      const text = await res.text();
      return { statusCode: res.status, body: JSON.stringify({ error: 'Failed to delete submission', detail: text }) };
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
