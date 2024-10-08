const stringifyValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getPlain = (treeOrig) => {
  const inner = (tree, ancestry) => tree.map((node) => {
    const { key, status } = node;
    const fullKey = `${ancestry}${key}`;

    switch (status) {
      case 'deleted':
        return `\nProperty '${fullKey}' was removed`;
      case 'added':
        return `\nProperty '${fullKey}' was added with value: ${stringifyValue(node.value)}`;
      case 'changed':
        return `\nProperty '${fullKey}' was updated. From ${stringifyValue(node.valueFrom)} to ${stringifyValue(node.valueTo)}`;
      case 'unchanged':
        return '';
      case 'hasChildren':
        return inner(node.children, `${fullKey}.`);
      default:
        throw new Error(`Unknown status: '${status}'!`);
    }
  }).join('');
  return inner(treeOrig, '').slice(1);
};

export default getPlain;
