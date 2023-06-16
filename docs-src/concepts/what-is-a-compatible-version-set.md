---
id: what-is-a-compatible-version-set
title: What is a Compatible Version Set?
description: A Compatible Version Set is a user-defined collection of Build IDs that indicates which versions of the Workflow code are mutually compatible.
sidebar_label: Compatible Version Set
tags:
  - term
  - explanation
  - worker-versioning
---

A Compatible Version Set is a user-defined collection of Build IDs that indicates which versions of the Workflow code are mutually compatible.
Each Compatible Version Set has a Default Build ID.

A Task Queue has a default maximum of 10 Compatible Version Sets and a maximum of 100 Build IDs for a single Task Queue across all Compatible Version Sets.

You can visualize Compatible Version Sets as a tree-like structure, where a branch represents the progressive evolution of each build. Each branch in the tree is a series of versions that are compatible with each other, but not necessarily with versions in other branches.

For example, Build ID of `1.0` might start a new branch and therefore isn't compatible with Build ID of `0.4` from an earlier branch. However, Build ID of `1.1` is compatible with Build ID of `1.0` because it's a newer version of the same branch.
