---
tags:
  - Temporal
  - V1Release
posted_on_: 2020-07-10T21:59:30Z
slug: v1-release-premortem
title: V1 Release Premortem
author: Samar Abbas
author_title: Co-founder & CTO
author_image_url: https://avatars2.githubusercontent.com/u/1766515?s=460&u=42e28f95a37b56ef80c55dbaaadd71bf3fc11261&v=4
release_version: v0.26.0
---

<!--truncate-->

We know that the recent delay caused some concern in the community. We empathize entirely and are seriously dedicated to correcting this going forward.

First I want to outline the two main guiding principles which drives most of the release related decisions at Temporal:

1. **Simplify:** Temporal presented us with an opportunity to make product enhancements which significantly simplify the overall experience without needing worrying about backwards compatibility. We front loaded these enhancements as it sets us up for long term success.
2. **Quality:** We know that users rely on Temporal for mission critical parts of their business applications. Since our main value proposition is improved application resiliency, we could not afford to compromise on the quality of our release. If we did, it would completely diminish the core value of the product.

Many factors directly or indirectly contributed to the delay of production ready release for Temporal. I'm going to outline few of the top reasons and how do we plan to address them from now on.

# Uncertainty

When Maxim and I left Uber to start Temporal we had a lot of uncertainty in front of us. There were big open questions about the roadmap, potential collaboration with Uber on Cadence, the business model for the Company, etc. Figuring out a plan during these uncertain first few months took a lot of time and energy. As we talked with our users during this initial phase it became evident that there is one thing which is going in our favor despite all these challenges - an amazing community of Cadence developers who are super excited at the potential of our technology. Once we had this realization everything started to fall in place. Every decision we have made since then is quantified by the value it brings to the community. We chose our first three focus areas explicitly based on the value they would bring to community:

1. Simplify experience of writing applications using Go and Java SDKs
2. gRPC migration for better security and ability to easily provide SDKs in other languages
3. Persistence improvements so we can easily provide bindings to other databases like PostgresSQL in the future

Although we did relatively well to navigate through this period of uncertainty, we made the key mistake of committing to dates without having a clear engineering plan in place. We would frequently communicate release dates to users which were based on the assumption of ideal days. This meant all of our estimates were based on the happy path leaving no room for unknowns.

# Bootstrapping the Company

As first time founders, bootstrapping the company was a huge learning experience for Maxim and I. We knew starting a company would be time consuming, but did not expect the time sink it turned out to be. There is a never ending stream of operational tasks such as:

- Legal processes - setting up a business entity, contracts etc
- Online accounts and services - payroll, benefits etc
- Hiring and Recruiting - hours worth of screenings alone

These tasks ended up eating a lot of our time meaning that we were left with only a fraction of the ideal day for actual release-relevant tasks. After this initial experience, we feel much better calibrated to provide realistic estimates which accounts for the operational overhead of running a startup.

9 months after starting Temporal I now have lot more appreciation for founders who leave their day jobs to start this crazy journey. I feel so blessed to have access to some amazing folks in the industry who provided great support and advice to help us through these growing pains.

# Recruiting

If I have to pick one thing we grossly underestimated the most, it has to be the time and energy spent on recruiting. Recruiting top tier talent for early stage startup itself is a daunting task which COVID-19 only worsened. Revamping our full-loop process so we could hire engineers virtually was quite challenging. The fun doesn't stop once we hire someone either. Ramping up new hires remotely on a product like Temporal was interesting... I really miss the days when we had whiteboard discussions.

I'm so glad that we spent the necessary time on recruiting and were able to grow Temporal into a now 10 person company. This is definitely the most satisfying part of the journey so far - to be able to build a team of such amazing folks who share the same passion in bringing the power of Temporal to rest of the World.

We now have most of the essential founding team in place, which is not only key to having a great quality release of the product but also the ability to improve and support post release.

# Looking Forward

A key learning from this process is to not treat releases as a binary milestone. Going forward we will be providing much more context on key milestones for releases:

1. Clearly define the scope for a milestone
2. Provide visibility into all the work which goes into achieving goals for the milestone
3. Report progress to community
