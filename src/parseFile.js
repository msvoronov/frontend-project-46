import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import jsYaml from 'js-yaml';

const getPath = (fileName) => path.resolve(cwd(), 'src/files/', `./${fileName}`);

const parseFile = (fileName) => {
  const extname = path.extname(fileName);
  const filePath = getPath(fileName);
  const file = extname === '.json'
    ? JSON.parse(readFileSync(filePath))
    : jsYaml.load(readFileSync(filePath));
  return file;
};

export default parseFile;
