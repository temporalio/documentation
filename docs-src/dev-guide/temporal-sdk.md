---
id: temporal-sdk
title: What is a Temporal SDK?
sidebar_label: Temporal SDK
description: A Temporal SDK (software development kit) is a collection of tools, libraries, and APIs providing a framework for developing Temporal Applications.
tags:
  - explanation
  - temporal sdk
---

:::competency Assess how a Temporal SDK fits into your development project

The information on this page helps a developer assess how a Temporal SDK fits into their development project.

:::

Temporal SDKs (software development kits) are an open source collection of tools, libraries, and APIs that enable Temporal Application development.

They offer a [Temporal Client](/dev-guide/major-components#temporal-client) to interact with the [Temporal Cluster](/concepts/what-is-a-temporal-cluster), APIs to develop your [Temporal Application](/dev-guide/temporal-application), and APIs to run horizontally scalable [Workers](/concepts/what-is-a-worker).

SDKs are more than just a development tool, however.
The SDK APIs enable developers to write code in a particular pattern that mirrors real world processes.
The SDK's internal implementation, working in collaboration with the Temporal Cluster, steps through that code, guaranteeing execution progression during application runtime.
