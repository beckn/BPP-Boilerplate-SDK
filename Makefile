NAME="sarfraz"
BAP_PORT=5002
BPP_PORT=4000
WEBHOOK=3005

install:
	npm install -g localtunnel
	npm install -g concurrently
expose:
	@echo "Exposing ports ${BAP_PORT} and ${BPP_PORT}"

	concurrently \
		"lt --port ${BAP_PORT} --subdomain ${NAME}-bap" \
		"lt --port ${BPP_PORT} --subdomain ${NAME}-bpp" \
		"lt --port ${WEBHOOK} --subdomain ${NAME}-webhook" \

bpp:
	lt --port ${BPP_PORT} --subdomain ${NAME}-bpp