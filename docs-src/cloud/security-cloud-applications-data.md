---
id: security-cloud-applications-data
title: Application and data
sidebar_label: Applications and data
description: Temporal Cloud does not manage your applications or Workers. You can use Data Converter to encrypt and decrypt your data.
tags:
  - temporal cloud
  - security
---

**What is the security model for applications and data in Temporal Cloud?**

### Code execution boundaries

Temporal Cloud provides the capabilities of Temporal Server as a managed service; it does not manage your applications or [Workers](/concepts/what-is-a-worker).
Applications and services written using [Temporal SDKs](/concepts/what-is-a-temporal-sdk) run in your computing environment, such as containers (Docker, Kubernetes) or virtual machines (in any hosting environment).
You have full control over how you secure your applications and services.

### Data Converter: Client-side encryption

The optional [Data Conversion](/concepts/what-is-a-data-converter) capability of the Temporal Platform lets you transparently encrypt data before it's sent to Temporal Cloud and decrypt it when it comes out.

Data Conversion runs on your Temporal Workers and [Clients](/concepts/what-is-a-temporal-client); Temporal Cloud cannot see or decrypt your data.
If you use this feature, data stored in Temporal Cloud remains encrypted even if the service itself is compromised.

By deploying a [Codec Server](/self-hosted/data-encryption) you can securely decrypt data in the [Temporal Web UI](/concepts/what-is-the-temporal-web-ui) without sharing encryption keys with Temporal.
