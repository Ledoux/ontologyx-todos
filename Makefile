install-deps:
	for module in entitiex filtex transactionx-client transactionx-express docx; do \
		rm -rf node_modules && mkdir -p node_modules; \
	done
	cd $(PWD)/../filtex && npm link $(PWD)/../entitiex
	cd $(PWD)/../transactionx-client && npm link $(PWD)/../entitiex
	cd $(PWD)/../docx && npm link $(PWD)/../entitiex
	for module in entitiex filtex transactionx-client transactionx-express docx; do \
		npm install; \
	done

install-dev:
	rm -rf node_modules && mkdir -p node_modules
	for module in entitiex filtex transactionx-client transactionx-express docx; do \
		npm link $$module; \
	done
	npm install

run-mongo-dev:
	mongod --dbpath data/mongodb_data

kill-mongo-dev:
	killall -15 mongod

watch-all:
	for module in entitiex filtex transactionx-client transactionx-express docx; do \
		cd $(PWD)/../$$module && npm run watch; \
	done

run-dev:
	ttab exec make run-mongo-dev && ttab exec npm run server-dev && ttab exec make watch-all
