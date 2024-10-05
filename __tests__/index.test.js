import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = 'file1.json';
const filepath2 = 'file2.yml';

test('stylish', () => {
  const diff = genDiff(filepath1, filepath2);
  const stylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
  expect(diff).toEqual(stylish);
});

test('plain', () => {
  const diff = genDiff(filepath1, filepath2, 'plain');
  const plain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
  expect(diff).toEqual(plain);
});
