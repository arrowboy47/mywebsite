---
title: "OpenClaw: My Personal AI System Design"
date: "2026-01-18"
description: "A full-spec personal AI system called OpenClaw with a primary agent named Jadu — what it does, how it's structured, and why I'm building it."
---

This is the ambitious one. I've been designing a personal AI system I call **OpenClaw** — a network of specialized subagents orchestrated by a primary bot named **Jadu**. This post explains what I'm designing and why.

## The Core Idea

Most AI assistants are stateless chatbots. You ask, they answer, nothing carries over. OpenClaw is different: it's a persistent system that knows *me* — my projects, my homelab, my calendar, my files — and takes actions across all of them, not just answers questions.

The primary agent is **Jadu**. Every other capability is a subagent that Jadu orchestrates.

## Jadu's Identity

Jadu has a `soul.md` file — a hand-authored character sheet that defines personality, tone, values, and communication style. Jadu communicates primarily via Telegram. It code-switches naturally between English, Spanish, and Hindi depending on context and register.

The soul file is version-controlled. Jadu can *suggest* amendments when it notices a gap between its behavior and what was actually wanted — but it never edits `soul.md` itself. Human approves all changes.

<!-- SCREENSHOT: Telegram message from Jadu showing a daily summary -->

## The Subagents

Here's the current roster:

- **Website Maintainer** — keeps personal self-hosted sites updated (this site, coffee log, Kobo dashboard, browser homepage)
- **Communications Agent** — monitors Gmail, iMessage (via BlueBubbles), Telegram; drafts replies, parses conversations for calendar events
- **Home Assistant Maintainer** — controls smart home (blinds, sunlamp) via self-hosted Home Assistant
- **Media Manager** — cleans up broken or unused media files on request
- **News & RSS Agent** — curates a daily reading digest from RSS feeds
- **IT Security Maintainer** — uptime checks, anomaly alerts across thebigbox and my other machines
- **Daily Planner** — generates a structured plan each night based on calendar and pending tasks
- **File Transfer Agent** — moves content to/from modded Switch, 3DS, Kindle via rsync/scp
- **Homelab Health Monitor** — service uptime, disk usage alerts, WireGuard peer reachability
- **Self-Automation Engine** — reviews Jadu's own task log for patterns worth turning into cron jobs; proposes them for approval

<!-- SCREENSHOT: system diagram of Jadu and subagents -->

## The Task Log

Every action Jadu takes gets written to a structured log. No silent completions, no skipped entries. The log feeds the Self-Automation Engine (pattern detection) and the dashboard, and it's how I know what Jadu has been doing.

```
timestamp: 2025-04-07T14:32:00
agent: file-transfer
task: rsync 3 ebooks to Kindle
status: success
duration: 4s
triggered_by: user_request
```

## Why "Overkill"

My notes literally have this labeled as the "overkill" version — meant for when I have a beefy enough machine to run it properly. For now it exists as a design doc.

The non-overkill version is the [Agentic Homelab Maintainer](/blog/agentic-homelab) I described in a previous post — just the monitoring and health-check layer, no full orchestration.

Building toward this is a long game. But having the full spec written down means every smaller piece I build is moving in the same direction.
