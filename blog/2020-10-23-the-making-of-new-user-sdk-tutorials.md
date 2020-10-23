---
tags:
  - v1
  - temporal
  - announcement
  - tutorials
posted_on_: 2020-10-23T00:00:00
id: the-making-of-new-user-sdk-tutorials
title: The making of the new user SDK tutorials
author: Cully Wakelin
author_title: SDE Technical Writer
author_image_url: https://avatars2.githubusercontent.com/u/34380806?s=400&u=5cd38b5e4416a5d10cdf9ebd386eec1d02f0b067&v=4
image: /img/docs/sketchbook.png
release_version: V1.1.1
---

<img class="docs-image-centered docs-image-max-width-20" src={require('../static/img/docs/sketchbook.png').default} />

<!--truncate-->

&nbsp;&nbsp; Around the beginning of September it became clear that v1.0 of Temporal would be released by the end of the month and we would be ready to announce our funding shortly thereafter. So, from the perspective of our documentation, we wanted to align and prioritize our changes such that they amplified the effects of these events. With any product launch, we were hoping to see a buzz around the product and a surge in new users. And in the case of the latter, documentation would play an important role in introducing new users to the product and orienting them on their journey.

## Uphill challenges

<img class="docs-image-centered docs-image-max-width-20" src={require('../static/img/docs/hiker.png').default} />

In terms of our documentation, it’s no secret that we were facing a number of challenges. To start, product documentation is typically offered a secondary level of prioritization; Faced with limited resources, as long as the product ships with some minimal viable information and access to product experts who can answer questions, then at least most advanced users can get it going. So, documentation tends to lag behind in fully describing a product’s capability and feature set, which held true for Temporal.

Another challenge we were facing is that our docs started as a copy of the docs from Temporal’s predecessor, Cadence, and since the fork, there have been many core changes to the system, terminology, and SDKs. Many of these changes had yet to be propagated throughout the docs as well, so not only was there missing information, but some of it was just wrong.

Additionally, and one of the more challenging aspects of documenting Temporal is that it exists as something brand new; It presents a different approach to application development but ultimately does it through code such that users are faced with a set of familiar terms and concepts but must comprehend them in an entirely new context and landscape.

So, when it came to prioritizing documentation changes around the product launch, we began focusing on a specific problem: how do we offer a valuable “first experience” for new Temporal users such that they can get started using the product but also understand the value it provides, making it worth the effort of transitioning. So, while we wanted to maintain efforts to make sure that features and changes were being propagated throughout the docs, we decided to focus most of our energy on the new user experience.

<img class="docs-image-centered" src={require('../static/img/docs/temporal-server-and-sdk-icons.png').default} />

There are basically two parts to Temporal, the server and the SDK. Setting up the Temporal server for a live environment can be no small task, but it is really easy to get it running in a Docker container on your local machine, in fact you can do it with just two terminal commands. So, the friction for new users lies largely in starting out with one of the SDKs. Sure, an SDK is meant to abstract a lot of the complexities around interacting with the server API, but since Temporal flips a lot of the preconceived notions of modern application development on their head, the SDK docs needed to do more than just provide example usage. They also needed to show why, and allow the user to grasp the concepts that Temporal is promoting. But that is no small bag to unpack in just a few weeks. So we went about scoping something that we could realistically accomplish within that time frame and still be relatively effective.

We started as most might, trying to envision what the ideal situation would look like. Then we identified many of the steps it would take to get there. I would claim, in the end, that we managed to lock onto three big “steps” that we thought would get us closer to the ideal, and we hoped that combined they would result in a set of effective SDK tutorials for new users.

## Snipsync

<img class="docs-image-centered docs-image-max-width-20" src={require('../static/img/docs/sync.png').default} />

It was around this time (early September), that I was testing out a tool I had prototyped in Node. The concept is simple, and to this day I am surprised that it didn’t already exist; I am sure that any day now I will stumble upon a more established version that we were somehow able to completely miss. It downloads Github repos, scrapes code snippets that exist between specific comment wrappers, and writes the snippets to their corresponding comment wrappers in Markdown files. It basically automates the synchronization of code with the docs from any given repository. There are several benefits to this:

1. Code snippets in the documentation work, they are tested, and they can be copied and pasted directly into someone else’s editor.
2. We can control exactly which code is shown from a specific commit, in case bugs are introduced to the main branch.
3. We don’t actually have to commit the code into the docs. The code is merged into the Markdown at build time. The code is already reviewed and approved from the repo it is in, not in the documentation.

But, this also introduces a couple of challenges:

1. The code needs to have carefully reviewed comments, structure, and make sense within the context of the documentation. For example, if the code snippet is coming from a working repo it may include additional variables or function calls which must be minimized and optimized so that they don’t cause unnecessary confusion.
2. In the same way that the code must be optimized for the docs, the docs must be optimized for the code. In essence, the docs are being “driven” by the code. And if no one has coined the term yet, I think the credit for “code-driven documentation” should go to our Head of Product, Ryland Goldstein for he pinged me early one morning to share that epiphany with me.
We decided to try [Snipsync](https://github.com/temporalio/snipsync) and solve the challenges that it introduced.

## Template repos

<img class="docs-image-centered docs-image-max-width-20" src={require('../static/img/docs/templates.png').default} />

We actually had a repository of code samples for the Go SDK and Java SDK already. And while we desired to see more samples, there were already quite a few of them in each. However we discovered that users will likely want to view the source file and relative file path of the code snippet for added context. They will also be likely to clone the repo and try to run the sample. Shared sample repositories as we discovered tended to have two issues:

1. While effective, they have more overhead in terms of approachability than that of stand alone repositories that have a single fully working application sample designed to illustrate certain concepts.
2. When it comes to SDKs in multiple languages and shared repos, it is harder to retain the idiomatic nature of the languages and mirror the functionality of the samples across the different languages than if each sample existed in its own repo.

So, we created template repos for each of the sample applications that we planned on using in our docs. The templates can be easily copied, built, and run in a matter of minutes.

- [Go money transfer template repo](https://github.com/temporalio/money-transfer-project-template-go)
- [Go hello world template repo](https://github.com/temporalio/hello-world-project-template-go)
- [Java money transfer template repo](https://github.com/temporalio/money-transfer-project-template-java)
- [Java hello world template repo](https://github.com/temporalio/hello-world-project-template-java)

## The tutorial

<img class="docs-image-centered docs-image-max-width-20" src={require('../static/img/docs/tutorials.png').default} />

Since we really wanted new users to grasp some of the core value propositions Temporal offers, we decided to aim for a “tutorial” style of documentation. The first iterations aimed to build upon and replace the existing SDK “quick start” pages that maintained the industry standard of showing an example that printed “Hello World!” to the console. But, as you may have guessed, this route wasn’t sufficient enough to show users the real values that Temporal offers.

So, we approached our co-founder and CEO, Maxim Fateev, and asked him to give us the same demonstration that he liked to give when introducing the software to another engineer for the first time. One of Maxim’s go-to scenarios is a money transfer from one bank account to another. “Aha!” we said, because as it turns out, for someone new to Temporal the attraction doesn’t come from using the SDK to print “Hello World!”, but it is instead to witness the inherent benefits that Temporal offers by running simulations using a pre-built application.

Because everyone can understand the ramifications of losing money during a transaction, the money transfer demonstration shows off at least four of Temporal’s main value propositions:

1. The state of the code execution is maintained even through server outages and crashes.
2. There is deep visibility into the state of the code execution via the CLI or UI.
3. Code has automatic timeouts and retries, which are easily configurable.
4. Bugs can be fixed “on-the-fly” without losing the state of the code execution.

So, it was this direction that we decided to send new users. Once a user can wrap their heads around the value that Temporal brings to their application right out of the box, then spending time and energy on application setup and learning the SDK becomes trivial.

## Next steps

<img class="docs-image-centered docs-image-max-width-20" src={require('../static/img/docs/steps.png').default} />

We are far from satisfied with our documentation. We plan to bring SDK reference right into the docs, merge SDK tutorials into a single journey, so that a user can easily see how things are done across different languages, rewrite our concepts, re-write server management docs, and prepare for our hosted cloud offering that will enable all developers to build invincible applications.
