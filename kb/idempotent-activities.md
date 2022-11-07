---
slug: idempotent-activities
title: Idempotent Activities
draft: true
tags:
  - kb-article
date: 2022-11-07T00:00:00Z
---

Temporal recommends that Activities are idempotent.

Activities are idempotent if multiple application of that operation do not change the state of the system beyond the initial application.

Activities may be retried repeatedly, so you may need to use idempotency keys for critical side effects.

Unlike determinism in a Workflow, which actually is a requirement, Temporal cannot enforce that your Activity is idempotent.

The lack of idempotency may affect the correctness of your application, but does not affect Temporal (for example, it does not lead to a platform error).

<!-- Temporal supports either at most once or at least once execution of Activities, and in the case of at least once activities must be idempotent -->

In some cases, whether something is idempotent does not affect the correctness of an application. For example, if you have a monotonically-incrementing counter, you may not care that retries increment the counter because you don’t care about the actual value, only that the current value is greater than a previous value.
