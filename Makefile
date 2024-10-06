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

.PHONY: test