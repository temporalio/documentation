---
id: how-to-define-workflow-parameters-in-php
title: How to define Workflow Parameters in PHP
sidebar_label: Workflow parameters
description: A method annotated with `#[WorkflowMethod]` can have any number of parameters.
tags:
  - developer-guide
  - php
---

A method annotated with `#[WorkflowMethod]` can have any number of parameters.

We recommend passing a single parameter that contains all the input fields to allow for adding fields in a backward-compatible manner.

Note that all inputs should be serializable to a byte array using the provided [DataConverter](https://github.com/temporalio/sdk-php/blob/master/src/DataConverter/DataConverterInterface.php) interface.
The default implementation uses a JSON serializer, but an alternative implementation can be easily configured.
You can create a custom object and pass it to the Workflow method, as shown in the following example:

```php
#[WorkflowInterface]
interface FileProcessingWorkflow {
    #[WorkflowMethod]
    public function processFile(Argument $args);
}
```
