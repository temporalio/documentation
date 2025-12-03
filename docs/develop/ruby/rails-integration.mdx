---
id: rails-integration
title: Rails integration - Ruby SDK
sidebar_label: Rails integration
description: Use the Temporal Ruby SDK with Ruby on Rails, including conventions for ActiveRecord, ActiveModel, and handling lazy/eager loading.
keywords:
  - rails
  - ruby on rails
  - activerecord
  - activemodel
  - eager loading
  - lazy loading
  - bootsnap
  - zeitwerk
tags:
  - Ruby SDK
  - Temporal SDKs
---

Temporal Ruby SDK is a generic Ruby library that can work in any Ruby environment.
However, there are some common conventions for Rails users to be aware of.

See the [rails_app sample](https://github.com/temporalio/samples-ruby/tree/main/rails_app) for an example of using Temporal from Rails.

## ActiveRecord

For ActiveRecord, or other general/ORM models that are used for a different purpose, it is not recommended to try to reuse them as Temporal models.
Eventually model purposes diverge and models for a Temporal workflows/activities should be specific to their use for clarity and compatibility reasons.
Also many Ruby ORMs do many lazy things and therefore provide unclear serialization semantics.
Instead, consider having models specific for Workflows/Activities and translate to/from existing models as needed.
See the [ActiveModel section](/develop/ruby/converters-and-encryption#active-model) on how to do this with ActiveModel objects.

## Lazy/Eager Loading

By default, Rails eagerly loads all application code on application start in production, but lazily loads it in non-production environments.
Temporal Workflows by default disallow use of IO during the Workflow run.
With lazy loading enabled in dev/test environments, when an Activity class is referenced in a Workflow before it has been explicitly required, it can give an error like:

```
Cannot access File path from inside a workflow. If this is known to be safe, the code can be run in a Temporalio::Workflow::Unsafe.illegal_call_tracing_disabled block.
```

This comes from bootsnap via zeitwerk because it is lazily loading a class/module at Workflow runtime.
It is not good to lazily load code during a Workflow run because it can be side effecting.
Workflows and the classes they reference should be eagerly loaded.

To resolve this, either always eagerly load (e.g. `config.eager_load = true`) or explicitly require what is used by a workflow at the top of the file.

Note, this only affects non-production environments.

