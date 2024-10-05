import getStylish from './stylish.js';
import getPlain from './plain.js';

const getResult = (diff, format) => (format === 'stylish' ? getStylish(diff) : getPlain(diff));

export default getResult;
