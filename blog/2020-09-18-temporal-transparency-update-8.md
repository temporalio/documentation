---
tags:
- v1
- community
- transparency
- stability
- code-first
posted_on_: 2020-09-18T23:06:09Z
slug: temporal-transparency-8
title: 'Temporal Transparency Update #8'
author: Ryland Goldstein
author_title: Temporals product person
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed715│       7f23f51e91a2f4cd2028d606&v=4
release_version: V0.30.0

---

<!--truncate-->

**Latest Release at Time of Writing:** V0.30.0

Hey Temporal community, it's Friday! It's been a long week but the end is almost here, but not before we share some exciting updates about Temporal. We have been heads down and completely focused on stabilization and things are continuing to look positive.

# Update September, 18, 2020

**TL;DR;**

- We are now code complete for stabilization effort
- All tests defined for V1 are now running in the pipeline
- Some parts of the system already stabilized
- Less and less bugs are being found and many identified bugs have been solved
- The following features will be considered _experimental_ for the V1 release
  - Archival
  - Cross data center replication
  - Batch operations (signal, terminate, cancel)
  - Dynamic config
  - Addition, removal and creation of searchable attributes with Elasticsearch
- Confident in our original internal timeline for stabilization

## V1 Stabilization

We are officially code complete for our stabilization effort. This means that all tests which are required for us to be "stable" have been written and are now being run in some shape or form within the pipeline.

![](/cms/screen-shot-2020-09-18-at-2-54-57-pm.png)

Now that we have all the tests required for stabilization, the focus has now become continuously running those tests and identifying issues that pop up. When a new issue is discovered, we add it to a list and triage based on importance. Any issue that we consider even semi-critical is noted as a blocker and must be fixed before we consider that component stable. Through this process we've already successfully stabilized a few parts of the system. Over the next sprint we plan to continue with this approach and identify any remaining issues in non-stable components. I've linked some issues which have been identified and fixed below:

- [Reduce Maximum Page Size when retrieving Workflow Execution History](https://github.com/temporalio/temporal/pull/732)
- [Creating Workflows is unreliable when History Shards have recently moved around the cluster](https://github.com/temporalio/temporal/pull/734)
- [Simultaneous SignalWithStarts for the Same WF ID randomly returns an Internal Server Error](https://github.com/temporalio/temporal/pull/719)

If you're interested in learning more about how we approach stabilization, make sure to read the awesome post from Manu about our testing:

[https://docs.temporal.io/blog/temporal-deep-dive-stress-testing](https://docs.temporal.io/blog/temporal-deep-dive-stress-testing "https://docs.temporal.io/blog/temporal-deep-dive-stress-testing")

## Excluded components from stabilization

Temporal is a critical component for the majority of our users which means that we require a very high level of confidence for anything we classify as "production ready". For a feature or component to be considered production ready, there are a litany of scenarios, tests and validations which must be performed. Even for simple features this can be a significant undertaking as it often requires custom infrastructure and deployment strategies.

When scoping out the V1 stabilization work, we triaged features based on criticality and usage. During our triage we collected a list of features that we felt could be stabilized after the V1 release and would not block the majority of users. We want to stress that these features are in no way "broken" and many users are already relying on them without issue. That being said, these features have not gone through the rigorous set of checks and validations that we require before deeming something "production ready". Moving forward, we will be referring to features that fall into this bucket as "experimental".

With this context, here are the features we consider experimental in the V1 release:

- Archival
- Cross data center replication
- Batch operations (signal, terminate, cancel)
- Dynamic config
- Addition, removal and creation of searchable attributes with Elasticsearch

In general, experimental features will not stay experimental and eventually make their way into production. In the case of the V1 experimental features listed above, we intend to productionize all of them following the initial release. In some cases we may choose to not move a feature forward if demand/value seems low.

## Conclusion

We are feeling confident with our original internal timeline for V1 and believe we will reach it without delay. While we still aren't sharing any dates publicly, expect a stable release in the very near future. In the meantime we dropped a new version of server this week (V0.30.0) so please upgrade if possible. That's it from the Temporal side, have a great weekend everyone!

As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw)

Forum: [https://community.temporal.io/](https://community.temporal.io/ "https://community.temporal.io/")
