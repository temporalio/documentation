---
id: external-resources
title: External Resources
sidebar_label: External Resources
---

There are many ways to introduce and teach Temporal based on what background you are coming from. Temporal doesn't have a monopoly on explaining Temporal.

Here we list great blogposts and videos by Temporal staff and users found off-site, that may be helpful in increasing your understanding or convincing your team about Temporal.

If you have made a tutorial or explanation of Temporal, please submit them here so that others can find it!

## Why Temporal

- [Dealing with Failure](https://dev.to/temporalio/dealing-with-failure-5adf) on Dev.to
- [Microservices Architecture With Temporal.io](https://spiralscout.com/blog/temporal-workflow-and-microservices) on the SpiralScout blog
    
    > "The Temporal Workflows engine is incredibly powerful and provides full control over workflows, including retries, timeouts, backpressure, and the parallel execution of activities. Workflows can be written in most programming languages and include checks, conditions, and sequences of execution."
- [The macro problem with microservices](https://stackoverflow.blog/2020/11/23/the-macro-problem-with-microservices/) on the Stackoverflow blog

    > "In just 20 years, software engineering has shifted from architecting monoliths with a single database and centralized state to microservices where everything is distributed across multiple containers, servers, data centers, and even continents. Distributing things solves scaling concerns, but introduces a whole new world of problems, many of which were previously solved by monoliths."
- [Temporal Tackles Microservice Reliability Headaches](https://thenewstack.io/temporal-tackles-microservice-reliability-headaches/) on the New Stack blog

    > "Using code, it aims to hide the complexity of building with microservices across distributed systems. It employs durable virtual memory not linked to a specific process that preserves the application state despite a whole range of possible failures."

## Tutorials

> Note: Each of [our SDK docs](docs/sdks-introduction) have a Hello World and Run Your First App tutorial!

- [Writing your first Workflow](https://www.youtube.com/watch?v=taKrIWt6KMY&feature=youtu.be) (20 minutes)
- [How To Deploy Temporal to Azure Kubernetes Service](https://mikhail.io/2020/11/how-to-deploy-temporal-to-azure-kubernetes-aks/) by Mikhail Shilkov
- *submit yours [here](https://github.com/temporalio/documentation/edit/master/docs/external-resources.md)!*

## Tweetsize Comments

- "did I mention we’re using Temporal and it’s wonderful? I think it’s very close and I’m hugely bullish on them. Lots of things Uber was doing would have been infinitely harder without it’s predecessor. Tbh, this came out super quick because of em" - [Jake Cooper](https://twitter.com/JustJake/status/1355392273173737476?s=20),  Railway.app
- "Certain programming models allow more to be in the lower layers, not exposed to the application, due to their semantics and failure models. Eg, as was mentioned with Temporal - the app code is failure oblivious and retries/backoff/jitter/durability can be handled below" - [Reuben Bond](https://twitter.com/reubenbond/status/1338901280090025985?s=20), Microsoft
- "Pretty awesome tech. Allows you to express long running processes in a fault tolerant way using Java (or Go) without explicit timers, queues, polling, etc. Like in this example: "pause" a method for 30 days, something you wouldn't normally do." - [Richard Kettelerij](https://twitter.com/rkettelerij/status/1320477838156435456?s=20), Mindloops
- "Temporal does to backend and infra what React did to frontend. If you're in the React world, you've forgotten about manually adding and removing DOM elements, updating attributes and their quirks, hooking up event listeners… It's not only been a boost in developer experience, but most importantly in *consistency and reliability*. In the backend world, this reliability problem is absurdly amplified as monoliths break into SaaS services, functions, containers… You have to carefully manage and create queues to capture each side effect, ensure everything gets retried, state is scattered all over the place. Temporal's engine is quite complex, much like React's, but the surface exposed to the developer is a beautiful "render()" function to organize your backend workflows." - [Guillermo Rauch](https://twitter.com/rauchg/status/1316808665370820609?s=20), Vercel
- "So every "cluster create" is a long-running Cadence operation. Once complete, this kicks of a variety of Cadence workflows _per cluster_ that run forever until it is destroyed. This lets you have a central "event loop" per cluster. For example: a "snapshot" triggers an event in the main event loop for a cluster, which ensures that no other ops (upgrades, etc.) are running at the same time, kicks off the snapshot job, then continues. We have long (multi-day/week) sleeps in the main event loop that wake up to renew TLS certs. And if any of the Cadence workers die, they come back up and continue right where they left off. Really just amazing technology. There's some great talks out there by the creators. An example use case they had (its out of Uber) was: every single driver on Uber has a long-running workflow that triggers monthly/bi-weekly to pay them, for example. Just super cool stuff." - [Mitchell Hashimoto](https://twitter.com/mitchellh/status/1316510643030114304?s=20)

## How Temporal Works

> Don't forget our own [Temporal Architecture docs](https://docs.temporal.io/docs/server-architecture/)!

- [A Practical Approach to Temporal Architecture](https://mikhail.io/2020/10/practical-approach-to-temporal-architecture/) by Mikhail Shilkov
- 

## Misc

Everything else that doesn't fit goes here.