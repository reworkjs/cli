#!/usr/bin/env node

import minimist from 'minimist';
import runLocalCli from './run-local-cli';
import installFramework from './install-framework';

const argv = minimist(process.argv.slice(2));

if (argv._[0] === 'init') {
  installFramework();
} else {
  runLocalCli();
}
