---
id: index
title: How to use the Temporal TypeScript SDK
sidebar_label: Temporal TypeScript SDK
description: Add the Temporal TypeScript SDK to your project.
tags:
  - developer-guide
  - sdk
  - typescript
---

[![NPM](https://img.shields.io/npm/v/temporalio.svg?style=for-the-badge)](https://www.npmjs.com/search?q=author%3Atemporal-sdk-team)

This project requires Node.js 14 or later.

**Create a new project**

_NOTE: There is an issue with Node.js 18 where this step might fail. Please follow this [slack thread](https://temporalio.slack.com/archives/CTRCR8RBP/p1664991819126059) for the most recent updates. In the meantime please directly clone your template from [samples-typescript](https://github.com/temporalio/samples-typescript)_

```bash
npx @temporalio/create@latest ./your-app
```

**Add to an existing project**

```bash
npm install @temporalio/client @temporalio/worker @temporalio/workflow @temporalio/activity @temporalio/common
```

:::note

The TypeScript SDK is designed with TypeScript-first developer experience in mind, but it works equally well with JavaScript.

:::
