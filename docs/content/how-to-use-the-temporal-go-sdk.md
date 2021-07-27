---
id: how-to-use-the-temporal-go-sdk
title: How to use the Temporal Go SDK
description: Add the Temporal Go SDK to your project.
tags:
  - guide
---

import DetermineHeader from '../components/DetermineHeader.js'

export const headingText = 'How to use the Temporal Go SDK'

<DetermineHeader
hLevel={props.heading}
hText={headingText}
/>

Add the [Temporal Go SDK](https://github.com/temporalio/sdk-go) to your project:

```
go get go.temporal.io/sdk@latest
```

**How to run your application locally?**

[Install and run the Temporal Server](/docs/server/quick-install) using `docker compose`.
The Server needs to be running for your Temporal Application to execute.

**Where is the Go SDK technical reference?**

The [Temporal Go SDK API reference](https://pkg.go.dev/go.temporal.io/sdk) is published on [pkg.go.dev](https://pkg.go.dev/go.temporal.io/sdk)

**Are there executable code samples?**

You can find a complete list of executable code samples in the [samples library](/docs/samples-library/#go), and each of the Go SDK Tutorials is backed by a fully executable template application.
