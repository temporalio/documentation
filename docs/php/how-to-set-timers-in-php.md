---
id: how-to-set-timers-in-php
title: How to set Timers in PHP
sidebar_label: Timers
tags:
  - timers
  - sleep
---

To set a timer in PHP, use `Workflow::timer()` and pass how many seconds you want to wait before continuing.

The following example yields a sleep method for 5 minutes.

```php
yield Workflow::timer(300); // sleep for 5 minutes
```

You cannot set a timer invocation inside the `await` or `awaitWithTimeout` methods.
