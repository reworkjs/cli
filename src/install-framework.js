import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import shell from 'shelljs';
import runLocalCli from './run-local-cli';

export default function installFramework() {
  initNpm();
  installReworkJs();

  // hand init to the actual cli.
  runLocalCli();
}

const pckJsonFile = path.join(process.cwd(), 'package.json');
function initNpm() {

  try {
    fs.accessSync(fs.constants.F_OK, pckJsonFile);
    return;
  } catch (e) {
    if (e.code !== 'ENOENT') {
      return;
    }
  }

  console.info(`No package.json, launching ${chalk.magenta('npm init')}`);
  shell.exec('npm init');
}

function installReworkJs() {
  const packageJson = JSON.parse(fs.readFileSync(pckJsonFile).toString());

  if (packageJson.dependencies['@reworkjs/reworkjs']) {
    return;
  }

  if (packageJson.devDependencies['@reworkjs/reworkjs']) {
    console.warn(`${chalk.blue('@reworkjs/reworkjs')} should be a dependency instead of a devDependency.`);
    return;
  }

  console.info(`Adding ${chalk.blue('@reworkjs/reworkjs')} as a dependency.`);
  shell.exec('npm install @reworkjs/reworkjs --save');
}
