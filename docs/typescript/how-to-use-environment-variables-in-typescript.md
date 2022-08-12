---
id: how-to-use-environment-variables-in-typescript
title: How to use environment variables in TypeScript
sidebar_label: Use Environment Variables
description: Use Environment Variables
tags:
  - developer-guide
  - sdk
  - typescript
---

**Using in Activity code**

```ts
async function runWorker(): Promise<void> {
  const activities = createActivities({ apiKey: process.env.MAILGUN_API_KEY });

  const worker = await Worker.create({
    taskQueue: 'example',
    activities,
    workflowsPath: require.resolve('./workflows'),
  });
  await worker.run();
}

const createActivities = (envVars: { apiKey: string }) => ({
  async sendNotificationEmail(): Promise<void> {
    // ...
    await axios({
      url: `https://api.mailgun.net/v3/your-domain/messages`,
      method: 'post',
      params: { to, from, subject, html },
      auth: {
        username: 'api',
        password: envVars.apiKey,
      },
    });
  },
});
```

**Getting into Workflow**

If we needed environment variables in our Workflow, here's how we'd use a Local Activity:

```ts
const worker = await Worker.create({
  taskQueue: 'example',
  activities: createActivities(process.env),
  workflowsPath: require.resolve('./workflows'),
});

type EnvVars = Record<string, string>;

const createActivities = (envVars: EnvVars) => ({
  async getEnvVars(): Promise<EnvVars> {
    return envVars;
  },
  async sendNotificationEmail(apiKey: string): Promise<void> {
    // ...
    await axios({
      url: `https://api.mailgun.net/v3/your-domain/messages`,
      method: 'post',
      params: { to, from, subject, html },
      auth: {
        username: 'api',
        password: apiKey,
      },
    });
  },
});
```

```ts
const { getEnvVars } = proxyLocalActivities({
  startToCloseTimeout: '1m',
});

const { sendNotificationEmail } = proxyActivities({
  startToCloseTimeout: '1m',
});

async function yourWorkflow() {
  const envVars = await getEnvVars();
  if (!envVars.apiKey) {
    throw new Error('missing env var apiKey');
  }
  await sendNotificationEmail(envVars.apiKey);
}
```
