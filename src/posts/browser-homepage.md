---
title: "Building a Custom Browser Homepage"
date: "2026-03-01"
description: "Why I replaced the default new tab page with a custom homepage, and what I put on it."
---

The default new tab page on most browsers is either a search box surrounded by ads or a minimalist void. Neither of those works for me. I wanted something that actually gives me useful information the moment I open a new tab.

## What I Wanted

My goals were:

- See the time and date at a glance
- Quick links to the tools I actually use (not bookmarks I never clean up)
- Something that looks good — I'm staring at this all day

<!-- SCREENSHOT: full browser homepage -->

## What's On It

The homepage I built includes:

- **Clock** — large, centered, always visible
- **Quick links** — a small grid of icons linking to frequently used sites and self-hosted services (Jellyfin, Homarr, my Obsidian sync, etc.)
- **Weather** — current conditions pulled from a weather API based on location
- **A quote or note** — rotates through a small curated list, gives the page some personality

<!-- SCREENSHOT: quick links grid and weather widget -->

## How It's Built

It's a static HTML/CSS/JS page hosted locally. On Firefox you can set any URL as your homepage, so I just point it at `localhost:PORT` where my page is running.

I keep it in a Docker container alongside my other self-hosted services so it's always up when the browser opens.

The design uses a dark color scheme (Catppuccin Mocha, same as this site) so there's no jarring brightness when you open a new tab.

## The Self-Hosted Angle

What I like about running it locally is that it has zero ads, zero tracking, and loads instantly. No CDN, no remote assets, just a tiny web page served from my own machine.

If you're interested in doing the same, the easiest starting point is a static HTML file you point your browser at. Dress it up from there.
