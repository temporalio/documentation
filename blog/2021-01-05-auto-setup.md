---
tags:
  - Temporal
  - Server
posted_on_: 2022-01-05T00:00:09Z
slug: auto-setup
title: How Temporal Auto-Setup Works
author: swyx
author_title: Head of Developer Experience
author_image_url: https://avatars.githubusercontent.com/u/6764957?v=4
release_version: V1.14.0
---

We often say that “Temporal Server is a simple Go binary”, and [it's true](https://github.com/temporalio/temporal/releases/). Yet most users are insulated from using this binary directly. There are several layers of abstraction to get through (docker-compose or Helm Chart, Dockerfile, and the `auto-setup.sh` script) before you reach this baseline understanding of Temporal. Together they map out the environment requirements of Temporal:

<!--truncate-->

![image](https://user-images.githubusercontent.com/6764957/147678999-883be1b4-4d32-4c89-84a4-00e8b701cdef.png)

While the other pieces are industry standard formats with explanations available elsewhere, the auto-setup is the most proprietary of them, and so essential that we often recommend users just use the [temporalio/auto-setup](https://hub.docker.com/r/temporalio/auto-setup) Docker image, over our Docker image with Temporal Server itself (most beginners don’t even know this because we abstract it with docker-compose). 

It’s worth: 

- knowing that the `auto-setup.sh` script exists and is an important part of the Temporal deployment model
- understanding what it does to fill in the blanks between “it’s just a binary, any decent dev can figure it out from here right?” to production ready cluster
- understanding what is optional so you can modify it when it is getting in your way, or have confidence throwing it out and writing your own.

The goal of this post is ***not*** to explain every little detail (you can [read the code](https://github.com/temporalio/temporal/blob/master/docker/auto-setup.sh) yourself for that), but to highlight important pieces every self-hosted Temporal user should know.

## Auto-Setup at a High Level

Our [basic Docker entrypoint](https://github.com/temporalio/temporal/blob/master/docker/entrypoint.sh) does some bindings, but most importantly, it runs [auto-setup.sh](https://github.com/temporalio/temporal/blob/master/docker/auto-setup.sh) then [start-temporal.sh](https://github.com/temporalio/temporal/blob/master/docker/start-temporal.sh).  

`auto-setup.sh` does a few things (we will go deeper on the **bolded** parts):

1. Temporal Schema Setup (if you don’t opt out):
    1. Validates seed environment variables (trivial step)
    2. Waits for the database to start (using `nc` for SQL databases, or [`temporal-cassandra-tool`](https://github.com/temporalio/temporal/blob/master/tools/cassandra/README.md) for Cassandra)
    3. **Setup Temporal Schema on that database (more on this below)**
2. Elasticsearch Schema Setup (if you opt in):
    1. Validates seed environment variables (trivial step)
    2. Waits for Elasticsearch to start (optionally, timed out with a `ES_SCHEMA_SETUP_TIMEOUT_IN_SECONDS` env var)
    3. Setup Temporal’s Enhanced Visibility Schema on that Elasticsearch instance
3. Setup Temporal Server:
    1. Wait for Temporal Server to start (from running [start-temporal.sh](http://start-temporal.sh) concurrently, and checked using `tctl cluster health | grep SERVING`
    2. **Register the `default` namespace** (unless opted out with `SKIP_DEFAULT_NAMESPACE_CREATION`)
    3. Add basic custom search attributes (unless opted out with `SKIP_ADD_CUSTOM_SEARCH_ATTRIBUTES`)
    
- Note that this script only handles setup - it doesn’t actually run the `temporal-server` binary itself. That job is given to `start-temporal.sh`, whose main job is to run `temporal-server` with flags for given service roles (mainly specified by the `SERVICES` env var).
    
    > Note that when we say to run each of these services separately in production so they can be independently scaled, this is the exact step where production differs from local development. You can run the same binary in multiple separate processes with different roles for each, as in:
    > 
    > 
    > ```tsx
    > # process 1
    > temporal-server start --service=history 
    > 
    > # process 2
    > temporal-server start --service=frontend
    > 
    > # process 3
    > temporal-server start --service=matching
    > 
    > # process 4
    > temporal-server start --service=worker
    > ```
    > 
    > You may also use the Docker container with the appropriate flags:
    > 
    > ```jsx
    > docker run -e CASSANDRA_SEEDS=10.x.x.x                  -- csv of cassandra server ipaddrs
    >     -e KEYSPACE=<keyspace>                              -- Cassandra keyspace
    >     -e VISIBILITY_KEYSPACE=<visibility_keyspace>        -- Cassandra visibility keyspace
    >     -e SKIP_SCHEMA_SETUP=true                           -- do not setup cassandra schema during startup
    >     -e NUM_HISTORY_SHARDS=1024  \                       -- Number of history shards
    >     -e SERVICES=history,matching \                      -- Spinup only the provided services
    >     -e LOG_LEVEL=debug,info \                           -- Logging level
    >     -e DYNAMIC_CONFIG_FILE_PATH=config/foo.yaml         -- Dynamic config file to be watched
    >     temporalio/server:<tag>
    > ```
    > 

## Temporal Schema Setup

Database schema setup is only needed once for new databases being set up to work with Temporal Server, and is done with `[temporal-sql-tool](https://github.com/temporalio/temporal/blob/f355adc9505123c63ed1ad888449dcb89584f8cd/tools/sql/README.md)` or `[temporal-cassandra-tool](https://github.com/temporalio/temporal/tree/f355adc9505123c63ed1ad888449dcb89584f8cd/tools/cassandra)` depending on the type of database specified. 

- Together with the `tctl` CLI, these binaries are available in the [temporalio/admin-tools](https://hub.docker.com/r/temporalio/admin-tools) Docker image.
- These tools are also used for updating schemas when new Temporal versions are being rolled out to existing deployments.

The schema setup process is pretty similar across all database types:

1. Create a new Temporal database with `DBNAME`
2. Run the `setup-schema` command with the `temporal-[db]-tool` 
3. Run the `update-schema` command with the `temporal-[db]-tool` with a specific schema for that combination of database + schema version  
4. Create a new Standard Visibility database with `VISIBILITY_DBNAME`
5. Run the `setup-schema` command with the `temporal-[db]-tool`
6. Run the `update-schema` command with the `temporal-[db]-tool` with a specific Visibility schema for that combination of database + schema version  

If enabled, Temporal’s Advanced Visibility Schema setup [works in a similar way](https://github.com/temporalio/temporal/tree/master/schema/elasticsearch/visibility) as described above.

## Temporal Server Setup

Once the schema is setup, the `setup_server` function is started in a background. This function waits for Temporal server to get started which happens in a meantime in the main process (in `start-temporal.sh`). When Temporal server is started, this function does one more important thing that users may take for granted - it registers the `default` namespace using the standard `tctl --ns default namespace register` command. 

- This is the namespace that most beginners are used to seeing when they start up Temporal inside docker-compose - because the `auto-setup.sh` script does it for them! Without this script running, Temporal Server doesn’t have any namespaces registered. This can come as a surprise to some users who assume the default namespace is a necessary part of Temporal.
- All SDKs Workers and Clients, as well as Temporal Web, connect to the `default` namespace if not specified - most production deployments of Temporal will want to connect to specific namespaces. (try running [temporalite](https://github.com/DataDog/temporalite) without any namespaces to see how SDK code without namespaces specified stops working!)
- The script allows you to customize the name and retention period with the `DEFAULT_NAMESPACE` and `DEFAULT_NAMESPACE_RETENTION` env vars if you wish, but a production setup may want to register a number of namespaces differently.

The final part of the `auto-setup.sh` script also does registers some pre-defined custom search attributes (when running with Elasticsearch):

```tsx
tctl --auto_confirm admin cluster add-search-attributes \
          --name CustomKeywordField --type Keyword \
          --name CustomTextField --type Text \
          --name CustomIntField --type Int \
          --name CustomDatetimeField --type Datetime \
          --name CustomDoubleField --type Double \
          --name CustomBoolField --type Bool
```

These are intentionally generically named, for demo purposes (eg [for code samples](https://github.com/temporalio/samples-go/blob/77728cf7c38570898b2c90bf6eb0720c7f5fb30d/searchattributes/searchattributes_workflow.go#L56-L63)) and for ease of use (since they are already set up, you don't have to add them when you find you need them later). As you advance in your usage, you may wish to drop this step in favor of better named and specified attributes - just keep in mind that you are [limited to a maximum of 100](https://docs.temporal.io/docs/server/production-deployment/#server-limits).
