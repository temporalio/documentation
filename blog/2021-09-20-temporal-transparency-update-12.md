---
tags:
  - transparency
  - temporal
  - v1
posted_on_: 2021-09-20T00:02:32Z
slug: temporal-transparency-update-12
title: "Temporal Transparency Update #12"
author: Ryland Goldstein
author_title: Temporals product person
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4
image: /img/cloud-customers.png
release_version: V1.12.1
---

<!--truncate-->

Latest Release at Time of Writing: V1.12.1

> Note: please remember to keep your Temporal version up to date!

**TL;DR;**

- Cadence support EOL date remains **September 29, 2021**
- Node.js final stages before beta
- UI update, nearing early alpha
- Visibility improvements now available
- We are giving two talks at Kubecon, have a booth and throwing an afterparty
- Temporal meetups now have a set pace, next week very special guest

Hey everyone, it's been a while and I hope things are well. There has been immense growth in our community since our last update which couldn't make us happier. Over the last few months we've stayed pretty quiet and have been heads down and focused on improving the product. This post will cover some highlights of that work.

## Cadence support EOL reminder

It has now been 6 months since, [we announced the official EOL date for Cadence support](https://docs.temporal.io/blog/cadence-eol-support). That date remains **September 29, 2021**, less than two weeks away. This date marks the 1 year anniversary of Temporal V1 release. We cannot overstate how much appreciation we have for the Cadence project and team. We believe this is the right move which will allow Temporal to focus on the future, instead of worrying about the past.

If you are still running on Cadence and depend on our team or the support they provide in any way, we highly recommend migrating before the EOL date.

## Kubecon

Kubecon is coming and 2021 will be the first year where Temporal has an official presence. We are engaged with Kubecon in a few ways:

1. Our own [Dominik Tornow](https://www.linkedin.com/in/dtornow/) is giving a talk with our partners at [Chronosphere](https://chronosphere.io/) about Chronospheres Temporal usage in conjunction with Kubernetes. The talk focuses on the difficulties of dealing with stateful operations within Kubernetes operators, and how Temporal can supplement Kubernetes to provide a good stateful and stateless experience.
2. Our awesome Developer Advocate [Tihomir Surdilovic](https://www.linkedin.com/in/tihomir-surdilovic-5641361/) is the owner and author of the [CNCF Serverless Workflow Spec](https://serverlessworkflow.io/) which he has talk about. The twist is that this is still a Temporal talk. Tihomir recently spent the time to write a [Temporal sample](https://github.com/temporalio/samples-java/tree/master/src/main/java/io/temporal/samples/dsl) which can run the minimum specification for Serverless Workflows. His talk will partially focus on why Temporal is the best foundation for almost any DSL solution.
3. We have a booth this year in the startup hall. Quite a few members of our team will be there to answer questions and engage with attendees. Please stop by for some free swag and Temporal related conversation.
4. We are now CNCF Sponsors and welcome ideas and invitations to talk about how Temporal can work with other CNCF ecosystem projects.
5. Last but not least, we will be hosting an afterparty for Kubecon. Details below:

   **Location**: JW Marriott / The Mixing Room patio

   **Date**: Wednesday, October 13th

   **Time**: 5pm-7pm

   **Covid guidelines**: Masks only required inside. No masks required on outdoor patio.

   **To enter**: Attendees will walk through hotel Lobby towards LA LIVE Campus and enter from outside to access patio

We're excited to have in-person presence at such a great conference. We really hope to see you there!

## Visibility

In the last update, we gave an overview of the exciting changes to our Visibility API that were nearing completion. Immense progress was made on this front and the improvements are available in the latest releases. The primary goal of the redesign was to simplify the configuration and usage of search attributes, as opposed to expanding the functionality. Our Visibility API already provides an immense amount of value, it's just that very few used it due to the barrier of entry. We believe these updates change that storym making our Visibility functionality a joy to use. Here are some specific highlights:

- Improved query language for advanced visibility: ExecutionStatus is of string type, IS NULL support for missing search attributes.
- New system search attributes for advanced visibility: HistoryLength, StateTransisionCount, ExecutionDuration.
- Cleaner Elasticsearch index schema.
- Improved operational support: more metrics, better logs.

## UI update

_This section was guest written by our Front-End Architect, [Steve Kinney](https://www.linkedin.com/in/stevekinney/)_

**TL;DR;** “We went from nothing to almost a full something.”

In the beginning of July, we started work on a new user interface distinct to Temporal. The new UI addresses many of the complaints that customers have about the current interface from Cadance and also sets us up to deliver features unique to Temporal Cloud. We outlined the MVP set of features and initial architecture. We built many of the core features in under three months and are preparing to go into an internal alpha in the next few weeks. The UI and Cloud teams have collaborated and drafted out an initial roadmap for delivering self-serve admin features in Q4 and the UI is on track to deliver those features.

## TypeScript SDK

_This section was guest written by our Head of Developer Experience, Shawn Wang_

The TypeScript SDK is nearly ready, on track for a public beta launch in October/November.

- We have pushed through a final API redesign based on community feedback. The latest API is inspired by React, with Workflows comparable to React Components.
- Major missing features have been implemented, including a new `patched` API for migrating Workflows (replacing the legacy versioning process), Child Workflows, Signals, and Continue As New.
- We are laying the groundwork for a major public push. Next.js, the most popular React framework, now has [a Temporal example](https://github.com/vercel/next.js/tree/canary/examples/with-temporal) (thanks to Loren), Val is on the blog and swyx is ramping up mentions on [podcasts](https://www.youtube.com/watch?v=H3h1WICelqs) and upcoming [conferences](https://reactnewyork.com/).
- Besides our list of existing Temporal users like Descript, we are already getting inbound interest on the SDK from new-to-Temporal startups from Vercel to Stately.

## Meetup

We've landed on a consistent pace for our Meetup events and the format and content improves with each session. In the last few sessions, we've been fortunate enough to have members of our community present alongside our team members. This makes us super happy as we see Meetups as a platform for the community more than for our company. If you have any interest in presenting something Temporal related at a future meetup, please reach out (ryland@temporal.io, swyx@temporal.io).

If you haven't already signed up, [here is the Luma link](http://temporal.io/meetup) that will keep you updated for each of these monthly events. Worry not, if you miss a session they can be watched later on our Youtube channel. Here is a [link to the playlist](https://www.youtube.com/watch?v=gWjtjRavqWU&list=PLl9kRkvFJrlSM-s-s-8WbgjN-R3Y4L7WG).

We have a session next Tuesday 09/28/2021 at 9am PST. For those of you who are eagerly waiting, here is a sneak peak of the agenda (subject to change):

1. Talk about Server Workflow Spec and Temporal. This session will be especially great for those who can't watch the Kubecon talk Tiho gives.
2. An update on the NodeJS SDK and the outline for our release plans.
3. A very special guest who has quite the interesting presentation about how they use Temporal.

## Conclusion

In the last months we have seen huge growth on the community, team and product front. We are so grateful for the amazing community that makes this possible, the awesome team which has formed around the product and all the other people who support our journey.

As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](http://temporalio.slack.com/)

Forum: [https://community.temporal.io/](https://community.temporal.io/)

Join the Cloud waitlist!: [temporal.io/subscribe](https://temporal.io/cloud)

Find an awesome job where you can use Temporal. Work for great companies like Wellhive and Descript: https://temporal.io/careers#external-jobs
