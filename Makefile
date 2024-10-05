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

run-stylish:
	node bin/gendiff.js file1.json file2.yml

run-plain:
	node bin/gendiff.js -f plain file1.json file2.yml

.PHONY: test