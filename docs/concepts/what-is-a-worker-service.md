---
id: what-is-a-worker-service
title: What is a Worker Service?
description: The Worker Service runs background processing for the eplication queue, system Workflows, and (in versions older than 1.5.0) the Kafka visibility processor.
sidebar_label: Worker Service
tags:
  - term
---

The Worker Service runs background processing for the eplication queue, system Workflows, and (in versions older than 1.5.0) the Kafka visibility processor.

![Worker Service](/diagrams/temporal-worker-service.svg)

It talks to the Frontend Service.

- It uses port 6939 for membership-related communication.

Ports are configurable in the Cluster configuration.
