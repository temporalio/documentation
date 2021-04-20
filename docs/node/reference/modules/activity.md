# Namespace: activity

This library provides tools for authoring activities.

Import this module from activity code - must **not** be used in workflows.

Any function can be used as an activity as long as its parameters and return value are serialiable using a [`DataConverter`](../interfaces/worker.dataconverter.md).

### Cancellation
Activities may be cancelled only if they [emit heartbeats](../classes/activity.context.md#heartbeat).<br/>
There are 2 ways to handle activity cancellation:
1. await on [`Context.current().cancelled`](../classes/activity.context.md#cancelled)
1. Pass the context's [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) at [`Context.current().cancellationSignal`](../classes/activity.context.md#cancellationsignal) to a library that supports it

### Examples

#### An activity that fakes progress and can be cancelled
```ts
import { Context, CancellationError } from '@temporalio/activity';

export async function fakeProgress(): Promise<void> {
  try {
    for (let progress = 1; progress <= 100; ++progress) {
      const timer = new Promise((resolve) => setTimeout(resolve, 1000));
      // sleep for 1 second or throw if activity is cancelled
      await Promise.race([Context.current().cancelled, timer]);
      Context.current().heartbeat(progress);
    }
  } catch (err) {
    if (err instanceof CancellationError) {
      // Cleanup
    }
    throw err;
  }
}
```

#### An activity that makes a cancellable HTTP request
```ts
import fetch from 'node-fetch';
import { Context } from '@temporalio/activity';

export async function cancellableFetch(url: string): Promise<Uint8Array> {
  const response = await fetch(url, { signal: Context.current().cancellationSignal });
  const contentLengthHeader = response.headers.get('Content-Length');
  if (contentLengthHeader === null) {
    throw new Error('expected Content-Length header to be set');
  }
  const contentLength = parseInt(contentLengthHeader);
  let bytesRead = 0;
  const chunks: Buffer[] = [];

  for await (const chunk of response.body) {
    if (!(chunk instanceof Buffer)) {
      throw new TypeError('Expected Buffer');
    }
    bytesRead += chunk.length;
    chunks.push(chunk);
    Context.current().heartbeat(bytesRead / contentLength);
  }
  return Buffer.concat(chunks);
}
```

## Table of contents

### Classes

- [CancellationError](../classes/activity.cancellationerror.md)
- [Context](../classes/activity.context.md)
