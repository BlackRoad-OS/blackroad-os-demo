import { writeFile } from 'fs/promises';
import { DEFAULT_BEACON_URL, DEFAULT_GATEWAY_URL } from '../lib/constants';

async function run() {
  const content = `# Demo snippets\n\n- Gateway: ${DEFAULT_GATEWAY_URL}\n- Beacon: ${DEFAULT_BEACON_URL}\n\n\`\`\`bash\ncurl ${DEFAULT_GATEWAY_URL}/health\n\`\`\``;
  await writeFile('README.snippets.md', content);
  console.info('Seeded README snippets.');
}

void run();
