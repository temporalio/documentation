---
id: use-cases-pipelines
title: Data Pipelines
sidebar_label: Data Pipelines
---

## Motivation

Most business applications rely on data processing pipelines of some sort:

- ETL process that moves data between databases.
- Machine learning training solution.
- Data aggregation and analytics.
- Staging data from a transactional database to a warehouse.

Many of these jobs are not pure data manipulation programs. They also need to enrich the data and tie relevant services together. For example, processing a record may require external API calls that can fail and potentially take a long time.

It is common to have large data sets partitioned across many hosts or databases or have billions of files in a distributed storage. Running a myriad of data processing jobs in parallel is a hard engineering problem. You have to track to their individual statuses, schedule them on available workers, and ensuring that all the subtasks succeed.

## Benefits of Temporal

Temporal provides hard guarantees around the **durability** of data and seamlessly deals with long-running operations, retries, and intermittent failures. Temporal handles the distributed nature of these systems automatically.

Temporal is an ideal solution for implementing a full scan of a dataset in a scalable and resilient way. The standard pattern is to run an Activity (or multiple parallel Activities for partitioned data sets) that performs the scan and **heartbeats** its progress back to Temporal. In the case of a host failure, the operation is retried on a different host and continues execution from the last reported progress.

One crucial feature of Temporal is its ability to **route task execution** to a specific process or host. It is often useful to control how ML models and other large files are distributed across hosts. For example, if an ML model is partitioned by the city, the requests should be routed to hosts that contain the corresponding city model.
