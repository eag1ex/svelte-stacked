## Stacks app

Stack listing app build with Svelte, it allows you to perform all CRUD operations, it runs on mock server `miragejs`

## Features

- All crud operations are available: create, read, update, delete
- Color theme switching
- We use Tailwindcss with structured layers
- Good separation co concerns (SOC)
- State management integrated with service api
- Passing tests
- tslint and prettie

## Testing

Running tests with miragejs mock server requires jsdom with headless browser:

> `/$ npx playwright install chromium`

on windows it should install it under:
`C:\Users\<username>\AppData\Local\ms-playwright\chromium-<version>\`
