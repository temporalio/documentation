---
id: how-to-use-test-frameworks-in-typescript
title: How to use test frameworks in TypeScript
sidebar_label: Test frameworks
description: Test frameworks
tags:
  - developer-guide
  - sdk
  - typescript
---

TypeScript has sample tests with [Jest](https://jestjs.io/) and [Mocha](https://mochajs.org/).

**Jest**

- Minimum Jest version: `27.0.0`
  <<<<<<< HEAD
- # [Sample test file](https://github.com/temporalio/samples-typescript/blob/main/activities-examples/src/workflows.test.ts)
- [Sample test file](https://github.com/temporalio/samples-typescript/blob/main/activities-examples/src/workflows.t
  est.ts)
  > > > > > > > cc8379314f58230c1c25a621f5549015901dd17f
- [`jest.config.js`](https://github.com/temporalio/samples-typescript/blob/main/activities-examples/jest.config.js) (Must use [`testEnvironment: 'node'`](https://jestjs.io/docs/configuration#testenvironment-string). `testEnvironment: 'jsdom'` is not supported.)

**Mocha**

- [Sample test file](https://github.com/temporalio/samples-typescript/blob/main/activities-examples/src/mocha/workflows.test.ts)
- Test coverage library: [`@temporalio/nyc-test-coverage`](https://github.com/temporalio/sdk-typescript/tree/main/packages/nyc-test-coverage)
