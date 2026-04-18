---
title: "Building a Custom Browser Homepage"
date: "2026-03-01"
description: "Why I replaced the default new tab page with a custom homepage, and what I put on it."
---

The default new tab page on most browsers is either a search box surrounded by ads or a minimalist void. I've mostly used the blank screen, but I thought be cool if there could be someting actually useful there for me. 

## What I Wanted

My goals were:

- Quick links to the tools I actually use (not bookmarks I never clean up)
- Something that looks good (can follow my desktop theme and uses Catppuccin theme (i use it EVERYWHERE))

<!-- SCREENSHOT: full browser homepage -->

## What's On It

The homepage I built (a.k.a forked from some rand person and added tweaks to) is basically just all links to frequently used sites and self-hosted services (Reading Log, Server Dashboard, Coffee site, etc.)


## How It's Built

It's a static HTML/CSS/JS page hosted on the VPS and locally. On Firefox you can set any URL as your homepage, so I just point it at `localhost:PORT` where my page is running.

I keep it in a Docker container alongside my other self-hosted services so it's always up when the browser opens.
