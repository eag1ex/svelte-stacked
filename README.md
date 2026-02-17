# Stacked App

Stacked - application that lists stacks, build with Svelte, allowing you to perform all CRUD operations, runs with miragejs mock server.

Static web app with hydrated backend, seo friendly.

## Demo

Available on github pages :[Stacked](https://eag1ex.github.io/svelte-stacked/)

git repo: https://github.com/eag1ex/svelte-stacked.git

## Requirements

- need Node version ^20.19.0 `nvm use 20.19`
- need to install chromium for testing
- rename `.env.example` to `.env`

## Start

Rename `.env.example` to `.env`

```sh

## install all deps
npm install

## run local project
npm run dev

## build
npm run build

## preview after build
npm run preview

## check code
npm run lint

## Run tests
npm run test

```

## Build environment

Rename `.env.example` to `.env`

```sh
npm run build
```

## Features

- All crud operations are available: create, read, update, delete
- Color theme switching
- Uses Tailwindcss with structured layers
- Good separation of concerns (SOC)
- State management integrated with service api
- Passing UNIT and UI tests
- Tslint and prettier clean and valid
- Mock API endpoints with miragejs
- SvelteKit integration
- Environment ready with dotenv
- Uses adapter-static with all data backend rerendered for seo.
- TS types and schemas are nicely separated
- Use common path resolution using `@/` instead of `$`
- Production ready

## Stack

- Svelte, @sveltejs/kit, miragejs, Typescript, CRUD, RestApi, Tailwindcss, css/scss, Skeleton, Seo Friendly

## Common paths

- Mock Server: `src/lib/mockServer`
- Static data: `/src/data/stacks.ts`
- Api service: `src/lib/api`
- Store service: `src/stores`

## CRUD

API end points with miragejs

We use api service `src/lib/api` to allow easy adaption to real `/api` end ponts

```sh
# get all stacks
(GET) /api/stacks
# create one stack
(POST) /api/stack
# update one stack
(patch) /api/stack/:id
# delete one stack
(delete) /api/stack/:id
```

## ENV

uses `.env` and `.env.test`
please rename `.env.example` to `.env`

## Testing

last test results: `_DEVELOPER/test.results.md`

Running tests with miragejs mock server requires jsdom with headless browser:

> `/$ npx playwright install chromium`

on windows when installed can be found under:
`C:\Users\<username>\AppData\Local\ms-playwright\chromium-<version>\`

### Notes

_- The warning about: `baseUrl and/or paths in your tsconfig.json which interferes with SvelteKit` in terminal, i kept baseUrl or intellisense wouldn't work_

- the chromium package was not added to package.json because its too big, for testing please install it and then can run tests.
- the project is not fully optimized for mobile yet - will do this when time allows, thank you

<br/>
ps: readme.md was NOT ai generated.

### Thank you
