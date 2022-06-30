---
id: what-is-authorization
title: What is Authorization?
sidebar_label: What is Authorization?
---

## Overview

Authorization is the verification of applications and data that a user on your Cluster or application has access to.

Temporal offers two plugin interfaces for implementing API call authorization.

- [`ClaimMapper`](https://www.notion.so/ClaimMapper-44aae103936b4e0789b23a7a32374ec4)

- [`Authorizer`](https://www.notion.so/Authorizer-11cccb9167034e21a93797f4cafc7ee5)

The logic of both plugins can be customized to fit a variety of use cases. When provided, the front-end will invoke the implementation of the plugins before running the requested operation.

## Authorizer Plugin Interface

`Authorizer` has a single `Authorize` method that is invoked for each incoming API call received by the Frontend gRPC service. `Authorize` receives information about the calls, along with the role and permission claims of the caller.

For more information, visit the Authorizer page.
