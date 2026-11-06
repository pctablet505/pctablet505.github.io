# UI, Layout & Accessibility Guidelines

These rules govern the layout, responsive behavior, color contrast, interactive components, and semantic HTML of `pctablet505.github.io`. They are maintained as design guidelines rather than UI test suites so future edits preserve visual and structural quality without adding test bloat.

---

## 1. Grid & Card Layout Rules

1. **`.grid.two` vs. `.grid.three` Column Math inside `.wrap` (`68rem` / `1088px`):**
   - `.wrap` has `max-width: 72rem` (`1152px`) and `2rem` inline padding on desktop (`68rem` inner width).
   - `.grid.two` must use `minmax(min(100%, 26rem), 1fr)` (not `22rem`, since $3 \times 22\text{rem} + 2\text{rem} = 68\text{rem}$ collapses a 2-column grid into 3 columns on desktop).
   - `.grid.three` uses `minmax(min(100%, 18rem), 1fr)` for 3 columns on desktop.
2. **Illustrated `.card.feature` vs. Un-Illustrated `.card` Pairing:**
   - Never pull an un-illustrated `.card` into the same horizontal grid row alongside a `198px`-tall illustrated `.card.feature` unless the `.card.feature` spans 2 rows (`grid-row: span 2`), as equal row heights otherwise leave `180px–300px` of empty interior whitespace inside the text-only card.
3. **Bottom Footer Alignment in Cards & Metric Grids:**
   - In `.card`, `.foot` uses `margin-top: auto` to pin metadata/links to the bottom border.
   - In `.numbers .num` and `.proof > a`, `.stat-src:first-of-type` must set `margin-top: auto` (with no competing `margin-top: auto` on subsequent sibling `.stat-src` lines) so source captions align horizontally across every row regardless of whether `.stat-value` or `.stat-what` wraps onto 1 or 2 lines.
4. **Preventing Stretched Orphan Cards:**
   - 4-item grids (`.proof`, 4-item `.numbers`) must step down `4 columns (desktop) -> 2×2 (tablet <= 960px) -> 1 column (mobile <= 520px)` rather than `3 + 1` flex wrapping where the 4th card stretches to `3×` the width of Row 1 cards.

---

## 2. Responsive Navigation, Timelines & Reading Order

1. **`.site-header .nav` Breakpoint & Overflow:**
   - Keep `.site-header .nav` inline on Row 1 down to `680px` (it fits cleanly at `768px` tablet width).
   - Never apply a static `mask-image: linear-gradient(90deg, #000 88%, transparent)` to `.nav`, because a fixed box mask permanently fades out the rightmost link (`"About"`) even when scrolled to the far right edge.
2. **`.mini-timeline` Connector Rules:**
   - Anchor `border-top: 2px solid var(--line)` directly on `.mini-timeline > a` (and switch to a `2×2` grid at `<= 860px` and a left-bordered vertical timeline at `<= 560px`) so the orange `::before` milestone dots never float in mid-air when items wrap across rows.
3. **Mobile & Tablet Case-Study Table of Contents (`aside.entry-aside`):**
   - At `@media (max-width: 900px)`, `.entry-aside` (`"On this page"`) must set `order: -1` so readers see the section jump links (`Problem`, `Approach`, `Results`) at the top of the case study rather than below the entire article and related-projects list.

---

## 3. Color Tokens, Dark Mode & WCAG 2.1 AA Contrast

1. **Never Hardcode Theme-Sensitive Hex Colors in Inline SVGs:**
   - Always use CSS custom properties (`fill="var(--down)"`, `fill="var(--ok)"`, `fill="var(--ink-2)"`, `fill="var(--ink-3)"`) inside `<svg>` figures so both Light Mode and Dark Mode (`[data-theme="dark"]`) maintain $\ge 4.5:1$ contrast.
2. **`--ink-3` Contrast on `--surface-2` (`#f1f5f9`):**
   - `--ink-3` is used inside `.fig` diagrams (`background: var(--surface-2)`) and hover states. Keep `:root` `--ink-3` at `#5b6b82` or darker ($\ge 4.9:1$ on `#f1f5f9`), never `#64748b` (`4.34:1`, which fails WCAG 2.1 AA `4.5:1` for small/normal text).
3. **Unique Inline SVG `<defs>` IDs:**
   - Any reusable figure component (`BarcodeDamage.astro`, etc.) that defines `<filter>`, `<linearGradient>`, or `<radialGradient>` IDs must namespace them with an instance `uid` (`#bc-blur-${uid}`) so pages rendering multiple instances (such as `/`) never produce duplicate DOM IDs.

---

## 4. Typography, Semantics & Interactive Affordances

1. **Sequential Heading Hierarchy (`<h1>` → `<h2>` → `<h3>`):**
   - Every page has exactly one `<h1>`. Top-level card grids on index pages without section `<h2>` wrappers (`/demos/`, `/notes/`) must use `<h2>` for card titles rather than skipping directly from `<h1>` to `<h3>`.
   - Separate `<span class="slogan-line">` elements inside `h1.display` with a space in markup so `textContent` and copy-paste preserve word boundaries.
2. **Interactive `.story` Step Player (`Story.astro`, `storyclock.ts`):**
   - Clicking `Previous step`, `Next step`, or any `Step N` dot (`byHand = true`) must pause auto-advance (`wanted: false`) so the figure does not advance away while the reader is inspecting a chosen step.
   - Manual step changes must set `aria-live="polite"` on `.story-live` (wrapping both `.story-step` and `.story-text`) before updating text.
3. **Touch Targets & Link Affordances:**
   - Interactive links and buttons (`.stat-src`, `.more`, `.card .foot a.go`, `.crumbs a`, `.entry-aside a`, `.site-footer a`, `.story-dot`) must maintain at least `24×24px` (`>= 1.5rem`) target height.
   - Repeated utility links (`"the project →"`, `"● live list ↗"`, `"Also on Medium ↗"`) must carry a contextual `aria-label` naming the target entry or subject.
   - Prose/timeline links outside cards (such as `.about-path a` on `/about/`) must include visible link affordance (`color: var(--accent-ink)`, underline decoration, and `→`).
   - Decorative `<svg>` icons inside labeled buttons/links (`.site-header .icon-btn svg`) must set `aria-hidden="true" focusable="false"`.
4. **Search UI (`/search/`):**
   - Initialize `PagefindUI` with `showImages: false` so results do not reserve a blank `96×64px` thumbnail column (`30%` of mobile width), style `#search mark` with theme tokens (`--accent-soft` / `--ink`), provide an `aria-label` on `.pagefind-ui__search-input`, and set `aria-current="page"` on the header search icon when on `/search/`.
5. **Certificates & Metadata:**
   - Keep university courses (`MITx`, `HarvardX`) first on `/certificates/` to match the section copy (`"The university courses first"`), constrain certificate thumbnails with `.cert-img` (`aspect-ratio: 16 / 10; object-fit: contain`), use `https://` for all external verification URLs, and keep `<meta name="description">` between `50` and `160` characters on every route.
