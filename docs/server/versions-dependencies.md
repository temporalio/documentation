---
id: versions-and-dependencies
title: Temporal Server versions and dependencies
sidebar_label: Versions & dependencies
---

## Overview

This page details some of the version specific requirements and dependencies needed to build and run an instance of Temporal.

If you are just running the Go binary, Go is not required.

But if you are building Temporal or running it from source, [Go v1.16+ is required](https://github.com/temporalio/temporal/blob/master/CONTRIBUTING.md).

### Workflow search

Temporal has built-in Workflow search functionality.
To enhance this feature, Temporal supports an [integration with Elasticsearch](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster).

- Elasticsearch v7.10 is supported from Temporal version 1.7.0 onwards
- Elasticsearch v6.8 is supported in all Temporal versions
- Both versions are explicitly supported with AWS Elasticsearch

### Monitoring & observation

Temporal emits metrics by default in a format that is supported by Prometheus. Monitoring and observing those metrics is optional. Any software that can pull metrics that supports the same format could be used, but we only ensure it works with Prometheus and Grafana versions.

- **Prometheus >= v2.0**
- **Grafana >= v2.5**
