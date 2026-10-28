# pctablet505.github.io

The source of [pctablet505.github.io](https://pctablet505.github.io), the site of Rahul Kumar (pctablet505): on-device
computer vision, sensor ML and fast inference, with a case study for each piece of work.

## One file holds the facts

Every job, project, number, link and certificate on the site is written once, in [PROFILE.md](PROFILE.md). The site is
built from that file alone, so a correction there reaches every page, and `/profile.json` gives the same data to other
tools. The format is in [docs/PROFILE-FORMAT.md](docs/PROFILE-FORMAT.md).

The build checks the file. If an edit breaks the format, leaves a number without its source, or points at an entry that
does not exist, the build stops with the line number and the live site stays as it was.

## Run it

Node 22.23.4 or newer.

```bash
npm ci
npm run dev     # http://localhost:4321; reloads when PROFILE.md changes
npm test        # the checks on PROFILE.md
npm run build   # the static site in dist/, with its search index
```

A push to `main` builds the site with GitHub Actions and deploys it to GitHub Pages.

## Where things are

- `PROFILE.md`: the facts. `src/lib/profile.ts` reads and checks it.
- `src/pages/`: one file per page, plus `profile.json`, `llms.txt` and `llms-full.txt`.
- `src/figures/`: figures drawn by code, either from data in PROFILE.md or labelled as illustrations.
- `src/assets/`: certificate images, optimized at build time.
- `src/pages/social-card.astro`: the link-preview card, drawn from PROFILE.md. `public/social.png` is a screenshot of
  it; after the slogan changes, run `npm run build && npm run preview` and then
  `google-chrome --headless=new --window-size=1280,640 --screenshot=public/social.png http://localhost:4321/social-card/`.
