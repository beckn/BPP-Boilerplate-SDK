NAME="sarfraz"
BAP_PORT=3001
WEBHOOK=3005

setup:
	@echo "Installing Dependencies up project"
	
	yarn
	
	@echo "Install complete"

	@echo "Setting up Packages"

	make build-packages

	@echo "Setup complete"

	make generate-sdk

build-packages:
	cd packages/beckn-cli && npm run build
	cd packages/bpp-sdk && npm run build
	cd apps/admin && yarn build

generate-sdk:
	packages/beckn-cli/bin/dev generate -o=apps/server/config/sdk.yaml

local-dev:
	make install

	concurrently \
		"cd apps/admin && yarn dev" \
		"cd apps/server && yarn dev" \
		"cd apps/agent && yarn start" \

local-dev-server:
	cd apps/server && yarn dev

local-dev-admin:
	cd apps/admin && yarn dev

local-dev-agent:
	cd apps/agent && yarn start

dev:
	make install

	concurrently \
		"cd apps/admin && yarn preview" \
		"cd apps/server && yarn dev" \
		"cd apps/agent && yarn start" \

install:
	npm install -g localtunnel
	npm install -g concurrently
expose:
	@echo "Exposing ports ${BAP_PORT} and ${BPP_PORT}"

	concurrently \
		"lt --port ${BAP_PORT} --subdomain ${NAME}-bap" \
		"lt --port ${WEBHOOK} --subdomain ${NAME}-webhook" \
		"cd apps/server && make expose"		
bpp:
	lt --port ${BPP_PORT} --subdomain ${NAME}-bpp

