---
id: use-cases-dsl
title: DSL Workflows
sidebar_label: DSL Workflows
---

## Motivation

Temporal implements business logic directly in programming languages like Java and Go. However, there are cases when using a domain-specific language (DSL) could be more appropriate.

Alternatively, there may be a legacy system that uses some form of DSL for process definition but is not operationally stable and scalable. It could be a home-grown solution, or a system like Apache Airflow, various BPMN engines, and AWS Step Functions.

## Migrate DSLs to Temporal

An application can use the Temporal SDK to interpret the DSL definition. It automatically becomes highly fault-tolerant, scalable, and durable when running on Temporal. Customers can migrate the existing portfolio of internal DSL-based process definitions and take advantage of Temporal as an execution engine.

There are multiple benefits of unifying all company workflow engines on top of Temporal. For one, it is more efficient to support a single product instead of many. Additionally, it's hard to overestimate the ability to share activities across the company.

On top of that, Temporal comes with unbeatable scalability and stability characteristics. 

## Example

- [An implemtation of Amazon States Language](https://github.com/checkr/states-language-cadence) from Checkr
