Getting started script : https://svelte.dev/docs/svelte/getting-started

```
npx sv create stacked

┌  Welcome to the Svelte CLI! (v0.12.1)
│
◇  Which template would you like?
│  SvelteKit minimal
│
◇  Add type checking with TypeScript?
│  Yes, using TypeScript syntax
│
◇  What would you like to add to your project? (use arrow keys / space bar)
│  prettier, eslint, vitest, tailwindcss, devtools-json, mdsvex, mcp
│
◇  vitest: What do you want to use vitest for?
│  unit testing, component testing
│
◇  tailwindcss: Which plugins would you like to add?
│  typography, forms
│
◇  mcp: Which client would you like to use?
│  VSCode
│
◇  mcp: What setup would you like to use?
│  Local
│
◆  Project created
│
◆  Successfully setup add-ons: prettier, eslint, vitest, tailwindcss, devtools-json, mcp, mdsvex
│
◇  Which package manager do you want to install dependencies with?
│  npm
│
│  To skip prompts next time, run:
●  npx sv create --template minimal --types ts --add prettier eslint vitest="usages:unit,component" tailwindcss="plugins:typography,forms" devtools-json mcp="ide:vscode+setup:local" mdsvex --install npm stacked
│
◆  Successfully installed dependencies with npm
│
◇  Successfully formatted modified files
│
◇  What's next? ───────────────────────────────╮
│                                              │
│  📁 Project steps                            │
│                                              │
│    1: cd stacked                             │
│    2: npm run dev -- --open                  │
│                                              │
│  To close the dev server, hit Ctrl-C         │
│                                              │
│  Stuck? Visit us at https://svelte.dev/chat  │
│                                              │
├──────────────────────────────────────────────╯
│
└  You're all set!

(base) vendeta@vendeta:/media/vendeta/data_disk_2/x-workflow/stacked/project$ ^C
(base) vendeta@vendeta:/media/vendeta/data_disk_2/x-workflow/stacked/project$ npm run ^C
(base) vendeta@vendeta:/media/vendeta/data_disk_2/x-workflow/stacked/project$ npm i

> stacked@0.0.1 prepare
> svelte-kit sync || echo ''


added 3 packages, and audited 240 packages in 8s

73 packages are looking for funding
  run `npm fund` for details

3 low severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
(base) vendeta@vendeta:/media/vendeta/data_disk_2/x-workflow/stacked/project$ npm run dev

> stacked@0.0.1 dev
> vite dev

5:19:19 PM [vite] (client) Forced re-optimization of dependencies

  VITE v7.3.1  ready in 818 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
5:22:39 PM [vite] (client) hmr update /src/routes/layout.css
5:22:39 PM [vite] (ssr) page reload package.json

```
