# CodeHaven "About" Page — Editable Clone

A standalone, static HTML/CSS clone of https://codehavenyale.github.io/about.html,
built for iterating on the visual design without needing the site's Ruby/Jekyll
toolchain (the real site uses `jekyll-text-theme`, which no longer builds
cleanly on modern Ruby).

## What's here

- `about.html` — the page markup, with the real About copy from the live site.
- `styles.css` — all styling. Color values are commented with the exact
  variable name they came from in the live theme's
  `_sass/skins/_orange.scss`, so the palette can be verified/kept in sync.
- `assets/` — logo and favicon copied from the live site's repo
  (`CodeHavenYale/CodeHavenYale.github.io`).

## What changed vs. the live page

Same color palette (the orange/coral gradient header & footer, off-white
background, blue/coral accents), but:

- Content is now in shadowed "cards" instead of a plain text column.
- Added a stat strip (Founded / Students / Classrooms / Mentors) pulled
  from numbers already in the About copy, for visual interest and scannability.
- Rounded pill-style nav and buttons, sticky header, tighter type scale.

## Editing

No build step — open `about.html` directly in a browser, or serve the folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000/about.html`. Edit `styles.css` for look
and feel; edit `about.html` for copy/structure.
