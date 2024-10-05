#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action(() => {
    const { format } = program.opts(); // Переданная опция
    const [filepath1, filepath2] = program.args; // Переданные аргументы (имена файлов) в массиве
    const diff = genDiff(filepath1, filepath2, format);
    console.log(diff);
  });

program.parse(process.argv);
