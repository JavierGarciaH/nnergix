# Rungie-test


## Gidelines

1. [Objective](#Objective)
1. [Getting Started](#Getting-Started)
1. [ESlint](#ESlint)
1. [Testing](#Testing)
1. [ENV](#ENV)
1. [Structure](#Structure)


### Objective

The objective of this project is to create app and cli to get links from url.

### Getting Started

This project needs 
- docker
you can use docker-compose in docker folder
and run it with:
- docker-compose build
- docker-compose up

To use locally
Install the dependencies with `npm i`.
you can use:
npm run app (to run api rest)
npm run cli (to use )


### ESlint

This project is configured to use [eslint](https://eslint.org/) with the [AirBNB base configuration](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)

### Testing

This project with [JEST](https://jestjs.io/docs/en/api).

To run all tests use:
npm run test

### ENV

NODE_PORT
DB_HOST
DB_NAME
Example to .env file:

NODE_PORT=3000
DB_HOST=mongodb://127.0.0.1:27017
DB_NAME=nnergix


