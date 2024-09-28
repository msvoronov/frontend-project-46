import { program } from 'commander';
import parseFile from './parseFile.js';
import convertObjToStr from './convertObjToStr.js';
import getDifference from './getDifference.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action(() => {
    const { args } = program; // получаем массив строк - переданных аргументов (имен файлов)
    const objects = args.map(parseFile); // преобразуем в массив объектов
    const sortedObjects = objects
      .map((obj) => Object.entries(obj).sort()) // разибраем на подмассивы и сортируем
      .map((arr) => Object.fromEntries(arr)); // собираем обратно в объекты
    const [obj1, obj2] = sortedObjects;

    const difference = getDifference(obj1, obj2);
    console.log(convertObjToStr(difference));

    // Объект { название: 'значение' } с переданными опциями
    // const options = program.opts();
  });

const runGenDiff = () => {
  program.parse(process.argv);
};

export default runGenDiff;
