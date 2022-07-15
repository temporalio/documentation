# 1.0.0 release of our TypeScript SDK

After almost 2 years of development, 728 commits, 431 pull requests, and 48 releases we're finally releasing the stable
version of the Temporal TypeScript SDK.

The SDK was designed with TypeScript-first developer experience in mind, but works equally well with JavaScript.

## What makes this SDK unique?

### Shared Core

This is the first stable SDK built on top of a shared Rust [Core SDK](https://github.com/temporalio/sdk-core/). The
development of the Core SDK was started roughly around the time we started to develop the TypeScript SDK, and the API
boundary between the two evolved over time.

By investing in a shared Core, we can reuse lot of the complex concurrency management and state machine logic to build
new SDKs much faster. For example, our Python SDK (currently in Alpha) was built in just a few months. Sharing the logic
makes all of our SDKs more reliable because when a problem is fixed in Core it is fixed for any dependent SDK.

### Sandboxed workflow runtime

The SDK leverages V8 isolates (the technology behind Chrome's isolation) to run each workflow in an isolated JavaScript
runtime with a distinct global scope and to prevent the use of "unsafe" JavaScript modules that could break the code's
[deterministic constraints](https://docs.temporal.io/workflows#deterministic-constraints).  All non-deterministic
JavaScript APIs, such as getting the current time or a random number, have been replaced with deterministic versions.

With all of this put together, we eliminated an entire class of footguns and made it easier to get started with
Temporal.

## Built with the community

When we released the first Alpha of the SDK back in March of 2021, we set out to iterate on the public API and have
asked our community of users to help us shape it.

We've been very fortunate to have gotten such wide adoption for an SDK at such an early stage. The SDK's [Slack
channel](https://temporal.io/slack) has grown to more than 1000 members, and we've been actively responding and
supporting users on a daily basis.

The feedback and trust we've gotten from our early adopters to put the SDK in production has been invaluable. We
wouldn't have been able to reach API and functional stability without them.

## The journey

Since the first release of the SDK, we've made significant changes to the public API.

We went from workflows that look like this where a workflow interface was required, we relied on path aliases, and the
workflow name was based on the containing file—

```ts
import { Example } from '@interfaces/workflows';
import { greet } from '@activities/greeter';

async function main(name: string): Promise<string> {
  const greeting = await greet(name);
  console.log(greeting);
}

export const workflow: Example = { main };
```

—to this where activities are proxied using their types and workflows names function names—

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

—to where we are today where workflows are just functions and don't require interface definitions.

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

## The future

Now that the SDK is stable, we will invest in even safer APIs to help steer users in the right path by avoiding common
anti-patterns. We'll build high-level abstractions that make writing workflows with long histories easier. And we will
invest in developer tools that make the local development experience better, like IDE plugins.

There are many more general Temporal features planned this year (TODO: should we mention some of those here?)


## Try it out now

Get started with one of our many [samples](https://github.com/temporalio/samples-typescript) using our package
initializer:

```
npm init @temporalio
```
