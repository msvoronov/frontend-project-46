const getStylish = (object) => {
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
  return `{${inner(object, 1)}\n}`;
};

export default getStylish;

/*
gendiff -h
gendiff file1.json file2.yml
gendiff -f plain file1.json file2.yml
*/
