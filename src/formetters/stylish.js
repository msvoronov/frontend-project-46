const getIndent = (multiplier, offset = 0) => {
  const standardIndent = 4;
  const indentLength = (multiplier * standardIndent) - offset;
  return ' '.repeat(indentLength);
};

const stringifyValue = (value, depth) => {
  if (!(value instanceof Object)) {
    return `${value}`;
  }
  const indentKey = getIndent(depth);
  const indentBrace = getIndent(depth - 1);

  const entries = Object.entries(value);
  const stringifiedValue = entries
    .map(([subKey, subValue]) => `\n${indentKey}${subKey}: ${stringifyValue(subValue, depth + 1)}`)
    .join('');
  return `{${stringifiedValue}\n${indentBrace}}`;
};

const getStylish = (treeOrig) => {
  const inner = (tree, depth) => tree.map((node) => {
    const { key, status } = node;
    const indentKey = getIndent(depth, 2);
    const indentBrace = getIndent(depth);

    switch (status) {
      case 'deleted':
        return `\n${indentKey}- ${key}: ${stringifyValue(node.value, depth + 1)}`;
      case 'added':
        return `\n${indentKey}+ ${key}: ${stringifyValue(node.value, depth + 1)}`;
      case 'unchanged':
        return `\n${indentKey}  ${key}: ${stringifyValue(node.value, depth + 1)}`;
      case 'changed':
        return `\n${indentKey}- ${key}: ${stringifyValue(node.valueFrom, depth + 1)}\n${indentKey}+ ${key}: ${stringifyValue(node.valueTo, depth + 1)}`;
      case 'hasChildren':
        return `\n${indentKey}  ${key}: {${inner(node.children, depth + 1)}\n${indentBrace}}`;
      default:
        throw new Error(`Unknown status: '${status}'!`);
    }
  }).join('');
  return `{${inner(treeOrig, 1)}\n}`;
};

export default getStylish;
