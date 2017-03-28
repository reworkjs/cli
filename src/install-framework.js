import fs from 'fs';
import path from 'path';
import childProcess from 'child_process';
import chalk from 'chalk';
import runLocalCli from './run-local-cli';

export default function installFramework() {
  initNpm();
  installReworkJs();

  // hand init to the actual cli.
  runLocalCli();
}

function initNpm() {

  if (pckExists()) {
    return;
  }

  console.info(`No package.json, launching ${chalk.magenta('npm init')}`);
  childProcess.execSync('npm init', { env: process.env, stdio: 'inherit' });

  if (!pckExists()) {
    console.error(`Aborted ${chalk.magenta('npm init')}`);
    process.exit(1);
  }
}

const pckJsonFile = path.join(process.cwd(), 'package.json');
function pckExists() {
  try {
    fs.accessSync(pckJsonFile, fs.constants.F_OK);
    return true;
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }

    return false;
  }
}

function installReworkJs() {
  const packageJson = JSON.parse(fs.readFileSync(pckJsonFile).toString());

  if (packageJson.dependencies && packageJson.dependencies['@reworkjs/reworkjs']) {
    return;
  }

  if (packageJson.devDependencies && packageJson.devDependencies['@reworkjs/reworkjs']) {
    console.warn(`${chalk.blue('@reworkjs/reworkjs')} should be a dependency instead of a devDependency.`);
    return;
  }

  console.info(`Adding ${chalk.blue('@reworkjs/reworkjs')} as a dependency.`);
  childProcess.execSync('npm install @reworkjs/reworkjs --save', { env: process.env, stdio: 'inherit' });
}
