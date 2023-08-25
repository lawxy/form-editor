const spawn = require('cross-spawn');
const inquirer = require('inquirer');
const chalk = require('chalk');
const cp = require('child_process');
const fs = require('fs');
const { rm } = require('fs/promises');
const path = require('path');
// import spawn from ('cross-spawn');
// import inquirer from ('inquirer');
// import chalk from ('chalk');
// import cp from ('child_process');
// import fs from ('fs');
// import { rm } from ('fs/promises');
// import path from ('path');

const ERROR_COMMIT_PATH = path.resolve(__dirname, './error-commit.json');

spawn.sync('git', ['add', '.'], { stdio: 'inherit' });

async function composeMessage() {
  const { type, scope, message } = await inquirer.prompt([
    {
      name: 'type',
      message: '变更内容',
      type: 'list',
      choices: [
        {
          name: 'chore: 零星变更',
          value: 'chore',
        },
        {
          name: 'feat: 新增功能',
          value: 'feat',
        },
        {
          name: 'fix: 修复bug',
          value: 'fix',
        },
        {
          name: 'style: 样式变更',
          value: 'style',
        },
        {
          name: 'docs: 文档',
          value: 'docs',
        },
        {
          name: 'refactor: 重构',
          value: 'refactor',
        },
      ],
      default: 0,
    },
    {
      name: 'scope',
      message: '作用范围(文件名或方法)，可以为空',
      type: 'input',
      default: '',
    },
    {
      name: 'message',
      message: '变更描述，不要为空',
      type: 'input',
      default: '',
    },
  ]);
  return { type, scope, message };
}

function spawnPromisify(...arg) {
  return new Promise((resolve, reject) => {
    const sp = cp.spawn.call(this, ...arg);
    // 脚本执行信息 报错的用红色打印出来
    sp.stdout.on('data', (data) => {
      const string = data.toString();
      if (string.match(/err/gi)) console.log(chalk.red(`❌: ${data}`));
      else console.log(string);
    });
    // 当没有更多异步操作挂起时，NodeJS 通常会以 0 状态代码退出 ----> https://www.cnblogs.com/bianchengsanmei/p/15177859.html
    sp.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        console.log(
          chalk.red(
            `暂不支持展示eslint报错信息, 如果eslint报错需要手动输入 npm run lint-staged 查看`,
          ),
        );
        reject();
      }
    });
    // sp.on('message', err => {
    //   console.log('err', err)
    // })
  });
}

async function confirmUsePrevCommit() {
  const { use } = await inquirer.prompt([
    {
      name: 'use',
      message: '是否使用上一次提交信息',
      type: 'confirm',
      default: false,
    },
  ]);
  return { use };
}

const run = async () => {
  let jsonRes;
  if (fs.existsSync(ERROR_COMMIT_PATH)) {
    const { use } = await confirmUsePrevCommit();
    if (use) {
      jsonRes = JSON.parse(fs.readFileSync(ERROR_COMMIT_PATH, 'utf-8'));
    } else {
      jsonRes = await composeMessage();
    }
    await rm(ERROR_COMMIT_PATH);
  } else {
    jsonRes = await composeMessage();
  }
  const { type, scope, message } = jsonRes;

  // 不用reject 每次都要拿返回值判断再操作 不如统一try catch
  try {
    const handleMessage = message ? message : `EMPTY MESSAGE`;
    const composedMessage = scope
      ? `${type}(${scope}): ${handleMessage}`
      : `${type}: ${handleMessage}`;
    console.log(chalk.blue(`🐬 ${composedMessage}`));

    // await spawnPromisify('npm', ['run', 'lint-staged'])

    // await spawnPromisify('npm', ['run', 'tsc'])

    // spawn.sync('git', ['commit', '-m', composedMessage, '--no-verify'], {
    spawn.sync('git', ['commit', '-m', composedMessage], {
      stdio: 'inherit',
    });
    console.log(chalk.red('🐬 开始提交代码...'));
    spawn.sync('git', ['push'], { stdio: 'inherit' });
    console.log(chalk.cyan('✅ 代码提交成功！'));
  } catch {
    fs.writeFileSync(
      ERROR_COMMIT_PATH,
      JSON.stringify({ type, scope, message }),
    );
  }
};

run();
