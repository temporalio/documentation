---
id: use-cases-big-ml
title: Big Data and ML
sidebar_label: Big Data and ML
---

A lot of companies build custom ETL and ML training and deployment solutions. Temporal is a good fit for a control plane for such applications.

One important feature of Temporal is its ability to route task execution to a specific process or host. It is useful to control how ML models and other large files are allocated to hosts. For example, if an ML model is partitioned by city, the requests should be routed to hosts that contain the corresponding city model.
