---
tags:
  - temporal
  - sdk
  - typescript
  - javascript
posted_on_: 2022-07-26T00:00:00Z
slug: typescript-1.0.0
title: '1.0.0 release of the Temporal TypeScript SDK'
author: Roey Berman & Loren Sands-Ramshaw
author_title: Engineering
author_image_url: /img/roey-loren.jpg
---

After almost 2 years of development, 736 commits, 441 pull requests, and 49 releases, we've finally published the stable
`1.0.0` version of the Temporal TypeScript SDK. In this post, we'll share what's special about this SDK, how it's been
built, how we've improved the API, and our future plans.

<!--truncate-->

> For those new to [Temporal](https://temporal.io/), We think of it as a "durable code execution framework." We execute
> your backend code in a durable fashion: by persisting each step your program takes, we can recover your program's
> state in the event of failure—even if the machine goes offline or loses power in the middle of execution. We also
> durably retry and timeout external calls, so if your services or databases are unreachable or returning errors, we
> will keep retrying until they're back in a good state. This allows backend engineers to develop at a new, higher level
> of abstraction that is oblivious to faults in the system. See also a [video
> introduction](https://twitter.com/lorendsr/status/1544806504443695104?s=20&t=XFYNWSB8BEroAhjA6ATDPQ) and [formal
> definition](https://docs.temporal.io/temporal).

We call it the TypeScript SDK, but we designed it for TypeScript and JavaScript developers alike.

## What makes this SDK unique?

### Deterministic sandboxed workflow runtime

The SDK leverages V8 isolates (the technology behind Chrome's isolation) to run each Workflow in an isolated JavaScript
runtime to get a distinct global scope and to prevent the use of "unsafe" JavaScript modules that could break the code's
[deterministic constraints](https://docs.temporal.io/workflows#deterministic-constraints). All non-deterministic
JavaScript APIs, such as getting the current time or a random number, have been replaced with [deterministic
versions](https://docs.temporal.io/typescript/determinism#sources-of-non-determinism).

With all of this put together, we eliminated an entire class of footguns and made it easier to get started with
Temporal.
Realizing the benefits of the deterministic runtime, we've set the tone for the future of Temporal SDKs. We'll strive to
bring this added safety to the older and upcoming SDKs.

### Reliability through a shared Core

This is the first stable SDK built on top of a shared Rust Core SDK (see [blog
post](https://docs.temporal.io/blog/why-rust-powers-core-sdk/) and [repo](https://github.com/temporalio/sdk-core/)). We
started developing the Core SDK around the same time as the TypeScript SDK, and the API boundary between the two
evolved over time.

Most of the complex concurrency management and state machine logic is in Core, which means that:

- We can build new SDKs and features much faster. For example, our [Python
  SDK](https://github.com/temporalio/sdk-python) (currently in alpha) was built in just a few months.
- Our SDKs are more reliable: When a problem is fixed in Core, it is fixed for all Core-based SDKs. Our previous SDKs
  implemented the complex logic differently, and have had very different bugs and quirks.


## Built with the community

When we released the first alpha version of the SDK back in March of 2021, we set out to iterate on the public API and
have asked our community of users to help us shape it.

We've been very fortunate to have received such wide adoption for the SDK, especially at such an early stage. The SDK's
Slack channel ([#typescript-sdk](https://temporal.io/slack)) has grown to more than 1200 members, and we've been
actively responding to and supporting users on a daily basis.

The feedback and trust we've gotten from our early adopters has been invaluable. We wouldn't have been able to reach API
and functional stability without them. Thank you for putting up with our [many breaking
changes](https://github.com/temporalio/sdk-typescript/blob/main/CHANGELOG.md) during the alpha and beta. From now on, we
are committed to maintain backwards-compatibility for Core APIs and history replayablity, and to miminize
backward-incompatible changes for non-Core APIs.

A special thank you to everyone [who contributed](https://github.com/temporalio/sdk-typescript/graphs/contributors) to
the SDK's development—[Sushisource](https://github.com/Sushisource), [vkarpov15](https://github.com/vkarpov15),
[mjameswh](https://github.com/mjameswh), [JoshuaKGoldberg](https://github.com/JoshuaKGoldberg),
[yoDon](https://github.com/yoDon), [SamSokolin](https://github.com/SamSokolin),
[julianocomg](https://github.com/julianocomg), [vitarb](https://github.com/vitarb),
[joebowbeer](https://github.com/joebowbeer), [andreasasprou](https://github.com/andreasasprou), and
[jameslnewell](https://github.com/jameslnewell)—and to [swyx](https://twitter.com/swyx) for writing and recording most
of the [docs and tutorials](https://docs.temporal.io/typescript/introduction/) and tirelessly advocating for API
simplication. We welcome more involvement from anyone, from helping answer community questions to submitting issues or
PRs—check out [CONTRIBUTING.md](https://github.com/temporalio/sdk-typescript/blob/main/CONTRIBUTING.md) for more
information.

## The journey

Since the first release of the SDK, we've made significant changes to the public API.

We went from Workflows that look like this, where a Workflow interface was required, we relied on path aliases, and the
Workflow name was based on the containing file—

:::note proposal - stage 1
```ts
import { Example } from '@interfaces/workflows';
import { greet } from '@activities/greeter';

async function main(name: string): Promise<string> {
  const greeting = await greet(name);
  console.log(greeting);
}

export const workflow: Example = { main };
```
:::

—to this, where Activities are proxied using their types and Workflows names are function names—

:::note alpha - stage 2
```ts
import { createActivityHandle } from '@temporalio/workflow';
import { Example } from '../interfaces';
import type * as activities from '../activities';

const { greet } = createActivityHandle<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export const example: Example = (name: string) => ({
  async execute(): Promise<string> {
    return await greet(name);
  },
});
```
:::

—to where we are today, where Workflows are just functions and don't require interface definitions:

:::note stable - stage 3
```ts
import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function example(name: string): Promise<string> {
  return await greet(name);
}
```
:::

## The future

Now that the SDK is stable, we will invest in even safer APIs to help steer users in the right direction by avoiding
common anti-patterns, and we will invest in developer tools that make the local development experience better, like IDE
plugins.

There are many more general Temporal features planned this year, including:

- Synchronous Updates (like a Signal, but can return a value)
- Better versioning
- More languages: [Python](https://github.com/temporalio/sdk-python) is close to beta and more will be announced later
  this year.

## Learn more

To learn more about using the TypeScript SDK, check out [our docs and
tutorials](https://docs.temporal.io/typescript/introduction/). If you have questions, you can post a new topic with the
`#typescript-sdk` tag on our [community forum](https://community.temporal.io/).

We're building Temporal because we want to enable developers to easily build highly reliable applications. We hope you find it useful!
