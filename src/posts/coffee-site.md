---
title: "I Built a Coffee Site for My Girlfriend's Birthday"
date: "2026-03-28"
description: "A small personal project — a coffee log and tracker I built as a birthday gift. It sends emails too."
---

This one started with a birthday and ended with a surprisingly fun little web project.

My girlfriend is really into coffee — tracking beans she's tried, where they're from, tasting notes, that kind of thing. For her birthday I wanted to make something that felt personal and actually useful, not just another gift card.

## The Idea

The goal was a simple coffee log: you enter a new bean, add some notes, and it builds up a record over time. Think of it like a personal coffee journal but as a web app.

<!-- SCREENSHOT: coffee site homepage / entry form -->

## How It Works

The core is a form where you can log:

- Bean name and roaster
- Origin (country/region)
- Roast level
- Tasting notes (freeform)
- Rating

Entries get stored and displayed in a list, sorted by date. Nothing fancy — the point was simplicity so it actually gets used.

<!-- SCREENSHOT: coffee log entry list -->

## The Email Part

The feature I'm most happy with is the email notification. When a new bean is added, the site sends an email recap — the entry details formatted nicely. I wired this up using a simple email API so neither of us has to check the site constantly to see new entries.

It's a small thing but it makes the app feel alive rather than just a static log.

<!-- SCREENSHOT: example email notification -->

## What I Learned

This was a good exercise in keeping scope tight. I had ideas for things like brew method tracking, a map of origins, comparing beans side by side — and I cut all of it. The version that ships is the version that gets used.

The email integration was the most interesting technical piece. Worth doing on future projects too — notifications change how an app feels entirely.
