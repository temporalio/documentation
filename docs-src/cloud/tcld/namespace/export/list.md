---
id: list
title: tcld namespace export s3 list
sidebar_label: list
description: How to list all export sinks in the Namespace of a Temporal Cloud account using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld namespace export s3 list` command allows users to list all existing export sinks within the Namespace of a Temporal Cloud account.

The following modifiers control the behavior of the command.

#### --namespace

Specify a Namespace hosted on Temporal Cloud.
If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

_Required option_

#### --page-size

Determine the number of results to return per page for list operations. If not specified, the default value is 100.

#### --page-token

Provide the page token to continue listing results from where the previous list operation left off.
