---
id: use-cases-actors
title: Scalable Actors
sidebar_label: Scalable Actors
---

## Motivation

A typical pattern is to have a workflow instance per business entity:

- A workflow that tracks the status of a single IoT device.
- A loyalty program that accumulates reward points per customer.
- A routine that manages a unique resource in a conflict-free manner.

Each flow responds to asynchronous events from a target entity, persists some corresponding state, and takes actions according to the defined rules.

This programming paradigm is commonly known as the Actor Model.

## Actors in Temporal

Temporal workflows are suitable to implement scalable actor systems. A workflow execution represents a single actor, uses signals for events, and automatically keeps track of the state using the backend service.

There can be tens of millions of actors running simultaneously, and each actor will be in charge of processing messages for its corresponding entity.
