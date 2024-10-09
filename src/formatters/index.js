import getStylish from './stylish.js';
import getPlain from './plain.js';

const getResult = (diff, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(diff);
    case 'plain':
      return getPlain(diff);
    case 'json':
      return JSON.stringify(diff, null, 2);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default getResult;
