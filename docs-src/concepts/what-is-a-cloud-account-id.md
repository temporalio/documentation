---
id: what-is-a-cloud-account-id
title: What is a Temporal Cloud Account Id?
sidebar_label: Temporal Cloud Account Id
description: A Temporal Cloud Account Id is a unique identifier for a customer.
tags:
  - term
  - explanation
---

A Temporal Cloud Account Id is a 5-character or longer code made up of numbers and letters.
Assigned by Temporal Technologies, it provides a unique customer identifier that persists through one's Temporal Cloud experience.

To find an Account Id, login to Temporal Cloud.
Navigate to the Namespace list page from the left-side vertical navigation.
The Account Id is the alphanumeric character string found after the period in any Cloud Namespace name.

To view this information from the command line instead of the Web, use the `tcld` CLI utility.
After logging in (`tcld login`), issue `tcld namespace list`.
