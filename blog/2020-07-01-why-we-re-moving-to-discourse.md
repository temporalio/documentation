---
tags:
  - discourse
  - slack
  - temporal
  - chat
  - migration
  - community
  - workflow
slug: discourse
title: Why We're Moving to Discourse
author: Ryland Goldstein
author_title: Temporals product person
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4
posted_on_: 2020-07-01T07:00:00Z
release_version: 0.26.0
---

Why Temporal is moving to Discourse for our knowledge DB needs.

<!--truncate-->

**TL;DR;** The growth of this awesome community has made it difficult for us to provide the desired level of support using our current tools. A solution is needed that will scale with our communities growth and we strongly believe that Slack is not this solution. To solve this, we have started a Discourse forum and will slowly migrate certain questions/discussions away from Slack. We believe that Discourse will allow us to maintain the same responsive and personal support that we offer today, but with far less overhead.

Check it out here at: [https://community.temporal.io/](https://community.temporal.io/ "https://community.temporal.io/")

## Rationale for Slack Migration and Discourse

A couple months ago we reached the message limit on Slack and our community started asking if we planned to pay. While paying would have been the quickest solution, Slack is so expensive that we had to consider alternatives. How expensive you ask? Slack charges a minimum of $7 per user each month but more realistically $12 per user each month. With our current community of \~500 we would be paying anywhere from $3500 - $6000 each month. As we're expecting at least \~10x growth over the next few years the problem becomes much bigger as $60k a month isn't feasible.

Initially we were searching for a cheaper Slack alternative but we quickly realized that if we were considering a migration, it made sense to evaluate alternatives holistically and not just based on the fact that Slack costs more. To keep things consistent we defined a number of metrics to evaluate alternatives by:

- Cost
- Searchability
- Indexed on the web
- Responsiveness (real-time vs high latency)
- Accessibility
- Moderation and community safety
- Onboarding overhead
- Thread support

While these factors did not provide a clear answer to what our new solution should be, it did suggest that Slack was not going to work for us long term. Before I explain why Slack isn't a good fit for us, I want to say that there are a ton of really great things about Slack:

- Responsive
- Thread support
- Searchable internally
- Widely adopted
- Great for teams
- API

On the other hand there are a ton of issues when using Slack for a community:

- Incredibly expensive
- Made for teams, not communities (this is an intentional choice by Slack)
- Only searchable if you pay
- Not indexed on the web
- Zero to little moderation tools
- Onboarding is tough
- Not the most accessible

### Starting Our Search

At first we searched for a 1:1 replacement for Slack, a Slack clone if you will. This proved difficult as there are few tools that met our criteria (Mattermost, Rocketchat) and were widely adopted enough for us to move forward with. In an effort to quantify our process, we began to analyze exactly what value Slack was providing us. Our conclusion was that Slack was really serving two purposes for our community:

1. Knowledge DB (think Wiki)
2. Realtime discussions, casual chat, scheduling, announcements etc

Looking at Slack in this context suggested that the best move might be to look for two tools to replace Slack instead of one. While adding more tools is not my favorite thing as a product manager, it's much better than having 1 tool which inadequately serves both needs. Splitting up the task also meant that we could prioritize our efforts. While replacing the realtime portion of Slack is something we will need long term, we were experiencing far more issues with the knowledge database so we decided to tackle that first.

To start our knowledge DB search we defined our core requirements for a tool. We knew that search was a top priority, it needed to be fast with no limits on history. It was also important that users could rely on their search engine and not just the tool itself to find answers to their problems. This requirement eliminated a lot of Slack-like tools as they are not indexed on the web. Robust moderation capabilities were also a must. We've seen how Slack can create real safety problems for large communities due to the lack of fine grained user permissions and moderation. Our last major requirement was that the tool would enable us to maintain the same level of support responsiveness as we have with Slack. This community is the basis of our business so choosing a new tool which would negatively affect our support experience wasn't an option.

After thorough research it seemed like a traditional forum was the only option which could meet all of our criteria. We evaluated a few solutions (Discourse, Flarum, Tribe) and eventually ended up going with Discourse because it's:

- Widely adopted
- Open source
- Based around communities
- A Ton of companies that we align with ideologically are using it (Netlify, Docker, Rust, Elastic, etc)
- Robust moderation tools
- Very accessible
- Publicly indexed on the web
- In-site search is awesome
- Accepted answers feature
- Fine grained notification controls
- Great onboarding process - can even sign in with Google/SSO
- Affordable

Before fully committing to Discourse we trialed the tool internally. The more we used the product and became familiar the more we loved it. Furthermore, the support team at Discourse is seriously outstanding and they answer our questions in literal minutes. I hope this sheds some light on the decision making process behind this migration.

## How Will This Transition Work?

While we're fairly confident that Discourse will be a great fit for our community and team, we're not going to finalize anything until we see it in action. For now, we plan to stay in an evaluation period so we can ensure that our new tool doesn't degrade the existing support experience. You will see us push to migrate some conversations to Discourse from Slack when we feel that they have gone out of scope. We're also considering adding a Slack plugin which can automatically migrate Slack threads to Discourse. The eventual goal is to field all support questions via Discourse and keep a Slack/Discord/etc as a medium for casual discussion and brainstorming. To be 100% clear, we will not be removing Slack in the immediate future although this may happen down the road.

Most importantly we want to hear your feedback/criticism/suggestions about this change or our support experience in general. If you have ideas that you think would improve the community or our support experience please do not hesitate to pm me on Slack or via email ([ryland@temporal.io](mailto:ryland@temporal.io)).

Lastly, if anyone is interested in being a moderator on the community forums, let me know and we can discuss what that process would look like.

[community.temporal.io](https://community.temporal.io/)
