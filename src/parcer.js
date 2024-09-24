import { readFileSync } from 'fs';
import { cwd } from 'process';
import * as path from 'path';

const parseFile = (fileName) => {
  const pathToFile = path.resolve(cwd(), 'src/', `./${fileName}`);
  const file = readFileSync(pathToFile);
  const fileContents = JSON.parse(file); // Формат данных определяйте на основе расширения файла !!!
  return fileContents;
};

export default parseFile;
