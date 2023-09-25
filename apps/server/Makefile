include .env

expose:
	@echo Exposing ${PORT} and ${SOCKET_PORT} - ${SOCKET_SUBDOMAIN} port

	npx concurrently \
	"npx lt --port ${SOCKET_PORT} --subdomain ${SOCKET_SUBDOMAIN}" \
	"npx lt --port ${PORT} --subdomain sarfraz-bpp" \
