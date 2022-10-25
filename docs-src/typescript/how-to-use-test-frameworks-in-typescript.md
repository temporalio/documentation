---
id: how-to-use-test-frameworks-in-typescript
title: How to use test frameworks in TypeScript
sidebar_label: Test frameworks
description: TypeScript has sample tests for Jest and Mocha.
tags:
  - developer-guide
  - sdk
  - typescript
---

TypeScript has sample tests for [Jest](https://jestjs.io/) and [Mocha](https://mochajs.org/).

**Jest**

- Minimum Jest version: `27.0.0`
- [Sample test file](https://github.com/temporalio/samples-typescript/blob/main/activities-examples/src/workflows.test.ts)
- [`jest.config.js`](https://github.com/temporalio/samples-typescript/blob/main/activities-examples/jest.config.js) (must use [`testEnvironment: 'node'`](https://jestjs.io/docs/configuration#testenvironment-string); `testEnvironment: 'jsdom'` is not supported)

**Mocha**

- [Sample test file](https://github.com/temporalio/samples-typescript/blob/main/activities-examples/src/mocha/workflows.test.ts)
- Test coverage library: [`@temporalio/nyc-test-coverage`](https://github.com/temporalio/sdk-typescript/tree/main/packages/nyc-test-coverage)
