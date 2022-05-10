---
id: external-resources
title: External Resources
sidebar_label: External Resources
---

There are many ways to introduce and teach Temporal based on what background you are coming from. Temporal doesn't have a monopoly on explaining Temporal.

Here, we list great blogposts and videos by Temporal staff and users that may be helpful in increasing your understanding or convincing your team.

If you have made a tutorial or explanation of Temporal, please [submit them here](https://github.com/temporalio/documentation/edit/master/docs/external-resources.md) so that others can find it!

## Press Announcements

There have been many high-level descriptions of Temporal from our Series A and B PR. This may be helpful for non-technical or technical-adjacent audiences:

- **Series B (2022)** Linked in [our Series B press roundup](https://docs.temporal.io/blog/series-b-press)
- **Series A (2020)**: Linked in [our Series A blogpost](https://docs.temporal.io/blog/funding-announcement)

## How Temporal works

_Don't forget our own explainers on [What is Temporal](https://docs.temporal.io/temporal-explained/introduction)!_

- **Talks**
  - ⭐ [Designing a Workflow Engine from First Principles](https://docs.temporal.io/blog/workflow-engine-principles/) by Maxim Fateev (23 min talk given at Systems @ Scale 2021)
  - 🆕 [Fault Tolerant, Distributed Microservices Orchestration with Temporal](https://www.youtube.com/watch?v=6T6zVZHU7_Q) ([slides](https://temporal-intro-and-demo.netlify.app/)) by Maxim Fateev and Tihomir Surdilovic (35 min talk at TheDevConf 2021)
  - [State of Affairs or Affairs of State](https://www.youtube.com/watch?v=2P_aXee2qh4) by Sergey Bykov (35 min talk on Stateless vs Stateful, Orleans vs Temporal)
  - [Introduction to Temporal Architecture](https://www.youtube.com/watch?v=wMUKhtRhlmY) by Dominik Tornow (16 min talk + Q&A)
  - [Temporal in 7 Minutes - The TL;DR Intro](https://www.youtube.com/watch?v=2HjnQlnA5eY) by swyx (7 min presentation)
- **Podcasts**
  - [Maxim and Samar on Gremlin's podcast](https://docs.temporal.io/blog/gremlin-podcast) - Origin story, Choreography vs Orchestration, and Tips (21 min listen/read)
  - [Workflow Engine with Maxim Fateev](https://www.listennotes.com/podcasts/software/cadence-ubers-workflow-nNoaPiSfk7v/) on Software Engineering Daily (56 min listen)
  - [Maxim Fateev on Temporal Origin Story](/blog/oss-startups-podcast) on the OSS Startups Podcast (41 min listen)
  - [Temporal Product with Ryland Goldstein](https://softwareengineeringdaily.com/2021/05/08/temporal-product-managing-state-with-ryland-goldstein/) on Software Engineering Daily (53 min listen)
  - [Temporal Developer Experience with swyx](https://devtools.fm/episode/13) on Devtools.fm (56 min listen)
  - [Temporal Overview](https://mongodb.libsyn.com/ep-93-swyx-learn-in-public-and-temporal) on the MongoDB Podcast (33min listen, starts at 15min mark)
  - [Temporal vs the Serverless Ecosystem](https://www.serverlesschats.com/124/) on the Serverless Chats Podcast (65min listen)
- Temporal's previous iteration was Cadence, which shares a lot of the same design principles:
  - [Cadence Architecture Talk](https://www.youtube.com/watch?v=5M5eiNBUf4Q) (24 min) by Samar Abbas at the 2017 Uber Cadence meetup
  - [Cadence: Micro service Architecture Beyond Request/Response](https://www.youtube.com/watch?v=BJwFxqdSx4Y) (34 min) by Maxim Fateev at Data@Scale 2017
  - Note: we have documented [the difference between Cadence and Temporal](https://docs.temporal.io/cadence-to-temporal) separately.

## Why Workflow Orchestration

- [Build a Reliable System in a Microservices World](https://eng.snap.com/build_a_reliable_system_in_a_microservices_world_at_snap) on Snap Engineering Blog

  > Building a reliable “simple” microservices system is not simple. It often requires engineers to think through edge cases and write boilerplate error handling logic in any places where systems are integrated. Beyond error handling, in certain systems like payment or billing systems if we are not able to track the application states, it could mean money loss or other worse consequences.

- [How Chronosphere built a deployment system with Temporal](https://chronosphere.io/learn/how-chronosphere-built-a-deployment-system-with-temporal/) on Chronosphere Blog

  > **Temporal has enabled Chronosphere to more safely and reliably automate complex, long-running tasks.** It has also enabled us to easily reuse common activities across different types of workflows. For example, the helper that pauses a workflow if an alert fires can be used by our deployment system and capacity tooling with just a few lines of code. This empowers engineers across different teams to ship features quickly while meeting our rigorous standards for safety and customer trust.

- [Dealing with Failure](https://dev.to/temporalio/dealing-with-failure-5adf) on Dev.to

  > Dealing with failures is the most important aspect of any system. Oftentimes, it is what stands between a product that runs as expected and one that keeps producing surprises and causing investigations. **When done right, handling of failures is what differentiates a professional from an amateur.**

- [Microservices Architecture With Temporal.io](https://spiralscout.com/blog/temporal-workflow-and-microservices) on the SpiralScout blog

  > The Temporal Workflows engine is incredibly powerful and provides full control over workflows, including **retries, timeouts, backpressure, and the parallel execution of activities**. Workflows can be written in most programming languages and include checks, conditions, and sequences of execution.

- [The macro problem with microservices](https://stackoverflow.blog/2020/11/23/the-macro-problem-with-microservices/) on the StackOverflow blog

  > In just 20 years, software engineering has shifted — from architecting monoliths with a single database and centralized state — to microservices where everything is distributed across multiple containers, servers, data centers, and even continents. **Distributing things solves scaling concerns, but introduces a whole new world of problems**, many of which were previously solved by monoliths.

- [Temporal Tackles Microservice Reliability Headaches](https://thenewstack.io/temporal-tackles-microservice-reliability-headaches/) on the New Stack blog

  > Using code, it aims to hide the complexity of building with microservices across distributed systems. It employs **durable virtual memory not linked to a specific process that preserves the application state** despite a whole range of possible failures.

- [Polyglot Microservices with gRPC](https://www.redhat.com/architect/grpc-use-cases) on the Red Hat blog

  > Temporal's benefit is that developers can implement activities easily in a variety of languages. Each activity sends its mission-critical data to a gRPC client that forwards it to a gRPC server. The gRPC server then passes all that data from those language-specific tasks onto the backend Temporal service. Temporal does the heavy lifting of ensuring execution in the face of danger, such as a momentary network outage or an unexpected slowdown in disk access.

- [Using Temporal to outsource operational concerns](https://www.jcheng.org/post/workflow-orchestration-1.1/) by Jon Cheng

  > Unlike Step Functions and Conductor, the entire Temporal Workflow is defined by code. This makes the behavior of the entire program easier to understand. Moreover, for users of the Go or Java SDK, the users may take advantage of the compiler to catch a wide array of errors as well as improve quality in a large team. Then code is guaranteed to execute as you specified on the Temporal Platform. **All of the operational stuff: Retries, recovery, persistent state, message queues, scaling, work distribution, tracing and monitoring are all handled by the platform itself.** This really is amazing stuff! If C simplified writng portable code, and GC simplified memory management, and serverless simplified scalable architectures, Temporal simplifies implementing a computer program on top of a fragile, distributed system.

- [A comparison of Temporal Workflows vs Actor Toolkits like Akka and Vert.X](https://manuel.bernhardt.io/2021/04/12/tour-of-temporal-welcome-to-the-workflow) by Manuel Bernhardt

  > Just like actors provide the illusion of single-threaded, sequential execution, workflows provide the illusion of persistent method calls.

## External content

_Note: Each of [our SDK docs](/application-development) have a Hello World and Run Your First App tutorial!_

- Architecture
  - [Why Temporal - the iPhone of System Design](https://www.swyx.io/why-temporal/) by swyx (19 min read)
  - [Temporal - fault tolerant orchestration platform](https://www.youtube.com/watch?v=7dnutdT24MM&list=PLU1vS0speL2ZbTPg-aU2Rw2s6IPsTVoCF&index=49) at DevConf US by Tihomir Surdilovic (36 min talk + Q&A)
  - [A Practical Approach to Temporal Architecture](https://mikhail.io/2020/10/practical-approach-to-temporal-architecture/) by Mikhail Shilkov (4 min read)
- Alternative Databases
  - [Getting Started with YugabyteDB, Temporal, and the Temporal-Maru Benchmarking Tool](https://blog.yugabyte.com/getting-started-yugabytedb-temporal) by Eric Pratt (7 min read)
  - [Just plug it in - Aiven & Temporal](https://aiven.io/blog/just-plug-it-in-aiven-and-temporal) by Andrew Staller (7 min read)
  - [Easily Manage Workflows at Scale with Temporal.io and Astra DB](https://www.datastax.com/blog/easily-manage-workflows-at-scale-with-temporal-io-and-astra-db) by Melissa Herrera, Ranjan Melanta (10 min read)
- Tutorials
  - (Go) [Intro to Temporal](https://zerokspot.com/weblog/2021/12/18/intro-to-temporalio/) by Horst Gutmann (6 min read)
  - (Go) [Writing a Workflow, Simulating Failures, Comparing Retries with Apache Airflow, and Testing](https://www.jcheng.org/post/workflow-orchestration-1.2/) by Jon Cheng (8 min read)
  - (Go) [Intro to Temporal Workshop](https://www.youtube.com/watch?v=UwdGmdTO3Ts) by Márk Sági-Kazár (3 hour full workshop)
  - (Go) [How to migrate from Mailchimp to Postmark + Temporal](https://roelofjanelsinga.com/articles/migrate-from-mailchimp-postmark-temporal/) by Roelof Jan Elsinga (5 min tutorial)
  - (Go) [Passing Context with Temporal](https://spiralscout.com/blog/passing-context-with-temporal) by Aliaksei Novikau of SpiralScout (7 min read)
  - (Go) [Creating a custom Temporal data convertor for encryption](https://nightfall.ai/creating-a-custom-temporal-data-convertor-for-encryption) by Chris Cowell and Rohan Sathe
- Talks
  - (TypeScript) [Temporal - React for the Backend](https://changelog.com/jsparty/208) on JSParty (57 min listen)
  - (PHP) [Fault tolerant workflow orchestration on PHP](https://www.youtube.com/watch?v=pdxHkIqX62A) at PHPKonf 2021 by Anton Titov (37 min talk)
- Other Languages
  - (Español) [Construye aplicaciones invencibles con Temporal](https://sistecma.github.io/2021/02/04/aplicaciones-invencibles-con-temporal.html) y [Aplicando el patrón SAGA en tus microservicios construidos](https://sistecma.github.io/2021/03/04/aplicando-saga-en-microservicios-con-temporal.html) by Hernán Moreno
  - (Türkçe) [Nedir Bu Temporal.IO?](https://alameddinc.medium.com/nedir-bu-temporal-io-680f3b242136) by Alameddin Çelik
  - (русский) [PHP Russia talks](https://docs.temporal.io/php/introduction/#resources) by Anton Titov
  - (中文) [Temporal 简介](https://www.yuque.com/abser/txixor/oz3yav) by Abser Ari 杨鼎睿
- _submit yours [here](https://github.com/temporalio/documentation/edit/master/docs/external-resources.md)!_

## Temporal users

- [Mitchell Hashimoto](https://twitter.com/mitchellh/status/1316510643030114304?s=20), Hashicorp

  > So every "cluster create" is a long-running Cadence operation. Once complete, this kicks of a variety of Cadence workflows _per cluster_ that run forever until it is destroyed. **This lets you have a central "event loop" per cluster.** For example: a "snapshot" triggers an event in the main event loop for a cluster, which ensures that no other ops (upgrades, etc.) are running at the same time, kicks off the snapshot job, then continues.
  >
  > We have **long (multi-day/week) sleeps** in the main event loop that wake up to renew TLS certs. And if any of the Cadence workers die, they come back up and continue right where they left off.

- [Software Delivery Building Blocks at Datadog](https://www.youtube.com/watch?v=eWFpl-nzGsY&feature=youtu.be) by Jacob LeGrone and Kevin Devroede (Datadog) (starting at 6min 30s)

  > Temporal lets [Datadog]:
  >
  > 1. write "fault oblivious" stateful control flow and business logic, in the programming language of your choice,
  > 2. respond to external events,
  > 3. support very long running operations,
  > 4. Communicate with 3rd party services

- [Building Reliable Workflows: Cadence as a Fallback for Event-Driven Processing](https://doordash.engineering/2020/08/14/workflows-cadence-event-driven-processing/) by Alan Lin (DoorDash)

  > Moving to a fully asynchronous-based event driven processing system will in our case result in **big performance gains** as we move off a synchronous processing model for one of our core flows. Eventually... we will eventually build enough confidence in the platform to use it solely for our primary delivery creation flow. **This will bring us massive gains in developer productivity** due to its ease of use and abstraction of fussy details.

- [Reuben Bond](https://twitter.com/reubenbond/status/1338901280090025985?s=20), Microsoft

  > "Certain programming models allow more to be in the lower layers, not exposed to the application, due to their semantics and failure models. Eg, as was mentioned with Temporal - **the app code is failure oblivious and retries/backoff/jitter/durability can be handled below**"

- [Richard Kettelerij](https://twitter.com/rkettelerij/status/1320477838156435456?s=20), Mindloops

  > "Pretty awesome tech. **Allows you to express long running processes in a fault tolerant way** using Java (or Go) without explicit timers, queues, polling, etc. Like in this example: "pause" a method for 30 days, something you wouldn't normally do."

- [Ido Shamun](https://twitter.com/idoshamun/status/1476530942739193860), Daily.dev

  > "A fault-tolerant sleep statement is what caught my attention and convinced me to try @temporalio. This is so fun to use!"

- [Guillermo Rauch](https://twitter.com/rauchg/status/1316808665370820609?s=20), Vercel

  > "**Temporal does to backend and infra what React did to frontend.** If you're in the React world, you've forgotten about manually adding and removing DOM elements, updating attributes and their quirks, hooking up event listeners… It's not only been a boost in developer experience, but most importantly in _consistency and reliability_. In the backend world, this reliability problem is absurdly amplified as monoliths break into SaaS services, functions, containers… You have to carefully manage and create queues to capture each side effect, ensure everything gets retried, state is scattered all over the place. Temporal's engine is quite complex, much like React's, but the surface exposed to the developer is a beautiful "render()" function to organize your backend workflows."

## Community distros

- [Airbyte](https://github.com/airbytehq/airbyte) - [ELT data pipeline platform (see talk)](https://www.youtube.com/watch?v=K25Bt5asd8I)
- [Roadrunner](https://github.com/roadrunner-server/roadrunner) - PHP application server
- [Coinbase/temporal-ruby](https://github.com/coinbase/temporal-ruby) - Ruby SDK with Rails example
- [DataDog/temporalite](https://github.com/DataDog/temporalite) - Single binary distro for CI (see talk)
- [Nunchi Blacksmith](https://www.nunchi.studio/blacksmith/start/onboarding/how) - ETL data platform

## Community SDKs

- [Ruby](https://github.com/coinbase/temporal-ruby)
- [Python](https://github.com/firdaus/temporal-python-sdk)

## Misc

_Everything that doesn't fit above goes here._

If you can't find what you need, don't hesitate to ask on the Temporal Slack, or search in the Forums where there are common questions like:

- [What is the best practice for a polling activity?](https://community.temporal.io/t/what-is-the-best-practice-for-a-polling-activity/328)
- [How to create a Signalling system for Human driven workflows? SMS OTP use case](https://community.temporal.io/t/signalling-system-human-driven-workflows/160)
- [What is the recommended setup for running Cadence/Temporal with Cassandra on production?](https://community.temporal.io/t/what-is-the-recommended-setup-for-running-cadence-temporal-with-cassandra-on-production/556)
- [Why use Temporal over a combination of AWS Step Functions and AWS Lambda?](https://community.temporal.io/t/why-use-temporal-over-a-combination-of-aws-step-functions-and-aws-lambda/342)
- [Do we need Kafka with Temporal?](https://community.temporal.io/t/temporal-and-kafka/410)
