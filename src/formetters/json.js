const getJSON = (object) => JSON.stringify(object, null, 2);

export default getJSON;

/*
gendiff -h
gendiff file1.json file2.yml
gendiff -f plain file1.json file2.yml
gendiff --format json file1.json file2.yml
*/