const spawn = require('cross-spawn');
const cwd = process.cwd();

spawn('npx', ['father-build', `--root=${cwd}`, '--cjs=babel', '--watch'], {
  stdio: 'inherit',
});
// spawn('father', ['build', '--watch'], { stdio: 'inherit' })
