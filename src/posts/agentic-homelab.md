---
title: "Planning an Agentic AI Homelab Maintainer"
date: "2026-04-11"
description: "What a lightweight AI agent that manages a homelab could actually look like — scoped to be useful, not overkill."
---

I've been thinking a lot about agentic AI systems lately, AI that doesn't just answer questions but takes actions on your behalf. My homelab is a natural target for this kind of thing. I spend more time on maintenance tasks than I'd like, and a lot of it is repetitive.

This post is a design sketch, not a finished system. But thinking through what it *could* do is useful before building anything.

## What "Homelab Maintainer" Actually Means

The scope I care about:

- **Health checks** — are Jellyfin, Sonarr, Radarr, Portainer, etc. actually up and responding?
- **Disk alerts** — the 8TB drive fills up. I want a warning before it's full, not after.
- **WireGuard peer status** — are my phone and laptop still reachable as VPN peers?
- **Log triage** — surface errors that need attention without me SSHing in and scrolling


## The Architecture I'd Use

Lightweight. Sadly I dont have $2k-$3k to spare on building a fully spec'd out AI server (though you have no idea how badly I want one). This means no massive LLM running locally for everything. I was using my claude code subscription within openclaw, but now Anthropic has pulled support :(, so now I'm high and dry. I hope to maybe get a mac mini. My plan:

1. **Monitoring layer** — a small script (or Uptime Kuma) checks each service on a cron schedule, writes a status file
2. **Alert layer** — if a check fails, send a Telegram message. Simple, no AI needed yet.
3. **Query layer** — *this* is where LLM comes in. When I ask "what's the status of the server?" or "why is Sonarr not finding anything?", the agent reads the recent logs and status file and gives me an actual answer, not raw JSON

The LLM doesn't need to run constantly. It only gets invoked when I ask it something or when an alert triggers a "explain this error" call.

<!-- SCREENSHOT: diagram of the agent architecture -->

## The Model

For local use I'd run this on **Ollama** with `gemma4:E4B` on my AI node. 

For tasks that need to reach the internet or make external API calls, route to a hosted model. 

## What I'd Automate vs. Keep Manual

**Automate:**
- Health check pings
- Disk usage alerts
- Restarting a crashed container (with a notification that it happened)

**Keep manual (with agent assistance):**
- Updating containers (agent can surface "these have updates available")
- Changing configs
- Anything destructive

The principle: agent proposes, human approves for anything that touches data or config. For monitoring and alerting, it can act autonomously.

This project is actively in the planning phase. If you're building something similar, I'd love to compare notes.
