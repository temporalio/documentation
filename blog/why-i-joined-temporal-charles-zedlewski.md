---
slug: charles-zedlewski-why-i-joined-temporal
title: Why I joined Temporal
author: Charles Zedlewski
author_title: CPO
author_image_url: https://media-exp1.licdn.com/dms/image/C5603AQGgvr2dqvuBsQ/profile-displayphoto-shrink_800_800/0/1610115430759?e=1649894400&v=beta&t=NSeRh4iGGhoNJqRun59E4ZxV5U6BT56zRsBgeVg90Mg
tags:
  - reflections
date: 2022-2-9T00:00:00Z
image: https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Furthur_02.jpg/2880px-Furthur_02.jpg
---

<!-- truncate -->

![Further](https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Furthur_02.jpg/2880px-Furthur_02.jpg)

In the summer of last year I had the good fortune to be offered the chance to join Temporal as the company’s Chief Product Officer.
This was a very easy decision for me but not as obvious to friends and colleagues.
I find this is common with Temporal; at first glance others might find the idea a bit abstruse, but once it clicks in their head, they realize the potential, see how far and wide it will go, and then won’t want to think about anything else.
This post is my attempt to share what clicked for me and why I had no choice but to join Temporal’s co-founders, Maxim and Samar, on this special, quirky bus.

For nearly my entire career, I’ve worked in B2B software; I can’t imagine doing anything else.
Software is an innately creative medium.
If you learn a craft and find the right place to apply it, you can manifest change with your own two hands and play a positive and meaningful role in the march of progress.

I’ve been especially lucky to get to play a role in two category-defining companies that have each left an impact larger than their revenues or market caps.
For 5 years I worked at SAP, relatively late in its life, and then for another 10 years at Cloudera, starting in the very early days before the first shipped product.
Temporal is a marriage of the domains of both companies: transactional applications and distributed open source platforms.

Transactional and business process applications have been the backbone of the global economy for as long as there’s been software.
All of the world’s materials, assets, locations, people, customers, money, and obligations arrive, move, evolve, and depart at the behest of these kinds of applications.
Many of these are packaged applications written by SAP and its successors, and even more of them are bespoke applications written by engineering teams working in companies of all shapes and sizes.

In the past 15 years, the infrastructure for how we run these applications has changed dramatically, and this has transformed how applications are built and architected.
Cloud infrastructure—like containers, kubernetes, and PaaS—have made it easy and inexpensive to build applications from an ever greater number of discrete components.
These cloud architectures have produced all sorts of benefits. Ever-larger engineering teams can now develop & enhance applications with greater agility.
Scaling has become much simpler and less expensive.
Reuse is increasingly common, with developers borrowing from neighboring applications or from commercial APIs that allow teams to efficiently outsource things like messaging, identity, or payment processing.

Of course there’s a catch.
**Cloud architectures have unwittingly turned backend engineers into distributed systems engineers without anyone asking them.**
Distributed applications present a different set of engineering concerns compared to those of a decade ago, and the familiar tools and platforms of the past have few answers.
Thanks to cloud architectures, engineering teams can almost take application deployment, scale, and infrastructure automation for granted.
But for these same applications, failure has become inevitable, and as we add more components and services, the mean time between failures will only decrease.

The more cloud applications built, refactored, or run, the more the hidden costs of being distributed compound.
Engineering teams have been working through familiar stages of grief:

**Denial**: “No problem to see here, we just have to move fast and break things.”

![denial gif](https://c.tenor.com/_OCVuSjrggcAAAAC/chaos-fire.gif)

**Anger**: “This would all go great if the (infrastructure/service/neighboring team) would stop letting us down!”

![anger gif](https://media.giphy.com/media/N5PsztQSjkYMw/giphy.gif)

**Bargaining**: “OK, we should try to rig something up to handle this. I mean, how hard can it be?”

![bargaining gif](https://media.giphy.com/media/mYqaRkXyoGbcY/giphy.gif)

These explanations have not sufficed and the costs are growing.
Intermittent failures cost us in hard dollars with every order that gets dropped or payment that fails to settle.
Engineers pay an equally large cost in productivity as they try to diagnose failures within a constellation of services written in various languages, on disparate infrastructure, each operating and logging differently from the other.

Temporal upends all of this.
Temporal is a new kind of platform. It’s not a database, cache, queue, or a means to run your code.
It’s a runtime for distributed applications that transparently manages their state at any scope and scale.
By externalizing state to a generalized platform like Temporal, application teams get to outsource the majority of cross-cutting concerns presented by cloud applications.
In doing so, applications become:

- **More reliable to run:** Temporal applications fail to execute less often, and when parts of the application do fail, they always recover to a consistent state
- **More productive to enhance:** It’s not uncommon to see examples of engineers implementing a feature in Temporal with 40-60% fewer lines of code than before, as they're outsourcing most of the distributed application concerns to Temporal.
- **Easier to operate:** Temporal helps users see how their production application executes its logic, consolidates errors, and provides simple but powerful mechanisms to make fixes without interrupting the operation of the running application.

During development, the Temporal SDK provides engineers a simple set of primitives native to their preferred language, the most central of which are Workflows.
These primitives can be incorporated selectively or extensively into any kind of stateful application.
The more extensively they’re used, the greater the benefit, because **these primitives enable developers to write durable code**.

At run time, the parts of an application written with Temporal are still just code that now talk periodically to the Temporal Server.
This crucial design point, **“what you write is what you run” means runtimes like Temporal meet engineering teams where they’re at**, whereas most other platforms attempting to solve this problem require engineers to change their process, deployment, tools, or other architectural decisions.

**Commoditize and democratize**

Anticipating and managing failure in applications has traditionally been a sophisticated subject handled by specialized technologists that work with complex niche technologies.
Commonly this involves purchasing two of everything, while opting for every imaginable premium platform feature and splashing out on expensive “bulletproof” infrastructure.
Most companies I’ve met try to organize all of their applications into different criticality buckets in order to parcel out reliability to the most needy.

Prior to 2009, scale was another kind of sophisticated topic handled by specialized practitioners, but Cloudera changed all of that.
Cloudera used open source and no small amount of inspiration from Google to make scale a ubiquitous commodity.
When I joined Cloudera in 2010, “petabyte scale” was synonymous with “exotic gear.”
So exotic that the leading database players referred to petabyte scale organizations as a “club” whose membership list was small enough to fit on a single sheet of paper.
Cloudera lowered the cost of scale by 2 orders of magnitude, and today there are many thousands of companies who run at petabyte scale.
This went on to have a large & positive impact on the world.
Markets and businesses were created, new revenue and cost savings were unearthed, customer careers were made, and sometimes even lives were saved.

In a similar way, **Temporal is using open source and distributed systems to make reliability a ubiquitous commodity at any scale**, and this will have an even more substantial impact than commoditizing scale.
Lowering the human and technical cost of reliability and reparability by orders of magnitude means we will come to expect these characteristics more often and in more places.
Reliability as a commodity will give engineers freedom to take risks, because they can now move fast and not break things.
Engineers building more reliable and repairable software faster will lead to a more automated and productive world.

The software industry has grown by orders of magnitude since when I first graduated college, giving rise to many new software platforms, commonly segmented and specialized for one niche or another.
This made Temporal even more special to me.
A new kind of platform that can offer a significant upgrade to such a universal need as writing and running software applications reliably.
As much as software has eaten the world, it still has the potential to surprise itself with a seminal and broad-based renewal.

Software is still the right industry to develop my craft, and Temporal is the best place to apply it.
Maxim and Samar have manifested a singular vision, and it’s a privilege to help them build a singular company to match.
We aspire to make Temporal responsive to the open source community, informative to prospects, and accountable to customers—and figuring out how to do that is half the fun.
If you’d like to help us do this, I’d love to hear from you.
