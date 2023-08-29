---
id: cluster-env-vars
title: Temporal Cluster environmental variables
description: A reference for setting the Cluster environmental variables.
sidebar_label: Cluster environmental variables
tags:
  - reference
  - cluster
---

This reference defines key configuration variables listed as constants in the [Temporal Environment file](https://github.com/temporalio/temporal/blob/master/environment/env.go).
These variables facilitate connections between the Temporal Cluster and various database systems.

## `Localhost`

Stores the `localhost` IP address "127.0.0.1".

## `CassandraSeeds`

Stores the seed node information for a Cassandra cluster.

## `CassandraPort`

Stores the port number used to connect to a Cassandra instance.

## `CassandraDefaultPort`

Sets the default port (9042) for Cassandra instances.

## `MySQLSeeds`

Stores the seed node information for a MySQL cluster.

## `MySQLPort`

Stores the port number used to connect to a MySQL instance.

## `MySQLDefaultPort`

Sets the default port (3306) for MySQL instances.

## `ESSeeds`

Stores the seed node information for an ElasticSearch cluster.

## `ESPort`

Stores the port number used to connect to an ElasticSearch instance.

## `ESDefaultPort`

Sets the default port (9200) for ElasticSearch instances.

## `ESVersion`

Stores the version information for ElasticSearch.

## `ESDefaultVersion`

Holds the default version (v7) for ElasticSearch use.

## `PostgresSeeds`

Stores seed node information for a Postgres cluster.

## `PostgresPort`

Stores the port number uesed to connect to a Postgres instance.

## `PostgresDefaultPort`

Sets the default port (5432) for Postgres instances.
