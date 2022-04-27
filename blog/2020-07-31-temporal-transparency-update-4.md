---
tags:
- v1
- community
- transparency
posted_on_: 2020-07-31T00:15:40Z
slug: transparency-update-4
title: 'Temporal Transparency Update #4'
author: Ryland Goldstein
author_title: Temporals product person
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4
release_version: V0.28.0

---

<!--truncate-->

**Latest Release at Time of Writing:** V0.28.0

It's been a productive week for Temporal and I hope the same is true for all of you in the community. I'm excited to share the progress we've made towards V1.

## Update July, 31, 2020

**TL;DR;**

- We are now code complete for Temporal server and GoSDK.
- There are some unexpected blockers that will delay JavaSDK until next week.
- No more breaking API /code changes for the server or GoSDK. All major changes will be backwards compatible moving forward.
- We will eventually release a deprecation schedule/agenda for features
- All focus has now been shifted to stabilization and JavaSDK
- Only once we're confident in V1 stability will we encourage production usage
- After V1 is stable, no more breaking schema changes
- THIS IS NOT A PRODUCTION RELEASE!

We are now code complete for Temporal server and GoSDK. If you're interested in what has changed since Temporal was forked from Cadence, our awesome new technical writer/information architect Cully prepared a [change log](https://docs.temporal.io/blog/temporal-v0.28.0-changelog).

We were not able to get the final JavaSDK changes in before code completion, so we've made the decision to delay this specific work until next week. While this isn't optimal, we assumed that users would appreciate having access to the major components today as opposed to blocking everything until the JavaSDK is ready. Now that we are code complete for Temporal server and GoSDK, it means that there will be no more backwards incompatible API or code changes for those components moving forward. Any drastic changes made in the future will be made in a compatible way and put behind a deprecation schedule. Here is the state of our pipeline:

![](/cms/cc-cicd.png)

With the majority of changes for V1 in, we have shifted all of our focus onto stabilization. We have been ramping up our stabilization process in parallel to our code completion efforts, so we're already moving with significant momentum. As stated in previous updates, we do not feel comfortable giving out a hard date for stabilization. This is not because we lack confidence in our estimates or don't understand the scope of work. This choice was made because reliability is foundational for our product and business, and we will always opt for reliability over velocity. While we do not expect to encounter any critical bugs moving forward, should we discover them, we won't release until they are fixed. If this happens, there is a small chance that we will have to make breaking schema changes before the official V1 release. Again, this is not expected but we want to make it 100% clear that it's not impossible. We will announce our production ready V1 release when stabilization is complete. After the V1 production release, there will be no more breaking schema changes.

Next Friday we will share our testing and validation plan for V1. The plan should make it much clearer what we inexpect from the stabilization effort. We will continue posting weekly stabilization updates until we reach a production V1 release. Post-V1 we will continue releasing transparency updates, but will be moving to a bi-weekly schedule.

Everyone in the team put in a ton of extra effort over the last few weeks so we could meet the deadline. I'm personally so grateful to be working with such a dedicated and intelligent group. As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw)

Forum: [https://community.temporal.io/](https://community.temporal.io/)
