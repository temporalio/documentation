---
tags:
  - v1
  - Temporal
  - microservice-orchestration
  - microservices
  - cloud
  - eol
  - bug
posted_on_: 2021-04-01T00:00:09Z
slug: cadence-eol-support
title: 'Announcing EOL support for Cadence'
author: Ryland Goldstein
author_title: Head of Product (and some other stuff)
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4
release_version: V1.8.1
---

<!--truncate-->
**This is not april fools related** 

In the last year, Temporal has transformed from the wild dream of two Uber engineers, to a real business, community and product. In March 2020 there was no V1 release, no gRPC/PostgreSQL support, no authentication or authorization and Kafka was still a core dependency. Today things look a lot different. An amazing community formed around the project, we've validated our cloud strategy with paying customers and delivered a ton of critical features to the open source technology. 

Every day Temporal feels more and more like its own entity, and less and less like a transformation of Cadence. This is not just ideological, at the code level there are constantly new differences introduced in both projects. For some critical changes it may be feasible to remain compatible, but in most cases it's just too much overhead. At a support level, the cost is also increasing. It's become harder and harder for our team to support Cadence users. When new employees join Temporal should they be expected to also ramp up on Cadence?

The most compelling factor is reliability. As a company and team we pride ourselves on providing one of the most reliable experiences available. The question that is now being asked internally is, "how we can provide this reliability for a project we have no control over?". As an example, we recently put out guidelines regarding how long we support older versions of Temporal. This is something we have no control over for Cadence and is impossible to enforce. This means that when Cadence users reach out they could be running the Cadence 1.0.0 or their own custom fork. 

Cadence will always be an important part of our history. Today it is more than history, it requires time, energy and resources which we unfortunately cannot continue to spare. For this reason, we are announcing **end of life support for Cadence** users. The final day of support will be the anniversary of Temporal's first production release September 29. 

## What does this mean?

For the last year we have been happy to provide free support to Cadence users. After **September 29th 2021**, we will no longer be providing support for any version of Cadence. While we understand that it may be difficult for some Cadence users to find time to migrate, we feel that 1 year is a reasonable amount of time for us to provide support for a project which we are not the owners of.  

## "Questions to get ahead of"

### Why not work with Cadence to create a common core?

While this is something which was initially considered, the pace and direction of the projects have diverged enough to raise serious doubts about its value. Cadence is a wonderful project with a great team but they serve the needs of Uber. At Temporal we are fully focused on the core technology and all of the ways we can improve it to make developers lives better. There are also already fundamental differences at a code level which prevent compatibility. 

### What is the process of migrating to Temporal?

As of today there is no automatic process to migrate. The fundamental design of your application will generally remain the same, but specific API calls and values you provide them will need to be updated. We've created a page on our docs which details the majority of changes between Temporal and Cadence. If there is something missing from this list we would love to know: [https://docs.temporal.io/cadence-to-temporal](https://docs.temporal.io/cadence-to-temporal)

We know migrating away from a critical dependency like Cadence can be daunting. We are also available to help with your specific migration process. Please feel free to post on our forums or contact us directly!

### Is it possible to migrate live traffic from Cadence to Temporal?

At this time it is not possible to migrate live traffic from Cadence to Temporal. There are some unofficial efforts to build connectors or compatibility layers but nothing concrete as of today.

### Will you still provide support for migration from Cadence?

Yes, we will always be happy to work with users who are interested in moving to Temporal. What will change is the level of specific support we provide for Cadence in that context.  

### Will the Cadence team _____?

We are not the Cadence team and unfortunately cannot speak to anything they will or will not do.


As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](http://temporalio.slack.com/)

Forum: [https://community.temporal.io/](https://community.temporal.io/)
