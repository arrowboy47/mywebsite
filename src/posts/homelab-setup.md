---
title: "My Homelab Setup"
date: "2026-04-15"
description: "An overview of thebigbox — my home server running Ubuntu 24.04, what's on it, and how I access it remotely."
---

Over the past year or so I've been building out a home server that I call **thebigbox**. It started as a media server and turned into something I use for a surprising number of things. Here's the current state of it.

## The Hardware

**thebigbox** is a Dell OptiPlex 9010 MT I picked up used. It's not flashy, but it runs 24/7 without issue:

- **CPU:** Intel Core i5-3470
- **GPU:** GTX 1050 Ti (for hardware transcoding)
- **OS:** Ubuntu 24.04 LTS
- **Storage:** 8TB HDD for media, SSD for OS and fast access

I also run a VPS from RackNerd for services that need a public IP.

<!-- SCREENSHOT: thebigbox / server rack or desk setup -->

## What's Running on It

Everything runs in Docker containers managed through **Portainer**. The main stack:

**Media:**
- **Jellyfin** — self-hosted Netflix, hardware transcoding via GTX 1050 Ti
- **Radarr / Sonarr** — automated movie and TV management
- **Lidarr** — music library management
- **Prowlarr** — indexer management
- **qBittorrent** — behind Gluetun VPN container

**Utilities:**
- **Nextcloud** — personal cloud storage (Google Drive replacement)
- **PhotoPrism** — photo indexing and search
- **Homarr** — dashboard for all services

<!-- SCREENSHOT: Homarr dashboard showing all services -->

## Remote Access

Getting into the server from outside the home network was the trickiest part. The solution:

1. **DuckDNS** — dynamic DNS that maps a hostname to my home IP, updated every 5 minutes via cron
2. **WireGuard VPN** — self-hosted VPN running on thebigbox, phone and laptop both connect as peers
3. **Router port forward** — UDP 51820 forwarded to the server

When I'm away from home I connect via WireGuard on my phone and get full access to every service as if I'm on the local network. No port 80/443 exposed publicly, no reverse proxy drama.

<!-- SCREENSHOT: WireGuard peer status or connection confirmation -->

## Lessons Learned

A few things that bit me and are worth knowing:

- **Docker + UFW is a footgun.** Docker bypasses UFW rules by default. You have to add explicit iptables rules to get WireGuard traffic through when Docker is running.
- **Give the server a static local IP.** Set a fixed IP allocation in your router for the server's MAC address. Otherwise Docker and WireGuard configs break every DHCP renewal.
- **Gluetun VPN container** is the cleanest way to route your torrent client through a VPN. The download container joins Gluetun's network — if the VPN drops, downloads stop, not continue unprotected.

It's become one of my favorite ongoing projects. Planning to add more over time — if you have questions or suggestions, email me or open a discussion.
