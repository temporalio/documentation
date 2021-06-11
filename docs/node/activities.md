# Activities

In Temporal, Activities are typically used to represent side effects, like making an HTTP request.
Unlike [Workflows](/docs/node/determinism), activities run in the standard Node.js environment, not an [isolate](https://www.npmjs.com/package/isolated-vm).
So any code that needs to talk to the outside world needs to be in an Activity.

### Overview

Below is a simple Activity that accepts a string parameter, appends a word to it, and returns the result.
The Temporal Node SDK looks for any `.js` files in the `lib/activities` directory, and automatically registers any exported functions as Activities.

```typescript
export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}
```

Below is the equivalent vanilla JavaScript implementation.

```javascript
'use strict';

async function greet(name) {
  return `Hello, ${name}!`;
}
exports.greet = greet;
```

Under the hood, the Temporal Node SDK uses [Webpack](https://webpack.js.org/) to bundle your Activities before running them.
This [may cause issues with certain npm modules](https://www.getrevue.co/profile/masteringjs/issues/why-i-m-not-using-webpack-for-lambda-functions-anymore-266010).

### Importing and Using

You can import the above `greet()` Activity in a Workflow as shown below, assuming that the `greet` function is in the `lib/activities/greeter.js` file.

```typescript
import { greet } from '@activities/greeter';
```

You can also use `require()` as shown below.

```javascript
const { greet } = require('@activities/greeter');
```

Currently, you need to use the `@activities` prefix.
Do **not** import your Activity using the `'../activities/greeter'` path, otherwise your Activity will run in the same V8 isolate as your Workflow and your Activity will be subject to the same restrictions as your Workflow.