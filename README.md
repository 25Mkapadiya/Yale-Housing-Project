# Yale-Housing-Project

**Live site:** https://25mkapadiya.github.io/Yale-Housing-Project/

Website designed to catalog dorms/suites of Yale University.

## Yale Housing Catalog

A modern clean starter directory website built with plain HTML, CSS, and JavaScript.

## What is included

- `index.html` home page with residential college selection
- `catalog.html` room catalog page with search and filters
- Filter by residential college, entrance, and floor level
- Room cards with college, room number, dimensions, pictures, suite details, occupancy, bathroom info, and notes
- Yale-inspired visual system using Yale Blue as the broad base color
- Residential college accent colors applied when a college or room is selected
- Admin sign-in for adding and deleting rooms, with photo uploads
- Rooms and photos stored in Supabase

## Data storage (Supabase)

Rooms and photos live in the Supabase project `yale-housing`
([dashboard](https://supabase.com/dashboard/project/kjcuyyhcruuxplmrzlzt)):

- `rooms` table: one row per room.
- `room_photos` table: photo URLs for each room, in display order.
- `room-photos` storage bucket: uploaded photo files (public to view, 10 MB limit per file).
- `private.admins`: the email addresses allowed to change the catalog.

Row level security lets anyone read rooms and photos, and only a signed-in admin add, edit, or delete them.
`supabase/schema.sql` has the full setup. The browser settings are in `supabase-config.js`; the
publishable key there is meant to be public.

If Supabase can't be reached, the catalog falls back to the starter rooms bundled in `data.js`.

## Admin access

Open `catalog.html#admin` and sign in with an admin account.

- **Create your account:** in the Supabase dashboard, go to Authentication → Users → Add user →
  Create new user, enter your email and a password, and tick "Auto Confirm User".
- **Add another admin:** create their account the same way, then run this in the SQL editor:

  ```sql
  insert into private.admins (email) values ('their.email@example.com');
  ```

## How to run locally

Open `index.html` directly in a browser, or serve the repo root with a local server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Where to edit data

- Add or delete rooms from the admin section of `catalog.html`, or in the Supabase table editor.
- Colleges (names, colors, shields, entrances, floors) are in `data.js`.

## Old links

The site used to live in `yale-housing-catalog/`. That folder now only holds redirect pages so old links keep working.
