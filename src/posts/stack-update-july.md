---
title: "Stack Update: OpenClaw Became Real"
date: "2026-07-15"
description: "Three months later — the personal AI system I designed in April is actually running. Here's what changed, what shipped, and what got deleted."
---

Back in April I wrote up a design for OpenClaw — a personal AI system with a primary agent named Jadu orchestrating a bunch of subagents. That post was all sketches and ambition. This one is the update: most of it is real now, though it looks pretty different from the original design.

## Jadu lives on Hermes now

The biggest change: instead of building the whole agent runtime myself, Jadu now runs on [hermes-agent](https://github.com/NousResearch/hermes-agent), Nous Research's open-source self-improving agent. It gave me almost everything from the OpenClaw spec for free — a messaging gateway (I talk to Jadu over Telegram from anywhere), a cron scheduler for unattended routines, a skill system, and cross-session memory.

The skill library is the part I underestimated. Jadu currently has 111 skills installed and I actually had to go through and *disable* half of them because the catalog was bloated — 56 are enabled now. A few I wrote myself: a nightly planner, a sync job for my personal database, and one that forces the agent to keep my documentation up to date (more on that below).

For memory, Jadu uses [Honcho](https://github.com/plastic-labs/honcho) running in Docker on thebigbox — it models the user (me) across conversations in the background, so the agent gets better at knowing what I mean over time.

These are the models under the hood: a gemma4:31B cloud model through Ollama on the Mac Mini's Neural Engine, with a smaller local Qwen fallback served by llama.cpp on the same box. No API bills for the day-to-day stuff.

## The personal database actually shipped

The personal dashboard idea from November went through a few redesigns and landed as a proper little data warehouse: Postgres in Docker on thebigbox, pulling from my Obsidian daily notes and five Google Sheets (workouts, purchases, leetcode, a morning check-in form, and job applications). It syncs every night at 3am via a Jadu cron job, append-only, reached over an SSH tunnel so the database port never touches the LAN. A Dash dashboard sits on top.

The nice part: I built almost none of it by hand. It came out of a workflow where Claude Code acts as the architect — writing the product brief, architecture doc, and a build plan where every task has a shell command that verifies it — and a local model executes the tasks one by one, escalating to the architect when verification fails. Same workflow produced the server monitoring system that now watches all three machines and auto-restarts dead services.

## Current project: the job applying agent

The project tracker on my homepage points at it now — an agent that searches job postings across the big ATS providers, scores them against my resume, and generates tailored resume + cover letter drafts as Google Docs with everything logged to a tracking sheet. I review and apply manually; the agent just deletes the boring 80%.

## Docs, cleanup, and lessons

The unglamorous work turned out to matter most. Everything in the stack — every host, container, skill, and cron job — is now documented in my Obsidian vault with a master index, and both Jadu and Claude Code are under standing orders to update the docs in the same session as any change they make. An AI agent with stale knowledge of your infrastructure is worse than no agent.

Cleanup along the way: PhotoPrism got removed (Immich won), Portainer is on the way out, and I found a cron job that had been silently broken for weeks — which is exactly the kind of thing the documentation pass was for.

Still on the list: the k3s cluster on the ThinkPads, WireGuard hardening, and single sign-on for all the self-hosted apps. But for the first time the system maintains itself more than I maintain it.
