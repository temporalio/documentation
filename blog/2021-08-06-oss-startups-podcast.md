---
tags:
  - Temporal
  - podcast
posted_on_: 2021-08-06T00:00:09Z
slug: oss-startups-podcast
title: 'Maxim Fateev on the OSS Startups Podcast'
author: swyx
author_title: Head of Developer Experience
author_image_url: https://avatars.githubusercontent.com/u/6764957?v=4
release_version: V1.11.2
---

<!--truncate-->

Our CEO Maxim Fateev recently joined the OSS Startups Podcast with Robby Robson of Cowboy VC & Tim Chen of Essence VC to talk Temporal. [Listen to it here](https://www.listennotes.com/podcasts/the-oss-startup/ep7-from-open-source-project-1QEDGmJWMeB/)!

<iframe src="https://www.listennotes.com/podcasts/the-oss-startup/ep7-from-open-source-project-1QEDGmJWMeB/embed/" height="170px" width="100%" style={{width: 1, minWidth: "100%", top: 0, position: 'sticky'}} loading="lazy" frameBorder="0" scrolling="no"></iframe>

What follows is a lightly edited transcript for readability.

## Origin story of Temporal

**Can we get some context on you and the origin story of Temporal?**

I've been working on similar problems for the last 20 years. 
There are probably six or seven reincarnations of solutions in this area which I worked on or was involved with. 
And the most interesting one was that I was Tech Lead for the [Simple Workflow Service at AWS](https://aws.amazon.com/swf/), and before that I was Tech Lead for Amazon's messaging platform and backend that is used by [AWS Simple Queue Service](https://aws.amazon.com/sqs/) today. 
So I've been involved with building asynchronous applications in Service Oriented Architectures for a long time. Our team quickly realized that **you need a high-level abstraction, like orchestration to build high-scale systems reliably** and Simple Workflow was born out of that idea. 

Later, my co founder Samar went to Microsoft and built the [Durable Task Framework](https://github.com/Azure/durabletask), which later was adopted by Azure as [Azure Durable Functions](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview?tabs=csharp), which is the public reincarnation of that idea. 

In 2015 we joined the Uber office in Seattle and we worked on a few projects together. 
Before Cadence, we worked on [Cherami](https://eng.uber.com/cherami-message-queue-system/) which was a messaging system, because we know how to do messaging systems. And then out of that project, Cadence was born. Based on the same ideas of the Simple Workflow and the Durable Function framework, but on a completely different software stack and also open-source. 

We grew organically. **In three years, we grew from zero to 100 use cases within Uber** absolutely bottoms up. 
And as it was open source from the beginning, it started to get an external adoption from a lot of companies like **HashiCorp, Coinbase, DoorDash**, and others. 

We felt that if we stayed at Uber, we could drive this project forward, but if we really wanted to make it an industry wide phenomenon, we have to build a company around that. And that's why we quit Uber and started Temporal in 2018. We forked the Cadence project for legal and practical reasons and most of the original team is now with us.

**Today we are driving Temporal as a fully MIT licensed open source project.** It's a very permissive license, but our monetization strategy is just offering a cloud hosted version of the open source solution. We want to be as open and successful as possible, but we are going to monetize through the hosted offering, which makes for a very clear boundary between our company and the open source.

## Open Source

**Why did you make open source Cadence and not just something that was used internally at Uber?**

My previous experience at Amazon taught me that **if you want to make something which is lasting, you want to make it open source.** 

When I first joined Amazon in 2002, it was already at 800 developers.
Compared to its current size, that's nothing, but we were already experiencing a lot of problems that companies are seeing right now.
Amazon actually came up with a lot of very interesting internal solutions to those problems. But Amazon didn't open source any of that. 
What was happening is that we come up with an awesome solution, then five years later, we see some open source project which does a similar thing.

And we look at that and laugh at it. "Okay. It's just a joke. It's not serious." 
But then three years later, the open source project becomes more and more mature. 
Five years later, Amazon actually migrates its internal systems to that, just because the internal project cannot have as long of a lifetime. 
And it is very costly to run the team and the resources to maintain and grow it over time, even at the scale of Amazon. 

Obviously AWS has changed the whole equation because they now offer these as public services. 
But **unless it's open sourced, any internal project in any company eventually will die**. And that is my personal opinion. 
That's why opening up Cadence from the beginning was very important to us because we believe that this project has a lifetime beyond just Uber.

## Leaving Uber

**Was part of making it open source just testing the true market potential outside of Uber? Or did the thought only come after it had some pretty strong traction?**

Every engineer probably wants to start a company at some point, but to tell the truth, I never was thinking about it seriously. 
We thought that it might be a company one day, but we just wanted to make Temporal popular in the industry. 
And we believe that every company in the industry will use it eventually. (And it will, I'm absolutely sure about that.)

What happened is that we started to get very serious adoption by very serious and interesting companies out there. And then VCs came to us and said, "Why are you not starting the company?"

At first we said, "No, we get great paychecks and we're getting a lot of adoption within Uber, we are fine." But then we started to think about it and realized that by staying at Uber, it wasn't possible to really grow as large as we wanted. Most basically, we cannot run a hosted service staying there. Even if you did an awesome job with the open source project, unless there is a hosted offering, a lot of companies and developers just won't use it or even try it.

## Key Challenges

**What are the key lessons and challenges you learned getting the company off the ground?**

I think our path is a bit non-standard. 
As people say, startups are very hard until you find your product market fit. And then everything just clicks into place.

We were extremely lucky that **we had product market fit before we started the company**. That's why it wasn't very hard for us. For me, especially for the first few months, not that much changed, in the sense that I was still leading the project. 

**The hardest part was hiring.** Initially we tried to hire only locally in the Seattle area. 
And I would say Seattle is great for startups, but for the type of engineers that we needed, we needed hardcore backend distributed systems engineers. Back then even with a good open source project, they just wouldn't understand how startups work.

They don't understand the equity. These engineers could get a very very high paying job at any of the big tech companies in a minute. So initially, it took us a very long time to hire our initial team. 

We started in October 2019 and we were only 15 people in 2020. Now it's much easier to hire - there is so much traction in the open source and so much content on the Internet, so people know about us now and we can close insanely good candidates. We are super happy about the quality of talent we have now, but I think hiring was the hardest.

## Community as Product Market Fit

**What is the signs that made you understand, "Hey, this product is taking off." What are the signals that lead you to that?**

It's interesting. We don't have a very large community. 
We had probably around 1,000 people on [our Slack](https://temporal.io/slack) when we started the company. 
But these were senior engineers from top tier companies using that in production for mission critical systems. 
And I'm not even talking about thousands of Uber engineers, which were using Cadence in production for hundreds of use cases, but even outside we had that community. And it was a very, very a strong community, very strong engineers and we were getting very positive feedback. 

That's why for us getting VC money was very easy because we just talked to our users. Users say, "**We love the product. We love what they're doing. The company changed the way we think about distributed systems. And we are using that in mission critical applications or planing to use in more mission critical applications. And yes, we are willing to pay money because these are mission critical applications if you give us a hosted version of that.**" It was no brainer for any VC to fund that. 

## The keys to trust

**It's super intriguing that from the start, there are already a lot of people using it in mission critical systems. Because it's a very strong signal that they trust you or they trust the project. What do you think was the key to this trust?**

**It usually starts from customer pain**. People don't try things just because they're fun. Okay, people do, but the reality is that there is very clear need for such systems. **Almost every engineer has had to build this type of system in their career**, and they always build an ad hoc solution.

The example I like to give is that there was a time when databases were not a thing. Everyone was just writing their own files. And every time you had to index your customer data, you would come up with this file format to read it and index it somehow.

Imagine today if you're trying to build an application and somebody says, "Okay, I'm not going to use a database. I'm a smart guy. I'll just write and read files." That's unimaginable today!

I think we're in the same category for the type of application that Temporal solves. Before Temporal existed, you were inventing things from scratch every time. And the most of the engineers will use these ad hoc systems. They build these ad hoc systems every day. And we are saying, "You don't need to do that. You can just use something like our solution and it eliminates 90% of the problems." 

Apart from pain, it's also because **my co-founder, Samar, and I have been doing these sort of systems for 20 years.** Even if you had the smartest engineers in the world, you'd need another 10, 15 years to get where we are. 

And this is the 6th reincarnation of that. Because we've already iterated so much, we've made every possible mistake out there. If somebody comes to me and says, "Why are you not doing \____?" I would say, "I'm not doing it, not because I know better, but because I already did it five years ago. And it didn't work for these reasons." 

And then **running that at large scale at Uber for three years in production**. For highly critical systems also was a very good proof that this project is not a toy. 
We were extremely grateful, happy, and lucky that we worked at Uber, which paid well and let us work on an open source project of this quality. Obviously, Uber got something out of that. They have hundreds of applications running on top of this system. And I think Uber saved many years of building these applications because they use Cadence. But for us, this helped us start the company with half a million lines of production worthy, high-quality code, which is very unusual.

## What is Temporal?

**What is Temporal? It helps build and operate resilient systems. But what does that mean? Who are the best users? What are the best use cases?**

Temporal technically a new category of software. And I know everybody says that, but bear with me. 

One way to describe us is we are a [Workflow Engine](/blog/workflow-engine-principles). For example, Simple Workflow at Amazon is called Simple Workflow Engine. The problem is that workflows as known in legacy solutions are something which developers don't want to even touch. People think about Workflows as a simple linear sequences.

**Temporal is more about stateful computation.** Specifically, preserving and guaranteeing the state of the computation and execution. 

Imagine you have a process, which execute some business logic and **the full state of that process is fully preserved at all times**. All your local variables, all your threads, everything is fully preserved. 

What does that mean? **The Temporal service itself can fail** and restart and be redeployed, but your state is always there. 

Let's say the most basic use case. A customer signs up and one month later, we want to send an email to the customer. Imagine how to design that right now, you probably need to build a few components to poll the database and use a timer service.

In Temporal we just say, "Sleep for 30 days and then send email". So you'll just block for 30 days there and then go to the next line of code. 

```go
userId := workflow.ExecuteActivity(ctx, SignUp, userInfo).Get(ctx, nil)
_ = workflow.Sleep(30 * time.Day) // blocks for 30 days and resumes!
_ = workflow.ExecuteActivity(ctx, SendEmail, userId).Get(ctx, nil)
```

So it's purely a way to preserve your code state. And it makes a lot of these applications very easy because as your state is preserved, you don't need to talk to database explicitly, because it's always durable. So no object relational mapping. You can block for one month or for half a year or more, so you don't need to manually reconstruct your state. And so practically, we've just given you a durable programming platform. 

Workflows are also described as **durable actors** because they can also **react to external events**. So it can be that you have workflow per customer. For example, if you are an airline and want to create a loyalty points system. 

Every time a customer completes a flight, you send a message to that workflow saying, "Flight complete." You can just have a variable which represents how many points the customer has. As soon as it reaches 10,000, you can call some service saying, "Promote customer to the new tier." 

Building this sort of application without Temporal requires a lot of distributed systems knowledge. It requires queues, databases, polling, error handling, retries, so on. We just take care of that. You write five lines of code and get more benefit, than you would get from writing 10,000 lines of code from scratch yourself.

**So if you're building in a microservices world, you've got all those complex distributed system, underlying architecture. And this is basically just making sure that it's fault tolerant. So if there's an error on the consumer user end, you're a little bit shielded from that. So the whole system doesn't break for you.**

We cannot control the real world. All external systems can fail. But things like automated retries and whatever already built in. For example, you can retry forever. 

So if your downstream system says, "I can be down for a day," you can just keep retrying for three days. This is a real usecase. I remember one of our users was asking, "How do you retry for three days?" You can not use Kafka queues to do this. It just doesn't work. For us, you just set the retry policy for three days or five days or whatever, we don't care. Once you've set a retry policy we'll keep retrying. Your code will block for however long it takes to get a successful call, and then unblock as soon as it's ready. 

People ask, "What do I do if it fails?" Nothing. Because you don't even see it. One way to call this model is **fault oblivious programming**. So your program is oblivious that faults even happened because it's automatically resurrected on a different piece of hardware as soon as something happens. And it's all transactional, so you don't have to think about the many edge cases which you usually have with such systems.

## Forking and Starting a Company

**What was the actual process of forking Cadence and separating it out?**

We forked it in a non backwards compatible manner. The reason was that, we ran at Uber for four years without making a single backwards incompatible change. All upgrades were live migrations. So you could never bring the system down to do upgrades. This meant we accumulated a lot of technical debt for these four years. We had a lot of things we wanted to do, and we couldn't do them. When we decided to fork the project, we realized that it was our chance to fix so many things, so we spent one year working just on our fork before we [announced the production release of Temporal](https://docs.temporal.io/blog/temporal-v1-announcement).

I think **the hardest part was migrating the community** because when you have real customers, you have users using that in production. And you say, "Okay, here's the new thing, but it's not backwards compatible, you need to do work to do that. And you need to migrate to this thing." 

What helped is that Samar and I, are the heads of the project. Every user knew us personally. We talked to most people and they trusted us. They understand that we are doing it for good. And long term, this was a very good thing for the community and for the software. So we got very good support from the community, didn't get any pushback on us forking it and actually moving it forward. 

Finally, we added [many cool features on our fork](https://docs.temporal.io/cadence-to-temporal). The most basic one is we added GRPC support where before it was only on a custom Uber protocol, which didn't even support TLS. Most of the community have moved to us and right now we have most new users are starting with Temporal right away.

## Temporal Cloud

**It's not that obvious what a hosted service should be. Should we host some components, should we host everything? How do we even let people understand what a hosted service is?**

It wasn't a hard to decision for us, mostly because both me and my co-founder came from cloud providers. I've never worked for a company shipping packaged software. So we fall in the AWS model, our service just exposes an API. We don't run users code. 

For example, if you use databases as a service, you don't host your application in the database. Somebody just hosts the database for you and just connect to that. 

We are the same thing. We give you an SDK library. So you write your workflows and activities using your preferred programming language. Right now we support Java Go, PHP, Node.js, and we're adding Python as soon as possible. But the idea is that you use our SDKs, provide a connection string and you can connect to your local cluster for example, running Docker Compose on your machine, or you can connect to like a cluster you run in Kubernetes, or you can connect to our cloud offering and it will work the same. 

We actually had a real case when we had a user who was running a production workload using our open source and they using backend. But they misconfigured Cassandra and got data corruption. It wasn't a problem of Cassandra or Temporal, they just misconfigured it by accident. And when we were trying to help them we suggest, "Maybe we just give you a cluster in Temporal Cloud?" **Within one hour they just switched their whole production workload to our cloud without changing any code.** They only had to change configuration parameters and add certificates for mTLS to be able to connect to Temporal Cloud. 

That's why our cloud offering is very seamless for people to migrate to. And then the real benefits are from us running the actual cluster for you. Especially at large-scale it can be very difficult to run high workload clusters.

> Note: If you're interested in Temporal Cloud, you can check out our first public case study with [Descript](/blog/descript-case-study), and [sign up for our wait list](https://docs.temporal.io/#cloud).

## Pricing

**A lot of people have different pricing models. It could be usage or it could be a different tier of features. Do you have that? Or does everybody get exactly the same tier?**

We are mostly usage-based, but we also can have some provisioned capacity. Long term, we want to be as much usage based as possible because how many transactions per second you run very clearly corresponds to the resource utilization of the backend, and clearly corresponds to your business value. 

How exactly the usage is priced, what dimensions we are going to use, we are trying to define that. That's why our cloud is not in GA yet. We call our customers design partners because we work with them very closely to define our future and we are super grateful to them. 

Obviously, we want to be friendly to the enterprises because they want predictability. But at the same time, we want to make sure that starting with a small load is cheap. We don't want a situation where you need to sign a multi-year contract just to try us.

## Go to market

**How do people first get introduced to Temporal?**

We see two types. The first is **bottoms up adoption**. Some engineer finds our product and tries it out. And finds that, "Yes, it solves this problem. I was able to do in one day, something I wouldn't be able to in a few weeks, maybe months." And presents to their colleagues. They like it and it starts spreading through the company. Eventually management gets involved and then we start talking to them to help in their adoption. 

The other way is some companies have architect CTOs who discover us. And then they go to a team and ask them to do a POC. Usually they like what they find, and they come back to work with us. Some *very* large companies, which work with us, they have Platform or Infra teams that provide our open source as a service internally, creating this at scale, educating their own internal teams.

I don't think we ever will go to a CIO and say, "you need to buy like two million of this project."

## Developer Relations 

**You have such strong developer adoption. Do you try to amplify that once you start to have a company? Do you start a hire evangelist team? Or do you have like advocates or something around that roles in your company now? And how did you even look for these people and figure out what they should do in the first place?**

By the way [we are hiring](https://temporal.io/careers)! We already have quite a few very awesome advocates, but if you're one of those people talk to us! 

Temporal is still not a household name. Most developers still don't understand what we provide. They still don't even think about using us for their next project. Something we hear all the time, when somebody learns about what we do, is, "Why I didn't I have it three years ago when I started my startup?" We have a long way to go until at least every developer knows that we exist and considers us for the next project. 

Our goal is to be in every ecosystem. This is the hard part. We don't have SDKs in every language yet. We have a PHP SDK. But I'm pretty sure, 99.9% of PHP developers have never heard about Temporal. 

We have an alpha release of Node.js out. It's not production ready. But as soon as we are there, I can imagine that the Node.js community will start embracing us. With Java, we also don't have a Spring Boot integration yet. It doesn't stop a lot of people from using us, but we are not part of every ecosystem. We want to be part of every ecosystem out there so we need developer advocates who will go and explain that. 

## Advice

**Any advice that you would have for other founders or project owners who were thinking about becoming founders?**

If I knew how it works, **I probably would start my first company 15 years ago.** For example, I was Tech Lead for the Amazon messaging platform, which the whole backend of Amazon ran on for 15 years. We could have open sourced it back then, but we didn't just because other things came up and we just didn't. It was like five years before Kafka was even conceived. We could have made it a very successful project back then, but I didn't do anything just because I had no clue about how easy it is actually to start a company if you have something of value.

**You need to have something which developers need.** And if you get adoption, then the rest is not as hard as it looks from outside. It's a lot of work and it's hard, but again, it's absolutely worth doing it.

If you're thinking, "Should I start? I don't know. Will I get money?" or whatever, don't hesitate, just do it.
