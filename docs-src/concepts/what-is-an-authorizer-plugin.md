---
id: what-is-an-authorizer-plugin
title: What is an Authorizer Plugin?
sidebar_label: Authorizer Plugin
tags:
  - term
---

The `Authorizer` plugin contains a single `Authorize` method, which is invoked for each incoming API call.
`Authorize` receives information about the API call, along with the role and permission claims of the caller.

`Authorizer` allows for a wide range of authorization logic, including call target, role/permissions claims, and other data available to the system.

#### Configuration

The following arguments must be passed to `Authorizer`:

- `context.Context`: General context of the call.
- `authorization.Claims`: Claims about the roles assigned to the caller. Its intended use is described in the [`Claims`](#claims) section earlier on this page.
- `authorization.CallTarget`: Target of the API call.

`Authorizer` then returns one of two decisions:

- `DecisionDeny`: the requested API call is not invoked and an error is returned to the caller.
- `DecisionAllow`: the requested API call is invoked.

:::warning

`Authorizer` allows all API calls pass by default. Disable the `nopAuthority` authorizer and configure your own to prevent this behavior.

:::

Configure your `Authorizer` when you start the server via the [`temporal.WithAuthorizer`](/references/server-options#withauthorizer) server option.

If an `Authorizer` is not set in the server options, Temporal uses the `nopAuthority` authorizer that unconditionally allows all API calls to pass through.

```go
a := authorization.NewDefaultAuthorizer()
```
