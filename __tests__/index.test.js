import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fileName1 = 'file1.json';
const fileName2 = 'file2.yml';

const filepath1 = getFixturePath(fileName1);
const filepath2 = getFixturePath(fileName2);

test.each([
  ['stylish', 'resultStylish.txt'],
  ['plain', 'resultPlain.txt'],
  ['json', 'resultJSON.json'],
])('%s', (format, expectedOutput) => {
  const diff = genDiff(filepath1, filepath2, format);
  const result = fs.readFileSync(getFixturePath(expectedOutput), 'utf-8');
  expect(diff).toEqual(result);
});

test('wrong format', () => {
  expect((() => genDiff(filepath1, filepath2, 'wrong'))).toThrow();
});
