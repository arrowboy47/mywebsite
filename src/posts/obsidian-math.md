---
title: "Using Obsidian to Actually Learn Math"
date: "2026-04-10"
description: "How taking notes in Obsidian changed the way I study statistics and machine learning — and why it actually sticks now."
---

I have a Statistics degree. That doesn't mean I remember everything. Going into data science and machine learning means revisiting a lot of math I learned years ago, and this time I wanted it to actually stick.

Obsidian ended up being the tool that made the difference.

## The Problem with Most Study Methods

The usual approach — watch a lecture, highlight a textbook, maybe make flashcards — never worked well for me with math. The problem is that math concepts build on each other. If you forget what a covariance matrix is, a whole section of PCA notes becomes useless. You need a way to **link** concepts, not just list them.

## What I Do Now

For each concept I'm learning (say, gradient descent), I write a note that covers:

1. **Intuition first** — what is this *actually doing* in plain English?
2. **The math** — the actual formula, with LaTeX
3. **When to use it** — practical context
4. **Links** — connections to other notes (what does this depend on? what does it feed into?)

```md
## Gradient Descent

Finds the minimum of a function by repeatedly stepping in the direction of steepest descent.

$$\theta := \theta - \alpha \nabla_\theta J(\theta)$$

- $\alpha$ = learning rate
- $\nabla_\theta J(\theta)$ = gradient of loss w.r.t. parameters

**Depends on:** [[Loss Functions]], [[Partial Derivatives]]  
**Used in:** [[Linear Regression]], [[Neural Networks]]
```

<!-- SCREENSHOT: example math note with LaTeX rendered in Obsidian -->

## The Graph Makes it Click

The killer feature is Obsidian's **graph view**. When you start linking notes, you see clusters form — all the regression stuff connects, all the probability stuff connects. When a concept is isolated in the graph, it usually means I don't fully understand *where it fits*, which tells me I need to dig in more.

<!-- SCREENSHOT: graph view showing connected math concepts -->

## What I'm Working Through

Right now the vault has notes covering:

- Core stats: distributions, hypothesis testing, regression
- Machine learning: decision trees, random forests, boosting (XGBoost), SVMs
- Deep learning: working through this now, starting with backprop and neural net basics

It's slow, but I'm actually retaining it. Writing forces you to understand — you can't fake your way through explaining gradient descent in your own words.

If you're studying anything technical, I'd strongly recommend building notes this way. The vault compounds over time, and older notes become more valuable as you connect them to new things.
