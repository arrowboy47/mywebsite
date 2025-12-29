---
title: Kobo Ereader dashboard
date: 2025-12-23
description: How I modified a koreader dashboard project to personalize it to me
---
The idea for this project started when I was looking on **Pinterest** and saw one of those **Eink display** dashboards that tend to show people’s home devices, weather, and stuff like this. 

A lot of these devices are **really expensive** so I was hoping that I could repurpose my **Kobo Sage** E reader into a temporary dashboard that I could have sit on my desk while I am working and just show me some basic reminders. 


I found a project on [GitHub](https://github.com/paulakfleck/kobo-dashboard) that accomplished this goal, to my best understanding, through making a **website** run in a **docker container**, which would take **a screenshot of the website** on a user defined interval and share that image through the **opened port 3333**. 

Given that it was just a website being displayed, I decided to **fork the repository and customize it** to my liking. I added a few of my Google calendars, A sunrise sunset and moon phase tracker, my 2026 goals for the year, and a few images that refresh on the user defined interval. 

I finally got **a server** from rack nerd Where I could easily host this website and never have to run the container from my laptop and constantly update IP address addresses for each new network I go onto in The config file. 

Here is my finalized dashboard (there are still some tweaks to be made but you can view it [here](http://104.168.7.21:3333/today.png) if you want to check it out and if you have any suggestions email me or open a report on my [repo](https://github.com/arrowboy47/kobo-dashboard)