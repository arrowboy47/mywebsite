---
title: "How I Organize My Brain in Obsidian"
date: "2026-04-17"
description: "A walkthrough of how I structure my Obsidian vault using the PARA method, index pages, and a consistent frontmatter schema."
---

I've been using Obsidian as my main second brain for a while now, and over time the way I organize it has changed a lot. Early on it was just a pile of markdown files. Eventually I landed on a system that actually makes sense to me — and I want to write it down before I forget why I made the choices I did.

## The PARA Method

The base structure I use is based on the **PARA** method (Projects, Areas, Resources, Archives) from Tiago Forte. The idea is:

- **Projects** — things with a deadline or active goal (e.g. a web project, a learning sprint)
- **Areas of Responsibility** — ongoing parts of life to maintain (health, finances, relationships)
- **Reference** — notes collected for future use, not tied to a specific project
- **Archive** — completed or paused stuff

This four-folder structure kept me from ending up with 500 top-level folders.

<!-- SCREENSHOT: vault root folder structure -->

## Index Pages

Each folder gets a top-level index note that links to the contents. This makes navigation fast without relying on search. For example, my `Projects/` index lists every active project note, and clicking into one gives you links to all the sub-notes for that project.

It's a small thing but it means I can open the vault cold and find anything in 2–3 clicks.

## Frontmatter Schema

The bigger improvement was adding consistent frontmatter to every note. I define these properties at the top of each file:

```yaml
---
type: project | note | reference | experiment | daily
topic: homelab | data-science | health | personal | web
status: seedling | growing | evergreen | archived
tags:
  - tag1
  - tag2
---
```

With this in place I can use the **Dataview** plugin to query notes like a mini-database. For example, I can pull all `type: experiment` notes with `status: in-progress` into a dashboard automatically. No manual lists to maintain.

<!-- SCREENSHOT: Dataview query showing experiments dashboard -->

## What This Unlocked

Once everything had consistent frontmatter, I set up a few dashboards:

- **Goal dashboard** — shows my active experiments and health metrics
- **Project index** — live list of everything in-progress
- **Daily notes** — linked to experiments and goals via tags

The vault went from being a place I dumped notes to a place I actually return to. If you're using Obsidian and feeling like it's getting messy, I'd start with adding `type` and `status` to your notes — it doesn't take long and Dataview makes it immediately useful.
