import fs from 'fs';
import path from 'path';

const wfDir = '.github/workflows';
if (fs.existsSync(wfDir)) {
  for (const f of fs.readdirSync(wfDir)) {
    if (f !== 'ai-general-autopilot.yml') fs.unlinkSync(path.join(wfDir, f));
  }
} else {
  fs.mkdirSync(wfDir, { recursive: true });
}

const yaml = [
  'name: ALBS AI General - 3-Shift Pre-Walk Auditor',
  'on:',
  '  schedule:',
  '    - cron: "0 12 * * *"',
  '    - cron: "0 20 * * *"',
  '    - cron: "0 3 * * *"',
  '  workflow_dispatch:',
  'jobs:',
  '  audit:',
  '    runs-on: ubuntu-latest',
  '    steps:',
  '      - uses: actions/checkout@v4',
  '      - uses: actions/setup-node@v4',
  '        with:',
  '          node-version: "20"',
  '      - run: |',
  '          if [ -f mall-prewalk-auditor.mjs ]; then node mall-prewalk-auditor.mjs; fi',
  '          if [ -f ai-general-telemetry.mjs ]; then node ai-general-telemetry.mjs; fi'
].join('\n');
fs.writeFileSync(path.join(wfDir, 'ai-general-autopilot.yml'), yaml + '\n', 'utf8');

['public/spectrum-knowledge-vault.html', 'app/page.tsx'].forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/20-Mile/g, '12-Mile').replace(/20-mile/g, '12-mile').replace(/20-MILE/g, '12-MILE').replace(/20-Mi/g, '12-Mi');
    c = c.replace('ev.mi <= 25', 'ev.mi <= 15');
    fs.writeFileSync(f, c, 'utf8');
  }
});
console.log('✅ STEP 1 DONE: Workflows Fixed & 12-Mile Radius Locked!');
