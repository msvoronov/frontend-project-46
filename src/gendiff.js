import { program } from 'commander';
import parseFile from './parcer.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action(() => {
    const { args } = program; // получаем массив сторк - переданных аргументов
    const data = args.map(parseFile); // преобразуем в массив объектов для сравнения
    console.log(data);

    // Объект { название: 'значение' } с переданными опциями
    // const options = program.opts();
  });

const runGenDiff = () => {
  program.parse(process.argv);
};

export default runGenDiff;
