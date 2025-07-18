# Target base
FROM node:20.9.0 as base

WORKDIR /project

# Install pnpm
RUN npm install -g pnpm@9.7.0

# Install package and app dependencies
COPY ["package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "./"]
COPY packages /project/packages
RUN pnpm install --frozen-lockfile
COPY ["turbo.json", ".prettierrc", "./"]

# Run build
RUN pnpm run build:packages

# Run linting
RUN pnpm run lint:packages

# Run checking types
RUN pnpm run check-types:packages

# Run testing
RUN pnpm run test:packages
