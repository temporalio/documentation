---
id: what-is-a-cloud-namespace-id
title: What is a Cloud Namespace Id?
sidebar_label: Temporal Cloud Namespace Id
description: A Cloud Namespace Id is a globally unique identifier for a Namespace in Temporal Cloud.
tags:
  - term
  - explanation
---

A Cloud Namespace Id is a globally unique identifier for a [Namespace](/namespaces) in Temporal Cloud.
A Namespace Id is formed by concatenating the following:

1. A [Namespace Name](/concepts/what-is-a-cloud-namespace-name)
1. A period (.)
1. The [Account Id](/concepts/what-is-a-cloud-account-id) to which the Namespace belongs

For example, for the Account Id `f45a2` and Namespace Name `accounting-production`, the Namespace Id is `accounting-production.f45a2`.
