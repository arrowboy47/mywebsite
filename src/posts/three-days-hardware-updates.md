---
title: "Three Days Closing the Homelab's Biggest Gaps"
date: "2026-09-07"
description: "A used HP Z4 G4 replaced the sold Mac Mini, thebigbox got a new body, and a fanless server GPU needed a custom cooling service. Three hardware stories from three days."
---

## Why These Three Days

A few things converged in early September. The Mac Mini M4 that had been running my local AI inference got sold. I wanted a bigger local model, and the Mac's 9B was the ceiling. Meanwhile thebigbox — the Docker workhorse running about thirty containers — had been living in an old Dell OptiPlex that was reaching the end of its useful life. And a used HP workstation I picked up had a server-class GPU with a problem nobody warns you about: no fan.

This post covers all three. The Z4 G4 rebuild, the thebigbox hardware migration, and the cooling service I had to write for the V620 GPU because physics said it would overheat and I had a choice between that and not running a 27B model.

## The Z4 G4 Rebuild

The HP Z4 G4 is a tower workstation I bought used: i7-9800X, 32 GB RAM, a 500 GB NVMe, a 250 GB SATA drive, and two GPUs. The interesting one is the AMD Radeon Pro V620 — 32 GB of VRAM on RDNA2 silicon. It's a compute card designed for cloud and SR-IOV deployments, which is exactly why it has no display outputs and no fan. I put a cheap GT 710 in the box to drive the KDE desktop; the V620 stays headless and does the work.

The plan was to move my entire agent runtime from the Mac onto this box. The Mac Mini had been the AI core — Hermes gateway, llama.cpp, Ollama, the Obsidian vault via LiveSync — and it was gone. What survived was a verified backup sitting on thebigbox at `/media/backups/macmini-2026-08-07/`, with the home directory, the Hermes database, encrypted secrets, and manifests.

The rebuild went in phases. Base OS was Fedora KDE Plasma, which gave me `dnf` and normal kernel modules without the rpm-ostree friction that would have complicated GPU work. I reused the old Mac's IP address, 192.168.1.158, on purpose — Honcho, the auxiliary model configs, monitoring, and split-horizon DNS entries all pointed at that address, so reusing it meant none of them needed changing. That decision turned out to be load-bearing.

The GPUs took some thought. The GT 710 is a Kepler card that needs the legacy 470 NVIDIA driver branch, which fights Fedora's current kernels. Since it only pushes a desktop, I left it on nouveau and didn't fight it. The V620 is handled by the in-tree `amdgpu` kernel module — no separate driver install needed.

The model swap was the part I was most excited about. The Mac had been running a 9B Qwen. The V620 runs Qwen3.8 27B in a Q4 quantization with 128K context and q8_0 KV cache. That's a meaningful jump in what the agent can reason over in a single pass. I serve it with llama.cpp built against the HIP backend, running inside AMD's official ROCm container via podman so the host stays clean. The server binds to 0.0.0.0:8080 on the LAN, which lets Honcho on thebigbox reach it over the network.

One thing I learned the hard way: the llama-server needs `--jinja` and `--reasoning off` for the Hermes integration. Without `--jinja`, tool calling is dead — the model can't emit structured tool calls. With reasoning left on, the auxiliary tasks that time out on the 9B time out even harder on the 27B because the model thinks before it answers. Both flags are non-negotiable in my config.

There's also a speed trick I tried that didn't work: a fork of llama.cpp with an FP4 quantization that claimed 550 tokens per second prefill. It built fine, the model loaded, the server started — and then it aborted on the first inference request. The fork's flash-attention kernel can't compute occupancy for the V620's gfx1030 architecture. I reverted to the stock build immediately. It's parked for now, waiting for the cooling to be fixed before I retry it.

## The thebigbox Migration

The old thebigbox was a Dell OptiPlex 9010. It had done a fine job, but the 8 TB data drive was getting old and I wanted more headroom for the media libraries. The new body is a Lenovo IdeaCentre 510A-15ICK with 16 GB of RAM, an NVMe boot drive, and the same 8 TB drive physically moved over. Same IP, same hostname, same roughly thirty containers.

The migration was a full downtime event, not a live cutover. The tricky part turned out to be the old 8 TB drive. It held the entire old root filesystem — OS included — not just the data directories. The old documentation didn't specify that, and I assumed it was a data-only drive until I was mid-migration and realized the whole thing was one ext4 partition with OS and data mixed together.

Rather than try to separate OS from data on an 8 TB drive that was holding every container's bind mount, I mounted the entire old drive intact at `/mnt/oldroot` and bind-mounted `/media` from `/mnt/oldroot/media`. Every compose file's bind-mount path under `/media/containers/...` resolved exactly as before, with zero edits to any compose file. Docker's data-root also moved to the old drive's `/var/lib/docker`, which is what let every named volume — Honcho's Postgres data, the PDW database, Redis, Kima — come back with its original data intact and its original container ID, no re-pull or recreate needed.

That decision had a cost: the old drive is still sitting in the box, never cleaned up, because "removing the OS" would mean deleting directories in place on a live filesystem rather than removing a partition. I decided the reclaimed space wasn't worth the risk.

The migration surfaced a few gotchas worth documenting. `systemd-resolved` on Ubuntu holds a stub listener on port 53 by default, which blocked Pi-hole from binding to 0.0.0.0:53 and broke DNS for the entire LAN. The fix is a one-line config change and a service restart, but it's the kind of thing that takes twenty minutes to diagnose when you're staring at a "healthy" container that isn't actually listening. There was also a boot hang caused by an unused Wi-Fi card that `systemd-networkd-wait-online` was waiting on forever — masking that unit fixed it. And Nginx Proxy Manager came up "Up" after the reboot with no port errors, but the s6-overlay supervisor inside the container had a stale `/etc/group.lock` from an abrupt kill during shutdown, and the nginx and backend services it supervises never started. A `--force-recreate` gave it a fresh writable layer and fixed it.

The GPU is a GTX 1050 Ti that moved over from the old box. It handles Jellyfin transcoding and Immich ML. One gotcha there: Ubuntu's driver auto-detection pulled the current 610-branch NVIDIA driver, which has dropped Pascal support. The 1050 Ti needs the 580 legacy branch specifically. Purging the wrong packages and installing `nvidia-driver-580` fixed it.

## The V620 Cooling Problem

This is the part I didn't expect to need a custom systemd service for.

The V620 is a passively-cooled server card. No fan. In a cloud deployment it sits in a chassis with forced airflow over it. In the Z4 G4 tower, which wasn't designed to move air over a passive GPU at this power level, the card overheats within seconds of a prompt prefill. Junction temperature goes from 30 degrees Celsius to 75–80 within seconds and keeps climbing under sustained load.

I probed the card's thermal controls and found the options were limited. The power cap is firmware-locked at 250 watts — writing to the sysfs power cap file does nothing. There are no clock-offset ranges, so no undervolting. The only working levers are the DPM clock-state masks, and the card exposes just three compute states: 500 MHz, 2490 MHz, and 2570 MHz. There's nothing between 500 and 2490.

So the solution I wrote is a root systemd service called `v620-thermal-guard.service`. It polls the junction temperature every two seconds and walks the GPU through the available clock levels. When the junction hits the target ceiling — 65 degrees by default — it steps down one level immediately. When it cools back down for a sustained period, it steps back up. At the floor level, if the junction still climbs past an emergency threshold, the service sends SIGSTOP to the llama-server process, which pauses it and lets the GPU go idle and cool. SIGCONT when it's back down. An in-flight request just hangs during the pause and resumes; the 900-second stream timeout I had already configured covers it.

The practical effect is that the GPU spends most of its time at 500 MHz to hold the temperature, which is about five times slower than full speed. The 27B model still works; big prompts are just slow. It's a stopgap. The real fix is a 3D-printed blower that forces air over the card, which I have the parts for and the build steps written out. Once that's fitted and temps hold, the service gets disabled and the GPU runs at full speed.

I also raised the ceiling on the service a few days in. The default 65-degree target with the GPU locked at 500 MHz made the local model too slow to be useful for the things I actually run on it — email processing, the nightly planner, delegation. So I bumped the target to 80 degrees, let it boot at the fast clock level, and set it to step down a level every second it's over 80, with the hard stop at 88. It runs full speed now and backs off when it gets hot. The trade-off is that the junction runs warmer than I'd like, but the card is rated for it and the emergency stop is the safety net.

![v620-thermal-status output showing junction temperature and clock levels](/posts/tempofgpu.jpeg)

![The new V620 card in the Z4 G4](/posts/newcarddd.jpeg)

## What's Left

The Z4 G4 is running the full agent stack — Hermes gateway, the 27B model, Ollama, the Obsidian vault, the dashboard. Telegram works, the cron jobs run, the Kanban board dispatches. The thebigbox migration is complete and the container stack is healthy. The V620 is working but thermally limited until the blower goes in.

On the list still: fitting the 3D-printed blower, retrying the rocmfp4-llama fork once the card is cooled, purging the stale NVIDIA driver packages on thebigbox, and converting the AT&T DHCP allocation to a real static reservation so the IP doesn't drift on lease renewal. The 8 TB drive cleanup on thebigbox is also on the list, low priority, and I'm not in a hurry to take the risk.

The pattern across all three: the hardware changes were straightforward, the documentation work was the part that actually kept the system maintainable. Every change got a note in the vault the same session it shipped. An agent with stale knowledge of its own infrastructure is worse than no agent.
