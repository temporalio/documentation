Since, Activities are referenced by their string name, you can reference them dynamically to get the result of an Activity Execution.

```typescript
export async function DynamicWorkflow(activityName, ...args) {
  const acts = proxyActivities(/* activityOptions */);

  // these are equivalent
  await acts.activity1();
  await acts['activity1']();

  let result = await acts[activityName](...args);
  return result;
}
```

The `proxyActivities()` returns an object that calls the Activiites in the funciton. `acts[activityName]()` references the Activity using the Activity name, then it returns the results.
