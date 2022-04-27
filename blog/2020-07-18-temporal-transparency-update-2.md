---
tags:
  - transparency
  - temporal
  - v1
posted_on_: 2020-07-18T00:02:32Z
slug: temporal-transparency-update-2
title: "Temporal Transparency Update #2"
author: Ryland Goldstein
author_title: Temporals product person
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4
release_version: V0.27.0
---

<!--truncate-->

**Latest Release at Time of Writing:** V0.27.0

Hope everyone is having a great Friday. I'm happy to share our second V1 status update as part of our continued effort to be more transparent.

## Update July, 17, 2020

**TL;DR;**

- Code complete date remains unchanged, July 31, 2020
- New tasks were generated from existing GitHub issues (check those out below)
  - [https://github.com/temporalio/temporal/milestone/2](https://github.com/temporalio/temporal/milestone/2 "https://github.com/temporalio/temporal/milestone/2")
  - [https://github.com/temporalio/go-sdk/milestone/1](https://github.com/temporalio/go-sdk/milestone/1 "https://github.com/temporalio/go-sdk/milestone/1")
- Many tasks are in progress and things should start clearing up early next week
- We have begun further prioritizing tasks so we can easily cut less important work as we near code completion

We're continuing to dedicate the majority of our time and energy to V1 code completion. Here are the items which we handled since the last update:

![Completed items this week: 'Go SDK bench core framework changes'; 'Implement Go SDK bench test which reacts on signals'; 'Production build sometimes shows blank page (bug)'; 'Workflows page status dropdown not filtering workflows properly (github #57)'; 'TaskQueues Sharded Correctly'; 'Review github issues and create more stories if needed'; 'Remove EVENT_TYPE_REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_FAILED'; 'Rename DecisionTask and Decision'; 'Cassandra Consistency and SerialConsistency should be configurable'; 'CLI unable to show describe workflow output when it has heartbeat data'](/cms/dsadsd.png)

While we did make serious progress on our previously defined tasks, we also ended up adding a considerable number of new items:

![Several dozen issues either backlogged, ready for development, or in development](/cms/screen-shot-2020-07-17-at-4-37-37-pm.png)

New items are the result of us triaging open issues in our public GitHub repos earlier in the week. While we didn't expect to have any additional items added before code completion, we're happy that they are now being tracked. To make it easier to track publicly, we've created a few GitHub project milestones with all of the newly discovered work:

- [https://github.com/temporalio/temporal/milestone/2](https://github.com/temporalio/temporal/milestone/2 "https://github.com/temporalio/temporal/milestone/2")
- [https://github.com/temporalio/go-sdk/milestone/1](https://github.com/temporalio/go-sdk/milestone/1 "https://github.com/temporalio/go-sdk/milestone/1")

We are very set on sticking with the date we initially defined for code completion (July 31, 2020). This means we will realistically end up cutting many items as we get closer to the deadline. Samar and I have begun to prioritize the remaining work, so we can cut intelligently when the time comes. Our belief is that a large number of in-progress items will be completed this week, which should result in a much more appealing status update next week.

I hope this sheds some light on what is going on internally. As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw)

Forum: [https://community.temporal.io/](https://community.temporal.io/ "https://community.temporal.io/")
