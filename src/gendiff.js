import { program } from 'commander';
import { getObject, getDifference, getAnswerStylish } from './index.js';

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
    const { args } = program; // Массив имен файлов (переданных в аргументы утилиты)
    const objects = args.map(getObject); // получаем из файлов объекты
    const [obj1, obj2] = objects;

    const difference = getDifference(obj1, obj2);
    if (format === 'stylish') {
      console.log(getAnswerStylish(difference));
    } else {
      console.log('other format');
    }
  });

const runGenDiff = () => {
  program.parse(process.argv);
};

export default runGenDiff;
