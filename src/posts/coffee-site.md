---
title: "Coffee Site for My Girlfriend's Birthday"
date: "2026-04-14"
description: "A small personal project — a coffee log and tracker I built as a birthday gift."
---

This one started with a birthday and ended with a surprisingly fun little web project.

My girlfriend is really into coffee, we used to go out ALL the time for coffee and we both wanted to stop spending sm on it. For her birthday I wanted to come up with a solution for her, where her money concious mind gets to be put to ease and she still gets to have yummy coffee.

## The Idea

Create a list of recipes that I come up with (or more realistically learn from youtube, instagram, or tiktok) and let her order them like its from a real cafe. Then, when she "orders it" it sends me an email of the drinks she wants.

It eventually got expanded on and I added other features like an ingredients list and a cost per drink (how much it was to make each). This way she can see how much she is saving

<!-- SCREENSHOT: coffee site homepage / entry form -->

## How It Works



<!-- SCREENSHOT: coffee log entry list -->

## The Email Part

The feature I'm most happy with is the email notification. When a new bean is added, the site sends an email recap — the entry details formatted nicely. I wired this up using a simple email API so neither of us has to check the site constantly to see new entries.

It's a small thing but it makes the app feel alive rather than just a static log.

<!-- SCREENSHOT: example email notification -->

## What I Learned

This was a good exercise in keeping scope tight. I had ideas for things like brew method tracking, a map of origins, comparing beans side by side — and I cut all of it. The version that ships is the version that gets used.

The email integration was the most interesting technical piece. Worth doing on future projects too — notifications change how an app feels entirely.
