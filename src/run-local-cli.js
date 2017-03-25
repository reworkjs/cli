import path from 'path';
import fs from 'fs';
import childProcess from 'child_process';
import chalk from 'chalk';

export default function runLocalCli() {
  const exe = path.join(process.cwd(), 'node_modules', '.bin', 'rjs');

  try {
    fs.accessSync(exe, 'rx');
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.error(`Package ${chalk.blue('@reworkjs/reworkjs')} is not installed in this directory. Run ${chalk.magenta('rjs init')} to install it.`);
    } else {
      console.error(`Could not access the local reworkjs cli, make sure ${chalk.magenta('./node_modules/.bin/rjs')} is executable.`);
    }

    process.exit(1);
  }

  childProcess.spawnSync(exe, process.argv.slice(2));
}
