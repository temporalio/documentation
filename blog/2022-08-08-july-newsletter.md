---
tags:
  - temporal
  - newsletter
posted_on_: 2022-08-08T00:00:00Z
slug: july-newsletter
title: 'Temporal Community Newsletter: July 2022'
author: Charles Zedlewski
author_title: CPO
author_image_url: /img/people/charles.jpg
---

> This newsletter was sent on July 29. [Subscribe](https://temporal.us17.list-manage.com/subscribe/post?u=2334a0f23e55fd1840613755d&id=3475f910fc) to receive future newsletters in your inbox.

This month's newsletter features some exciting news and updates, including:

*   Our Typescript SDK v1.0.0 is now available! [Read more in this blog post ›](https://docs.temporal.io/blog/typescript-1.0.0)
*   [Replay](https://temporal.io/replay), Temporal's first-ever developer experience conference, is next month! Join us on August 26 in Seattle for talks from Temporal users at companies like Stripe, Datadog, Snap Inc, and Yum! Brands.

For more information on what we've been working on, just keep reading! And as always, we'd love to hear from you—feel free to share feedback in our [Community Slack group](https://temporal.io/slack), or on Twitter ([@temporalio](https://twitter.com/temporalio)), or simply reply to this message.

<!--truncate-->

Technology
----------

### Developer Experience

**TypeScript GA**: We are incredibly excited to announce that our TypeScript SDK is officially GA. This SDK has been a labor of love and a long time coming. It boasts an absolutely killer developer experience, powered by V8 isolation technology. We believe the TypeScript SDK represents the fundamental direction all of our future SDKs will go.

[Typescript SDK ›](https://github.com/temporalio/sdk-typescript)

[Typescript SDK test framework ›](https://docs.temporal.io/typescript/testing/)

**Web UI V2 GA:** Although the core technology of Temporal is a true game-changer, capitalizing on that value would be nearly impossible without high quality tools to support it. A year ago we took a hard look at our existing UI experience and realized it was holding the overall product back. Since then, we hired amazing Frontend and Design teams who have diligently worked to match our UI quality to what you've come to expect from Temporal. We are incredibly excited to announce that the experience is now GA! If you haven't already made the switch, we highly encourage it.

As part of this release, we are also planning to deprecate our previous Web UI. The timeline for that deprecation is **September 30, 2022**. That means you have a little over two months to switch to the new Temporal UI.

**Python Alpha:** Earlier this year we started developing a [Python SDK](https://github.com/temporalio/sdk-python) for Temporal. The team has been hard at work and immense progress has been made. It will still take a while before we can seriously target a GA release but the Alpha client is surprisingly full featured. We want to be incredibly clear that any Alpha/Beta release should not be used for critical workloads. That being said, we can never get too much community feedback about the SDK experience.

**Spring Boot Alpha support:** For those who are embedded in the Java ecosystem, developing applications without Spring Boot is almost absurd. That's why it's a little strange that Temporal's Java SDK has never had official bindings for the Spring ecosystem. We're serious about changing that, and this Alpha release is the first step in the right direction. [PR #1305 ›](https://github.com/temporalio/sdk-java/pull/1305)

**tctl V2 GA:** In the developer world there are really two groups, "UI people" and "command line people." We want to make sure the experience is equally great regardless of your tooling preference, so the team has been hard at work revamping the Temporal command-line tool `tctl`. The goal was to keep the experience familiar while removing the inconsistent developer experience, rough edges, and missing functionality. `tctl` V2 is now GA and will become the default in the next release.

As part of this release, we are also planning to deprecate `tctl` V1. The timeline for that deprecation is **September 30, 2022**. That means you have a little over two months to switch to the new `tctl`.

**Schedules Beta:** Cron jobs are everywhere and running them may seem simple on the surface, doing so reliably is much easier said than done. Fortunately, Temporal is designed for running time based workloads reliably at any scale. Unfortunately, our current cron experience leaves…well, a lot to be desired. The functionality is limited, the experience is confusing, and debugging things when they go wrong is seriously unpleasant. Due to these shortcomings, the team has poured their hearts into a fundamentally new experience. The improvements are so significant that we are even renaming the feature to Schedules. Schedules offer all the capabilities of the original cron functionality, but are also:

*   Easy to use
*   Straightforward to debug
*   Functionally rich
*   Fully extensible

We don't have a concrete timeline for GA of this feature, but we need **your** feedback. We encourage you to grab the latest server and tctl release and give the new experience a spin.

### See also

*   Eager activity dispatch for Python, TypeScript, and Go
*   Started development of a [Ruby SDK](https://github.com/temporalio/sdk-ruby)
*   [Local activities](https://docs.temporal.io/php/activities#local-activity) are available in the PHP SDK
*   Go SDK [v1.15.0](https://github.com/temporalio/sdk-go/releases/tag/v1.15.0) released
*   Java SDK [v1.14.0](https://github.com/temporalio/sdk-java/releases/tag/v1.14.0) released
*   Workflow deletion is available as a `tctl` command that does not require direct DB access from `tctl`
*   Namespace deletion is also now available as a `tctl` command
*   Host-level priority Task processing

Content and Community
---------------------

**Support team growth:** As many of you know, we take support seriously at Temporal. Historically the support workload has been carried by members of various engineering and product teams within the company. Recently, we’ve formalized this area of work and established an official support team. Until last month Tihomir (whom many of you recognize as your go-to resource for support questions, was our sole member of this team. We are incredibly excited to welcome two new support team members Antonio Mendoza and Jordan Reynolds. Antonio and Jordan both bring an intense passion for technology and helping others. They will be key in scaling the response and high-quality support we provide.

**Community knowledge base:** Temporal offers a few options when it comes to learning more or getting your questions answered. We have our support forum for standard Q&A, Slack for community engagement, and docs for establishing foundational product knowledge. In general we are very happy with these solutions, but recently we felt that some classes of questions that aren’t being well addressed. In an attempt to solve for this class of questions, we are experimenting with adding a knowledge base to our community support forum ([community.temporal.io](https://community.temporal.io/)). Our hope is that this knowledge base will surface a set of information that is not covered by the docs or easily discoverable on the support forums. We are especially interested in hearing your feedback on this one!

**Python in the Application development guide:** A few months ago we released a new style of product documentation that aimed to provide a cohesive narrative instead of “requiring assembly.” So far this new approach has been well received and therefore we are confident to continue in this direction. Considering the immense progress we have made in developing the Python SDK, adding Python to the app dev guide seemed like a no-brainer. The content isn’t fully complete, but most of the Foundational section has been updated to include Python at this point. [Python in the Application development guide ›](https://docs.temporal.io/application-development/?lang=python)

**Observability section of Application development guide:** In addition to supporting new languages for existing App dev guide content, we are also adding net new information to help guide your development journey. The guide now has a section about [observability](https://docs.temporal.io/application-development/observability/), which continues to be one of the most requested topic areas in Temporal.

**New home for tutorials:** Historically all learning content has lived on [docs.temporal.io](https://docs.temporal.io). But with the founding of our Education team earlier this year, the landscape is changing. Moving forward, learning content will be available over at [learn.temporal.io](https://learn.temporal.io), and the majority of our existing learning content has already been migrated. For now, the migrated content makes up the entirety of the learning site, but that won’t be the case for long. Stay tuned for some very exciting educational updates coming from the team!

### See also

*   Check out our new [Community Ask and Learn](https://www.youtube.com/playlist?list=PLl9kRkvFJrlRh_OrohmwIvE8OsXSsi7QV) video series
*   [Temporal Cloud release notes](https://docs.temporal.io/cloud/release-notes/) are now available
*   [Experimental Schedule feature documentation](https://docs.temporal.io/workflows#schedules) is now available
*   Last call for feedback on our [quarterly docs survey](https://forms.gle/VWgQdPbV5qa8zJVBA)
*   \[Video\] [Temporal Explained: Idempotence](https://www.youtube.com/watch?v=JpBNKuYMB10)
*   \[Video\] [Temporal Flagship Community Meetup - June 2022](https://www.youtube.com/watch?v=yPZK82Kwe3o)

Community Spotlight
-------------------

Very few things that make us more excited than seeing community-created Temporal content, which is why we're so excited about this:

[Write your first Temporal workflow in Typescript ›](https://www.bitovi.com/blog/write-your-first-temporal-workflow-in-typescript)

We missed this when it was originally published, but fortunately it was recently shared with the team and it made our collective day. In this post about developing Workflows in TypeScript, Michael Haynie does an outstanding job of presenting a practical and digestible path for getting started with Temporal. If you've been waiting for that extra push to get started with our now-GA TypeScript SDK, wait no longer. Posts like these are what make our community so great and we would love to see more! The team is always happy to support content creators, so if you're looking for technical feedback, or a spelling check, or you're just feeling a bit anxious about putting something out there, you're not alone.

### Twitter thread of the month

[![Dominik tweet: Are compensating actions a defining component of sagas or a frequent but non-defining component of sagas?! Well ............ What even are compensating actions?!?!](https://pages.temporal.io/rs/250-WIU-007/images/dominik-tornow-saga-showdown.png)](https://twitter.com/DominikTornow/status/1547685647975997440)

Check out [@DominikTornow](https://twitter.com/DominikTornow/status/1547685647975997440) on "The Saga Showdown."
