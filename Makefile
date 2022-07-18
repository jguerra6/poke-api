################
# Dependencies #
################

DEPENDENCIES = docker npm git
CHECK_DEPENDENCIES := $(foreach exec,$(DEPENDENCIES),\
        $(if $(shell which $(exec)),some string,$(error "$(exec) is not installed")))

COMMIT = $(shell git rev-parse --short HEAD)
IMAGE_NAME = jguerra10/poke-api
PORT = 8080

.PHONY: install
install:
	npm install

.PHONY: image
image:
	docker build \
		--build-arg COMMIT=${COMMIT} \
		-t $(IMAGE_NAME):latest .
	docker tag $(IMAGE_NAME):latest $(IMAGE_NAME):$(COMMIT)

.PHONY: up
up:
	@docker run --name poke-api -d -p $(PORT):8080 poke-api:latest
