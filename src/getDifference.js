import path from 'path';
import { cwd } from 'process';
import parseFile from './parseFile.js';

const getAbsPath = (fileName) => path.resolve(cwd(), fileName);

// .sort мутирует массив, поэтому его использовать в данном проекте нельзя
const sortAscending = (arr) => arr.reduce((acc, str) => [
  ...acc.filter((n) => n.localeCompare(str) <= 0),
  str,
  ...acc.filter((n) => n.localeCompare(str) > 0),
], []);

const makeTree = (obj1, obj2) => {
  const allKeys = sortAscending(Object.keys({ ...obj1, ...obj2 }));
  return allKeys.map((key) => {
    if (obj1[key] instanceof Object && obj2[key] instanceof Object) { // значения - объекты
      return {
        key,
        status: 'hasChildren',
        children: makeTree(obj1[key], obj2[key]),
      };
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) { // есть только в 1
      return {
        key,
        status: 'deleted',
        value: obj1[key],
      };
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) { // есть только во 2
      return {
        key,
        status: 'added',
        value: obj2[key],
      };
    }
    if (obj1[key] !== obj2[key]) { // есть в обоих, но разные
      return {
        key,
        status: 'changed',
        valueFrom: obj1[key],
        valueTo: obj2[key],
      };
    }
    // if (obj1[key] === obj2[key]) - есть в обоих и они одинаковые
    return {
      key,
      status: 'unchanged',
      value: obj1[key],
    };
  });
};

const getDifference = (filepath1, filepath2) => {
  const object1 = parseFile(getAbsPath(filepath1));
  const object2 = parseFile(getAbsPath(filepath2));
  return makeTree(object1, object2);
};

export default getDifference;
