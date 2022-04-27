---
tags:
  - v1
  - community
  - workflow
  - stability
  - code-first
posted_on_: 2020-09-29T23:06:09Z
slug: temporal-v1-announcement
title: "Temporal V1 Announcement"
author: Ryland Goldstein
author_title: Temporals product person
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed715│       7f23f51e91a2f4cd2028d606&v=4
release_version: V1.0.0
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<!--truncate-->

**Latest Release at Time of Writing:** v1.0.0

Hey Temporal community, I hope you've got your socks on because this isn't a typical transparency report. I am extremely happy to announce that we have officially reached stability which means that Temporal V1 production release is now available.

This is a huge milestone for the project, community and Temporal as a business. Without our community, Temporal would have never existed. For all of you who have been waiting or blocked by this release, your patience is appreciated. This release served as a learning process for the Temporal team and we hope that it reflects in our future behavior.

<img alt="V1 pipeline" src={useBaseUrl('img/v1-pipeline.png')} />

## What does this mean?

Temporal version 1 is available and ready for production consumption with the caveats covered in our last report (reiterated below). This also means that the system has entered a backwards compatibility era where there will be no more breaking API or schema changes for publicly facing APIs. Note that we will have a deprecation policy (which will be made public in the near future) so we can continue evolving and improving the product.

In this release we improved how shard IDs are hashed. This may cause an elevated rate of errors when upgrading cluster in-place from a previous release. To be 100% clear there is no potential for data loss and this should only happen once. The practical impact is slightly higher resource usage on your cluster until the upgrade is complete.

### What is not included in the release?

When scoping out the V1 stabilization work, we triaged features based on criticality and usage. During our triage we collected a list of features that we felt could be stabilized after the release and would not block the majority of users. We want to stress that these features are in no way "broken" and many users are already relying on them without issue. That being said, these features have not gone through the rigorous set of checks and validations that we require before deeming something "production ready". Moving forward, we will be referring to features that fall into this bucket as "experimental".

With this context, here are the features we consider experimental in this release:

- Archival
- Cross data center replication
- Batch operations (signal, terminate, cancel)
- Dynamic config
- Addition, removal and creation of searchable attributes with Elasticsearch

## What's next?

V1 is just the start of the Temporal story. Moving forward expect to see things like support for new languages, databases and security capabilities. We also plan to ramp up our engagement with users and have regular meetups, conferences and design sessions. On the business side, we are working on a cloud offering which will provide Temporal as a service. Aside from being a reasonably good way to support the company, we strongly believe that the requirement to run Temporal is one of the biggest barriers of adoption today. Having a cloud solution will make it much easier for new users to get started with Temporal and therefore enable us to continue growing this already great community. We still plan to release regular transparency updates but they may not come on such a strict schedule.

### Versioning

We recently made some changes to how our versioning will work moving forward.

1. All validation logic is on the server. Client only sends headers. If header is missing assume that "client doesn't care" and no restriction is applied.
2. Client sends to server following headers:

- `client-name`: one of `temporal-go`, `temporal-java`, `temporal-cli`,
- `client-version`: `1.0.0`,
- `supported-server-versions`: `>=1.0.0 <2.0.0`.

3. Server has `GetClusterInfo` API which returns its version and supported version ranges for every supported client.
4. All old clients and servers are supported because they don't send these headers and fit into "I don't care" category. Moving forward we will be able to restrict old clients and old servers. (edited)

As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw)

Forum: [https://community.temporal.io/](https://community.temporal.io/)
