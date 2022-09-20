---
id: how-to-define-activity-parameters-in-php
title: Define Activity parameters in PHP
sidebar_label: Activity parameters
---

Each method defines a single Activity type.
A single Workflow can use more than one Activity interface and call more than one Activity method from the same interface.

The only requirement is that Activity method arguments and return values are serializable to a byte array using the provided [DataConverter](https://github.com/temporalio/sdk-php/blob/master/src/DataConverter/DataConverterInterface.php) interface.
The default implementation uses a JSON serializer, but an alternative implementation can be easily configured.
