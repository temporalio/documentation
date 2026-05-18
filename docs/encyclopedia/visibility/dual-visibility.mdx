---
id: dual-visibility
title: Dual Visibility
sidebar_label: Dual Visibility
description: This guide on Temporal Dual Visibility explains how to set up, configure, and use Dual Visibility in Temporal Server versions. Learn about configuring primary and secondary Visibility stores, migrating databases, and ensuring a smooth transition for Visibility data.
slug: /dual-visibility
toc_max_heading_level: 4
keywords:
  - explanation
  - filtered-lists
  - term
  - visibility
  - dual visibility
tags:
  - Concepts
  - Visibility
---

This page discusses [Dual Visibility](#dual-visibility).

## What is Dual Visibility? {#dual-visibility}

Dual Visibility is a feature that lets you set a secondary Visibility store in addition to a primary store in your Temporal Service.
Setting up Dual Visibility is optional and can be used to [migrate your Visibility database](/self-hosted-guide/visibility#migrating-visibility-database) or create a backup Visibility store.

For example, if you have Cassandra configured as your Visibility database, you can set up a supported SQL database as your secondary Visibility store and gradually migrate your data to the secondary store before deprecating your primary one.

A Dual Visibility setup requires two Visibility store configurations:

- **Primary Visibility:** The primary Visibility store where Visibility data is written to and read from by default. The primary Visibility store is set with the `visibilityStore` configuration key in your Temporal Service.
- **Secondary Visibility:** A secondary storage for your Visibility data. The secondary Visibility store is set with the `secondaryVisibilityStore` configuration key in your Temporal Service.

For configuration details, see [Dual Visibility setup](/self-hosted-guide/visibility#dual-visibility).

The following combinations are allowed in a Dual Visibility setting.

| Primary                     | Secondary                       |
| --------------------------- | ------------------------------- |
| Standard (Cassandra or SQL) | Advanced (SQL or Elasticsearch) |
| Advanced (SQL)              | Advanced (SQL)                  |
| Advanced (Elasticsearch)    | Advanced (Elasticsearch)        |

With Dual Visibility, you can read from only one Visibility store at a time, but can configure your Temporal Service to write to primary only, secondary only, or to both primary and secondary Visibility stores.
When migrating from one Visibility store database to another, set up the database you want to migrate to as your secondary Visibility store.

You can plan your migration using specific dynamic configuration keys that help you transition your read and write operations from the primary to the secondary Visibility store.
For details on migrating your Visibility store databases, see [Dual Visibility](/self-hosted-guide/visibility#dual-visibility).
