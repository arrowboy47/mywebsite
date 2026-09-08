---
title: "A Recipe Pipeline That Ends in a Swipe"
date: "2026-09-05"
description: "Harvesting ~30 vegan and vegetarian blogs into a clean personal cookbook — WordPress APIs in, schema.org out, dedup in the middle, and a Tinder-style app to approve what actually makes the cut."
---

## The problem with recipe blogs

Every recipe I want to cook lives behind four paragraphs about someone's trip to Tuscany, a mid-article newsletter popup, and a "jump to recipe" button that scrolls past six ads. I've been collecting links in a note for years and never cook from them, because opening the link is the friction.

I self-host [Mealie](https://mealie.io) as my cookbook — it strips a URL down to the structured recipe and stores it. But importing one at a time, by hand, from a link graveyard, is its own chore. So I built a pipeline: harvest a curated set of blogs in bulk, stage everything as clean records, and then judge them in a fast interface instead of a browser tab.

## The stack, front to back

**`sources.json`** — a hand-maintained list of ~30 vegan and vegetarian recipe sites, each tagged with how to enumerate it and roughly how many recipes it has. Most are WordPress with the [WP Recipe Maker](https://bootstrapped.ventures/wp-recipe-maker/) plugin, which exposes a clean `wprm_recipe` post type over the WordPress REST API. A few are plain WordPress where I pull a specific vegan/vegetarian category by ID. Two aren't WordPress at all and get walked via `sitemap.xml`. The file also records per-site quirks — Forks Over Knives 403-blocks its REST endpoint so it has to go through the Yoast sitemap index; Budget Bytes hides its "Vegan Recipes" category on REST page 2 of 118.

**Harvest** — walk each enabled source, collect canonical recipe URLs. Nothing is scraped yet at this stage; it's just building a list of candidates.

**Extract** — for each URL, fetch the page and pull its `schema.org` `Recipe` block — the JSON-LD that sites embed for Google. This is the same structured data Mealie's own importer reads, so storing it means the import works later even if the source page changes or dies.

**Canonicalize + dedup** — strip tracking params and trailing slashes to a canonical URL, hash it to a stable ID, and check it against an index of everything already seen. Rejects go on a blacklist keyed by canonical URL, so a recipe I've already said no to never comes back in a future harvest.

**Stage** — write each survivor as a small JSON record (title, timing, servings, ingredient and instruction counts, diet tag, and the raw JSON-LD) plus a downloaded hero image, into a `pending/` folder. `approved/` and `rejected/` sit next to it.

## The swipe app

The staging folder is the input to a little PWA — FastAPI backend, no-build-step vanilla JS frontend, [Catppuccin](https://catppuccin.com) theme following the system light/dark setting. Every record in `pending/` becomes a card: full-bleed hero photo, title, time, servings, a couple of ingredient chips, diet tag.

- **Swipe right** → `POST` the stored JSON-LD to Mealie's create endpoint. The file moves to `approved/`.
- **Swipe left** → moves to `rejected/` and the URL joins the blacklist.
- **Swipe up** → a detail sheet with the full ingredient list, method, and source link, in case the card isn't enough to decide. Right/left still work from there.
- **Buttons and arrow keys** do the same three things, because a gesture that silently does nothing is indistinguishable from a broken app.

It runs in a container on thebigbox, LAN and WireGuard only, HTTP Basic auth on every route. There's a `SWIPE_DRY_RUN` flag that any non-production copy has to set — a dev server needs the real Mealie token to be worth testing, and without the flag a test swipe-right lands a junk recipe in the real library. I know because it happened once and left a duplicate behind; now the UI shows a permanent yellow "Dry run" badge when the flag is on and the deploy check fails if production reports it.

![The swipe app on a phone — one recipe card with approve / reject / detail controls](/posts/recipe-swipe.png)

## What runs unattended

A nightly job parses ingredient strings on newly-approved recipes into structured quantity/unit/food, and applies tags — the diet tag from staging, plus course and keyword tags from the JSON-LD. The harvest itself can be triggered from inside the app with source and search filters, so I can go "pull me 20 more dinners from Rainbow Plant Life" without touching a terminal.

## What I'd tell past me

The dedup blacklist earning its keep was the surprise. The first few harvests surfaced the same ~200 popular recipes from every overlapping "best of" category, and without the reject list every harvest re-served the ones I'd already turned down. Canonicalizing the URL *before* hashing — so `?utm_source=...` and a trailing slash don't create three IDs for one recipe — is the whole game.

And storing the JSON-LD rather than a link means the cookbook doesn't rot. Recipe blogs restructure, get sold, disappear. The approved record already contains everything Mealie needs.
