const getDifference = (obj1, obj2) => {
  const allKeys = Object.keys({ ...obj1, ...obj2 });
  const difference = allKeys.reduce((acc, key) => {
    const result = {};
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      result[`- ${key}`] = obj1[key];
    } else if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      result[`+ ${key}`] = obj2[key];
    } else if (obj1[key] === obj2[key]) {
      result[`  ${key}`] = obj1[key];
    } else {
      result[`- ${key}`] = obj1[key];
      result[`+ ${key}`] = obj2[key];
    }
    return { ...acc, ...result };
  }, {});
  return difference;
};

export default getDifference;
