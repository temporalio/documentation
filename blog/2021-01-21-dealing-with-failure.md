---
tags:
  - v1
  - Temporal
  - microservice-orchestration
  - microservices
  - errors
posted_on_: 2021-01-21T00:00:09Z
slug: dealing-with-failure
title: 'Dealing with failure'
author: Sergey Bykov
author_title: Engineering
author_image_url: https://avatars2.githubusercontent.com/u/8248806?s=460&v=4
image: https://res.cloudinary.com/practicaldev/image/fetch/s--7RGv4ASg--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/u22ppsaodkhc3ekickb4.png
release_version: V1.5.1
---

<!--truncate-->

**Latest Release at Time of Writing:** V1.5.1

I recently gave a talk at the CodeMesh conference, and I spent half of it reflecting on the seemingly boring topic of dealing with failures. The talk was primarily based on my experience building and helping others build cloud services with the Orleans framework. I chose this topic, because I believe dealing with failures is the most important aspect of any system. Oftentimes, it is what stands between a product that runs as expected and one that keeps producing surprises and causing investigations. When done right, handling of failures is what differentiates a professional from an amateur.

The talk covered three approaches that I've seen and applied the most myself:

- Request-Reply (a.k.a RPC)
- Using persistent queues
- Workflows

## 1. Request-Reply

In my opinion, Request-Reply ([a.k.a. RPC -- Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call)), is the most natural way of handling failures. The client makes a request to the server and waits for a response (up to a timeout) and in most cases learns about a request processing failure immediately. This is how HTTP works, for example.

> _Note that by client and server I mean simply two sides of the call. They can be real client and server processes or merely two tiny objects communicating with each other within a distributed system._

Simplicity of RPC is good for the server.

> _"I try to do what the request asked me to. If there's any failure downstream, I return it to the client. The client knows best what to do, to retry or not, how many times, with a backoff or not. My logic can stay simple."_

In our world of overly complicated systems, the value of simplicity is difficult to overstate. However, in this case the complexity burden gets pushed to the client. This puts the remote client at a disadvantage here. It has to operate based on the limited error information it received back. Sometimes it’s just a communication error or a timeout. These are a few of the many possible real life cases:

- An error may not be clear about whether the requested operation actually failed. It might have succeeded, and the error happened while trying to communicate success. This forces the client to either check for the status of the operations or retry anyway, assuming retrying the operation can be done safely, i.e. it is idempotent.
- The system may be temporarily unavailable, actually being down or network partitioned from the client. For mobile applications that's rather expected.
- Partial failures are hard to deal with. When we need to update multiple external systems at once, there is almost never a way to do that in an all-or-nothing manner, i.e. atomically. So, we have to handle retries and rollbacks, side effects, and all the inevitable complexity.

The last point I illustrated with the following picture:
![Request-Reply](/img/dealing-failure/request-reply.png)

In this example, the client (square blue thing) makes a request to the server (round green thing). The server does not have the information locally to satisfy the client request and therefore needs to call two external services, blue and purple.

If either of those two sub-calls fail, the server returns an error to the client. If the client were to retry the request, there would need to be a mechanism in the server that prevents duplicate calls to the external services.Idempotency is one method of addressing this issue. If the client decides to give up, there needs to be a way to revert any changes made as part of processing the request before the failure (in our example - of the call to the service A).

A canonical example is money transfer from an account in one bank to an account in a different bank. However, there are many other scenarios with conceptually indentical requirements. In many cloud orchestration cases we need to allocate a resource (such as a virtual machine), and then perform a number of operations with it before returning it in a ready state to the client. If any operation fails, we don’t want to leave the VM running. Nor do we want to keep allocating new VMs for the same request.

To summarize the pros and cons of the RPC approach.

Pros:

- Simplicity
- Obvious correlation between a request and a failure

Cons:

- Retries are client's responsibility and are difficult to do for a remote client
- Partial failures are difficult to handle

## 2. Persistent Queues

Putting a persistent queue between the client and server solves a number of problems. The client just needs to successfully send a request to the queue to ensure that it will eventually be processed.

![Queue](/img/dealing-failure/queues.png)

Assuming the server only deletes a request from the queue after it is successfully processed, we get a simple retry mechanism. Due to the queue, even if the server crashes and restarts in between the attempts, it will keep trying to process the request again and again. The fact that the client (producer) is completely decoupled from the server (consumer), means the client can enqueue requests even if the server is down. This is the main reason why the publisher-subscriber architecture is so popular. Separation of subsystems in space and time is a nice property.

![Chang'e-5](/img/dealing-failure/moon-orbit.jpeg)

###### _A simulated illustration of Chang'e-5 probe's orbiter-returner's separation from the ascender on the moon orbit, December 6, 2020. /CNSA_

For streaming one-way events, queues are great. But how can the client get a response in a queue based architecture? There's no good answer to this question that I'm aware of. Responses need to be delivered (somehow) back to the client, usually over another queue. Then the client needs a way to correlate requests and responses, typically done via correlation IDs. There also needs to be timeout mechanisms for dealing with requests that never received a response.

Retries are simpler with queues compared to the RPC case. They are pretty much automatic, as long as the request stays in the queue. Calls to external services still need to be idempotent. However, we can't retry forever and have to deal with requests that keep failing to process. Either because they clog the queue (if the queue is ordered), consume too many resources or cause excessive load on the external services. The popular approach is to treat such requests as "poison messages", by moving them out of the queue to a different location ("dead letter" queue) for special handling.

Pros:

- Separation of systems in space and time
- Automatic retries
- Simple when no responses are expected

Cons:

- Additional dependency of the queueing technology
- Extra work to correlate responses
- Queues may clog
- Special handling of "poison messages"

## 3. Workflows

Similar to queues, workflows take the burden of ensuring successful execution of requests off the client's shoulders. But instead of writing them into a shared queue, requests are persisted as part of an independent workflow document. That document makes processing requests stateful:

- Tracking which steps of processing succeeded
- Tracking which steps of processing failed
- Remembering how many retries have been made, etc

![Workflow](/img/dealing-failure/workflows.png)

Workflows have other important properties and use cases. They are a great way to implement long-running business processes, incorporate human operations and react to events. From the failure handling perspective, the most important aspect of workflows is the ability to be more intelligent when handling partial failures. Instead of being oblivious about what happened in the past, a workflow can keep a log of all relevant information and make informed decisions about what to retry and when.

Workflows can be individually addressable, which makes them easier to scale compared with shared queues. It also allows for targeted inspection and even on-the-fly modification of their state, if needed.

At the same time, workflows "inherit" most of the challenges of queues. Responses still need to be correlated with requests, although the individual addressability of workflows makes it easier for the client to query results. "Poison messages" are also still possible. They don't clog the queue anymore, but still require special handling.

Pros:

- Partial separation of systems in time and space
- Robust handling of partial failures
- Support for long-running operation
- Retries are "automatic"

Cons:

- Additional dependency on a workflow system or complexity of in-house implementation
- Extra work to correlate responses
- Special handling of "poison messages"

## Conclusion

It's a cliché that in our business there's no free lunch, only tradeoffs. As unoriginal as they might sound, many clichés are true. Dealing with failures is an area of important tradeoffs. There's obviously no single pattern that fits all scenarios. In fact, many systems leverage all three patterns I described.

For simpler requests that need a prompt response and aren’t involved with complex multi-step processing, Request-Reply is often the right approach. One-way messages, events, data streams are clear candidates for Queues. Workflows are a good fit for reliable execution of relatively complex requests that either require multi-step processing or can leak resources if failures aren't properly handled.
