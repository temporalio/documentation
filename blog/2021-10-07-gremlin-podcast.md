---
tags:
  - Temporal
  - podcast
posted_on_: 2021-10-07T00:00:09Z
slug: gremlin-podcast
title: Maxim and Samar on Gremlin's Build Things Podcast
author: swyx
author_title: Head of Developer Experience
author_image_url: https://avatars.githubusercontent.com/u/6764957?v=4
release_version: V1.11.2
---

<!--truncate-->

Gremlin is at the forefront of the fast-rising Chaos Engineering movement. Chaos Engineering involves running thoughtful, planned experiments that teach us how our systems behave in the face of failure, and Temporal provides a testable, scalable solution to handle failures. Our co-founders Maxim Fateev and Samar Abbas recently joined Gremlin's podcast [Break Things on Purpose](https://www.gremlin.com/podcast/) for a rare double appearance to talk Temporal.
[Listen to it here](https://www.listennotes.com/podcasts/break-things-on/maxim-fateev-and-samar-abbas-C1p42zDwLZX/)!

<iframe src="https://www.listennotes.com/podcasts/break-things-on/maxim-fateev-and-samar-abbas-C1p42zDwLZX/embed/" title="Listen Notes: Gremlin Podcast" height="170px" width="100%" style={{width: 1, minWidth: "100%", top: 0, position: 'sticky'}} loading="lazy" frameBorder="0" scrolling="no"></iframe>

What follows is a lightly edited transcript for readability.

## Origin Story of Temporal

***So, you started with Cadence, which was an internal framework at Uber, and decided to strike out on your own and build Temporal. What caused you to strike out on your own?*** 

We built Cadence from the beginning as an open-source project and grew by bottoms-up adoption within Uber. **It grew from zero to over a hundred use cases within three years**. But because it was an open-source project from the beginning, **after a year or two we started to see companies like HashiCorp, Box, Coinbase, Checkr, adopt us**. And there are a lot of others, it’s just that not all of them are public. 

We believe this technology is very widely applicable, so we needed a separate entity, like a company, to actually drive the technology forward for the whole world. For example, Uber would never create a cloud offering, and everyone wanted us to host Temporal. So one thing led to another and we ended up leaving Uber and starting our own company. And that was the main reasoning — **we wanted to make this technology successful for everybody in the whole world**, not just within Uber. 

Another benefit of starting Temporal was that **we had actually accumulated a pretty large technical debt when running Cadence**, just because we ran Cadence without single backwards-incompatible change since we first put it in production. Even after four years we were still on the same cluster with the same initial users. So, we had to do everything in backwards-compatible manner. 

At Temporal, we could rethink our design decisions, and we spent almost a year just working on [Temporal v1.0](https://docs.temporal.io/blog/temporal-v1-announcement/) and doing a lot of fixes and tons of features which we couldn’t do otherwise. Because that was our only chance to do backwards-incompatible change. 

## Lessons from Uber: Reliability on Rails

One of Uber's values was to **provide rides as reliable as running water**. And that translated into interesting system requirements for engineers. Most of the time, what ended up happening is product teams at Uber were spending a large amount of time building this resiliency and reliability into their applications, rather than going after building real features that the users of the platform cares about. This is the problem that we were trying to solve back at Uber, where let us give you that reliability baked into the platform.

**Why does every engineer needs to be a distributed systems engineer to deal with all sorts of failure conditions?** We want application teams to be more focused on building amazing applications, which makes a lot of sense for the Uber platform in general. And this is the value proposition that we were going after with Cadence. It hit a nerve with all the developers out there, especially within Uber. 

One funny story is that one of the early use cases moved onto Cadence was because of a multi-day outage in one of the core parts of that system, and **the way they mitigated the outage is they rewrote that entire system on top of Cadence in a day**, and were able to port over that entire running system in production. And that’s how they mitigated that outage. That was the developer experience that we were striving for.

## Orchestration vs Choreography

***What’s different about using Temporal compared to distributed systems built with simple messaging like Kafka?***

A lot of systems are built with **choreography**: 

- You have a bunch of callbacks which listen on queues, then update certain data sources’ databases, and then put messages into the queues back.
- In a real system you also need to have durable timers, so you either build your own timer service, so you just poll your databases for messages to be in certain state to account for time. Getting this right is non-trivial.

This choreography in theory kind of works, but in practice is usually a mess:

- Your system now has a bunch of independent callbacks and you essentially have a **very complex state machine.**
- **Business requirements are broken** into a thousand little pieces which need to work together, and all the other requirements about retries and so on are actually pretty hard to get right.
- On top of that, you have very **poor visibility** into your system — if something goes wrong, good luck finding the problem.

**Orchestration** means that you implement your business logic in one place and then you just call into these downstream services to implement the business logic: 

- We know how to do that for short requests. Let’s say you get a request, your service makes the five downstream API calls, does something with those calls, then returns data. If this transactions takes, let’s say, a second, it's pretty easy to do, and you don’t care about reliability that much if it fails in the middle.
- But as soon as any of those calls can fail for three minutes, or, a downstream call can take ten hours, you now have to break this nice piece of code into 50 callbacks, queues, and state tables in database, and so on.

**Temporal helps you keep that code as is**. The main abstraction, which is non-obvious to people is that it makes your process **fully fault-tolerant, including stack variables**, threads, and so on. 

- So, if you make a call that takes five hours, you’re still blocked in exactly the same line of code. And in five hours, this line of code returns and then continues.
- If you’re calling `sleep` for one month, you’re blocked on this `sleep` line of code for one month, and then it just returns to the next line of code.

Obviously, there is some magic there, in the sense that we need to be able to persist and replay the state of your Workflow in exactly the same state, but this is exactly what Temporal provides out of the box. **You write code as if failure doesn’t exist** because if your process fails, we just reconstruct the exactly the same state in a different process, and it’s not even visible to you. I sometimes call it **fault-oblivious programming** because your program is not even aware that a fault happened. That is main idea: fault-tolerant code that is guaranteed to finish execution.

## Temporal Features and Use Cases

There is a lot more under the hood:

- **Task Queues**: We don’t invoke services directly, usually we invoke them from queues. But these queues are hidden in a sense, because when you call some API in Workflow code, it gets called asynchronously. But in your code, it’s not visible. It’s just a normal RPC call, but behind the scenes, it’s all asynchronous, has **infinite retries, exponential backoff, heartbeating for long-running tasks**, and so on.
- **Local State**. Workflows are stateful because you can keep state in variables and you don’t need to talk to a database.

Imagine you want to implement the customer loyalty program for airline, so you need to implement a point system. So, you listen to external events, and every time your flight finished, and you will get an event to increment that. In a normal system, you need to get a database, queues, and so on. In our world, you would just increment local variables. And then when this counter reaches a hundred, for example, you will call some downstream service and say, “Okay, promote that person to the next tier.” And **you could write this type of application in 15, 20 minutes** on your desktop because all of the rest is taken care of by Temporal.

It assumes that you can have hundreds of millions of these objects simultaneously running because you have a lot of customers—and we do that because we built it at Uber, which had hundreds of millions of customers—and run this reliably because you don’t want to lose data. It’s practically your financial data. This is why Temporal is very good for financial transactions, and a lot of companies like Coinbase, for example, uses us for their financial transactions because we provide much better guarantees than alternative solutions.

## Designing For Temporal

***If I wanted to implement Temporal within my application, what do I need to keep in mind to ensure that I have a good experience with it? Any tips?***

### Redesign End-to-End

Maxim: Temporal does best when you also rethink how your application is structured. It’s kind of a new category of software, so you cannot just take your current design and directly port it over. One time, engineers from a payment system came to us and said, “We have a downstream dependency to a bank and in their SLA says they can be down for three days. Can we just start workflow on every message if the system is down, and keep retrying for three days?” Well, technically, answer is yes, but we eventually found out that they had this huge pipeline of queues, with enormous complexity, and they had hard time maintaining all that. So **we ended up redesigning the whole pipeline as just one workflow,** and instead of just doing it piece by piece, and it helped them tremendously. It completely simplified the way their application was designed and they removed a lot of code. You can do a small proof of concept piecemeal, but if you adopt Temporal end-to-end, you will get 10x benefits.

### Durability

Samar: Think about how important durability is for your application. Do you have some state which needs to live beyond a single request/response? If the answer is yes, then I think Temporal is an awesome technology to help you deal with that complexity. It's better than the traditional way of building those applications, using databases, queues, retry mechanisms, and durable timers for retrying for three days. With Temporal, instead of building a sub-system which deals with all this retrying behavior, you can literally **just specify your retry policy** when you schedule an activity. So think holistically about your system, think about the statefulness and how important that state is. People have accepted that building this class of application is inherently complex, but Temporal is an amazing technology which makes this much more developer-friendly.
