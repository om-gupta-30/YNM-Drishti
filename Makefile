APP_DIR    := ynm-drishti
IMAGE_NAME := ynm-drishti
PORT       := 5173
DOCKER_PORT:= 8080

-include $(APP_DIR)/.env

.DEFAULT_GOAL := help

# ───────────────────────── Development ──────────────────────────

.PHONY: install dev build preview lint clean

install: ## Install dependencies
	cd $(APP_DIR) && npm install

dev: ## Start Vite dev server (port $(PORT))
	cd $(APP_DIR) && npm run dev

build: ## Production build → $(APP_DIR)/dist
	cd $(APP_DIR) && npm run build

preview: ## Preview production build locally
	cd $(APP_DIR) && npm run preview

lint: ## Run ESLint
	cd $(APP_DIR) && npm run lint

clean: ## Remove node_modules and dist
	rm -rf $(APP_DIR)/node_modules $(APP_DIR)/dist

# ─────────────────────────── Docker ─────────────────────────────

.PHONY: docker-build docker-run docker-stop docker-logs docker-clean

docker-build: ## Build Docker image
	docker build \
		--build-arg VITE_GEMINI_API_KEY=$(VITE_GEMINI_API_KEY) \
		-t $(IMAGE_NAME):latest \
		$(APP_DIR)

docker-run: ## Run container on port $(DOCKER_PORT)
	docker run -d --name $(IMAGE_NAME) -p $(DOCKER_PORT):8080 $(IMAGE_NAME):latest
	@echo "→ running at http://localhost:$(DOCKER_PORT)"

docker-stop: ## Stop and remove container
	docker stop $(IMAGE_NAME) 2>/dev/null || true
	docker rm $(IMAGE_NAME) 2>/dev/null || true

docker-logs: ## Tail container logs
	docker logs -f $(IMAGE_NAME)

docker-clean: docker-stop ## Stop container and remove image
	docker rmi $(IMAGE_NAME):latest 2>/dev/null || true

# ─────────────────────── Quick combos ──────────────────────────

.PHONY: fresh up docker-up

fresh: clean install ## Clean reinstall
	@echo "✓ fresh install complete"

up: install dev ## Install + dev server

docker-up: docker-build docker-run ## Build image + run container

# ──────────────────────────── Help ──────────────────────────────

.PHONY: help
help: ## Show this help
	@printf "\nUsage:  make \033[36m<target>\033[0m\n\n"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""
