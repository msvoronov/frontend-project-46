import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';

const getPath = (fileName) => path.resolve(cwd(), 'src/', `./${fileName}`);

const parseFile = (fileName) => {
  const filePath = getPath(fileName);
  const file = readFileSync(filePath);
  const fileContents = JSON.parse(file); // Формат данных определяйте на основе расширения файла !!!
  return fileContents;
};

export default parseFile;
