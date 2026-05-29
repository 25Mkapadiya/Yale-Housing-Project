# Yale Housing Catalog

A modern clean starter directory website built with plain HTML, CSS, and JavaScript.

## What is included

- `index.html` home page with residential college selection
- `catalog.html` room catalog page with search and filters
- Filter by residential college, entrance, and floor level
- Room cards with college, room number, dimensions, pictures, suite details, occupancy, bathroom info, and notes
- Yale-inspired visual system using Yale Blue as the broad base color
- Residential college accent colors applied when a college or room is selected
- Protected admin-only upload section prototype for a future login/database system
- Small starter set of 4 colleges and mock room data

## Demo admin access

Open `catalog.html#admin` and use this demo key:

```text
YALE-ADMIN
```

This is not real security. It is a front-end-only preview for the future admin workflow. In production, replace it with server-side authentication, database storage, and secure file uploads.

## How to run locally

Open `index.html` directly in a browser, or serve the folder with a local server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Where to edit mock data

Edit `data.js` to add or change colleges and rooms. Uploaded admin drafts are stored in the browser's `localStorage` only for prototype purposes.
