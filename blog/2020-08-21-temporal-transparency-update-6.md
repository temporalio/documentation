---
tags:
  - v1
  - community
  - transparency
  - temporal
  - stability
posted_on_: 2020-08-21T00:42:18Z
slug: temporal-transparency-6
title: "Temporal Transparency Update #6"
author: Ryland Goldstein
author_title: Temporals product person
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4
release_version: V0.29.0
---

<!--truncate-->

**Latest Release at Time of Writing:** V0.29.0

It has been two weeks since our [last update](https://docs.temporal.io/blog/temporal-transparency-5) which feels like a year in pandemic/startup time. We've been taking advantage of the time warping to make as much progress as possible on stabilization and the JavaSDK.

Before we get into the stabilization update there are a few other miscellaneous Temporal announcements. In the last month we've had some amazing additions to the Temporal team 🎊. Derek, Manu and Vitaly joined our engineering effort which had a very immediate and positive impact. I'd also like to give a shoutout to Karl who recently joined to lead our recruiting/hiring effort. Karl will enable us to continuously acquire great people as we scale. If you're ever curious about who's on our team, we regularly update [our GitHub page](https://github.com/temporalio/team).

As you may have heard, we are having our second open office hours on Aug 26. We are having the session twice (7am PST and 4:30pm PST) to accommodate users in different time zones. We would love to see you there.

# Update August, 24, 2020

**TL;DR;**

- JavaSDK rewrite is complete and has been fully reviewed
- JavaSDK was released (compatible with server V0.29.0)
- We are now code complete
- The team is completely focused on stabilization, things look positive

## JavaSDK

We expected the JavaSDK to be finished by the code completion deadline (July 31) but the severity of bugs discovered convinced us a delay was the right choice. After further digging it became clear that a complete-rewrite of the underlying state machine backing the SDK was necessary. Once we reached this conclusion, Maxim started putting all his free cycles into refactoring the SDK to meet the quality bar we expect out of all software we release. After a ton of hard work Maxim was able to make the necessary changes and get the code out for review. As you might expect, Maxim codes pretty quickly so reviewing the changes was just as daunting as the work itself. Fortunately team came together and used shared knowledge to thoroughly review the changes without losing too much velocity.

The JavaSDK is now available and code complete. We appreciate everyones patience throughout the process.

## Stabilization

As we've ramped up our stabilization efforts, our perspective on the structure of the work has changed a bit. In the last update Samar described the distinct layers of our stabilization and explained where he expected most time to be spent:

- Deployment Infrastructure
- Scale Testing
- Failure Testing

As of today we are looking at the layers with a slightly different lens:

- Deployment Infrastructure
- Code completion for tests
- Identifying and fixing problems discovered by tests

While deployment infrastructure remains unchanged conceptually, we realized that there was more work than originally expected. The tooling we rely on came into question and we're actively in the process of evaluating our options. To give some more context, Alex was kind enough to write a summary:

"Failure testing is important step of our stabilization process. We need to know how our cluster and workers operate under the pressure of different failures:

- peak CPU and memory usage
- network failures
- other infrastructure failures

We need to ensure that we don't lose any data and that workflows continue to execute when failures are mitigated. We're evaluating [Gremlin](https://www.gremlin.com/) to inject different failures as it is fairly easy to setup, has amazing UI and API access. It also support k8s out of the box which we use for our test environments. This decision is not carved in stone yet, but looks promising. In the near future we should get the initial results of running benchmark tests for the cluster under different failures." - **Alex**

For those who may have been curious about whether the JavaSDK delay would also delay testing on Java, worry not. Once we understood that the SDK needed serious refactoring, we immediately started working on the testing in parallel. This means that the JavaSDK work did not take resources/time away from the stabilization effort. The newly added tests for Java are especially exciting considering that these paths/scenarios have never been tested in the past, and are completely untested in Cadence.

We are very content with our progress over the last few weeks and still are confident in our initial scoping. We've gone "timeline-less" internally so no specifics, but things look positive. As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw)

Forum: [https://community.temporal.io/](https://community.temporal.io/)
