import path from 'path';
import { cwd } from 'process';
import parseFile from './parseFile.js';

const getPath = (fileName) => path.resolve(cwd(), '__fixtures__/', `./${fileName}`);

export const getObject = (fileName) => {
  const filePath = getPath(fileName);
  const object = parseFile(filePath);
  return object;
};

export const getDifference = (obj1, obj2) => {
  const allKeys = Object.keys({ ...obj1, ...obj2 }).sort();
  const difference = allKeys.reduce((acc, key) => {
    const result = {};
    if (obj1[key] instanceof Object && obj2[key] instanceof Object) { // значения - объекты
      result[`  ${key}`] = getDifference(obj1[key], obj2[key]);
    } else if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) { // есть только в 1
      result[`- ${key}`] = obj1[key];
    } else if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) { // есть только во 2
      result[`+ ${key}`] = obj2[key];
    } else if (obj1[key] !== obj2[key]) { // есть в обоих, но разные
      result[`- ${key}`] = obj1[key];
      result[`+ ${key}`] = obj2[key];
    } else { // if (obj1[key] === obj2[key]) - есть в обоих и они одинаковые
      result[`  ${key}`] = obj1[key];
    }
    return { ...acc, ...result };
  }, {});
  return difference;
};

export const getAnswerStylish = (object) => {
  const getIndent = (string, multiplier) => {
    const offset = string.startsWith('+') || string.startsWith('-') || string.startsWith(' ')
      ? 2
      : 0;
    const standardIndent = 4;
    const indentLength = (multiplier * standardIndent) - offset;
    return ' '.repeat(indentLength);
  };

  const inner = (obj, depth) => {
    const entries = Object.entries(obj);
    return entries.reduce((acc, entrie) => {
      const [key, value] = entrie;

      const identKey = getIndent(key, depth);
      const indentBrace = getIndent('}', depth);

      if (!(value instanceof Object)) {
        return `${acc}\n${identKey}${key}: ${value}`;
      }
      return `${acc}\n${identKey}${key}: {${inner(value, depth + 1)}\n${indentBrace}}`;
    }, '');
  };
  return `\n{${inner(object, 1)}\n}`;
};
