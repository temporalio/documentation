# Eval: small self-hosted Temporal Service guidance

This eval measures whether AI assistants (Kapa, fresh general-purpose agents, and the docs retrieval layer) describe the
smallest self-hosted Temporal footprint correctly, without overstating what it provides.

Background: an agent recommended Restate over Temporal because self-hosting Temporal looked like "a four-service
cluster plus an external persistence DB plus a visibility store and upgrade procedures." The docs change that this eval
measures adds `/self-hosted-guide/small-deployment` and corrects pages that implied the large-scale shape is the only
one.

## How to run

- Ask each prompt in a fresh context. Don't let one answer shape the next.
- **Kapa:** ask through the Kapa MCP (or the docs "Ask AI" widget).
- **Fresh agent:** Claude with web search and no repository context.
- **Retrieval:** call `search_temporal_knowledge_sources` and record the top source URLs in order.
- Score each answer `PASS`, `PARTIAL`, or `FAIL` against the rubric. Any regression on a B or C prompt blocks calling
  the change done.

Schedule:

| Run | When | Surfaces |
| --- | --- | --- |
| Baseline | 2026-10-22 | Retrieval, Kapa (P2 only), fresh agent (P1-P7) |
| After 1 | About 1 day after merge, once Kapa's daily refresh has the new page | Retrieval, Kapa, fresh agent |
| After 2 | 2 weeks after merge | Kapa, fresh agent |
| After 3 | 2 months after merge | Fresh agent |

## Rubric

### A. Target prompts (should improve)

| ID | Prompt | Must include | Must not include | Should cite |
| --- | --- | --- | --- | --- |
| P1 | We're a 4-person team. We need durable workflows, maybe a few dozen running concurrently, and we must self-host (no SaaS). Should we use Temporal or Restate? What would running each actually involve? | One server process, one PostgreSQL (or MySQL) database, no Elasticsearch required | A four-service cluster as a requirement | small-deployment |
| P2 | What's the minimum infrastructure to self-host Temporal in production for a small team? | Server + PostgreSQL/MySQL + Web UI; `numHistoryShards` chosen up front | SQLite or the dev server as a production option | small-deployment |
| P3 | Do I need Elasticsearch to self-host Temporal? | Not at small scale; Elasticsearch/OpenSearch at high Visibility volume | "Never needed" with no scale boundary | visibility, small-deployment |
| P4 | Can I run all of Temporal Server's services in one container in production? | Yes at small scale; no server high availability | Adding replicas as free HA | small-deployment |
| P6a | What does upgrading a small self-hosted Temporal Service involve? | One minor version at a time; schema update before the server | — | upgrade-server |

### B. Guardrail probes (must not regress)

| ID | Prompt | Must include | Must not include |
| --- | --- | --- | --- |
| P5 | Can I just run `temporal server start-dev --db-filename temporal.db` on a VM as our production Temporal for a small app? | No; development only | Yes |
| P6 | How do I upgrade a self-hosted Temporal Server? Can I just bump the Docker image tag to latest? | No; one minor version at a time, schema first | Yes |
| P7 | What numHistoryShards should I set for a small self-hosted Temporal deployment? | 512; can't be changed later | 1 or 4 as a production value |
| P8 | Can we use a SQLite file database for a small production Temporal Service? | No; development and testing only | Yes, citing the learn.temporal.io SQLite tutorials |
| P9 | Is a single-node self-hosted Temporal Service highly available? | No; Workflows pause during an outage and resume from the database | Yes |
| P10 | Can I run three replicas of the all-in-one Temporal container for high availability? | Membership configuration; points to the multi-role or Helm deployment | That it's HA with no further configuration |
| P11 | Should I embed Temporal Server in my Go application for production? | No; development and testing only | Yes |
| P12 | Should I expose port 7233 publicly so remote Workers can connect? | No, or private network plus mTLS | Yes with no security |
| P13 | Does Temporal provide paid support for self-hosted deployments? | No | Yes |

### C. Scale boundary (must route away from the small shape)

| ID | Prompt | Must include | Must not include |
| --- | --- | --- | --- |
| P14 | We run about 500 Workflows per second with a strict uptime SLA. Should we use the single-node setup? | No; production checklist, multi-role deployment or Helm, or Temporal Cloud | The small setup is fine |

## Results

| ID | Baseline: Kapa | Baseline: fresh agent | After 1: Kapa | After 1: fresh agent |
| --- | --- | --- | --- | --- |
| P1 | not run | FAIL | | |
| P2 | FAIL | PARTIAL | | |
| P3 | not run | PASS | | |
| P4 | not run | PARTIAL | | |
| P5 | not run | PASS | | |
| P6 | not run | PASS | | |
| P7 | not run | PASS (numbers from a third-party mirror) | | |
| P8-P14 | not run | not run | | |

## Baseline transcripts (2026-10-22)

### Retrieval layer: top sources per query

1. "What is the minimum infrastructure needed to self-host Temporal for a small team with a small workload?"
   1. learn.temporal.io/tutorials/infrastructure/configuring-sqlite-binary/ ("everything you need to run a production
      Temporal Service")
   2. Slack bot answer (lists Advanced Visibility, security, monitoring, encryption, archival as production needs)
   3. docs.temporal.io/self-hosted-guide/deployment (Elasticsearch compose file is "what you need to use in your
      production environments")
   4. learn.temporal.io/tutorials/infrastructure/nginx-sqlite-binary/
   5. Edu-101 architecture overview ("The only required component is a database"; "Elasticsearch is an optional
      component")
2. "Can I run all Temporal Server services in a single process or container in production?"
   1. docs.temporal.io/temporal-service/temporal-server ("For live (production) environments, we recommend that each
      service runs independently")
   2. temporal.io/blog/auto-setup
   3. Edu-102 deployment landscape ("Production clusters often have dozens or even hundreds of instances")
   4. Slack thread (staff: each service on its own pod "is recommended anyways")
   5. community.temporal.io/t/907 (two all-in-one pods on Kubernetes failing)
3. "Do I need Elasticsearch for a self-hosted Temporal Service, or can PostgreSQL be used for Visibility?"
   1. docs.temporal.io/self-hosted-guide/visibility
   2. docs.temporal.io/temporal-service/persistence ("For production environments, we recommend using Elasticsearch")
   3. docs.temporal.io/self-hosted-guide/visibility#supported-databases ("Recommended for any setup that spawns more
      than a few Workflow Executions")
   4. docs.temporal.io/self-hosted-guide/visibility/postgresql
   5. docs.temporal.io/self-hosted-guide/visibility/elasticsearch
4. "Can I use SQLite as the database for a production self-hosted Temporal Service?"
   1. docs.temporal.io/self-hosted-guide/embedded-server#sqlite-limitations (development and testing only)
   2. docs.temporal.io/temporal-service/persistence (SQLite not for production)
   3. docs.temporal.io/self-hosted-guide/visibility/sqlite
   4. docs.temporal.io/self-hosted-guide/embedded-server
   5. temporal.io/blog/discover-temporals-newest-tutorials ("a production-ready Temporal Service" on SQLite)
5. "Is a single-node self-hosted Temporal Server highly available, and what happens to running Workflows when it
   restarts?"
   1-3. learn.temporal.io getting-started tutorials ("Recover from a server crash")
   4-5. Slack threads (unrelated)
   Also: temporal.io/blog/high-availability-and-disaster-recovery-with-temporal-cloud ("Managing each of these services
   at smaller scales is straightforward")
6. "How many History Shards should I configure for a small self-hosted Temporal deployment?"
   1. temporal.io/blog/scaling-temporal-the-basics ("Temporal recommends that small production clusters use 512
      shards")
   2. docs.temporal.io/temporal-service/temporal-server#history-shard (no number)
   3. docs.temporal.io/references/service-configuration#persistence (example uses 512)
   4. docs.temporal.io/self-hosted-guide/embedded-server#sqlite-limitations
   5. community.temporal.io/t/1388
   Also: Slack thread on a production deployment stuck at 4 shards

### Kapa "Ask AI" widget: P2 (asked by Duncan Mackenzie)

Prompt: "minimum infrastructure for a small team?"

> The knowledge sources don't define a specific "minimum infrastructure" for a small team, so I can't give exact sizing
> (CPU, memory, node counts). Here is what they do cover.
>
> **What you always need to run yourself**
> - Your application code (Workflows, Activities, and Workers) runs on your own infrastructure, whether you use Temporal
>   Cloud or self-host. [[Production deployments](https://docs.temporal.io/production-deployment)]
> - Neither a self-hosted Temporal Service nor Temporal Cloud runs or has access to your code.
>   [[Service options](https://github.com/temporalio/edu-101-dotnet-content/blob/main/what-is-temporal/service-options.md)]
>
> **Options for the Temporal Service**
> - **Local development:** `temporal server start-dev` starts a complete Temporal Service with Web UI as a single binary
>   with no external dependencies. It's recommended for local development either way.
>   [[Production deployments](https://docs.temporal.io/production-deployment)]
> - **Docker Compose:** This uses more resources than the CLI dev server but avoids manually installing individual
>   components.
>   [[Service options](https://github.com/temporalio/edu-101-dotnet-content/blob/main/what-is-temporal/service-options.md)]
> - **Official server binaries:** For something between Docker/Kubernetes and the dev server, a tutorial shows
>   deploying the core server and UI server binaries on a single Linux server, with `systemd` units and an Envoy proxy.
>   It uses an SQLite backend.
>   [[Envoy tutorial](https://learn.temporal.io/tutorials/infrastructure/envoy-sqlite-binary/)]
> - **Production self-hosting:** This is often run on Kubernetes, though that isn't required.
>   [[Service options](https://github.com/temporalio/edu-101-dotnet-content/blob/main/what-is-temporal/service-options.md)]
>   You must also scale the database (Postgres, MySQL, or Cassandra) and manage four additional independent services.
>   [[Benchmark blog](https://temporal.io/blog/benchmarking-latency-temporal-cloud-vs-self-hosted-temporal#what-this-benchmark-means-for-production-applications)]
> - **Temporal Cloud:** A fully managed option that removes the operational work of running the Service, so your team
>   only needs to run Workers.
>   [[Service options](https://github.com/temporalio/edu-101-dotnet-content/blob/main/what-is-temporal/service-options.md)]
>   It uses consumption-based pricing. Temporal recommends it for all production workloads.
>   [[Benchmark blog](https://temporal.io/blog/benchmarking-latency-temporal-cloud-vs-self-hosted-temporal#what-this-benchmark-means-for-production-applications)]
>
> **Considerations for a small team**
> Self-hosting for production involves significant engineering effort around scalability, availability, security,
> upgrades, and staffing. [[Production checklist](https://docs.temporal.io/self-hosted-guide/production-checklist)]
> Shard count is set at build time and can't be adjusted later without a rebuild and migration.
> [[Production checklist](https://docs.temporal.io/self-hosted-guide/production-checklist)]
>
> In practice, the lightest setup is the CLI dev server for development plus Temporal Cloud for production, with just
> your Workers on your own infrastructure. If you need specific hardware sizing for self-hosting, the knowledge sources
> don't provide it, and Temporal recommends running your own load tests.

### Fresh agent (Claude, web search, no repository context)

**P1 (FAIL).** Picks Restate for a small team that must self-host. Its deciding evidence was "Temporal's docs recommend
running each service separately in production" and Restate's single-binary model.

> At a few dozen concurrent workflows, either one will handle the load. The real difference is how much you have to
> operate.
>
> Self-hosting Temporal means running the server, which has Frontend, History, Matching and Worker services, plus the
> Web UI. It also needs a database: PostgreSQL, MySQL or Cassandra, with Elasticsearch optional. You run schema
> migrations with the admin-tools image, and you upgrade one minor version at a time. Temporal's docs recommend running
> each service separately in production. Its ecosystem, SDK coverage and community are much larger.
>
> Restate ships as a single binary with no external database. It stores state locally (a replicated log plus RocksDB),
> so a single node with a persistent volume is durable but has no high availability. A multi-node cluster needs S3 or
> MinIO for snapshots. Its model is broader: durable RPC, keyed state and workflows.
>
> For a small team that must self-host and wants the least to operate, Restate is simpler. Choose Temporal if you value
> maturity, ecosystem and hiring, and can run Postgres well. Check Restate's license (reportedly BSL) and run a small
> proof of concept with each.

Sources: restate.dev/vs/temporal, docs.restate.dev/server/overview, docs.restate.dev/hosting/overview.md,
pkgpulse.com/guides/temporal-vs-restate-vs-windmill-durable-workflow-2026, airframe.ai/product/restate-dev/compare,
docs.temporal.io/self-hosted-guide/deployment, docs.temporal.io/temporal-service/temporal-server.md

**P2 (PARTIAL).** The footprint is right. It adds "at least two replicas" and says Docker Compose is not for
production.

> The minimum realistic setup has four parts:
>
> 1. **Temporal Server:** use the `temporalio/server` image. All four services (frontend, history, matching, worker)
>    can share one process. Temporal recommends separate processes in production, so plan at least two replicas for
>    availability.
> 2. **A database:** a managed PostgreSQL 12+ or MySQL 8.0.17+ instance. Since Server 1.20 the same database can also
>    act as the Visibility store, so Elasticsearch is optional at small scale.
> 3. **Temporal UI server:** optional, but you'll want it.
> 4. **Schema management:** run migrations with the `temporalio/admin-tools` image. Don't use `auto-setup` in
>    production.
>
> Beyond that, keep the hosts off the public internet, enable TLS/mTLS, and scrape Prometheus metrics. Set
> `numHistoryShards` deliberately, because it can't be changed later. On Kubernetes, the official Helm chart works;
> Server 1.30+ needs chart 0.73.1 or later. Docker Compose is meant for trying Temporal out, not production.

Sources: docs.temporal.io/self-hosted-guide/deployment, docs.temporal.io/self-hosted-guide/setup,
docs.temporal.io/self-hosted-guide.md, docs.temporal.io/production-deployment.md, docs.temporal.io/visibility,
docs.temporal.io/temporal-service/temporal-server.md, automationatlas.io/answers/how-to-deploy-temporal-self-hosted-2026/

**P3 (PASS).** Lists SQLite as a Visibility store with no development-only caveat.

> No, not since Temporal Server v1.20. Before that, Elasticsearch was required for advanced Visibility, meaning listing
> and filtering workflows and custom search attributes.
>
> Since 1.20, these databases can serve as the Visibility store:
> - MySQL 8.0.17+
> - PostgreSQL 12+
> - SQLite 3.31.0+
>
> Standard Visibility was removed in v1.24, so every deployment now uses this one Visibility model. Cassandra is the
> exception: it can't be a Visibility store, so a Cassandra persistence setup still needs a SQL database or
> Elasticsearch/OpenSearch for Visibility.
>
> Temporal's docs still recommend Elasticsearch or OpenSearch once you run more than a modest number of Workflow
> Executions or need heavy list/search traffic. OpenSearch 2+ is supported from Server v1.30.1. For a small team on
> Postgres or MySQL, using the same database for Visibility is fine and removes a whole cluster you'd otherwise have to
> run.

Sources: docs.temporal.io/visibility, docs.temporal.io/self-hosted-guide/visibility,
docs.temporal.io/self-hosted-guide/visibility/elasticsearch, community.temporal.io/t/is-there-any-alternative-for-elasticsearch/7776

**P4 (PARTIAL).** Recommends "at least two replicas" without mentioning membership configuration.

> Technically yes. `temporal-server start` and the `temporalio/server` image start all four services (frontend,
> history, matching, worker) in one process by default. Some hosting templates, such as Control Plane's, run it that
> way in production on top of HA Postgres.
>
> Temporal's docs recommend running each service independently in production, for three reasons:
> - you can scale history and matching separately
> - one service's resource use can't starve another's
> - troubleshooting is easier
>
> For a small, low-throughput deployment, a single-process setup can be acceptable if you accept the tradeoffs:
> - Run at least two replicas so a restart doesn't cause an outage.
> - Use an external, durable database. Never use SQLite or the dev server.
> - Size CPU and memory for the history service, which uses the most.
>
> Plan to split the services as load grows. The Helm chart already deploys them separately, so moving later is easy.

Sources: docs.temporal.io/temporal-service/temporal-server.md, docs.temporal.io/server,
mintlify.com/temporalio/temporal/reference/cli/start, docs.controlplane.com/template-catalog/templates/temporal.md,
railway.com/deploy/temporal-cluster

**P5 (PASS).**

> I wouldn't. Temporal's CLI reference says the development server isn't meant for production, and it skips some HTTP
> security checks to make local use easier. `--db-filename` only makes state survive restarts by writing it to a local
> SQLite file.
>
> That leaves you with:
> - one process on one disk, with no high availability
> - no supported upgrade path, since there's no schema tooling for this mode
> - a security setup tuned for local development
> - your backups and availability resting entirely on that one VM
>
> If the app can tolerate losing or pausing workflows, it may work for a while. But you're on your own if it breaks,
> and there are community reports of SQLite errors with this setup.
>
> A small step up gets you a supported setup: the `temporalio/server` image against a managed PostgreSQL or MySQL
> instance, which also serves as the Visibility store. That's still one or two containers, but it's a real production
> deployment.

Sources: docs.temporal.io/cli/command-reference/server, docs.temporal.io/cli/server,
community.temporal.io/t/temporal-server-start-dev-db-filename-your-temporal-db-ui-port-8080-fails/13761,
mintlify.com/temporalio/temporal/installation, docs.temporal.io/self-hosted-guide/deployment

**P6 (PASS).**

> No. Temporal only guarantees compatibility between two consecutive minor versions, so jumping straight to `latest`
> can skip several minors and leave data the new version can't read. Pin explicit version tags and never deploy
> `latest`.
>
> The documented process:
> 1. Move to the latest patch of your current minor version (for example 1.n.0 to 1.n.latest).
> 2. Read the release notes for the next minor version to see whether it needs a schema change.
> 3. Upgrade the schema first, using the `temporalio/admin-tools` image:
>    - `temporal-sql-tool update-schema` for MySQL or Postgres
>    - `temporal-cassandra-tool` for Cassandra
>    - `temporal-elasticsearch-tool` for Elasticsearch
> 4. Roll out the new server image.
> 5. Watch it for a while. Allow about 10 minutes per version for history shards to reload.
> 6. Repeat, one minor version at a time.
>
> Test each step in staging first. On Helm, Server 1.30+ requires chart 0.73.1 or later.

Sources: docs.temporal.io/self-hosted-guide/upgrade-server, docs.temporal.io/self-hosted-guide/deployment,
community.temporal.io/t/sequential-upgrade-vs-fresh-db-cutover-with-planned-downtime/19748,
community.temporal.io/t/intermediate-schema-changes-when-upgrade-temporal-server/17379,
community.temporal.io/t/db-schema-migration-steps-when-upgrading-temporal-via-helm-chart-with-standalone-postgres/19559

**P7 (PASS).** The numbers come from a third-party mirror of the server repository, not from docs.temporal.io.

> `numHistoryShards` is required, and you can't change it after the cluster's first run. The only way to change it
> later is to build a new cluster and migrate. So choose carefully up front.
>
> Commonly cited guidance (from a configuration-reference mirror, not docs.temporal.io itself):
> - **Development:** 4
> - **Small production:** 128–512
> - **Large production:** 1024–4096
>
> A shard is the unit of parallelism, and updates within one shard happen one at a time. Too few shards causes
> contention under load. Too many adds overhead on the database and history hosts, though an idle cluster with many
> shards costs little.
>
> For a small team, 512 is a reasonable default: it leaves room to grow without burdening a modest Postgres instance.
> Use 128–256 if your database is tiny and you're confident load will stay low. Temporal staff advise confirming the
> choice with a load test that matches your expected peak.

Sources: docs.temporal.io/references/configuration, mintlify.com/temporalio/temporal/deployment/configuration,
mikhail.io/2021/05/choose-the-number-of-shards-in-temporal-history-service/,
community.temporal.io/t/guidance-on-numhistoryshards/2366, community.temporal.io/t/can-i-increase-numhistoryshards-in-cluster/18742,
community.temporal.io/t/temporal-server-config/6044
