---
tags:
  - v1
  - Temporal
  - Reflections  
  - microservice-orchestration
  - microservices
  - orleans
posted_on_: 2020-10-14T00:06:09Z
slug: sergey-why-i-joined-temporal
title: 'Why I joined Temporal'
author: Sergey Bykov
author_title: Engineering
author_image_url: https://avatars2.githubusercontent.com/u/8248806?s=460&v=4
image: https://avatars2.githubusercontent.com/u/8248806?s=460&v=4
release_version: V1.1.0
---

<!--truncate-->

I left Microsoft last month after a long and successful career. It's an understatement to say that most of my colleagues were surprised. What could possibly motivate me to leave the environment where I learned how the system works, built many relationships and knew how to make things happen? Not to mention the sizable amount of unvested stock.

To answer this question, we have to travel back more than a decade. The year was 2009, and I had recently moved to Microsoft Research from the Online Services Division. I joined a newly established lab with a charter to explore the future of Cloud Computing (still relatively novel at the time). More than joining the lab, I joined the project Orleans. A project that had a name, a 60,000-ft vision, and not a single line of written code. The vision was bold - to reimagine how cloud-scale application should be coded. At the time highly available high-performance scalable systems were only achievable by experts, and Orleans wanted to make it something possible for every developer. The question was how to reduce the amount of complexity inherent in this space. We believed the answer was a new programming model, that would change how developers conceptualize applications, how they structure code, and ultimately how they think about the problems they face.

As we were churning through early prototypes of Orleans, one crazy idea after another, I met a guy who was sitting around the corner on the same floor - Maxim Fateev. Maxim was on a different team working on some unrelated projects, but he also had some ideas of his own that he was prototyping. As developers do, we immediately started discussing our views on “what should be done and how”, pros and cons of the different approaches, the usual stuff. It became clear from those debates that I was interested in the domain of interactive workloads - with RPC-style request-response, low latency, high throughput, client-side retries when deemed necessary, and eventual consistency in case of node failures. That was the viral thing at the time, started by the Dynamo paper from Amazon. Maxim was interested in building a reliable workflow system that persisted variables and virtual call stacks, so that application code could "resume" its execution after a delay or failure. Almost as if it stayed on that line of code the whole time. At the time it sounded too slow to me considering the emerging workloads of interactive entertainment, Internet of Things, etc. I was younger, less experienced, and more opinionated then.

Maxim left Microsoft soon after, continuing to pursue his passion to build a workflow-based programming model. In the meantime, we shaped Orleans into a promising prototype, and eventually put it into production with the Halo team. This instantly boosted the credibility of our project and led to a number of collaborations/co-designs with internal and external partners.

Sometime in 2013 or 2014 we organized an Orleans hackathon for a select group of big partner companies. They coded while isolated from each other in separate rooms. To my surprise, out of seven companies three ended up building workflows as a major part of their application. A pattern started to emerge that I only recognized much later. Orleans users loved the simplicity and power of the “get an eternal object and invoke its method” model. At the same time, in some scenarios they needed a workflow solution for longer-running operations.

In Orleans, we had a suggested solution for building workflows - use reminders (persistent timers) to periodically activate and invoke workflow objects. That way they can check if it's time for them to perform an action or to transition to a new state. This minimalistic approach generally worked, although it left most of the complexity to the application developer. The community also built a number of workflow-like solutions, such as Orleans.Activities and Orleans.Sagas to fill the gap.

As we moved out of Research and into the product group, I got even more intimately involved in building and operating backend services for games, but the shadow of workflows continued following me. I kept encountering more and more workflow use cases. Either an operation inherently takes longer than an RPC call can afford to wait, for example, starting a virtual machine. Or a scenario where an operation succeeds most of the time promptly, but fails regularly enough that it could potentially time out and require a follow up. In such cases, an application typically needs a delayed action that would check if the operation succeeded, retry it if necessary or explicitly give up on the operation and to clean up any associated resources.

It is possible to implement such actions with timers and reminders and would involve ~following steps.

1. Register a reminder for the requested operation, so that it can recover from failures.
1. Execute an external API call to initiate a long running operation, such as allocation of a cloud resource.
1. Schedule a timer to periodically check if the operation succeeded until we reach a timeout we allotted to it.
1. If the operation successfully completed or failed, record or report the result, unregister timer, unregister reminder, clean up any intermediate state we recorded.
1. If the operation hasn't completed or failed within the timeout window, try to cancel it, record the fact that we've given up, perform the same cleanup as in 4.
1. Follow up on all cancellations to make sure we didn't leak any resources. This requires another piece of logic and a timer/reminder combination to guard its execution from potential failures.

Steps may vary depending on the types of resources being managed and their likelihood to fail and leak. But the main problem still looms - to perform a single line reliably, we were forced to put a lot of scaffolding code around that single line which expresses what we actually needed to do. Such complexity slows down developers at all stages:

- Initial development
- Failure testing and stabilization of the codebase
- Investigation of production incidents

We added a long list of features to Orleans over the years that helped developers build robust scalable systems. We even dared to integrate distributed ACID transactions, with help from our great partners in Research. But when somebody would inevitably ask, “how do I implement a long-running operation”, we would describe the same 6-step process with timers and reminders.

It eventually dawned on me that RPC and workflows are sort of yin and yang of interactive applications, that the debates from 10 years ago about RPC vs workflows should have been about merging the two and not choosing one over the other. Our team met with people at Microsoft Research about a year ago to discuss where they could help. Workflows were our number one ask. Our rationale was that if we could add an abstraction for workflows, that would greatly complement the RPC style that Orleans already excelled at. I'm pretty sure a number of people will think, "Doh, that's obvious. Why did it take you so long to realize it?" I'm okay with this embarrassment, as long as it serves as a useful lesson for others.

In the meantime, I heard through some mutual contacts that Maxim was now at Uber and was leading some ambitious project. Later I learned that it was called Cadence, yet another reliable workflow system that Maxim and Samar were working on, and it was open source. This put Cadence on my radar but in that “when have time to take a closer look” bucket. Somebody told me a few months ago that Maxim and Samar had started Temporal Technologies last fall. But I never considered startups to be my thing. However, as I began talking to them, my attitude rapidly started to change. As I learned more about the programming model of Temporal and descended down the rabbit hole of its implementation, I started seeing “workflows, workflows everywhere”, big and small, quick and long running, just like in that popular meme.

![](/img/workflow-meme.png)

If we could turn the six steps in the above list back into a few lines of trivial code, we would free developers from the burden of scaffolding, and enable them to focus on interesting problems. Workflows are somewhat like grains in Orleans - units of distribution, execution, and fault isolation. They are "just" executed differently - by the application supplied workers. I call this model Inversion of Execution, not sure if it will stick. There are, of course, other major architectural differences, but the high-level goals are the same - qualitatively reduce complexity of application code; make applications resilient (invincible) to inevitable failures; empower developers to solve more interesting problems than those we can take care of.

Besides the workflows everywhere, I also saw the two co-founders, roughly my age and level of experience, sharing the same passion I've had for many years. Both with track records of delivering innovative solutions following that passion. The startup environment provides a nearly complete freedom to pursue what we agree is right. There's no management hierarchy above to approve a decision or to allocate a budget. You just need to deliver the product and delight your customers. I kept thinking that if I were ever to join a startup, Temporal had to be it.

It is very difficult to get up and leave a comfortable well paid place where I've learned how to be successful, built many professional relationships and connections, and can navigate with my eyes closed. Yet I felt that if I play it safe and not jump into the unknown now, I might regret it for the rest of my life. So I decided to take the plunge, break the proverbial golden handcuffs, and go all in on Temporal.
