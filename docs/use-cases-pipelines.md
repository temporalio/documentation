---
id: use-cases-pipelines
title: Data Pipelines
sidebar_label: Data Pipelines
---

## Motivation

Most business applications rely on data processing pipelines of some wort: an ETL process that moves data between databases, a machine learning training solution, data aggregation and analytics, staging data from a transactional database to a warehouse.

A lot of these jobs are not pure data manipulation programs. They also need to enrich the data and tie relevant services together. Processing a record may require external API calls that might fail and potentially take a long time.

It is common to have large data sets partitioned across many hosts or databases or have billions of files in a distributed storage. Running a myriad of data processing jobs in parallel and keeping track of the status, scheduling them on available workers, and ensuring that all the subtasks succeed&mdash;is a hard engineering problem.

## Benefits of Temporal

Temporal provides hard guarantees around the **durability** of the data and seamlessly deals with long-running operations, retries, and intermittent failures. Temporal handles the distributed nature of these systems automatically.

One crucial feature of Temporal is its ability to **route task execution** to a specific process or host. It is useful to control how ML models and other large files are allocated to hosts. For example, if an ML model is partitioned by the city, the requests should be routed to hosts that contain the corresponding city model.

Temporal is an ideal solution for implementing a full scan of a dataset in a scalable and resilient way. The standard pattern is to run an activity (or multiple parallel activities for partitioned data sets) that performs the scan and **heartbeats** its progress back to Temporal. In the case of a host failure, the operation is retried on a different host and continues execution from the last reported progress.
