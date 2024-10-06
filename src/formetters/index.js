import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

const getResult = (diff, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(diff);
    case 'plain':
      return getPlain(diff);
    case 'json':
      return getJSON(diff);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default getResult;
