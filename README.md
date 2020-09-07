# Places API

## Setup

Configure the environment variables file with name `.env` using the example file env.EXAMPLE

## Installation

Depending on your need you have two options, `local` and with `Docker`.

### Local

You need MySQL installed and the database schema created (only the schema, no tables).

The database must be created with the same name as the .env file.

From the console, go to the project's root directory and run:

```console
npm install
```
later
```console
npm run build
```
and later
```console
npm run start
```

### With Docker

From the console, go to the project's root directory and run:

```console
docker-compose up -d --build
```

## Run Test

> The tests are only for the domain of the application, not for the configuration of the project, they are two different things. 

> This project includes a domain and its tests which should be used as an example and removed to implement its own business logic.

> The tests use the `Jest` library and can be run in two ways:

```console
npm t
```
or 

```console
npm run test
```

## Build for production

> To get the code you can use in a productive environment run:

```console
npm run build
```

The result code will be stored in the `dist` directory.