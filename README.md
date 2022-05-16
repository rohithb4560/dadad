
## Description

Actyv BNPL repository.

## Local postgres setup
### Pre-requisite
docker desktop
```bash
$ npm run docker:env
```
open pg admin: http://localhost:5050/
username/password: admin@email.com/admin

Connect database server using 
username/password: user/password

https://towardsdatascience.com/how-to-run-postgresql-and-pgadmin-using-docker-3a6a8ae918b5

Create database: actyv_bnpl

Run Migration: migration:run

Start service: npm run start:dev

browse: http://localhost:3000/docs/

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Script commands

```bash
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest --config .jestrc.json",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest -i --forceExit --config jest-e2e.json",
    "test:all": "npm run test && npm run test:e2e",
    "typeorm": "ts-node -r tsconfig-paths/register --project ./tsconfig.json ./node_modules/.bin/typeorm",
    "docker:env": "docker-compose --file docker/docker-compose.yml up --build",
    "migration:generate": "npm run typeorm -- migration:generate --config src/infrastructure/configs/database.config",
    "migration:run": "npm run typeorm -- migration:run  --config src/infrastructure/configs/database.config",
    "migration:revert": "npm run typeorm -- migration:revert  --config src/infrastructure/configs/database.config",
    "seed:run": "ts-node -r tsconfig-paths/register --project ./tsconfig.json ./node_modules/typeorm-seeding/dist/cli.js seed --root src/infrastructure/configs"
```
