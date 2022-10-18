---
id: how-to-register-types-with-a-worker-in-php
title: How to register types with a Worker in PHP
sidebar_label: Register Types
description: Use `registerWorkflowTypes()` to register Workflow Type and `registerActivity()` to register Activity implementation with Workers.
tags:
  - developer-guide
  - php
  - workers
---

Worker listens on a task queue and hosts both workflow and activity implementations:

```php
// Workflows are stateful. So you need a type to create instances:
$worker->registerWorkflowTypes(App\DemoWorkflow::class);
// Activities are stateless and thread safe:
$worker->registerActivity(App\DemoActivity::class);
```

In case an activity class requires some external dependencies provide a callback - factory
that creates or builds a new activity instance. The factory should be a callable which accepts
an instance of ReflectionClass with an activity class which should be created.

```php
$worker->registerActivity(
    App\DemoActivity::class,
    fn(ReflectionClass $class) => $container->create($class->getName())
);
```

If you want to clean up some resources after activity is done, you may register a finalizer. This callback is called
after each activity invocation:

```php
$worker->registerActivityFinalizer(fn() => $kernel->showtdown());
```
