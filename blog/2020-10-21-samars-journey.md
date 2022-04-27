---
tags:
  - v1
  - Temporal
  - Reflections
  - microservice-orchestration
  - microservices
  - durable-task-framework
  - swf
posted_on_: 2020-10-14T00:06:09Z
slug: samars-journey
title: 'A Journey'
author: Samar Abbas
author_title: Cofounder/CTO
author_image_url: https://avatars2.githubusercontent.com/u/1766515?s=460&u=42e28f95a37b56ef80c55dbaaadd71bf3fc11261&v=4
image: https://dev-to-uploads.s3.amazonaws.com/i/4v9zqstwmt3h8ydru1ox.png
release_version: V1.1.1
---

<!--truncate-->

Back in 2010 I was contemplating my next move after working on Microsoft's Project Oslo. Oslo was an effort to deliver 10X productivity to developers which inspired me to set the following criteria for my next job:

1. **Iterate with Developers:** I want to work in a place where we can start small, get something in the hands of developers and then iterate over the product to solve real problems.
2. **Cloud:** So far I had been focussed on building platforms using bare-metal products. But I was starting to see the kind of requirements modern applications have around scale and resiliency. I knew Cloud had to be huge part of the experience to deliver on those requirements.

## Start of Journey

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/jv8et2b448mjtifrh1wy.png)

The Oslo framework led me to join the [AWS Simple Workflow (SWF)](https://aws.amazon.com/swf/) team. The team was led by Maxim Fateev, who came from a strong messaging background. Maxim was one of the most brilliant software engineers I had ever worked with, especially when it came to designing large scale distributed systems. Little did I know that I was about to embark on a long journey which is still being written to this day.

When I joined, the team was wrapping up a second version of the service which was already seeing decent usage within AWS. Even at the time, we could clearly see a pattern emerging. Developers were spending significant amounts of time building resiliency into applications, using low level primitives like queues, databases, retry mechanisms, durable timers, etc. Those same developers were able to produce higher quality systems with far less effort when using SWF instead of implementing resiliency themselves. Considering how useful the service was within AWS, the next natural step was to offer SWF publicly. I was part of the core team which worked on the public version of SWF which was launched in early 2012.

## Durable Task Framework (DTFx)

![](https://docs.microsoft.com/en-us/azure/azure-functions/durable/media/durable-functions-concepts/monitor.png)

After shipping the public SWF service, I took an opportunity at Microsoft Azure and ended up joining the [Azure Service Bus](https://azure.microsoft.com/en-us/services/service-bus/) team that owns the messaging stack for Azure. Cloud was steadily gaining momentum and as more and more workloads started to get migrated, teams like Azure Service Bus became a focal point. As application developers increasingly started adopting microservices architecture to keep up with scale and availability requirements for modern applications, services like Azure Service Bus became the backbone to orchestrate calls across microservices. To keep up with the explosive growth, I worked as part of the team focused on large scale ingestion through [Azure EventHubs](https://azure.microsoft.com/en-us/services/event-hubs/). This solved the scalability and reliability issues at a messaging layer but developers still had to work with very low level primitives whenever they need to reliably orchestrate calls across microservices. The result was complex architectures which were expensive to build, hard to operate, and still came with reliability challenges. Reliability challenges stemming from all sorts of failure cases which needed to be handled due to the distributed nature of the application.

I could clearly see that the developers building applications on Microsoft Azure were facing eerily similar challenges to what I had seen back at AWS. The same challenges we had tried to address with SWF. So I used one of the internal team hackathons as an opportunity to pair up with Affan Dar and take another stab at solving the problem. Affan had a very deep understanding of Azure ServiceBus so he was the perfect person to build the backend for the stateful C# experience I had in mind. Microsoft had recently added async/await capabilities into C# and it turned out to be an amazing fit for writing stateful applications which need to orchestrate calls among microservices. Since Java lacked an async/await like primitive, we had to rely on Promise-based async approach when building SWF. But with C#, we were able to deliver a much cleaner and synchronous programming model using async/await. This hackathon project resulted in Azure [Durable Task Framework](https://github.com/Azure/durabletask) as an OSS client SDK which uses Azure ServiceBus as the backend to provide a stateful workflow-as-code experience for applications. I'm so glad to see Microsoft has continued investing in the experience with [Azure Durable Functions](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview) as the latest reincarnation of the original effort. An effort which started with that hackathon project.

## Transportation as Reliable as Running Water

![](https://d3i4yxtzktqr9n.cloudfront.net/uber-sites/f452c7aefd72a6f52b36705c8015464e.jpg)

In 2015, Uber opened a development center in Seattle and I decided to take the leap and join the engineering team. Coincidently enough, Maxim Fateev ended up joining the Uber team in Seattle only a month after I did. At the time, Uber was running on Kafka 7 as the messaging backbone. Based on the scale they were running, they were encountering some serious operational issues. Considering Maxim and I had more than a decade worth of experience building messaging systems similar to Kafka, we decided to create the OSS project [Cherami](https://github.com/uber-archive/cherami-server) to address this Uber sized problem. After a year of working on the project, we were observing a very similar pattern to the one that we tried to solve with SWF and Durable Task Framework. When engineers needed to build with raw infrastructure primitives like queues and databases they were spending 80% of their time building resiliency into the application. This was clearly not sustainable for Uber, which was growing at an amazing pace and building a brand of "Transportation as Reliable as Running Water". This need to increase developer productivity without compromising on reliability of the system was the motivation for Maxim and I to create the OSS project [Cadence](https://github.com/uber/cadence). Within a very short period of time, we built a multi-tenant service hosted by our team. Cadence provided a great developer experience by enabling developers to use Golang to build and run stateful applications with very little operational overhead. Cadence grew organically within Uber and quickly became popular among developers. It slowly but surely began to emerge as the standard way to build stateful applications when reliability cannot be compromised.

## Magic of Open Source

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/8llekr4lqjmaok138su4.png)

Today, more businesses are turning to software for running mission critical parts of the system and software is becoming key part of the end-user experience. The problems faced by engineers at places like AWS, Microsoft Azure and Uber have become more and more common across the industry. This belief was validated in early 2019. Developers from companies like Hashicorp, Box, Doordash, Checkr and dozens of other places organically discovered the Temporal technology and immediately started using it for their mission critical workloads.

We have a strong belief that an infrastructure technology of this magnitude needs to built as an Open-source project. This led both Maxim and I to quit our jobs at Uber and launch [Temporal Technologies](https://temporal.io/) in October 2019. Over the last year we made huge advances with our developer experience and released [Temporal](https://github.com/temporalio/temporal/) as an Open Source Software under [MIT license](https://github.com/temporalio/temporal/blob/master/LICENSE). We recently launched our first production release of [Temporal v1.0.0](https://docs.temporal.io/blog/temporal-v1-announcement/) which is already being used by numerous companies for critical workloads.

https://temporal.io

https://github.com/temporalio/temporal
