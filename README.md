# wcs-event-page

One Vue 3 + Vite website shared by several West Coast Swing events
(Fall Focus, West Coast Spring, Winter Westie Weekend, …).

## How the repo is organised

- **`main`**: shared code (pages, components, layout, build setup). No event content.
- **`events/<name>`**: one branch per event. It holds main's code plus that event's own content.

Content files (the only files that may change on an event branch):

| Path | What's in it |
| --- | --- |
| `src/event.config.ts` | Title, domain, images, year, registration script URL |
| `src/i18n/en.ts`, `src/i18n/si.ts` | All page text (English / Slovenian) |
| `src/assets/theme.css` | Event colours |
| `src/assets/emails/` | Email templates |
| `public/` | Images and other static files |

Everything else is shared code. Git hooks block committing or pushing shared-code
changes on an `events/*` branch (allowed paths are listed in `.githooks/content-files`).

## Setup

```sh
npm install      # also turns on the git hooks
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run lint
```

## Tests

```sh
npm test               # unit tests (form validation, links, language switch, translations)
npm run test:smoke     # builds the site and opens every page in a real browser
```

Run both before deploying. The smoke test needs a browser once: `npx playwright install chromium`.
The tests also check content, e.g. that `en.ts` and `si.ts` have the same texts, so run them on event branches too.

## Updating an event page (content)

```sh
git checkout events/fall-focus
# edit content files, check with npm run dev
npm test && npm run test:smoke
git commit -am "Update schedule"
git push
./deploy_scripts/deploy.sh
```

`deploy.sh` builds the current event branch and uploads it to the server folder
`/var/www/<domain>/`, using `domain` from `src/event.config.ts`. It asks before deploying.
The `deploy_scripts/` folder is not in git: you need a local copy and SSH access to the server.

## Fixing shared code

```sh
git checkout main
# make the fix, commit, push
./scripts/sync-events.sh     # merges main into every events/* branch
git push origin --all
```

If a merge conflicts, the script stops: resolve it, `git commit`, and run the script again.
Then deploy each event that should get the fix (check out its branch, run `deploy.sh`).

## Adding a new event

```sh
git checkout main
git checkout -b events/<name>
# fill in the content files (start with src/event.config.ts)
git push -u origin events/<name>
```
