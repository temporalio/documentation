---
tags:
  - v1
  - Temporal
  - microservice-orchestration
  - microservices
  - engineering
posted_on_: 2020-10-29T00:06:09Z
slug: temporal-a-students-dream
title: "Temporal - a students dream"
author: Manu Srivastava
author_title: Engineering
author_image_url: https://avatars2.githubusercontent.com/u/5552381?s=88&u=1ee5691d390f3281efecaa23dea30f471bc9230f&v=4
image: /img/a-students-dream/manu-background-image.png
release_version: V1.2.1
---

<!--truncate-->

Imagine, two bleary-eyed college students scrambling late into the night to finish their last Computer Science project for the semester. The application they are writing takes a large problem and breaks it down into individual sub-problems that can be solved more easily. Unfortunately, there are too many subproblems for a single machine to handle, so the students realize they need to throw more machines into the mix.

Having quickly achieved consensus on the distributed algorithm, they get to work. All they have to do is implement their code and then deploy it on a set of machines. They figure they will be done within a couple of hours. Easy, right?

![easy button](/img/a-students-dream/easy-button.png)

As they start coding, it quickly becomes clear that they have vastly underestimated the requirements. The algorithm works great on a laptop, but when it comes to executing it on a cluster of machines, they start asking themselves the following questions:

1. Which machine is responsible for coordinating (sending/receiving of sub-problems/results) with the other machines?
2. How do the other machines “know” who the coordinator is?
3. What protocol will be used so that the coordinator and workers are able to talk with each other? Do they need to handcraft a custom one?
4. What if the coordinator reboots or fails? Do they have to start solving the entire problem from the beginning again? Who takes over the coordinator role?
5. What if one of the “worker” machines recycles? Who tells the coordinator that it is not getting an answer back and that it needs to re-issue the subproblem?
6. What if work starts to pile up? How can we increase overall throughput by adding more worker machines in a balanced manner?
7. How does one make sure that a worker machine does not get assigned too many items?

![This is fine meme](/img/a-students-dream/this-is-fine.png)

These questions touch upon a number of _key_ Distributed Systems topics. But this was before cloud computing was the ubiquitous behemoth it is today. For two exhausted college students who were itching to call it quits on the semester, having to think through these problems at the 11th-hour was the absolute last thing they wanted to do.

Needless to say, in desperation, they took a number of shortcuts. They were able to cobble together a flimsy solution that yielded an answer; However, it would have fallen completely flat on its face at even the tiniest of network blips.

At the end of the day, they spent 95%+ of the time focusing on the infrastructure _running_ the algorithm as opposed to the algorithm itself. As they dragged themselves back from that final class, one of them made an offhand remark that it could be an interesting future project to potentially “solve this the right way.”

![Rubiks cube](/img/a-students-dream/rubiks-cube.png)

If you haven't already figured it out by now, one of those college students was me. And after three months at Temporal, it has now just occurred to me: I am working on the very platform that my naïve college-aged self would have happily traded a week’s worth of cafeteria credits for. It is a platform that would have enabled us to actually complete the project within our hyper-aggressive initial estimate of a “couple of hours.” A Temporal cluster would have literally taken care of all of the questions we had to deal with above.

![Graduation cap](/img/a-students-dream/graduation-cap.png)

It’s been over a decade since I’ve stepped back into a Computer Science class, but from a distance, I’ve seen curriculums evolve to keep up with the pace of technology. When I was graduating, they had just started to introduce map-reduce as a concept in our Operating Systems course. Now schools are offering classes on Bitcoin, Cloud Computing, No SQL databases, VR development and so on.

I truly believe that the concepts behind Temporal deserve at least a lecture or two in any standard undergraduate Distributed Systems course. Given how powerful Temporal is, I predict this will be the case in the future.
