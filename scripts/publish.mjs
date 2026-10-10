import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
function run(command, args, capture = false) {
  const result = spawnSync(command, args, {cwd:root, encoding:'utf8', stdio:capture ? 'pipe' : 'inherit'});
  if (result.status !== 0) throw new Error(`${command} failed; nothing further was published.`);
  return result.stdout?.trim();
}
const message = process.argv.slice(2).join(' ').trim();
if (!message) throw new Error('Provide a commit message: npm run publish -- "Describe the update"');
if (run('git', ['branch','--show-current'], true) !== 'main') throw new Error('Publish from main. Use other branches for previews.');
run(process.execPath, ['scripts/check.mjs']);
run('git',['fetch','origin']);
if (run('git',['rev-list','--count','HEAD..origin/main'],true) !== '0') throw new Error('GitHub has newer changes. Pull and review them before publishing.');
run('git',['add','--','index.html','media','resume.pdf','package.json','scripts','.github','README.md','AGENTS.md','.gitignore']);
const staged = spawnSync('git',['diff','--cached','--quiet'],{cwd:root});
if (staged.status === 1) run('git',['commit','-m',message]);
else if (staged.status !== 0) throw new Error('Could not inspect staged changes.');
run('git',['push','origin','main']);
console.log('Pushed to GitHub. Check Cloudflare deployment and https://anv.red for the live result.');
