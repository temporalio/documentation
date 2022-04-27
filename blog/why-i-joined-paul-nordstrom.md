---
slug: paul-nordstrom-why-i-joined
title: Why I joined Temporal
author: Paul Nordstrom
author_title: Software Engineer
author_image_url: https://avatars.githubusercontent.com/u/85532575?v=4
tags:
  - reflections
date: 2022-3-15T00:00:00Z
---

<!-- truncate -->

Like many engineers (I think), I have wondered if the heyday of Internet engineering was over.
I’m not suggesting that there isn't plenty of work left to be done... really, we haven't scratched the surface of what software can do for society (unfortunately both harm and good).
But while systems architecture has evolved over the past 10 years, I believe most of the change has been "solidification" of existing techniques, along with a vast migration to Cloud and Open Source that has made things more democratic.
In other words, advances in the past 10 years have been incremental rather than fundamental.

As for me: I’ve helped build some of the larger pieces of the internet. I was the lead engineer on Amazon's V2 website architecture (Gurupa), and was also the TL on a significant piece of Google's computational infrastructure called Millwheel, along with quite a long list of smaller projects.
For perspective, at one point I had checked in more code to Amazon's codebase than any other single engineer.
I would say I did a fair job of choosing my first two internet gigs :)

That’s all to say that while I truly love software engineering, I didn't really need another gig, and I certainly wasn't interested in anything less than “world-changing”.
Mostly I was busy studying and exploring ML (which I'm certain _will_ change the world) and otherwise enjoying life.
Then I got wind of Temporal.

Having worked directly with Max (Maxim Fateev, one of the two founders of Temporal) at both Amazon and Google, I was well aware of his remarkable technical capabilities.
Long ago at Amazon, I had also taken a stab at building a Workflow processing framework; I bought fully into the potential.
What I had missed was Max’s unique and critical insight: that by making the logical processing deterministic, replay can recreate internal state in such a way that business logic can be written as a simple linear flow that can be made durable across any time period.

This key insight is a thing of absolute beauty.
It enables a developer using Temporal to turn a complicated mess of business logic, timers, retry, error recovery, and persistence calls into a simple and easy-to-understand sequence of instructions that look exactly like the business logic they implement.
Along with the reduced complexity comes the added bonus of a simple scheme for _repairing_ damage done by any bugs that do creep in (not to mention a hugely reduced likelihood of bugs due to the simpler structure of the application). Businesses and developers both value this experience very highly.
It's not just cost savings... in many cases, it's the difference between feasible and infeasible.

Max and Samar's creation is, for me, similar in beauty and power to Euler's equation, or (to draw on more recent advances) the elegance of the "reverse computation" model of a spreadsheet, or the incredible power of the SQL model over the hard-coded data records we used historically.
It didn't take me long to realize that this conceptual advance would change the world... and I believe its potential effect on how we solve business problems will be as large as those two examples.

This motivates me like nothing else does: a chance to help shape a solution to the problems faced by mankind.
At its core, practically everything goal-oriented that needs doing, by man or machine, can be described as a Workflow (which I define as a sequence of steps needed to achieve a goal).
I joined Temporal to be part of building this solution, and I’m writing this blog in pursuit of that goal: in the hope that others with the relevant skills and passion will come across my words and see an opportunity to work on something incredibly meaningful, challenging, rewarding, and valuable, backed by a superb culture.
