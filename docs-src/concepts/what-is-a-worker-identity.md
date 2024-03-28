---
id: what-is-a-worker-identity
title: What is a Worker Identity?
sidebar_label: Worker Identity
description: A Worker Identity is an identifier for a Worker Client.
tags:
  - explanation
---

Workers have an associated identifier that helps identify the specific Worker instance.
By default, Temporal SDKs set a Worker Identity to `${process.pid}@${os.hostname()}`, which combines the Worker's process ID (`process.pid`) and the hostname of the machine running the Worker (`os.hostname()`).

The Worker Identity is visible in various contexts, such as Workflow History and the list of pollers on a Task Queue.

You can use the Worker Identity to aid in debugging operational issues.
By providing a user assigned identifier, you can trace issues back to specific Worker instances.

**What are some limitations of the default identity?**

While the default identity format may seem sensible, it often proves to be of limited usefulness in cloud environments.
Some common issues include:

- **Docker containers**: When running Workers inside Docker containers, the process ID is always `1`, as each container typically runs a single process. This makes the process identifier meaningless for identification purposes.
- **Random hostnames**: In some cloud environments, such as Amazon ECS (Elastic Container Service), the hostname is a randomly generated string that does not provide any meaningful information about the Worker's execution context.
- **Ephemeral IP addresses**: In certain cases, the hostname might be set to an ephemeral IP address, which can change over time and does not uniquely identify a Worker instance.

**What are some recommended approaches?**

It is recommended that you ensure that the Worker Identity can be linked back to the corresponding machine, process, execution context, or log stream.
In some execution environment, this might require that you explicitly specify the Worker Identity.

Here are some approaches:

- **Use environment-specific identifiers**: Choose an identifier that is specific to your execution environment. For example, when running Workers on Amazon ECS, you can set the Worker Identity to the ECS Task ID, which uniquely identifies the task running the Worker.
- **Include relevant context**: Incorporate information that helps establish the context of the Worker, such as the deployment environment (`staging` or `production`), region, or any other relevant details.
- **Ensure uniqueness**: Make sure that the Worker Identity is unique within your system to avoid ambiguity when debugging issues.
- **Keep it concise**: While including relevant information is important, try to keep the Worker Identity concise and easily readable to facilitate quick identification and troubleshooting.
