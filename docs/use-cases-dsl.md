---
id: use-cases-dsl
title: DSL workflows
sidebar_label: DSL workflows
---

## Motivation

With Temporal, you usually implement business logic with programming languages like Java and Go. However, there are cases when using a domain-specific language (DSL) can be more appropriate.

Another use case would be a legacy system that uses some form of DSL for process definition but is not operationally stable and scalable. It could be a home-grown solution, or a system like Apache Airflow, various BPMN engines, and even AWS Step Functions.

## Migrate DSLs to Temporal

An application can utilize the Temporal SDK to interpret the DSL definition. This automatically makes the DSL execution highly fault-tolerant, scalable, and durable since it's running on Temporal. This means that users can migrate their existing portfolio of internal DSL-based process definitions and take advantage of Temporal as an execution engine.

If your company uses multiple workflow engines internally, it can be very beneficial to unify them with Temporal. For one, it is more efficient to support a single product instead of many. Additionally, it's hard to overestimate the the benefit sharing Activities will bring across the company.

On top of that, Temporal comes with unmatched scalability and stability characteristics.

## Example

- [An implemtation of Amazon States Language](https://github.com/checkr/states-language-cadence) from Checkr
