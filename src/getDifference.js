import path from 'path';
import { cwd } from 'process';
import parseFile from './parseFile.js';

const getAbsPath = (fileName) => path.resolve(cwd(), fileName);

const getDifference = (filepath1, filepath2) => {
  const object1 = parseFile(getAbsPath(filepath1));
  const object2 = parseFile(getAbsPath(filepath2));

  const inner = (obj1, obj2) => {
    const allKeys = Object.keys({ ...obj1, ...obj2 }).sort();
    const difference = allKeys.reduce((acc, key) => {
      const result = {};
      if (obj1[key] instanceof Object && obj2[key] instanceof Object) { // значения - объекты
        result[`  ${key}`] = inner(obj1[key], obj2[key]);
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
  return inner(object1, object2);
};

export default getDifference;
