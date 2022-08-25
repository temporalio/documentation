---
id: how-to-set-timers-in-php
title: How to set Timers in PHP
sidebar_label: Timers
description: To set a Timer in PHP, use `Workflow::timer()`.
tags:
  - timers
  - sleep
---

To set a Timer in PHP, use `Workflow::timer()` and pass the number of seconds you want to wait before continuing.

The following example yields a sleep method for 5 minutes.

```php
yield Workflow::timer(300); // sleep for 5 minutes
```

You cannot set a Timer invocation inside the `await` or `awaitWithTimeout` methods.
