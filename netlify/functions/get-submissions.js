exports.handler = async (event) => {
  const code = event.headers['x-admin-code'] || event.headers['X-Admin-Code'];
  const expected = process.env.ADMIN_CODE;

  if (!expected) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'ADMIN_CODE not configured on server.' }),
    };
  }

  if (!code || code !== expected) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  const token = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  if (!token || !siteId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'NETLIFY_API_TOKEN or NETLIFY_SITE_ID not configured on server.' }),
    };
  }

  try {
    const formsRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!formsRes.ok) {
      const text = await formsRes.text();
      return { statusCode: formsRes.status, body: JSON.stringify({ error: 'Failed to fetch forms', detail: text }) };
    }

    const forms = await formsRes.json();
    const results = [];

    for (const form of forms) {
      const subsRes = await fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!subsRes.ok) continue;
      const subs = await subsRes.json();
      subs.forEach((s) => {
        results.push({
          id: s.id,
          form: form.name,
          created_at: s.created_at,
          data: s.data,
        });
      });
    }

    results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
