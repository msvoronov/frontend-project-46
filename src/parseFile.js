import { readFileSync } from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';

const parseFile = (filePath) => {
  const extname = path.extname(filePath);
  const file = extname === '.json'
    ? JSON.parse(readFileSync(filePath))
    : jsYaml.load(readFileSync(filePath));
  return file;
};

export default parseFile;
