const http = require('http');
const {
  checkOperatorHealth,
  checkCoreHealth,
  defaultCoreUrl,
  defaultOperatorUrl,
} = require('./demo');

const port = process.env.PORT || 3000;
const operatorUrl = process.env.OPERATOR_URL || defaultOperatorUrl;
const coreUrl = process.env.CORE_URL || defaultCoreUrl;

function jsonResponse(res, statusCode, body) {
  const text = JSON.stringify(body, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(text),
  });
  res.end(text);
}

async function handleRequest(req, res) {
  if (req.url !== '/' && req.url !== '/demo') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  try {
    const [operatorHealth, coreHealth] = await Promise.allSettled([
      checkOperatorHealth(operatorUrl),
      checkCoreHealth(coreUrl),
    ]);

    jsonResponse(res, 200, {
      operator: operatorHealth.status === 'fulfilled'
        ? operatorHealth.value
        : { error: operatorHealth.reason.message, url: operatorUrl },
      core: coreHealth.status === 'fulfilled'
        ? coreHealth.value
        : { error: coreHealth.reason.message, url: coreUrl },
      meta: {
        operatorUrl,
        coreUrl,
      },
    });
  } catch (error) {
    jsonResponse(res, 500, { error: error.message });
  }
}

http.createServer(handleRequest).listen(port, '0.0.0.0', () => {
  console.log(`Demo server listening on http://0.0.0.0:${port}`);
  console.log(`Using OPERATOR_URL=${operatorUrl}`);
  console.log(`Using CORE_URL=${coreUrl}`);
  console.log('GET / or /demo to see health checks.');
});
