---
title: "The Week Long Outage"
date: "2026-07-27"
description: "Remote desktop, live monitoring, and a self-hosted vault — deployed, debugged, and wired into the docs, in one continuous sprint."
---

## Why This Sprint

The biggest reason I started this sprint was because at the start of last week, I was away from my grandma's house (where all the infrastructure lives) and my Obsidian notes were completely out of sync. The app wasn't open on the Mac Mini and I wasn't able to open it from the command line. It was incredibly frustrating because it basically halted so many of my planning and personal note-taking services. I made sure this wouldn't be an issue going forward by installing RustDesk.

Installing RustDesk was the catalyst for this sprint, but it resulted in 2 other services going live. All three had sat on the #homelab backlog for a while.

**The Tally:**
- 3 Services shipped
- 22 Kuma monitors
- 4 Devices per service
- 6 Hiccups resolved
- thebigbox as the Docker workhorse

## What Got Built

### RustDesk (Remote Desktop)
I deployed a self-hosted `hbbs/hbbr` pair to replace any public relay dependency. This allows for screen control and file transfer over LAN or the existing WireGuard tunnel, ensuring no new public exposure.
- **Server:** Docker, `network_mode: host`, ports 21115–21119/tcp + 21116/udp.
- **Clients:** Mac Mini M4, Fedora laptop, and iPhone are done with a permanent password set on the Mac Mini.
- **Pending:** MacBook Air (BlueBubbles) client is deferred for now.

### Uptime Kuma (Monitoring)
I layered a live dashboard and Telegram alerting on top of the existing SSH-polling monitor. While the old one restarts failed services and logs to SQLite, it lacked a visual status page and push notifications.
- **Coverage:** 22 monitors covering every Docker service on thebigbox plus all three hosts.
- **Provisioning:** Scripted end-to-end via the `uptime-kuma-api` Python client rather than clicking through the UI.
- **Alerting:** One Telegram bot applied as the default notification across all 22 monitors.

### Vaultwarden (Password Manager)
A Rust reimplementation of the Bitwarden server. I get the same official apps and extensions on every platform with all premium features unlocked, no monthly fee, and no third party holding the vault.
- **Access:** `vault.thebigbox.duckdns.org` through Nginx Proxy Manager with a real Let's Encrypt cert.
- **Clients:** Mac Mini (extension + app), Fedora (flatpak + extension), and iPhone. Imports were pulled from Brave, Firefox, and iCloud Keychain.
- **Hardening:** Signups are closed after account creation, and I've set up a nightly backup cron with 30-day retention.
- **Pending:** MacBook Air client, 2FA on the vault account, and a cold-restore test of the backups.

## Hiccups Along the Way

**RustDesk permanent password silently failed to save**
I chased two false leads—a suspected missing macOS privileged-helper install, then a botched `--reinstall` that just relaunched the app as root. The root cause was that earlier `sudo` runs of the RustDesk binary had overwritten two config files as root-owned, silently blocking the normal user session from writing its own password. I `chowned` the two files back to the user, killed the process, and relaunched.

**RustDesk ports reachable in Docker, unreachable over the network**
`ss -tulnp` showed the ports listening fine, but every external connection timed out. It turned out `ufw` was blocking the new inbound TCP ports; I added the rules additively, leaving the rest of the firewall untouched.

**Four Kuma monitors reported down for services that were actually fine**
Honcho's root path 404s by design, Pi-hole's root returns 403, Nextcloud force-redirects to HTTPS on a port that doesn't speak TLS, and Sonarr's auth wall returns 401. I pointed each monitor at the real endpoint or path and explicitly accepted the status code that actually means "alive."

**Vaultwarden's proxy host looped back to Nginx Proxy Manager's own splash page**
The Forward Hostname/IP field was set to thebigbox's own LAN IP on port 80—which is NPM itself. I pointed it at the container name (`vaultwarden`) instead, which resolves correctly on the shared Docker network.

**Two Kuma monitors vanished after an accidental delete**
Pi-hole and Honcho API got removed by mistake mid-session. I simply re-added both with the same fixed URLs and Telegram notifications.

**Vaultwarden's own Telegram-style API key wasn't enough to script monitor creation**
Kuma's API keys only cover the metrics endpoint; full monitor CRUD needs a real session token. I used a browser-console-copied session JWT instead of ever handling the account password.

## What's Working Now

- **Remote desktop, tunnel-only:** RustDesk is reachable from Fedora and iPhone over LAN or WireGuard—no public relay dependency and no new attack surface.
- **Full visibility:** Every Docker service and all three hosts are on one dashboard, with a Telegram ping the moment something actually goes down.
- **One vault, every device:** Same Bitwarden-compatible client on Mac Mini, Fedora, and iPhone, syncing through a server nobody else controls.
- **Real TLS, no warnings:** The Nextcloud reverse-proxy pattern—DuckDNS subdomain, NPM cert, Pi-hole split-horizon DNS—got reused cleanly for Vaultwarden, proving it as a repeatable template.
- **Docs kept current:** Every deploy got a service note, a host-note update, and an Infrastructure Index entry in the same session it shipped.

## Next Steps

| Item | Priority | Note |
|---|---|---|
| Enable 2FA on the Vaultwarden account | soon | TOTP via a separate authenticator app |
| MacBook Air (BlueBubbles) client | pending | RustDesk and Vaultwarden both deferred here |
| Cold-restore test of the Vaultwarden backup | pending | An untested backup isn't a backup |
| Rotate self-hosted app passwords | pending | Update in-app and in the matching Bitwarden entry |
| Add cards + identities to the vault | queued | Vault's live, just needs the data filled in |
| SSO / 2FA gate for all self-hosted apps | queued | Authentik vs. Authelia — deferred to its own session |
