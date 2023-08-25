const fs = require('fs');
const spawn = require('cross-spawn');
const pkg = require('../package.json');

function start(){
  const currentVersion = pkg.version;
  const newVersion = getNewVersion(currentVersion);
  const packageNew = JSON.parse(JSON.stringify(pkg));
  packageNew.version = newVersion;
  fs.writeFileSync('./package.json', JSON.stringify(packageNew, null, 2));
  gitCommitThenPublish(newVersion)
}

function gitCommitThenPublish(v) {
  spawn.sync('git', ['add', '.'], { stdio: 'inherit' });
  spawn.sync('git', ['commit', '-m', `chore(pub): publish ${v}`, '--no-verify'], {
    stdio: 'inherit',
  });
  spawn.sync('npm', ['publish'], {
    stdio: 'inherit',
  });
}

function getNewVersion(currentVersion) {
  const versionArr = currentVersion.split('.');
  const newVersion = versionArr
    .slice(0, versionArr.length - 1)
    .concat(Number(versionArr.at(-1)) + 1)
    .join('.');
  return newVersion;
}

start()