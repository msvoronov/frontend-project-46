import getDifference from './getDifference.js';
import getResult from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const diff = getDifference(filepath1, filepath2);
  return getResult(diff, format);
};

export default genDiff;
