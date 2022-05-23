---
tags:
  - v1
  - temporal
  - tutorials
posted_on_: 2020-11-12T00:00:00
slug: the-making-of-new-user-sdk-tutorials
title: The process of creating SDK tutorials for new users
author: Cully Wakelin
author_title: SDE Technical Writer
author_image_url: https://avatars2.githubusercontent.com/u/34380806?s=400&u=5cd38b5e4416a5d10cdf9ebd386eec1d02f0b067&v=4
image: https://raw.githubusercontent.com/temporalio/documentation-images/main/static/sketchbook.png
release_version: V1.1.1
---

<img alt="image" class="docs-image-centered docs-image-max-width-20" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/sketchbook.png" />

<!--truncate-->

In early September it was clear that V1 of Temporal would be ready by the end of that month and we would be announcing our funding shortly thereafter. From a documentation perspective, we felt that it was important to coordinate changes in a way that would support the announcement. As with any product launch, we were hoping to create some buzz and see a surge in new users. Considering that documentation is one of the most important aspects of new user adoption, we had our work cut out for us.

## Uphill challenges

<img alt="image" class="docs-image-centered docs-image-max-width-20" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/hiker.png" />

In terms of our documentation, there were at least three challenges we were facing. Two of those challenges stemmed directly from the fact that our docs started as a fork of the docs from Temporal's predecessor.

The first challenge is that the information we inherited lagged behind in fully describing Temporal's capability and feature set. One of the reasons for this is that documentation is typically offered a secondary level of prioritization. While Temporal now prioritizes documentation, this was not always true from where Temporal originated as Cadence.

The second challenge was that there have been many core changes to the system, terminology, and SDKs in the time since Temporal forked from its predecessor. Back in early September, many of these changes had yet to be propagated throughout the docs as well. So, not only was there missing information but some of the existing information was just plain incorrect.

The final and biggest challenge of documenting Temporal is that it is fundamentally new. Temporal presents a different approach to application development. Users are faced with a set of familiar terms and concepts but must comprehend them in an entirely new context and landscape.

## Picking a path

<img alt="image" class="docs-image-centered" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/temporal-server-and-sdk-icons.png" />

At a high level, there are two parts to Temporal: the backend and a client-side SDK. Configuring, deploying, and operating the Temporal backend for a live environment is no small task. On the other hand, it is really easy to [get Temporal running on your local machine](/clusters/quick-install) in a Docker container. In fact, you can do it with just two terminal commands.

The Docker route definitely simplifies running the backend, which means the majority of friction for new users comes from our SDKs ([Go](https://github.com/temporalio/sdk-go), [Java](https://github.com/temporalio/sdk-java)). While an SDK is meant to abstract the complexities of interacting with the server API, Temporal flips a lot of the preconceived notions of modern application development on their head. The SDK docs needed to do more than just provide example usage. They also needed to show the "why" to enable the user to grasp the concepts that Temporal is promoting. So we went about scoping something that we could realistically accomplish within that time frame and still be relatively effective.

We decided that the best thing for us to focus on was a great new user experience. We wanted something that would enable a developer to start using the product right away but also leave them with an understanding of the value Temporal provides. We wanted to cultivate that "aha!" moment.

We started as most might, by trying to envision what the ideal new user experience would look like. We then identified as many of the steps it would take to get there as possible. Looking back, I would contend that we managed to lock onto three ideas that we thought would get us closer to the ideal experience. The hope was that once these three ideas were combined they would result in a set of effective SDK tutorials for new users.

## Snipsync

<img alt="image" class="docs-image-centered docs-image-max-width-20" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/sync.png" />

It was around this time (early September), that I was testing out a Node.js tool I had built to improve the experience of creating and maintaining documentation. It downloads Github repos, scrapes code snippets that exist between specific comment wrappers, and writes the snippets to their corresponding comment wrappers in Markdown files.

```go title="Source code"
// @@@SNIPSTART unique-name-of-snippet
SomeFunc() {}
// @@@SNIPEND
```

```md title="Markdown file"
<!--SNIPSTART unique-name-of-snippet-->
<!--SNIPEND-->
```

We borrowed the idea from [Google's proprietary version](https://github.com/GoogleCloudPlatform/golang-samples/blob/master/secretmanager/get_secret.go#L17) they use for their [Google Cloud documentation](https://cloud.google.com/docs). The concept is fairly simple, and I am still surprised that there was no existing open-source solution. So we made one!

A tool that automates the synchronization of code with the docs from any given repository has several key benefits:

1. Code snippets in the documentation are guaranteed to work as they are continuously tested. This also means that they can be reliably copied and pasted into the user's editor.
2. We control exactly which lines of code are shown and can also target a specific branch or commit. This is a great safeguard against bugs which might be introduced to the main branch.
3. We never have to commit source code into the docs. The code is merged into the Markdown at build time. This ensures that the code is already reviewed and approved from the repo it resides in.

Snipsync does come with a few considerations:

1. Embedded code needs to have carefully reviewed comments, structure, and make sense within the context of the documentation. For example, if the code snippet is coming from a working repo it may include additional variables or function calls. These must be minimized and optimized out so they don’t cause unnecessary confusion.
2. In the same way that the code must be optimized for the docs, the docs must also be optimized for the code. In essence, the docs are being “driven” and "defined" by the underlying code. And if no one has coined the term yet, I think the credit for “code-driven documentation” should go to our Head of Product, Ryland Goldstein, as he pinged me one afternoon to share that epiphany with me.

<img alt="image" class="docs-image-centered" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/code-driven-docs-post.png" />

We decided to embrace [Snipsync](https://github.com/temporalio/snipsync) as the challenges it introduced were minimal compared to the value.

## Template repos

<img alt="image" class="docs-image-centered docs-image-max-width-20" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/templates.png" />

We now had a way to synchronize code with our documentation. But from where will the code be synchronized? We know users will likely want to view the source file and relative file path of the code snippet for added context. They will also be likely to clone the repo and try to run the sample.

We actually already repositories of code samples for the [Go SDK](https://github.com/temporalio/samples-go) and [Java SDK](https://github.com/temporalio/samples-java). While we desired to see more samples, there were already quite a few of them in each repository. But, we discovered that shared sample repositories tend to have two issues that made them less ideal for synchronizing with docs.

1. While convenient, colocating multiple samples in a single repo is far less approachable compared with storing samples in self-contained repos.
2. In shared sample repositories, it is harder to retain the idiomatic nature of any language and mirror the functionality of any sample across different languages.

So for each of the sample applications we planned on using to drive our documentation, we created a corresponding template repo. These template repos can be easily copied, built, and run in a matter of minutes.

- [Go money transfer template repo](https://github.com/temporalio/money-transfer-project-template-go)
- [Go hello world template repo](https://github.com/temporalio/hello-world-project-template-go)
- [Java money transfer template repo](https://github.com/temporalio/money-transfer-project-template-java)
- [Java hello world template repo](https://github.com/temporalio/hello-world-project-template-java)

## The tutorial

<img alt="image" class="docs-image-centered docs-image-max-width-20" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/tutorials.png" />

Since the goal of our documentation changes was to help with new user acquisition, we decided to aim for a "tutorial" style of documentation. The first iterations aimed to build upon and replace the existing SDK “quick start” pages that maintained the status quo and printed “Hello World!” to the console. As you may have guessed, this route wasn’t sufficient enough to show users the real value Temporal offers.

Once it became clear that a standard approach wasn't going to cut it, we brought in our co-founder and CEO, Maxim Fateev. We asked him to give us a demonstration that he typically uses to introduce engineers to Temporal for the first time. The scenario represents a money transfer from one bank account to another and during the demo Maxim demonstrates what happens if one of the steps in the transfer fails. The money transfer sample was a great way to introduce the values of Temporal. For if you understand the ramifications of losing money from a failed financial transaction, several values of Temporal become immediately apparent:

1. The state of running code is maintained even through hardware failures, server crashes, and network outages.
2. There is deep visibility into the state of code execution out of the box via the CLI or UI.
3. Function calls come with automatic and retries and configurable timeouts.
4. Bugs can be hot fixed in running code.

For someone that is new to Temporal the attraction doesn’t come from using the SDK to print “Hello World!”. Instead it comes from witnessing the inherent benefits that Temporal offers by running simulations using a pre-built application.

This is the direction that we decided to send new users. If a user can wrap their heads around the value that Temporal brings to their application right out of the box, then spending time and energy on application setup and learning the SDK becomes a non-blocker.

Check out these finished tutorials and see for yourself!

- [Go: Run your first Temporal application](/go/run-your-first-app-tutorial)
- [Java: Run your first Temporal application](/java/run-your-first-app-tutorial)

## Next steps

<img alt="image" className="docs-image-centered docs-image-max-width-20" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/steps.png" />

At Temporal we understand that our documentation plays a very important role in our users' experience. And to get our docs into a world class state we have lots of work in front of us. In the near future we will be looking at the end-to-end journey through our documentation and how we can provide the best experience for every user. To validate any direction we take, we will be engaging with the community to hear what you think and help us dial things in. Any user can [schedule a 15 minute feedback session](https://calendly.com/cully-temporal/schedule-feedback-session) with me directly! We will also be preparing for all the new and exciting features around our hosted cloud offering that will enable all developers to build invincible applications.
