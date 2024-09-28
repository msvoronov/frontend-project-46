install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

test:
	npm test

test-coverage:
	npm test -- --coverage

run:
	node bin/gendiff.js file1.json file2.json

.PHONY: test