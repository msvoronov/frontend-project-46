const convertObjToStr = (object) => {
  const entries = Object.entries(object);
  const string = entries.reduce((acc, entrie) => {
    const [key, value] = entrie;
    return `${acc}\n  ${key}: ${value}`;
  }, '');
  return `\n{${string}\n}`;
};

export default convertObjToStr;
