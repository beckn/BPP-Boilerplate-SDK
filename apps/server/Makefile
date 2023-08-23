include .env

expose:
	@echo Exposing ${PORT} and ${SOCKET_PORT} port

	npx concurrently \
	"npx lt --port ${PORT} --subdomain ${REST_SUBDOMAIN}" \
	"npx lt --port ${SOCKET_PORT} --subdomain ${SOCKET_SUBDOMAIN}" \
	"npx lt --port 3001 --subdomain sarfraz-bap"
