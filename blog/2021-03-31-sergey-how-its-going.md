---
tags:
  - v1
  - Temporal
  - Reflections
  - microservice-orchestration
  - microservices
  - orleans
posted_on_: 2021-03-31T00:06:09Z
slug: sergey-how-its-going
title: "How it's going"
author: Sergey Bykov
author_title: Engineering
author_image_url: https://avatars2.githubusercontent.com/u/8248806?s=460&v=4
image: https://avatars2.githubusercontent.com/u/8248806?s=460&v=4
release_version: V1.8.1
---

<!--truncate-->

I wrote about how it started in [Why I Joined Temporal](https://docs.temporal.io/blog/sergey-why-i-joined-temporal). Somebody suggested I should post an update about how things are six months later. How am I feeling after jumping from a corporate cliff into the whitewater of startup life?

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0375mjxwcie6auoialwd.png)

###### `https://xkcd.com/1782/`

## Technology

I used Windows as my primary platform, and haven’t touched a Mac since the 90s. I was fairly confident that switching to a whole new platform would be a speedbump. Surprisingly, it was much smoother than I anticipated. Obviously, MacOS has its own idiosyncrasies, and I had to rebuild muscle memory for some keyboard shortcuts, but overall it’s close enough to Windows with WSL2. I prefer the Surface Pro for personal use because of its form factor, touch screen and how comfortable I am using it.

I cheated by continuing to use the Microsoft Ergonomic Keyboard and a two-button mouse, so I didn't have to use long button clicks for context menus. The one thing that continues to drive me crazy is the inconsistency of how Home and End buttons are interpreted in different apps.

About half of Temporal engineers develop on Linux machines. I realized why over time; just like on Windows, Docker does not work natively on MacOS. I recently wasted several hours trying to figure out why sed and even date weren't working as expected, only to find that it was because of the difference between GNU and BSD versions of these tools!

From the coding point of view, JetBrains is simply awesome; it is lightweight, cross-platform, and cross-language. In the hindsight, I should have started using Rider back at Microsoft for its lightweightness and cross-platform support. At Temporal, I mostly use GoLand, IntelliJ (occasionally) and Rider(I try to stay up to speed with the fast development in the Orleans world).

### Golang

Go is a bit strange, with some tradeoffs I understand but others, not so much.

On the plus side:

- Simple, limited syntax
- Easy to read and understand unfamiliar code
- Inline access to code from dependency packages
- Goroutines and channels are good tools for concurrency
- Very fast compilation

What's lacking:

- No generics and even overloads
- Simplistic visibility (public/private) model
- Unusable plugin model, no IoC/DI
- Debugging tooling is weak

Overall, Go is a reasonable tool for the job. I think C# would be more powerful as a language. What’s less clear to me is how much we would lose not having access to Go modules.

## Development

I joined a couple of weeks before Temporal v1.0 was released. It was a huge milestone after almost a year of development since co-founders left Uber - we switched to gRPC, added support for mTLS, and made a myriad of other changes.

As I ramped up, I primarily contributed to Temporal server. My major focus was developing Temporal's security features: authentication and authorization. The authorization model was my first design effort. Through the process of formulating the initial proposal, having internal discussions, implementing, and releasing the code, I got to know the team better. I also learned a number of "how can this be done in Go" things and established relations with some key customers.

The security work naturally morphed into contributing to the nascent Temporal Cloud effort. As Ryland mentioned in his latest [Transparency Report](https://docs.temporal.io/blog/temporal-transparency-10), by late December we were able to start onboarding a small number of select paying design partners to our cloud service. It's crazy that we have customers paying to use our service on our Cloud, long before we GA it. This speaks to their level of confidence in our product. The best part is that we even have a waitlist to join the program.

Currently, development of Temporal focuses on three major areas:

- Open Source Temporal Server
- Open Source Client Runtimes that we, unjustly IMO, call SDKs
- Temporal Cloud

Nowadays, I spend most of my time on the Cloud and occasionally the Server. The Client piece is what I’m the least familiar with for now.

## Team

The company is still fairly small. The setup is very simple and requires little overhead. Everyone is focused on developing the product, whether that means adding new functionality or improving what we already have. I can sense strong motivation beaming through the Zoom screen.

The current company size allows for a very flat structure. On the engineering side, we don't have a single manager yet. Everybody except our co-founders(the CEO and CTO) are simply engineers. Decisions are made within the three dev teams if possible, where engineers would happily work with other teams when necessary. Company-wide decisions are primarily product-level and about improving our engineering processes. Task tracking and planning is lightweight and done using [Notion](https://www.notion.so/), an interesting product that deserves its own deep dive.

I found the switch to an IC role refreshing. I’ve always liked the balance of Microsoft's dev lead role that combines technical work with managing a small team. But it forces you, for a good reason, to prioritize your IC contributions behind the team management priorities. I'm enjoying the plunge into building stuff, learning new languages and tools, figuring things out by collaborating with colleagues and partners.

Remoteness is a nuisance, of course. It’s definitely a challenge to connect and stay connected with colleagues that I don't work closely with. Fortunately, we had an in-person celebration for the v1 release back in October. That was the only chance I’ve had to meet a bunch of co-workers and their families. Aside from that, all communication is done through Zoom and Discord.

It's interesting that the team uses a suite of communication tools that broadly overlap in functionality. Zoom is for scheduled and sometimes ad-hoc meetings - it has the richer feature set and best screen sharing performance out of the box. Discord is used for spontaneous voice conversations, with an adjacent goal that such interactions are overheard by other people that hang out in the same channel. Discord is also used for quick screen sharing because it is more natural to supplement an already going voice conversation with a video stream.

Slack (not surprisingly) is the main method of written communications, within the company and with partners. Discord has chat features as well, but Slack is much stronger in that and has more business features and integrations. I was surprised to learn that Slack also has screen sharing. But I only saw it used once, as an experiment. What's important is that the team is open to trying new ideas. That's how Discord and Notion got added to the toolset.

## Culture

Temporal defines its culture along the three no-nonsense pillars.

- Developers, developers, developers
- Reliable like running water
- Seek the truth

### Developers, developers, developers

Our customers are engineers like us. If they are happy with our product, they will find ways to apply it and build great systems with it. Some of them will extend, give us valuable feedback and even contribute back. In the end, they will be the ones who have to convince management that they need Temporal. On the flip side, if developers don't like our tech, no manager will successfully force them to use it.

I'm very used to a world of developers as customers, considering it’s what I've been doing for the last ~15 years. I recently heard a story about a team of engineers at some company who tried to convince their management to use Temporal. When a higher-up opted for the low-code solution instead, the engineer who led the convincing effort simply quit and started looking for a new job where he could apply Temporal.

### Reliable like running water

This one was borrowed from Uber. The key value proposition of Temporal is that it makes it possible for application code to execute reliably without needing the usual complexity. Hence, reliability is our product. If Temporal is not reliable, behaves non-deterministically, loses workflows, there is no point in using Temporal. Needless to say, the bar is set pretty high.

My background in building services for game developers is helpful here because gamers are probably the most demanding end users. However, no matter how little patience gamers have, those are still games in make-believe worlds. On the other hand, Temporal powers many workloads with very real monetary value and the highest consistency and availability expectations.

### Seek the truth

This is common sense for people with engineering experience - that it's not the most vocal, articulate or persuasive person in a technical discussion who is necessarily right. It can be somebody quiet or early in their career. Of course, experience does help us recognize typical mistakes, design flaws, and corner cases. At the same time, mistakes that an experienced engineer overlooks tend to be of higher impact.

Intuition, gut feels, and instincts are all useful. That's our internal "AI" at work. But in the end, we have to operate on facts. Intuition should only help us find facts faster. It is also important to actively manage your ego and to depersonalize opinions, ideas, facts, designs, code, etc. That way we can suppress our human desire to win an argument or to feel proud with that useless "I told you so!" remark.

## Product

I gained a much better understanding of Temporal, it's capabilities, and architecture. Obviously, being neck deep in the code while adding and improving features helped. So did design discussions, reviewing PRs, watching what other people work on, and chatting with them.

In addition, we hold bi-weekly brain dump sessions where our co-founders interactively whiteboard to explain how certain core features work and why. Being able to ask questions like "why this way and not that" and "is this essentially X" helped me to build a conceptual mental model of those features. It also helped me separate core functionality from optimizations in the "whys". These sessions are recorded and some are even transcribed for our future employees.

The product does appear to define a new software category. I'm going on a limb here because somebody will always come up with a "but how is it different from X?" I think Temporal strikes a very delicate balance between on the one hand working "like magic" (that's what some customers literally say) and being very down-to-Earth practical, with pragmatic tradeoffs that experienced systems engineers understand and are generally comfortable with.

The Inversion of Execution model (which deserves its own post), seems to give developers confidence that they are in control of how their code runs. They can easily debug and fix their application code while Temporal ensures reliable execution of workflows and tasks, with a clear boundary between then.

The other day, a candidate I was interviewing shared an interesting analogy: Temporal has a chance of becoming TCP for developers. How so? By providing an illusion of smooth execution by automatically handling a range of failures and retrying behind the scenes. Just in the way TCP retransmits lost packets without exposing that to the higher levels of the stack.

There’s one typical pattern we see. One team of developers in a company will start building something with Temporal, and then in a few months we hear that a dozen other teams have already adopted Temporal. It spreads like a virus despite social distancing. I hear about 20 of Fortune 100 companies already using Temporal. From behemoths to tiny startups, we see people building software systems across many different domains: infrastructure provisioning, financial transactions, traditional business workflows, so on, and so forth.

We feel a special kind of pride when some of the most sophisticated technology companies choose to use Temporal. I still can't name all of them! But several went public about their dependency on Temporal: Coinbase, Hashicorp, Box, Checkr, Netflix, Snap, Datadog and Stripe. Stripe and Datadog even have job postings specifically calling out working with Temporal.

## Reflections

Looking back, I see that the decision to leave Microsoft was much harder for me to make than the actual transition into a new life. Big tech companies like Microsoft definitely have an advantage over smaller ones in that they provide opportunities for employees to change jobs, sometimes dramatically, across the wide variety of businesses they run. In my tenure at Microsoft I moved from Servers to Embedded to Bing to Research to Gaming, in several cases continuing to work with many of the same colleagues. This is definitely a benefit but it’s also a "trap". A barrier making leaving the walled garden harder. One day I should tell a story of my public ... let's say disagreement with Microsoft's head of HR at the time about the policy of internal transfers. 🙂

From my previous job changes I learned that what I'd be doing at a new place is almost always different from what I had in mind going into it. Not better or worse, just different. This transition was another example of that rule. Before I joined, we discussed that I would likely focus on the programming model of Temporal, leveraging my experience of building frameworks and tools for developers. In reality, I am working on the server and cloud side, leveraging my other experiences in building systems and services. No surprise for me there any more.

It was interesting to move from the Redmond bubble to the Startup bubble. In the Redmond Bubble there is still a lot less trust in using open source software and a bias toward in-house stuff. There are obviously good and bad reasons for that.

I knew beforehand it was the case, but I was still shocked to discover that Microsoft products are pretty much non-existent within the Startup Bubble. Strangely, I rarely hear Azure being mentioned, much less than GCP, and more like a necessary future integration tax to pay. Recently, I found myself arguing with coworkers who claimed that MacOS is more popular among developers than Windows!

I have been reminiscing about what I miss from my previous life. I definitely miss some of my colleagues that I enjoyed working with. I miss the great Orleans community that has formed and grown over the last 6-7 years. I love how that community started a number of great initiatives, such as the Gitter chat room, a community driven OrleansContrib GitHub org, and the virtual meetups. As the core team, we only supported these initiatives and contributed to them.

The irony here is that I am not cut off from the community. That's the beauty of open source. I just have so little time at the moment with all the things I'm busy with. I try to stay in touch with what's going on in the Orleans world and hope I'll continue to help one way or another.

I miss the availability of Microsoft Research. I wish I could still walk into the hallways of building 99 to ask Phil Bernstein or Sebastian Burckhardt advice on how best to ensure the atomicity/consistency guarantees that we need in Temporal. MSR is a unique institution that can provide state of the art help on nearly any Computer Science topic. You just need to know how to work with it.

I realized I mostly miss people, individuals. At the same time, I’m getting exposed to a great number of people from the new bubble. The Sequoia/Amplify/Madrona “mafia” can connect you to seemingly any top expert in the field because they are so well connected and broadly invested in the industry. Like with MSR, one just needs to know how and when to tap this resource.

I’m trying to make this as much of an honest assessment as I can, but it seems to sound very upbeat. That must be a reflection of how I feel now. I don’t know if it’s some kind of an extended honeymoon period. Time will tell. I think that regardless, this was a good and necessary change for me, no matter what happens next. I believe in our profession it is important to periodically shake yourself up, circumstances permitting. In a big scheme of things, we have the luxury of being able to do that when most other people can’t. Why not use it?

“Steh auf!”, as the famous German modern artist sings.
