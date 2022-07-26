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

[![CI Status](https://img.shields.io/github/workflow/status/temporalio/sdk-typescript/Continuous%20Integration?style=for-the-badge)](https://www.npmjs.com/package/temporalio)
[![NPM](https://img.shields.io/npm/v/temporalio.svg?style=for-the-badge)](https://www.npmjs.com/package/temporalio)

To download the latest version of the Temporal TypeScript Command, run the following command:

```bash
npm i @temporalio/client @temporalio/worker @temporalio/workflow @temporalio/activity
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
