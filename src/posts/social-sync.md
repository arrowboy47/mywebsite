---
title: "An Idea: 3-Way Video Sync for Social Media"
date: "2026-03-14"
description: "A half-baked project idea for uploading one video and having it auto-publish to YouTube, Instagram, TikTok, and Facebook simultaneously."
---

This is one of those ideas I wrote down at 2am and keep coming back to.

## The Problem

If you make video content and want to post across platforms — YouTube, Instagram, TikTok, Facebook — you're doing the same thing four times. Trim the video slightly differently for each format, upload four times, write four captions, hit publish four times. It's tedious enough that most people either pick one platform or burn out.

## The Idea

A single upload interface where you:

1. Drop a video file
2. Write a caption once
3. Select which platforms to publish to
4. Hit post

Under the hood, the tool handles format adjustments (aspect ratio, length limits), API authentication for each platform, and queues the uploads. You get a summary of what went live and any failures.

<!-- SCREENSHOT: mockup of the upload interface -->

## The Challenges

The part that makes this hard isn't the UI — it's the platforms.

- **YouTube** has a relatively developer-friendly API
- **Instagram** and **Facebook** are both Meta and share an API, but their requirements are annoying (you need a business account, their upload API has quirks)
- **TikTok** has a Content Posting API but it's gated — you have to apply for access

So building this properly means navigating four different OAuth flows, four different rate limits, and four different content policies. Not impossible, but it's why this stays in the "idea" pile for now.

## What I'd Use

If I built it:
- Backend: Python + FastAPI
- Job queue: Celery or a simple task queue for async uploads
- Auth: OAuth2 per platform, tokens stored securely
- Frontend: something minimal, React or even just a form

The interesting engineering problem is handling partial failures gracefully — if YouTube succeeds but TikTok fails, you shouldn't repost to YouTube when you retry.

Maybe someday. If you've built something like this, I'd love to hear how you handled the platform auth mess.
