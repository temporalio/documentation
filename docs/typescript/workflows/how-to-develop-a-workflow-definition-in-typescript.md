A Workflow Function has two parts:

- The function name is known as the Workflow Type.
- The function implementation code (body) is known as the Workflow Definition.

Each Workflow Definition is bundled with any third party dependencies, and registered by Workflow Type in a Worker. A Workflow function becomes a Workflow Execution (instance) only when started from a Workflow Client using its Workflow Type.

Workflow Definitions are _just functions_, which can store state, and orchestrate Activity Functions.
The following code snippet uses `proxyActivities` to create functions to schedule a `greet` Activity in the system to say hello.

A Workflow Function can have multiple parameters, however, we encourage you to use a single object parameter.

```typescript
type ExampleArgs = {
  name: string;
};

export async function example(
  args: ExampleArgs
): Promise<{ greeting: string }> {
  const greeting = await greet(args.name);
  return { greeting };
}
```

This Workflow Function takes the name of the parametera and assigns it to the variable name. Then it calls the function and pass the name of the varible as the argument. The funtion returns a promise with the value of `greeting`.
