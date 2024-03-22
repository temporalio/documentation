---
id: what-is-a-cloud-account-id
title: What is a Temporal Cloud Account Id?
sidebar_label: Temporal Cloud Account Id
description: A Temporal Cloud Account Id is a unique identifier for a customer.
tags:
  - term
  - explanation
---

A Temporal Cloud Account Id is a unique customer identifier assigned by Temporal Technologies.
The Id is a short string of numbers and letters, at least five characters long.
The identifier remains constant for the entire time a customer uses Temporal Cloud.

To find an Account Id, login to Temporal Cloud.
Navigate to the Namespace list page from the left-side vertical navigation.
The Account Id is the alphanumeric character string found after the period in any Cloud Namespace name.

To view Namespace information from the command line instead of the Web, use the `tcld` CLI utility.
After logging in (`tcld login`), issue `tcld namespace list`.
