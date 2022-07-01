---
id: overview
title: How to use the Temporal TypeScript SDK
sidebar_label: Temporal TypeScript SDK
description: Add the Temporal TypeScript SDK to your project.
tags:
  - developer-guide
  - sdk
  - typescript
---

To download the latest version of the Temporal TypeScript Command, run the following command:

```bash
npm i temporalio
```

Or clone the TypeScript SDK repo to your preferred location:

```bash
git clone git@github.com:temporalio/sdk-typescript.git
```

This project requires Node.js 14 or later.

:::note
Both TypeScript and JavaScript can be used with the TypeScript SDK.
:::

**Create a new project**
```bash
npx @temporalio/create@latest ./my-app
```

**Add to an existing project**
```bash
npm install @temporalio/client @temporalio/worker @temporalio/workflow @temporalio/activity @temporalio/common
```
