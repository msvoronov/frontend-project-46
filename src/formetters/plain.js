const getValueToPrint = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getPlain = (object) => {
  const inner = (obj, ancestry) => {
    const entries = Object.entries(obj);
    return entries.reduce((acc, entrie) => {
      const [key, value] = entrie;
      const keyToPrint = `${ancestry}${key.slice(2)}`;
      const valueToPrint = getValueToPrint(value);

      if (key.startsWith('+')) {
        return `${acc}\n${keyToPrint}_added_${valueToPrint}`;
      }
      if (key.startsWith('-')) {
        return `${acc}\n${keyToPrint}_removed_${valueToPrint}`;
      }
      if (key.startsWith(' ') && (value instanceof Object)) {
        return acc + inner(value, `${keyToPrint}.`);
      }
      return acc;
    }, '');
  };
  const intermediateList = inner(object, '').split('\n').map((el) => el.split('_')).slice(1);
  const list = intermediateList.reduce((acc, el) => {
    if (acc.length === 0) {
      acc.push(el);
      return acc;
    }
    const lastEl = acc.at(-1);
    if (el[0] === lastEl[0]) {
      acc.pop();
      acc.push([el[0], 'updated', lastEl[2], el[2]]);
    } else {
      acc.push(el);
    }
    return acc;
  }, []);
  return list.reduce((acc, el) => {
    const status = el[1];
    switch (status) {
      case 'added':
        return `${acc}\nProperty '${el[0]}' was added with value: ${el[2]}`;
      case 'removed':
        return `${acc}\nProperty '${el[0]}' was removed`;
      case 'updated':
        return `${acc}\nProperty '${el[0]}' was updated. From ${el[2]} to ${el[3]}`;
      default:
        throw new Error(`Unknown status: ${status}!`);
    }
  }, '');
};

export default getPlain;
