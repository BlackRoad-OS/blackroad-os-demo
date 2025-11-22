const defaultCoreUrl = process.env.CORE_URL || 'http://localhost:8081';
const defaultOperatorUrl = process.env.OPERATOR_URL || 'http://localhost:8080';

function buildRequestUrl(baseUrl, path) {
  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { 'accept': 'application/json' } });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request to ${url} failed with ${response.status}: ${text}`);
  }
  return response.json();
}

async function checkOperatorHealth(operatorUrl = defaultOperatorUrl) {
  const healthUrl = buildRequestUrl(operatorUrl, '/system/health');
  const body = await fetchJson(healthUrl);
  return { url: healthUrl, data: body };
}

async function checkCoreHealth(coreUrl = defaultCoreUrl) {
  const healthUrl = buildRequestUrl(coreUrl, '/health');
  const body = await fetchJson(healthUrl);
  return { url: healthUrl, data: body };
}

async function runDemo() {
  const operatorUrl = process.env.OPERATOR_URL || defaultOperatorUrl;
  const coreUrl = process.env.CORE_URL || defaultCoreUrl;

  console.log('BlackRoad OS demo: checking services...');
  console.log(`- OPERATOR_URL: ${operatorUrl}`);
  console.log(`- CORE_URL: ${coreUrl}`);
  console.log('');

  try {
    const operatorHealth = await checkOperatorHealth(operatorUrl);
    console.log(`Operator health (${operatorHealth.url}):`);
    console.log(JSON.stringify(operatorHealth.data, null, 2));
  } catch (error) {
    console.error('Could not fetch operator health:', error.message);
  }

  try {
    const coreHealth = await checkCoreHealth(coreUrl);
    console.log(`\nCore health (${coreHealth.url}):`);
    console.log(JSON.stringify(coreHealth.data, null, 2));
  } catch (error) {
    console.error('\nCould not fetch core health:', error.message);
  }
}

if (require.main === module) {
  runDemo();
}

module.exports = {
  runDemo,
  checkOperatorHealth,
  checkCoreHealth,
  defaultCoreUrl,
  defaultOperatorUrl,
};
