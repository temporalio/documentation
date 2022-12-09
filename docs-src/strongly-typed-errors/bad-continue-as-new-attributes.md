---
id: bad-continue-as-new-attributes
title: Bad Continue as New Attributes
description: Explanation for Bad Continue as New Attributes error message, and how to fix it.
sidebar_label: Bad Continue as New Attributes
tags:
  - errors
  - strongly-typed
---

This error indicates that the Workflow Task failed to validate a `ContinueAsNew` attribute.
The attribute could be unset or invalid.

Reset any missing attributes.
If the payload or memo exceeded size limits, adjust the input size.

Check that the Workflow is validating search attributes after unaliasing keys.
