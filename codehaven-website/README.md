# CodeHaven Website — Editable Clone

A standalone, static HTML/CSS clone of https://codehavenyale.github.io/,
built for iterating on the visual design without needing the site's Ruby/Jekyll
toolchain (the real site uses `jekyll-text-theme`, which no longer builds
cleanly on modern Ruby). It now covers every page reachable from the live
site's navigation, not just About, so it works as a full click-through demo.

## Sitemap

| Page | File |
| --- | --- |
| Home | `index.html` |
| About | `about.html` |
| Lesson Plans (archive) | `lessons.html` |
| Week 1–7 lesson pages | `lessons/week-1.html` … `lessons/week-7.html` |
| FAQs | `faq.html` |
| Guestbook (editing sandbox demo) | `guestbook.html` |

All internal links are real relative links (verified with a link-checker
pass — nothing points at a missing file), so you can click through the
whole site exactly as a visitor would.

## What's here

- `*.html` / `lessons/*.html` — page markup. Lesson content (objectives,
  materials, agenda, video links, worksheet steps) is copied from the real
  site's `_posts/week-*.md` files; FAQ copy is from `faq.md`.
- `styles.css` — all styling. Color values are commented with the exact
  variable name they came from in the live theme's
  `_sass/skins/_orange.scss`, so the palette can be verified/kept in sync.
- `assets/` — logo and favicon, plus every Scratch worksheet screenshot
  (`assets/images/week1` … `week7`) copied from the live site's repo
  (`CodeHavenYale/CodeHavenYale.github.io`).
- `gen_site.py` — the generator that produces `index.html`, `lessons.html`,
  `lessons/week-*.html`, `faq.html`, and `guestbook.html` from structured
  data (see the `weeks` list and `faqs` list at the top of the file). Editing
  lesson/FAQ *content* is usually easiest by editing the data in this script
  and re-running `python3 gen_site.py`, rather than hand-editing the
  generated HTML. `about.html` is hand-authored and not touched by the
  script.

## What changed vs. the live site

Same color palette everywhere (the orange/coral gradient header & footer,
off-white background, blue/coral accents, and a dark navy hero specifically
on lesson pages, mirroring the live site's own per-page header override),
but:

- Content sits in shadowed "cards" instead of a plain text column.
- Home page adds a stats strip and a "why it works" section; About keeps
  its numbered-section layout with a stat strip.
- Lesson pages get a consistent structure (objectives → materials → agenda
  → videos → worksheet → prev/next pager) instead of a raw markdown dump.
- FAQ is a native `<details>` accordion instead of a flat list of headings.
- Rounded pill-style nav and buttons, sticky header, tighter type scale.

## Editing

No build step for viewing — open `index.html` directly in a browser, or serve the folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000/index.html`. Edit `styles.css` for look
and feel; edit `about.html` directly for its copy/structure; edit the data
in `gen_site.py` and re-run it for everything else.
