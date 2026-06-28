# pctablet505.github.io

Personal portfolio site for Rahul Kumar — hosted on **GitHub Pages** via Jekyll + minimal-mistakes theme.

**Live site:** [https://pctablet505.github.io](https://pctablet505.github.io)

## Stack

- **Jekyll** with [minimal-mistakes](https://github.com/mmistakes/minimal-mistakes) remote theme (`4.27.1`)
- **GitHub Pages** — deploys automatically on push to `main`
- All content authored in `index.md` (single-page splash layout)

## Structure

```
pctablet505.github.io/
├── _config.yml          # Site config, remote_theme, author sidebar
├── _data/
│   └── navigation.yml   # Top nav links
├── index.md             # All portfolio content (hero + 8 sections)
├── Gemfile              # For local builds (github-pages gem)
├── robots.txt
└── assets/
    └── images/          # sketch.jpg (headshot) + certificate images
```

## Local build

```bash
bundle install
bundle exec jekyll serve
```

## TODO

- Upload résumé PDF to `assets/` and link from Contact section in `index.md`
