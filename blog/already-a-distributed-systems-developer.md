---
slug: already-a-distributed-systems-developer
title: You're already a distributed systems developer; it's just that nobody bothered to tell you
author: Brian Hogan
author_title: Director of Education
author_image_url: /img/brian-hogan.jpg
tags:
  - temporal
  - distributed systems
date: 2022-06-09T00:00:00Z
---

Do you get nervous when you hear the term "distributed systems?" Does your mind immediately jump to computer science courses you struggled with or didn't take? If you've been building applications for the web or mobile devices, you probably understand more than you think about distributed systems.

<!-- truncate -->

If you've built an app that talks to a database, you've worked with a distributed system. If you've built a JavaScript client that talks to a backend application, you've created a distributed system. If you've used a third-party API to process payments, you understand important concepts about distributed systems. Whenever you use a website, you're using a distributed system.

A distributed system is where multiple computers or computing devices communicate over a network, working together to accomplish a task. The complexity comes in when you start considering how all those devices, like browsers, phones, servers, and smart devices, work together and the problems you'll face when things go wrong.

Let's look at one of the most basic examples: fetching data from another computer using an API call. Open Notify has a public API that shows you [who's in space right now](http://open-notify.org/Open-Notify-API/People-In-Space/). To display this information on a web page, you'll use a small amount of code to make a request to this API, get the results, and then filter the results to display them the way you'd like. 

You've dealt with problems like this more times than you can remember. Getting the results back is the easy part, and your experience tells you that many things can go wrong. What happens if this API:

* Is unreachable because there are network issues?
* Is unavailable because their service is down for maintenance?
* No longer recognizes your authorization key?
* Returns data in a different format than you expect because they made a change on their end?
* Times out or even fails under heavy load?

These are just some things you must think about when working with distributed systems. You've most likely thought about–and even dealt with–all of these scenarios and more. You know you'll have to handle authentication rejections. You'll probably need to handle a network timeout or a rejected connection and retry the connection a few times. Most importantly, you know that there is code in your system that you control, and there's code that you use that someone else wrote, and your code has to handle situations where their code doesn't respond the way you expected.

Like most concepts in software development, things get more complex when you go beyond the "golden path," where everything works and you encounter no problems. This is where the complexity in distributed systems lies.

During the past ten years, the process we use to develop applications has changed dramatically. Ten years ago, your average web application consisted of a large backend application that talked with a database. Occasionally, some JavaScript would make requests to those backends, but to the developer, this was all one large system, and the web framework they used abstracted a lot of the complexity away for them. But as business needs changed, applications grew in complexity, and developers began splitting their applications into smaller ones. Monoliths became groups of microservices, and developers had to start thinking about how these separate systems worked together. If you're a software developer who began your career in the past five years, you've already seen a lot of distributed systems concepts through your daily work.

For example, the scenario where you fetch data from an external system is a fundamental concept in distributed systems called a [Remote Procedure Call](https://www.w3.org/History/1992/nfs_dxcern_mirror/rpc/doc/Introduction/WhatIs.html), or RPC. It's where your program calls a function on another system. Over the years, you've seen all sorts of approaches to RPC, from SOAP to REST to gRPC. Just like there are design patterns for object-oriented programming, there are design patterns for handling various distributed systems scenarios.

Here are some common distributed systems patterns you may have encountered:

- **Replicated Load-Balanced Services (RLBS)**, or **[Load Balancing](https://en.wikipedia.org/wiki/Load_balancing_(computing))**, where you have duplicate services, and you use a load balancer to send requests to those services. This is one of the first distributed systems patterns many developers encounter because it's a common way to handle heavy traffic. For example, a company may deploy a web application to 10 servers worldwide, and load balancers route traffic to servers based on traffic, geography, or resource usage.
- **[Command and Query Responsibility Segregation (CQRS)](https://martinfowler.com/bliki/CQRS.html)**, where you separate read and write operations into their own models, using commands to write data and queries to locate and fetch the data. Applications with high transaction volume use this pattern, but it's also a good fit for managing immutable application state. The popular Redux JavaScript library [takes inspiration from this pattern](https://redux.js.org/understanding/thinking-in-redux/motivation).
- **[Two-Phase Commit](https://martinfowler.com/articles/patterns-of-distributed-systems/two-phase-commit.html)**, which is a pattern used to consistently update multiple data sources. In a two-phase commit, each data source is a node in a cluster. You first prepare all the nodes to receive the update, using one of the nodes to coordinate the transaction. Each node lets the coordinator know it's ready and available to receive and process the commit. Once every node is ready, you execute the transaction on all the nodes. Two-Phase Commit is a good strategy when you're concerned with the integrity of the data rather than resource usage.
- **[Saga](https://microservices.io/patterns/data/saga.html)**, where you have a series of local transactions and an event bus. Each local transaction sends a message or event to the event bus, which hands the process off to the next transaction. If a transaction fails, you execute a different set of transactions to roll things back. A corporate travel site where a customer can book a flight and a hotel at the same time might use the Saga pattern. If a customer reserves a flight but then decides to cancel because there are no available hotels, you'll need to cancel their flight reservation, which means rolling back the transaction for the flight.

As you read through these examples, you probably thought about situations where you encountered these patterns in the codebases you worked on. You may have used frameworks or products that used these patterns without realizing it. If you've written code to handle a transaction that involves a couple of separate systems, you may have used the Saga pattern. If you've worked on a web application that gets a lot of traffic, you may have dealt with load balancers and had to think about how to handle session data for your users reliably.

Modern applications *are* distributed systems, and you're working with them every day, adding features, fixing bugs, and improving the customer experience. At the same time, you're growing your knowledge about distributed systems as you solve these challenging problems.

You are a distributed systems developer. And now that you realize it, you should look at how Temporal takes care of many of the distributed systems patterns for you. It allows you to code at a new, higher level of abstraction, where you don't have to concern yourself with reimplementing these patterns. With Temporal, you get a reliable, fault-tolerant, and scalable system out of the box, and you can focus on just coding your business logic. Start with the [Temporal in 7 Minutes](https://www.youtube.com/watch?v=2HjnQlnA5eY) video, and then join the [Temporal Community](https://temporal.io/community).
