# KPI Discipline Server

## Table of Contents
- [Introduction](#introduction)
- [Task option](#task-option)
- [Running the NestJS Server](#running-the-nestjs-server)
- [Docker Build Instructions](#docker-build-instructions)
- [Docker Compose Instructions](#docker-compose-instructions)
- [Health Check](#health-check)
- [Swagger Documentation](#swagger-documentation)

## Introduction
This document provides instructions for setting up and running the KPI Discipline Server using NestJS. It includes guidelines for running the server with the `pnpm` package manager, as well as instructions for using Docker.

## Task option
My number in group is 14. 14 % 3 = 2. So I have to make task with users`s categories, that only he can use. I made it

## Running the NestJS Server

### Prerequisites
Make sure you have the following installed:
- Node.js
- pnpm
- PostgreSQL creds

### Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Build the Project**:
   ```bash
   pnpm run build
   ```

4. **Create .env file and set your variables**:
   ```bash
   cp .env.sample .env
   ```

5. **Start the Server**:
   ```bash
   pnpm run start:dev
   ```
   The server will be running on `http://localhost:5000`.

## Docker Build Instructions

### Build the Docker Image
To build the Docker image you have to have setteled .env file (example is .env.sample) and run the following command in the project directory:
```bash
docker build -t kpi-discipline-server .
```

### Dockerfile Explanation
The Dockerfile consists of two stages:
1. **Development Stage**:
   - Sets up the application environment and installs dependencies.
   - Builds the application.

2. **Production Stage**:
   - Copies the built application from the development stage.
   - Sets the command to run the application.

### Dockerfile Snippet
```dockerfile
FROM node:alpine as development

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm
RUN pnpm install

COPY src ./
RUN pnpm run build

FROM node:alpine as production

ARG NODE_ENV=production

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm
RUN pnpm install --prod

COPY --from=development /app/dist /app/dist

CMD ["node", "dist/main"]
```

## Docker Compose Instructions

### Use Docker Compose
To run the server using Docker Compose, use the following command:
```bash
docker-compose up
```

### docker-compose.yml Snippet
```yaml
services:
  server:
    restart: always
    build:
      context: .
      dockerfile: ./Dockerfile
    environment:
      - PORT=5000
      - HOST=0.0.0.0
    ports:
      - '5000:5000'
```

## Health Check
The server provides a health check endpoint:
- **Health Check URL**: `http://localhost:5000/healthcheck`
  
You can use this endpoint to verify that the server is running correctly.

## Swagger Documentation
Swagger documentation is available for testing the API endpoints:
- **Swagger UI URL**: `http://localhost:5000/api`
  
You can use this interface to explore and test the available API endpoints interactively.