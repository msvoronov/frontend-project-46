import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import parseFile from '../src/parseFile.js';
import { getObject, getDifference, getAnswerStylish } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('getObject', () => {
  const fileNames = ['file1.json', 'file1.yml'];
  const objectsExpected = fileNames.map(getFixturePath).map(parseFile);
  const objectsWillBeRecived = fileNames.map(getObject);

  expect(objectsWillBeRecived[0]).toEqual(objectsExpected[0]);
  expect(objectsWillBeRecived[1]).toEqual(objectsExpected[1]);
});

test('getAnswerStylish', () => {
  const fileNames = ['file1.json', 'file2.yml'];
  const objects = fileNames.map(getFixturePath).map(parseFile);
  const [obj1, obj2] = objects;
  const difference = getDifference(obj1, obj2);

  const diffFile = fs.readFileSync(getFixturePath('diff.json'), 'utf-8');
  const diff = JSON.parse(diffFile);

  expect(difference).toEqual(diff);

  const stylish = getAnswerStylish(difference);
  const resultStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');

  expect(stylish).toEqual(resultStylish);
});

test('2 формат', () => {
  // Дописать
  // expect().toEqual();
});
