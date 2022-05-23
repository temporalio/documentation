---
tags:
- transparency
- temporal
- v1
posted_on_: 2021-07-08T00:02:32Z
slug: temporal-transparency-update-11
title: 'Temporal Transparency Update #11'
author: Ryland Goldstein
author_title: Temporals product person
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4
image: /img/cloud-customers.png
release_version: V1.10.5

---
<!--truncate-->

Latest Release at Time of Writing: V1.10.5

**TL;DR;** 

- Cadence EOL date remains **September 29, 2021**
- Improvements and whimsy for the Temporal landing page
- Cloud adoption continues to grow
- Node.js is imminent. Represents a fundamentally better experience for Temporal
- Custom search attributes redesign

Hey community, things are going very well in the Temporal universe and we've seen huge jumps in open source and cloud adoption. There aren't any fundamentally new announcements in this update, but it should shed light on a lot of high impact efforts that are in flight.

## Cadence support EOL reminder

A few months ago, [we announced the official EOL date for Cadence support](https://docs.temporal.io/blog/cadence-eol-support). That date remains **September 29, 2021** which also marks the 1 year anniversary of Temporal V1 release. Cadence will always be an important part of the Temporal story, we just need to close that chapter out so we can continue fundamentally improving the way applications are built and run. 

If you are still running on Cadence and depend on our team or the support they provide in any way, we highly recommend migrating before the EOL date.

## [Temporal.io](http://temporal.io) updates

When we redesigned the landing page for [Temporal.io](http://temporal.io) the team and company was in a much different place than we are now. Back in September we were fully focused on the V1 release and then immediately switched focus to the funding announcement after the release was out. Hiring was by far the biggest challenge for the company at the time, so with our very limited time we decided to optimize the landing page for hiring. Most of our efforts since then have gone into improving the docs experience.

We are now reprioritizing the landing page to better speak to developers, and apply design polish and whimsy (Konami code anyone?). You can see some of our [design explorations on CodePen](https://codepen.io/collection/oEEVov). Finally, we are opening up the funnnel slightly to let more people [register interest in Temporal Cloud](https://docs.temporal.io/#cloud).

## CLI Improvements

`tctl` is a powerful tool that makes it easy to debug your Temporal applications and even the Temporal server itself. While `tctl` offers a lot of functionality, finding and using that functionality is often a challenge. We've know for a while that the CLI experience needed some love, but we couldn't rationalize prioritizing it throughout the last year. 

Fortunately, we are now in a better place to revisit the original decisions made in the CLI. [Ruslan](https://github.com/feedmeapples) recently decided he would spearhead a collaborative effort to make `tctl` more predictable, friendly and easier to reason about. A ton of scoping has already been done and the changes are currently in the proposal stage. We are now in a place where **we need your input!** These changes will affect everybody and we want to make sure the direction is representative of what our users want. There are a number of open RFCs [in our proposal repo](https://github.com/temporalio/proposals/pulls). Please don't be shy, every piece of feedback in valuable. Here are a few proposals which are worth highlighting. 

- [https://github.com/temporalio/proposals/pull/31](https://github.com/temporalio/proposals/pull/31) - consistent formatting for output (tables, json, cards)
- [https://github.com/temporalio/proposals/pull/26](https://github.com/temporalio/proposals/pull/26) - ability to pipe output to well known tools like `less` and `more`
- [https://github.com/temporalio/proposals/pull/35](https://github.com/temporalio/proposals/pull/35) - customizable timestamp formatting
- [https://github.com/temporalio/proposals/pull/27](https://github.com/temporalio/proposals/pull/27) - (merged) customizable defaults using config file

## Cloud

It's now been almost half a year since we onboarded our first design partner onto the cloud. Since then we've continued to onboard and iterate with our partners which has driven hundreds of improvements to the offering itself. To make things more concrete, here are some high level stats about the cloud:

- 10+ paying customers
- 5 production customers
- 5 deals in flight with publicly traded companies
- 500+ on the waitlist

We are also fortunate to have public cloud customers. Each of these companies is world class at what they do and drive us to make the best developer experience possible.

![cloud-customers](/img/cloud-customers.png)

If you are interested in the cloud, we are still being selective with onboarding but are taking new partners. Please fill out our newly updated cloud survey to help us understand if your use case would be a good fit [https://us17.list-manage.com/survey?u=2334a0f23e55fd1840613755d&id=f1895b6f4a](https://us17.list-manage.com/survey?u=2334a0f23e55fd1840613755d&id=f1895b6f4a).

## Node.js

Temporal's ultimate goal is to make application development fundamentally more accessible to developers of all experience levels and backgrounds. While the current product delivers on that goal well for Golang and Java developers, the majority of developers today are writing JavaScript and Python. It became clear to us that until we  support the core languages that developers rely on, our ability to make application development more accessible was very limited. In other words, in order to make application development more accessible for the broader ecosystem we first need to make Temporal easier to adopt and learn about. Needless to say, accessibility was top of mind when we started thinking about Node.js support.

The Node.js SDK is unlike any other SDK as determinism is guaranteed at the workflow level using V8 isolates. It's also the first SDK built on top of our next generation Rust core. By guaranteeing determinism at the workflow level, we eliminate an entire class of problems that exist with our other SDKs. This significantly reduces the mental overhead of writing and debugging workflows.

The SDK is currently in alpha ([source](https://github.com/temporalio/sdk-typescript), [docs](https://docs.temporal.io/typescript/hello-world/)) but even today it provides a completely unique and incredibly simple Temporal experience. We believe it represents the fundamental direction and level of accessibility Temporal is aiming for in the future. That being said, we are desperately in need of additional feedback, so if you have opinions on JavaScript and/or Temporal please share it with us (and join the #nodejs-sdk channel in Slack). Together we can drastically lower the barrier of entry for building connected applications.

## Visibility

Visibility is one of the most attractive features Temporal offers. It's rightfully attractive as it gives you unrivaled insights into running Temporal applications. Unfortunately the majority of our users are only using a small part of our visibility story. For those who are unaware, there are really two levels of visibility usage within Temporal. The first level works out of the box and automatically creates and updates visibility indices for workflows. This default experience only provides basic indices like `StartTime`, `ExeuctionStatus` etc. 

The second level is what we refer to as "advanced visibility" and enables the use of custom searchable attributes. Custom searchable attributes are user defined indices which can be attached when workflow is started and upserted directly from Temporal workflows. Custom searchable attributes drastically change the way you operate and debug your Temporal application. Unfortunately, the experience of using them has been far from ideal. 

Due to some very hard work by [Alex](https://github.com/alexshtin) on the engineering team, the custom search attributes experience is finally in a place we can be proud of. Instead of requiring users to manually edit Elasticsearch schemas and wade through dynamic config, all you have to do is run a few tctl commands:

```
tctl admin cluster add-search-attributes --name ProductId --type Keyword
tctl admin cluster get-search-attributes
tctl cluster get-search-attributes
```

Our hope is that this opens up the gates to an entire set of users who were previously interested in custom attributes, but couldn't stomach the process of using them. We plan to continue improving the visibility API, but we hope you agree that this is a great start.

## Open office hours

Our first open office hours of 2021 took place last month. We were super excited by the turnout and the amazing questions that users asked during the session. 

import { ResponsivePlayer } from '../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=Qz0LURUyf-w' />

**Our next office hours is Tuesday July 20th, 9am PT**. You can [sign up here to get an invite straight to your calendar](https://lu.ma/temporal).

We have some exciting presentations planned, including our first customer presentation! If there are specific topics or types of content you would like to see, please email `swyx@temporal.io` or [add to this forum thread](https://community.temporal.io/t/what-sessions-do-you-want-to-see-at-the-next-open-office-hours/243/12).

## Conclusion

We're incredibly happy with how the company, team and community have grown in the last year. Our goal is to continue ensuring that Temporal is the best answer for any distributed application, whether that is on the cloud or self-hosted. 

As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](http://temporalio.slack.com/)

Forum: [https://community.temporal.io/](https://community.temporal.io/)
