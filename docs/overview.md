---
id: overview
title: Overview
sidebar_label: Overview
---

import ReactPlayer from 'react-player'

A large number of use cases span beyond a single request-reply, require tracking
of a complex state, respond to asynchronous events, and communicate to external unreliable dependencies.
The usual approach to building such applications is a hodgepodge of stateless services,
databases, cron jobs, and queuing systems. This negatively impacts the developer productivity as most of the code is
dedicated to plumbing, obscuring the actual business logic behind a myriad of low-level details. Such systems frequently have availability problems as it is hard to keep all the components healthy.

The Temporal solution is a [_fault-oblivious stateful_ programming model](/docs/learn-workflows) that obscures most of the complexities of building scalable distributed applications. In essence, Temporal provides a durable virtual memory that is not
linked to a specific process, and preserves the full application state, including function stacks, with local variables across all sorts of host and software failures.
This allows you to write code using the full power of a programming language while Temporal takes care of durability, availability, and scalability of the application.

Temporal consists of a programming framework (or client library) and a managed service (or backend).
The framework enables developers to author and coordinate tasks in familiar languages
([Go](https://github.com/temporalio/temporal-go-sdk/) and [Java](https://github.com/temporalio/temporal-java-sdk)
are supported today with some projects in [Python](https://github.com/firdaus/cadence-python) and
[C#](https://github.com/nforgeio/neonKUBE/tree/master/Lib/Neon.Cadence)
via a [proxy](https://github.com/nforgeio/neonKUBE/tree/master/Go/src/github.com/loopieio/cadence-proxy)
in development).

The framework enables developers to author fault-oblivious code in familiar languages.
([Go](https://github.com/temporalio/temporal-go-sdk/) and [Java](https://github.com/temporalio/temporal-java-sdk)
are in production. [Python](https://github.com/firdaus/cadence-python) and
[C#](https://github.com/nforgeio/neonKUBE/tree/master/Lib/Neon.Cadence) are under development).

The backend service is stateless and relies on a persistent store. Currently, Cassandra and MySQL stores
are supported. An adapter to any other database that provides multi-row single shard transactions
can be added. There are different service deployment models. At Uber, our team operates multitenant clusters
that are shared by hundreds of applications.

Watch Maxim's talk from the Uber Open Summit for an introduction to the Temporal programming model and value proposition.

<ReactPlayer url='https://www.youtube.com/watch?v=llmsBGKOuWI' />

The GitHub repo for the Temporal server is [temporalio/temporal](https://github.com/temporalio/temporal). The docker
image for the Temporal server is available on Docker Hub at
[temporalio/server](https://hub.docker.com/r/temporalio/server).
