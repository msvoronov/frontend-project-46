install:
	npm ci

lint:
	npx eslint .

gendiff:
	node gendiff.js