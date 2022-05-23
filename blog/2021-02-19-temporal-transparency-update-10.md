---
tags:
  - v1
  - Temporal
  - microservice-orchestration
  - microservices
  - transparency
  - cloud
  - security
  - errors
posted_on_: 2021-02-19T00:00:09Z
slug: temporal-transparency-10
title: 'Temporal Transparency Update #10'
author: Ryland Goldstein
author_title: Head of Product (and some other stuff)
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4
release_version: V1.7.0
---

<!--truncate-->

**Latest Release at Time of Writing:** V1.7.0

Hey there everyone, it's been a while since the last update. Things have been **very** busy at Temporal over the last few months and while I can't share everything yet, there are some nice updates I can share.

## Cassandra persistence issue

Until 1.6.0 there was a bug that only affects users running with Cassandra persistence. We highly recommend that all Temporal-Cassandra users **immediately upgrade** to 1.6.0 (or the updated version of your current major/minor patch) and refrain from making changes to their Cassandra cluster until they’ve upgraded. For more details read:

[https://community.temporal.io/t/important-announcement-for-temporal-cassandra-users/1540](https://community.temporal.io/t/important-announcement-for-temporal-cassandra-users/1540)

We plan to provide a more detailed post-mortem in coming weeks. TL;DR; Golang variable shadowing is no bueno.

## Security

At a product level, security has been a major focus over the last few months. Security features have been requested for some time, but they were always hard to prioritize since Uber runs Cadence in a private network. As we started to collect feedback about the most desired Temporal features in mid 2020, it immediately became clear that security needed to be a priority. For context, when we started our security efforts in October, authentication and authorization were the most requested features by almost double the next highest request. We also knew that AuthN/AuthZ were baseline requirements for our cloud solution.

Throughout November and December of 2020, we made immense progress securing Temporal. One of our major goals with both authentication and authorization was to be very un-opinionated and reinvent as few wheels as possible. For these reasons, we decided to design authentication so it could support any OIDC compliant identity provider.  In November we launched authentication beta for open source. We really appreciate everyone who helped validate and drive our design.

In parallel to the authentication work, we were also working on authorization. We wanted a killer authorization experience, but also needed to meticulously review existing system APIs to ensure access control was enforced everywhere it should be. The team really worked hard to get this feature out securely and quickly. This hard work paid off and we released authorization into open source by mid December.

Outside of explicit features, we also have quite a few other security related processes going behind the scenes:

- In August we started our SOC2 process. The team really came together over the last few months to change our processes and systems to meet compliance standards. We are now nearing the end of our initial SOC2 process which is a huge milestone for the company and technology. Cully specifically deserves a shoutout as he stepped in to lead the compliance effort without any background in compliance or in-house expertise to rely on.
- As part of the SOC2 process, we were also required to have our product (both cloud and open source) penetration tested. This penetration test took place at the beginning of January. Only a handful of non-critical issues were found, and **0** issues were found in the core service. We have since fixed all issues that were discovered.
- We take security very seriously here at Temporal and part of that is knowing when we're out of our depth. To ensure we are doing absolutely everything possible to provide a secure Temporal experience, we have brought on a [renowned security expert, Travis McPeak](https://www.linkedin.com/in/travismcpeak/), to advise us part-time. He has been an invaluable asset in validating our ideas and guiding us towards secure solutions.

Temporal went from a system with essentially no access control mechanism, to a system which can locked down and secured with minimal effort. We're happy with the progress made, and security will continue to be a major focus moving forward.

## Cloud

### Why cloud?

One of the most common questions we get is:

**"What is your revenue model?"**

followed by:

**"Why not support/licensing/on-prem?"**

These are valid questions, so I'll briefly explain why cloud is the right fit for us.

Our number one goal as a company is to **improve the lives of as many developers as possible**. We're definitely biased, but we believe Temporal fundamentally improves developers lives in a way that most technology products don't. Because of this, we believe the number one way to reach our goal is to get Temporal into the hands of as many developers as possible. So now the question becomes:

> How do we get Temporal into as many developers hands as possible?

The answer is complex, but at the highest level it really boils down to making Temporal more accessible. When we look at the aspects of Temporal which are the least accessible today, it's clear that running Temporal itself is the biggest barrier of entry. While there are numerous motivations for our choice to be a cloud company, this is the most important. We believe the cloud is the optimal path for getting Temporal into the hands of more developers, therefore improving their lives.

We are also a business and from a business point of view, the cloud just makes common sense. We pride ourselves on providing high quality "no strings attached" support and becoming a services company would have changed our incentives making that much harder. On-prem is another common revenue path, but we know that it would mean spending far more time debugging customer infrastructure, and far less time improving Temporal. Finally there is the licensing route, but we really like MIT and strongly believe that creating an enterprise version would be unhealthy for our open source community. Even if you don't agree with this rationale,  I hope it at least provides some insight into thought process.

### The cloud journey

For a long time, a hosted version of Temporal was merely an idea. It was an idea that we really liked but there had always been more pressing priorities. For the first half of 2020, our time and energy was consumed by producing a high quality production release. Once we released , our focus shifted to our funding announcement and subsequent exit from stealth. So by the time we announced our funding, serious demand had grown for a cloud offering. It became clear that the cloud was no longer a hypothetical "nice to have", but instead a real blocker for Temporal adoption.

Towards the end of October, we began seriously ramping up our cloud efforts. In addition to our dedicated cloud team, our other teams were also making changes to the core service necessary to provide a secure and reliable hosted experience. Security was the largest of these changes, but coming in as a close second was the removal of Kafka from both the visibility and cross-DC code paths. Removing Kafka was a core requirement for our hosted service, but it was also a huge win for Temporal. Removing Kafka means one less dependency is required to run the system. In general the team did an amazing job delivering all the features blocking our cloud effort.

With all of the cloud blockers out of the way, we approached a handful of initial design partners who we felt would be a great fit. We started working with our first partner throughout December, and were able to onboard them shortly before Christmas. Getting our first customer is a monumental step, especially considering they are a $20B+ company. After onboarding our first design partner, we continued to gain momentum. Throughout the month of January we onboarded 3 more customers onto the cloud. We are continuing to onboard design partners, and plan to have O(8) customers by the end of the February. Considering the sizable backlog of interested customers, we would love to onboard users faster. But we pride ourselves on providing an incredibly reliable and consistent experience, and we don't want to take any risks by overextending ourselves. Eventually there will be enough Temporal Cloud for everyone.

If you are interested in Temporal Cloud, feel free to reach out (ryland@temporal.io, swyx@temporal.io, maxim@temporal.io) so we can get your name on the waiting list. If you are interested in helping us, [we're hiring](https://temporal.io/careers).

## SDKs

Another area of focus over the last few months has been our language SDKs. Historically, Temporal only officially supported Java and Golang as official language SDKs. There are [community contributed SDKs for Ruby, Python and a few others](/application-development). While we really appreciate these contributions, we can't provide any guarantees for them until they are integrated in officially. We know that supported languages is one of the most important factors for choosing a new technology. This is why we've put serious effort into expanding our official language support over the last few months.

### PHP SDK

Six months ago we were approached by a group of well respected open source developers in the PHP community - SpiralScout. SpiralScout are the masterminds behind the [Roadrunner](https://github.com/spiral/roadrunner) framework for PHP, so were super excited that they wanted to contribute an official language SDK. They've now been hard at work for almost 6 months and are nearing completion. Very soon, PHP will be the 3rd officially supported language for Temporal.

### TypeScript SDK

PHP isn't the only language on its way to Temporal. Work is also underway on a TypeScript SDK for Temporal. This SDK also went through [the standard proposal process](https://github.com/temporalio/proposals/pull/15), and we really appreciate everyone who left feedback and helped guide the design. As you know, we don't do timelines here at Temporal. That being said, I can guarantee that we want TypeScript support as much as you do.

## Docs

Instead of poorly explaining our progress with docs, I'll defer to resident expert and information architect Cully:

> There have been many contributions to [Temporal's documentation](https://docs.temporal.io) over the last couple of months. Highlights include Server information and SDK guides. In regards to the Server, while we have refreshed some of the existing information, we have also published new information on [security](/server/security), [versions and dependencies](/server/versions-and-dependencies), [Elasticsearch setup](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster), and [Server options](/server/options). In regards to SDKs, thanks to [Anton Titov](https://github.com/wolfy-j), there is now a brand new set of [PHP SDK guides](/php/introduction) for PHP developers. The Temporal Product Team appreciates all of the contributions the community has made and we look forward to bringing you even more content over the next several months.

## Community

### Slack and Discord

For those who remember, we ran a survey a while back about Discord and Slack. Some users later reached out and asked about the purpose of the survey and if we had any immediate plans to switch. To directly answer, there are no immediate plans to switch. With that in mind, our medium/long term plan is to move away from Slack. There's a lot of reasons we're not fans of Slack for community management, [most of which are covered in my previous post.](https://docs.temporal.io/blog/discourse) The biggest blocker stopping us from moving is lack of threads. We feel threads are an important mechanism for asynchronous community communication. Unfortunately Discord has no official plans for thread support and definitely no timeline (which we can respect). We will continue to evaluate the situation and will keep the community updated as things progress.

I've also included the results from the two primary questions in the survey. The first (image below): "Would you be open to trying Discord..." was only presented to users who said they had never tried Discord.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d9aeb934-5827-4b4a-b45f-70637d62012a/Screen_Shot_2021-02-19_at_1.46.50_PM.png](/img/discord-0.png)

While the second (image below), was conversely only shown to users who said they had tried Discord. The results of both questions indicate that the community is very willing to consider Discord in the future.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ad9a5eda-0668-40dd-acd9-d171e8cf7148/Screen_Shot_2021-02-19_at_1.44.46_PM.png](/img/discord-1.png)

### Open office hours and other content

You may have noticed that there hasn't been an open office hours in a while and that other auxiliary content has also decreased in volume. The honest truth is that we are a very small team and the amount of workload has increased much faster than our headcount has. For the most part, this is an amazing sign for the technology and the business.

While all of this is true, we really love community focused events like the open office hours and are dedicated to bringing them back. The most surefire way for us to accomplish this is by hiring more talented and intelligent people like all of you who are reading this. This is a perfect segue to the next section which talks about our current hiring and open roles.

## Work with us (seriously we need amazing people like all of you)!

I want to start with a quote directly from Karl - our Head of People. Karl is really exceptional and is an amazing point of contact if you're ever curious what it would be like to work at Temporal:

> Hiring is a top priority for Temporal and we're focusing on expanding our teams in all Engineering and Product groups which include Infra, Cloud, SDK, Server/OSS, the Temporal Web, Documentation, Developer Relations, Solutions Architecture, and Developer Success. We have multiple openings in the United States and are expanding our recruiting team's capacity three-fold as we add employees throughout 2021 and beyond.

Feel free to reach out to Karl at karl@temporal.io

On a personal note, I have to say that Temporal is the best company I could have ever imagined working at. Our technology is revolutionary, the founders are unmatched, the team is both the most intelligent and most kind I've ever worked with. This is all on top of the fact that our business model is already validated. Most importantly, working at Temporal means spending your days helping other developers achieve their dreams and goals. That alone should convince you to join.

## Temporal jobs

While [we are actively hiring for all roles at Temporal](https://temporal.io/careers), we also recognize that developers want opportunities to work with Temporal and that companies want to hire the kind of developer that understands how to apply reliable distributed systems to solve business problems. Much as we would like you to work with us, it's also in our interest to help our users find each other! To that end, we are also [listing external Temporal Developer Jobs](https://temporal.io/careers#external-jobs) as a free service to our community. Our first posting is already up - Nylas is hiring Workflows engineers in Toronto and Vancouver!

## Conclusion

Hopefully this longer form update answers the most hot topic questions you all have. We're incredibly excited with the progress we've made and what the future will bring. We couldn't have done it without everyone in the community supporting us and pushing us forward.

As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](http://temporalio.slack.com/)

Forum: [https://community.temporal.io/](https://community.temporal.io/)
