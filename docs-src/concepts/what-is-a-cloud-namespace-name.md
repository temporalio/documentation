---
id: what-is-a-cloud-namespace-name
title: What is a Cloud Namespace Name?
sidebar_label: Temporal Cloud Namespace Name
description: A Cloud Namespace Name is a customer-supplied name for a Namespace in Temporal Cloud.
tags:
  - term
  - explanation
---

A Cloud Namespace Name is a customer-supplied name for a [Namespace](/namespaces) in Temporal Cloud.
Each Namespace Name, such as `accounting-production`, is unique within the scope of a customer's account.
It cannot be changed after the Namespace is provisioned.

Each Namespace Name must conform to the following rules:

- A Namespace Name must contain at least 2 characters and no more than 34 characters.
- A Namespace Name must begin with a letter, end with a letter or number, and contain only letters, numbers, and the hyphen (-) character.
- Each hyphen (-) character must be immediately preceded _and_ followed by a letter or number; consecutive hyphens are not permitted.
- All letters in a Namespace Name must be lowercase.
