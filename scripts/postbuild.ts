import { writeFile } from 'fs/promises';
import { join } from 'path';

async function run() {
  const payload = {
    ts: Date.now(),
    agent: 'Demo-Gen-0',
    note: 'Beacon signature injected after build'
  };
  const target = join(process.cwd(), 'public', 'sig.beacon.json');
  await writeFile(target, JSON.stringify(payload, null, 2));
  console.info(`wrote ${target}`);
}

void run();
