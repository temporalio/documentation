---
id: reachability-type
title: temporal reachability-type
sidebar_label: reachability-type
description: Specify how you'd like to filter the reachability of Build IDs
tags:
    - cli reference
    - temporal cli
    - options-feature
    - command-line-interface-cli
---
Specify how you'd like to filter the reachability of Build IDs.
Valid choices are:
    - `open`: reachable by one or more open Workflows.
    - `closed`: reachable by one or more closed Workflows.
    - `existing`: reachable by either open or closed Workflows.

Build IDs that are reachable by new Workflows are always reported.