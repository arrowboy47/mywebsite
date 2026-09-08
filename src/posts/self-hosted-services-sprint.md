---
title: "Five More Services, One Deployment Pattern"
date: "2026-09-06"
description: "openGym, FreshRSS, Mealie, Actual Budget, and Authentik 2FA — everything new on the homelab this month, and the repeatable pattern that made each one a short job."
---

## The pattern first

The reason I can add a self-hosted service in an evening now is that I stopped improvising each one. There's a written playbook, and every new container follows it:

- **LAN-only by default.** Bind to the host, no public DNS, reachable over WireGuard when I'm out.
- **Nginx Proxy Manager** in front for a real hostname and a TLS cert.
- **[Authentik](https://goauthentik.io) forward-auth + TOTP** as a gate, so the app's own login isn't the only thing between the internet and my data.
- **Vaultwarden** holds the credentials; nothing sensitive lives in a compose file.
- **[Catppuccin](https://catppuccin.com)** Mocha/Latte theme following the system setting, so everything looks like one system.

Public exposure is the exception and it's deliberate each time. Here's what went in this month.

## Authentik — the gate itself

This is the one that makes the others cheap. Authentik is an identity provider running LAN-only. NPM calls it as a forward-auth provider: a request for a protected host gets bounced to Authentik, which checks a session and a TOTP code before NPM ever proxies to the app behind it.

The value is defense in depth. A lot of self-hosted apps have thin or optional auth. Putting Authentik in front means even a misconfigured app, or one with a known CVE in its login form, still has a second factor and a hardened login page ahead of it. The rollout list — put NPM, Pi-hole, Portainer, Nextcloud, Immich, and Vaultwarden all behind it — is still in progress, but the pattern is proven on the services below.

## Actual Budget — budgeting without the subscription

[Actual Budget](https://actualbudget.org) is a self-hosted, envelope-method budgeting app — the YNAB idea without the monthly fee or the cloud. LAN-only, behind Authentik + TOTP because it's the single most sensitive thing I host.

The part that makes it actually usable is bank sync via [SimpleFIN](https://www.simplefin.org) — a read-only bridge that hands Actual a token instead of my bank password. Balances and transactions from checking, savings, and a brokerage flow in on a schedule; I categorize, I don't type. Read-only end to end: nothing in this stack can move money.

## FreshRSS — reading on my terms

[FreshRSS](https://freshrss.org) replaced an inbox full of newsletter subscriptions and a bad habit of doomscrolling news sites. It aggregates ~350 feeds.

This one has a split personality on purpose. The full web UI is LAN-only, behind Authentik + TOTP, themed to follow the OS. But the mobile-reader API — the subset a phone RSS client speaks — is published at `/api/` on a public hostname through NPM, with everything else on that host returning 404, and the API itself guarded by a separate per-user API password. So my phone reader syncs from anywhere without opening the management interface to the world.

## Mealie — the cookbook

[Mealie](https://mealie.io) is a self-hosted recipe manager: give it a URL, it strips the page to structured ingredients and steps and stores it. LAN-only, behind Authentik.

It's also the endpoint of a whole pipeline I built around it — bulk-harvesting recipe blogs, staging clean records, and approving them through a swipe app. That has [its own post](/blog/recipe-pipeline).

## openGym — the public exception

[openGym](https://github.com/adamsjng/openGym) is a self-hosted gym and body-weight tracker. This is the one service I run **publicly** — at a real domain, because I want to log a set from the gym floor without fumbling a VPN toggle mid-workout.

Because it's public, the auth is stricter, not looser: passkey / WebAuthn only, no password to phish, and no Authentik in front because a hardware-backed passkey already is the second factor. Its history came pre-loaded — I seeded it from the `workouts` table in my [personal data warehouse](/blog/personaldb), which had been collecting the same data from a Google Sheet for months.

## The through-line

None of these were hard. The playbook is the product. Every one of them got a note in the infrastructure docs the same session it shipped, including the parts that are still open — the Authentik rollout, a couple of clients not yet pointed at their servers. Stale documentation of your own stack is worse than none.
