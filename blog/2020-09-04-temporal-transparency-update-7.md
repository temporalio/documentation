---
tags:
  - v1
  - community
  - transparency
  - temporal
  - stability
posted_on_: 2020-09-04T00:42:18Z
slug: temporal-transparency-7
title: "Temporal Transparency Update #7"
author: Ryland Goldstein
author_title: Temporals product person
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4
release_version: V0.29.0
---

<!--truncate-->

**Latest Release at Time of Writing:** V0.29.0

Hey Temporal community, hope everyone is having a fantastic Friday. In our [previous update](https://docs.temporal.io/blog/temporal-transparency-6) we announced code completion for JavaSDK which also meant reaching the V1 code complete milestone. Now that we're code complete, this update will focus exclusively on the stabilization progress we made and what is on our plate looking forward.

Last week we had our second open office hours which was a huge success. The support from the community was humbling and there were some awesome questions about Temporal. We had some technical difficulties in the evening session, but they have been identified and will be avoided in the future. The session was recorded and will be available on YouTube shortly. Lastly, we plan to continue doing these sessions so if there are topics you would like to see covered in the future, please respond to this topic:
[https://community.temporal.io/t/what-sessions-do-you-want-to-see-at-the-next-open-office-hours/243](https://community.temporal.io/t/what-sessions-do-you-want-to-see-at-the-next-open-office-hours/243)

# Update September, 4, 2020

**TL;DR;**

- Deployment infrastructure continuously being improved
- Scale testing scenarios implementations nearly complete
- Initial work for fault-injection testing is done
- Still in discovery phase for issues caused by tests, number of discovered issues is decreasing

Two weeks ago we reached code completion across our components and all engineering efforts shifted to stabilization. In the last update we laid out a framework for the stabilization effort that divided the work into 3 buckets: Deployment infrastructure, Code completion for tests, and Identifying problems discovered by tests.

### Deployment infrastructure

Over the last sprint we made a choice to slightly de-prioritize our deployment infrastructure work. We believe in building things that scale and avoiding unnecessary repetition but sometimes those goals aren't practical in the short term. It became clear that while improving our deployment infrastructure would have a positive impact on our long-term testing story, it also reduce our immediate velocity.

With that in mind, there was still some serious investment made into our deployment infrastructure over the last week. The team has been working on a dedicated Cassandra cluster and made significant progress. We also changed our Helm charts to isolate Cassandra nodes from Temporal server which leads to more realistic and practical perf testing.

### Code completion for tests

We are not yet code complete for our V1 stabilization tests but we have made serious progress in this area:

- Bench scenarios (non-failure) are almost entirely implemented and should be code complete soon. We plan on starting some long-running bench testing over the week which should give us key indicators about the systems performance.
- Initial failure scenarios are done but there is a considerable amount of outstanding work required to solidify the processes. The scenarios have not been integrated with Gremlin and are currently driven by bash and kubectl.
- We've validated a few scenarios which involve taking down different Temporal components during long running tests and then resuming them. Validation is achieved by tracking running workflows and ensuring they successfully finish.
- Backlog scenarios are still being developed.

### Identifying problems discovered by tests

The outcome of all testing and stabilization work is to identify and fix bugs that are lurking in the system. The good news is that the number of new bugs we are discovering has consistently decreased since we started our stabilization effort. While new bugs are still being found, there are less and less popping up each day. This is our key indicator of stabilization success and things are looking positive.

If you're interested in learning more about our stabilization effort and a deeper dive into the specific tests/scenarios, [Manu](https://github.com/temporalio/team) plans to publish a blog post in the near future covering this topic. We are still quite confident in our internal timeline and things look positive. Expect a Temporal release coming to a store near you in the not-so-distant future. In the meantime, have a great weekend (3 whole days for Americans) and stay safe out there!

As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw)

Forum: [https://community.temporal.io/](https://community.temporal.io/)
