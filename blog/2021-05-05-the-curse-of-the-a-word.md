---
tags:
  - v1
  - Temporal
  - microservice-orchestration
  - microservices
  - orleans
posted_on_: 2021-05-05T07:00:00Z
slug: sergey-the-curse-of-the-a-word
title: "The Curse of the A-word"
author: Sergey Bykov
author_title: Engineering
author_image_url: https://avatars2.githubusercontent.com/u/8248806?s=460&v=4
image: https://avatars2.githubusercontent.com/u/8248806?s=460&v=4
release_version: V1.9.1
---

<!--truncate-->

![Actors](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rlw56fpp0hjgd73xmq8h.png)

I wanted to write this post ever since I saw David Fowler's tweet and the discussion it triggered.
![David Fowler](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qt8irq2n337p5tsf7u4i.png)
While it may have taken me quite some time to get around to answering it, 2020 wasn't an ordinary year by any measure.

I took my first steps into the Actor Model space more than a decade ago, when I started working on the Orleans project. I have been and will continue to be an enthusiast of actors. We published a few papers and I gave a number of talks about them. However, over time I gradually stopped using the term 'actors' even when explaining the properties and benefits of the Actor Model. This post is an attempt to explain why.

## Minefield of Conflations

When we open-sourced Orleans in January of 2015, I was surprised by the amount of debate it generated on the seemingly trivial topic. The debate was about whether or not Orleans was in fact a faithful implementation of the Actor Model and if grains were actors at all. Even though we published the tech report "[Orleans: Distributed Virtual Actors for Programmability and Scalability](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/Orleans-MSR-TR-2014-41.pdf)" nine months beforehand, it didn't seem to help much in those discussions.

It honestly took us more than a year to reach a point when Virtual Actors of Orleans were generally recognized as a legitimate interpretation of the Actor Model. It was not just another interpretation, but one that has its unique benefits, especially for high-scale applications like cloud services. I was shocked by the uphill battle it took to get there. Over time, I came to realize that a big reason for these debates is the fact that actors are inherently a minefield of conflations.

### Conflation #1: Distributed & Local

Whenever somebody would say "we are using actors", I learned to first ask, "is it for a distributed system or a single-process?" This question was necessary because many developers use actors as a concurrency mechanism, leveraging their "processes one message at a time" property. The Orleans team was coming from the C#/.NET background where there was already a strong support for concurrency and asynchrony, with features like Promises (Tasks) and await. So from our vantage point, there was little reason to use actors just for basic concurrency. However, in languages with less native support for concurrency (ie: Java), local actors (used within a single process) continue to be a useful mechanism for concurrency and asynchrony.

Both local and distributed actors adhere to the same three rules of the Actor Model definition — in response to a message, an actor can:

- Send messages to other actors
- Create actors
- Change its behavior for next message

However, distributed actors that live in a cluster of servers exist in a very different and more hostile environment; an environment of network messages, latencies, failure modes, and uncertainty about their state.

Despite the commonality of the core three rules that apply to both, I would argue there's very little else in common between local and distributed actors, especially when it comes to application design, tradeoffs, failure modes, and major aspects of how actors supporting runtimes are implemented.

### Conflation #2: Supervision Trees & Actors

Erlang was the first popular implementation of the Actor Model. Arguably, it was Erlang that is responsible for bringing actors into the mainstream and pioneering a number of important design choices. One of them was the idea of supervisors which are actors that are responsible for handling failures of other actors by recreating or restarting them, etc. Supervisors are usually used in hierarchies, known as supervision trees. These trees make it easy to reset a system of interconnected actors into a known state after a failure.

Akka, being a faithful adaptation of Erlang ideas to the JVM world, also implemented supervision trees as the key failure handling mechanism. When your goal is to build a resilient system that cleanly resets chunks of its state in response to a failure this makes a ton of sense. The subtlety of the fact that supervision trees of Erlang and Akka are just a way to implement actors was lost on many people. In their minds, supervisors and supervision trees became part of the Actor Model itself.

It took us a lot of effort to explain why we chose a different approach (Virtual Actors) to handling failures in Orleans. The Virtual Actor method of automatic lifecycle management by the runtime doesn't use supervisors and has its benefits, especially in many cloud scenarios. Keep in mind that the supervision tree approach may be superior in other cases, such as where you have a hierarchy of actors and need the ability to reset it. The point is that "actors" ≠ "supervision trees", and it's a tax having to explain it to new people coming from the Erlang/Akka background.

### Conflation #3: Message Passing & One-Way Messages

In the world of traditional actors, it is more common to send one-way messages without expecting an immediate response. More than that, the request-response (RPC) pattern is considered dangerous. Actor developers are told to use it with extra care because the calling actor will be blocked until a response is received.

In Orleans, we chose the opposite default, with asynchronous RPC being the primary way of invoking actors. Each such RPC call has a built-in timeout. That removes the need for developers to worry about their actor getting blocked forever. Actors can also be marked as reentrant, so that they aren’t blocked from processing other calls at all while awaiting for a response.

Multiple asynchronous RPC calls can be made by an actor concurrently, e.g. to fan out to a number of other actors. The elegance of async/await makes merging of the resulting promises in a desired way and awaiting a joint Promise for the whole fan-out operation a trivial pattern.

One-way messages are also supported in Orleans, but they are not the primary pattern because in most cases developers want to know at least if a call successfully arrived to the caller or failed or timed out.

This is yet another fundamental area with a significant "explanation tax", incurred by the different choices other implementations of the Actor Model have made. I suspect that if we had not used the term "actor" in defining Orleans from the beginning, we wouldn't have spent so much effort explaining ourselves. The async/await pattern for efficiently managing asynchrony had been established in the .NET ecosystem a long time ago, and there's no expectation of supervision trees in that developer community.

### Conflation #4: State transition & Become

This is a smaller issue. However, I’ve had several conversations with people who insisted on a specific interpretation of the third rule of actors (that they can change their behavior of processing subsequent messages). They interpreted it to mean that there must be an explicit way to tell an actor to become something different. The claim was that if your actors don't support an explicit feature like that, they are not real actors.

In my opinion, this rule simply means that an actor can change its internal state, whether it’s a formal state machine or a boolean/enum flag that will define how the actor should process another call. For example, Digital Twins are a mainstream pattern to model program entities that shadow physical IoT devices in order to reflect their state and to communicate with them. Actors are an obvious fit to implement Digital Twins.

When a Digital Twin actor receives a "turn device off" command, it is very natural for the actor to flip an internal state variable that reflects the “off” state. In that state, the actor ignores or rejects all commands except for a "turn device on", which flips that variable back to “on”.

## Elephant in the Room: Actors & Models

![Actor Model](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hgwatx1rr8zxfamkbnx0.png)

I've seen a number of presentations about actors that start with a meme slide showing some famous actor’s photo. This is because the vast majority of developers have never heard of the Actor Model. This would be ok if the term "actor" carried some intuitive connotation for them. In my experience, it does not. Even worse, when presenting about Orleans, the minority of the audience that knew about actors often had the above listed conflations in mind. It was a no-win situation, for both parts of the audience. Every time I presented, I had to spend energy and time pushing that boulder up the hill. At some point I stopped doing that by avoiding talking about actors altogether.

Instead, I started describing grains in Orleans as objects that live somewhere within a cluster of servers. These objects have stable identities and are always available for an invocation. Objects are a widely understood concept. It is easy to build on the concept by adding that each such object has a unique identifier of your choosing, hides (encapsulates) its state, and is only accessible via asynchronous method calls defined as part of an interface. Object, interface, method call — these are no new concepts to grasp. You just have to imagine objects working transparently across machine boundaries in the combined memory and compute space of a cluster. This approach was more effective, catering to a wide range of audiences, from academic to experienced cloud developers to “I want to learn about building scalable applications” developers.

I'm happy that we chose to call Orleans actors "grains", not "actors". "Grain" is not a perfect term by any means, but at least it conveys the general idea of a rather small piece of an application. I would argue it is much better than "actor".

[The landing page of Orleans documentation](https://dotnet.github.io/orleans/docs/index.html) nowadays only mentions actors once — in reference to our [Orleans: Distributed Virtual Actors for Programmability and Scalability](https://www.microsoft.com/en-us/research/publication/orleans-distributed-virtual-actors-for-programmability-and-scalability/) 2014 paper. This is a result of our conscious effort of reducing the cognitive load on people that come to the page to learn about Orleans.

[Reuben Bond](https://twitter.com/reubenbond) recently started describing grains as Cloud Native Objects. Again, not a perfect term. But I like it because it tries to convey the benefits of the model and where it is most applicable. [Roger Johansson](https://twitter.com/RogerAlsing) even suggested a CNOB acronym for it. 🙂

![Roger Johansson](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cjtxg7phtl0vu8yfk6jh.png)

## Conclusion

I am a big fan of the Actor Model as a simple and clean model of computations. In particular, it is an excellent fit for building distributed systems, whether it be on premises or in the cloud. I am forever grateful to Carl Hewitt, Peter Bishop, and Richard Steiger for their original insight, and to many subsequent followers that pushed those ideas forward. Implementations of the Actor Model and the ideas it pioneered power many high-scale and mission-critical systems today.

At the same time, I’m convinced now that the name of the term "actor" was a rather unfortunate choice. It took me years to gradually arrive to this realization. In my view, the very word “actor” continues to be a major barrier for adoption of the Actor Model ideas for the broader population of developers. I cannot formally prove it. This is just my speculation, of course. I listed several other contributing factors that in my opinion add to this confusion.

Remember that old saying about two hard things in computer science: naming things and cache invalidation? I believe it is part of the answer to the question, “Why aren’t actor frameworks more popular?

In my opinion, the Cloudflare folks made a pragmatic choice to call their (for all practical purposes) virtual actors "durable objects." Once again not perfect, but much more developer friendly than "actors." I like Reuben's idea of calling grains Cloud Native Objects. It helps people quickly get a high-level intuitive understanding of what it is and decide if it's relevant to them.

If there’s a better term, I'm open to your ideas. Just not "actors", please.
