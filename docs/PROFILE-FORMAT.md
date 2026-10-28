# PROFILE.md format

PROFILE.md is the one public master file for pctablet505.github.io. Every fact the site shows (every job, project,
date, number, link and certificate) is written once, in this file. The site is built from it alone, and other tools
(the resume generator, LinkedIn text) read it too, so a correction here reaches every place at once.

Everything in PROFILE.md is public. Facts that must stay private live in the private career record, never here.

## 1. Shape

````markdown
# pctablet505: profile                     <- one H1, the file's title

## Identity                                <- H2 = a section (fixed list, section 3)
```yaml
handle: pctablet505
...
```

## Work

### Reading damaged barcodes on phones     <- H3 = one entry; the heading is its display title
```yaml                                    <- required: the first block after the H3 holds its fields
id: damaged-barcodes
...
```
Summary paragraph(s): the short story of the entry, shown on the work page and at the top of the case study.

#### Problem                               <- H4 = case-study sections (Work entries only, fixed names, in order)
#### Approach
#### Results
#### What did not work
#### Deep dive
````

Parsing, in order:
1. Split the file at `## ` headings into sections. An H2 not in the list in section 3 is an error.
2. Inside a section, split at `### ` headings into entries. The first fenced block after an entry heading must be
   ```` ```yaml ````; it is parsed with any YAML library (safe load) and holds the entry's fields.
3. The Markdown after the fields and before the first `#### ` heading is the entry's `summary`. Each `#### `
   heading starts a named section of the entry, up to the next `#### `, `### ` or `## `. The sections are optional
   (an entry with none is a short entry, not a case study); when present they use the five names above, in that
   order.
4. Identity has a yaml block directly under its H2 and no entries. About is prose under its H2 and no entries.

Text is Markdown. Links inside text are fine. No HTML.

## 2. Fields

Common to every entry:

| Field | Required | Value |
|---|---|---|
| `id` | yes | kebab-case (`^[a-z0-9]+(-[a-z0-9]+)*$`), unique in the file, **never renamed**. It is the entry's key for every tool and its URL slug. If a rename is unavoidable, keep the old id in `old_ids: [..]`. |
| `priority` | yes | `1`, `2` or `3`. 1: home page and the top of its section (the few things that should get most of a visitor's attention; keep about eight of these site-wide). 2: section pages. 3: the archive: still on the site and in every export, but placed low. |
| `start`, `end` | for things with a span, when known | `YYYY`, `YYYY-MM` or `YYYY-MM-DD`; `end: present` while ongoing. Left out when no source gives the dates. |
| `date` | for single-date things | Same format. Articles, certificates, awards, merges. |
| `skills` | Experience, Work | List of skill and tool names, as a resume would write them: `[YOLO, U-Net, TFLite, Kotlin]`. |
| `one_line` | Experience, Work | One sentence of 25 words or fewer, result first. Used on cards and as the base of a resume bullet. Entries with `wording: exact` keep their approved sentence at any length. |
| `links` | no | List of `{label: ..., url: ...}`. |
| `related` | no | List of other entry ids. |
| `wording` | no | `exact`: tools must reuse this entry's text word for word, never rephrase it. |

Experience entries add `org` (the employer as written publicly), `title`, `location`.

Work entries add:

| Field | Required | Value |
|---|---|---|
| `org` | yes | The id of an Experience entry (`samsung`, `qualcomm`, `google`), or `personal`. |
| `area` | yes | `vision` (computer vision and face biometrics), `sensing` (sensor and behaviour ML), `performance` (on-device, performance, inference, frameworks), `projects` (side projects and tools). |
| `status` | yes | `shipped` (a source says released or deployed), `built` (made; release not stated), `demo`, `prototype`, `research`, `merged`, `proposed` (built and proposed, not merged), `published`, `live`, `in-progress`, `planned`. |
| `numbers` | if it has any | List; see below. |
| `figure` | no | `{src: ..., alt: ..., made: ...}`. `made` says how the picture was produced, e.g. "drawn by code from the README's benchmark table". A figure is drawn from data or labelled as an illustration; never a fake result. |
| `demo` | no | The id of a Demos entry. |
| `chart` | no | Data for a chart the site draws: `title`, `source` (https), `as_of`, `note`, and one of: `bars`, a list of `{label, value}` (add `off: true` for a setup that was measured but not used); or `growth`, `{from, years, start, lines}`: an amount (`start`, such as `"₹1 lakh"`) grown for `years` from the year `from`, one line per `{label, rate}` in percent a year (add `high` for a range, drawn as a band). The values are the source's exact numbers; `numbers` may round them for text. |
| `closed` | no | The ideas a research project tested and closed: `source` (https), `as_of`, and `ideas`, a list of `{idea, why}`. If the entry has a number with id `closed`, its value must equal the number of ideas. |

Each item in `numbers`:

| Field | Required | Value |
|---|---|---|
| `id` | yes | kebab-case, unique within the entry. Other tools refer to `entry-id.number-id`. |
| `value` | yes | As shown: `70% → 90%`, `10M+`, `1,200 ms → 87 ms`. |
| `what` | yes | What it measures, in plain words. |
| `status` | yes | `checked`: re-read at a public source; `reported`: stated by the owner (resume, LinkedIn or their own account), with no public source to check (most past-employer numbers). |
| `source` | yes | `checked`: an https URL anyone can open. `reported`: `resume`, `LinkedIn` or `owner`. Never a private path. |
| `as_of` | for `checked` | The date the value was re-read. Counts that change (pull requests, projects) always carry it. |

Demos entries: `id`, `priority`, `status` (`planned` or `live`), `related` (the Work ids it comes from), `now` (what the
page shows today: an animation, a figure), `live_url` (empty until a live version exists).

Certificates, Education and Awards entries: `id`, `priority`, `issuer`, `date` (or `start`/`end`), `url` (verify
link, if any), `image` (a file in `src/assets/`, if any). Open source entries: `id`, `priority`, and `numbers`,
`links` or `date` as they apply. Writing entries (articles): `id`, `priority`, `date`, `venue`, `url`. Notes entries
(the knowledge base: technical notes and docs that live elsewhere, linked rather than copied): `id`, `priority`,
`venue`, `url`, `related`, and `date` if known.

Identity (no entries, one yaml block): `handle`, `name`, `headline` (the short line the home page leads with),
`lede` (one or two sentences under it), `location`, `email`, `links` (each with a `priority`), `photo`, `resume`,
`languages`, and `proof`: the numbers the home page leads with, written as `entry-id.number-id`.

## 3. Sections, in file order

`Identity`, `About`, `Experience`, `Work`, `Open source`, `Writing`, `Notes`, `Demos`, `Education`, `Certificates`,
`Awards`.

## 4. Rules

1. A fact lives in one place. A number is written in its entry's `numbers` and may be repeated in that same entry's
   text; nowhere else. Pages, notes and other tools refer to it by id.
2. The build stops, and the live site stays as it was, on: an unknown section, an entry without a yaml block, a YAML
   error, a missing required field, a bad id, date, priority, area or status value, a duplicate id, an id reference
   that points nowhere, a `checked` number without an https source and `as_of`, a `chart` or `closed` list with a
   missing part, a `closed` count that disagrees with its list, and a measurement in a Work or Experience entry's text
   that is not in its `numbers`. A measurement is a number with a unit or a sign (`%`, `x`, `ms`, `s`, `tokens/s`,
   `GiB`, `GB`, `MB`, `M`, `k`, a trailing `+`) or with a thousands comma; bare numbers such as versions ("Llama 3.1")
   are not checked. The message names the entry and the line.
3. YAML: quote any value that contains `: ` or starts with a symbol; `one_line`, `value` and URLs are always quoted.
4. Notes and articles (the site's `notes/` folder) are writing, not facts: when they mention the owner's work they
   link to the entry instead of restating its numbers.
5. History: PROFILE.md holds the current public value only. Git history keeps the old values; the private career
   record keeps the sources and conflicts.
6. Identity `links` carry a `priority` too: 1 shown up front, 2 in the quieter row, 3 only in structured data.

## 5. Exports (written by the site build)

- `/profile.json`: the whole file, parsed and validated, same field names, one object per section. Other tools should
  read this rather than parse the Markdown themselves, so there is one parser.
- `/llms.txt` (summary and links) and `/llms-full.txt` (this file as plain text), for AI screeners.
- schema.org Person data on every page.
