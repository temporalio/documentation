---
tags:
- v1
- community
- transparency
- temporal
- stability
posted_on_: 2020-08-08T00:42:18Z
slug: temporal-transparency-5
title: 'Temporal Transparency Update #5'
author: Ryland Goldstein
author_title: Temporals product person
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4
release_version: V0.28.0

---

<!--truncate-->

**Latest Release at Time of Writing:** V0.28.0

This was a crazy week for us in a good way. We harnessed the momentum of our code completion efforts to stay extra focused on our next steps. In this update we're going to talk about the JavaSDK, stabilization, and more.

# Update August, 7, 2020

**TL;DR;**

- JavaSDK bugs were addressed and a PR is out
- JavaSDK will be considered code complete after it has been reviewed
- [Once JavaSDK PR is in, we will be fully code complete](https://github.com/temporalio/java-sdk/pull/172)
- Almost all internal cycles have shifted to stabilization
- No timeline, but plan outlines what work is remaining
- We will continue updating regarding stabilization status until we reach the production V1 release

## JavaSDK

As we mentioned last week, there were some bugs in the JavaSDK that only Maxim had the domain understanding to address efficiently. Maxim worked even harder than usual this week to ensure he could fix these issues. In the process of fixing the original problems it became clear that a massive refactor was needed. That refactoring work was completed in the last few days and is now in the review stage. If anyone is interested in the PR and/or wants to give feedback, it's available here:

[https://github.com/temporalio/java-sdk/pull/172](https://github.com/temporalio/java-sdk/pull/172 "https://github.com/temporalio/java-sdk/pull/172")

We plan to update the community once this PR has been merged and the SDK is available. Closing this PR is also the last component required for us to be code complete across all services and components.

## Stabilization

_Samar was kind enough to guest write this section and share our perspective_

It was an amazing effort by the team to finish all tasks for us to hit code complete for both Temporal Server and Go SDK last week. This brings clarity to our future updates and greatly simplifies adopting new releases from Temporal. Here is what users can expect from future releases:

### Backwards Compatibility

We are not planning any breaking API changes for Go SDK or service gRPC definition. Additionally we are going to maintain schema compatibility for Cassandra and MySQL. This means users should be able to adopt future releases during stabilization, without making any changes on their end.

### Stability

Now entire team is focused on hardening the system. During this phase we are making significant investments in the following areas:

1. **Deployment Infrastructure**

   We have made a requirement to automate every new scenario that we add during stabilization. This means we want to have our release process completely automated. We are using Concourse to create fully automated CI/CD pipelines and have already made pretty great progress.
2. **Scale Testing**

   This is where we really push the system hard in various dimensions and make sure it is able to keep up with the load gracefully.
3. **Failure Testing**

   One of the most important areas during stabilization is making sure Temporal server can gracefully recover from various failure situations. Temporal is used in the critical path for many applications at various companies. It is super critical for us to make sure system is resilient to different kind of failures and workflows are able to make forward progress in the presence of failures.

### Quality

As I mentioned in my last post, quality is super critical for us and we take it very seriously. We now have a plan for stabilization in place and will be sharing our progress regularly with the community.

## Moving Forward

This is a great top-down/idealogical understanding of our stabilization process but some of you may want something a bit more practical. On that note, here are the epics we have created for V1 stabilization:

![](/cms/stable.png)

Outside of actively tracking the status of these epics and their underlying tasks, the pipeline is a great way to visualize the progress we're making, as each green item represents a successful check/test:

![](/cms/screen-shot-2020-08-07-at-12-42-33-pm.png)

The team is completely heads down and focused on stabilization efforts so we're hoping things move quickly without hiccups. I do want to reiterate that while we do not expect to find any critical bugs, there is a chance that a critical bug could require breaking schema changes (not API or code). Keep in mind it would require a bug of quite high severity to require changes to the underlying schema. That being said, we strongly recommend **not** using the current release in a production environment.

As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw)

Forum: [https://community.temporal.io/](https://community.temporal.io/ "https://community.temporal.io/")
