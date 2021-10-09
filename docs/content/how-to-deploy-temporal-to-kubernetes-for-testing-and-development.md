---
id: how-to-deploy-temporal-to-kubernetes-for-testing-and-development
title: How to deploy the Temporal Server to Kubernetes for testing and development
description: Use Temporal Helm Charts to deploy the Temporal Server to a Kubernetes cluster.
tags:
  - operation-guide
---

import RelatedReadList from '../components/RelatedReadList.js'

Use [Temporal Helm Charts](https://github.com/temporalio/helm-charts) to deploy the Temporal Server to a [Kubernetes](https://kubernetes.io/) cluster.

Deploying the Temporal Server with Helm is not recommended for a [production environment](/docs/server/production-deployment), but it is a great way to test the system while developing Workflows.

<RelatedReadList
readlist={[
["How to quickly install the Temporal Server for testing and local development",
"/docs/content/how-to-quickly-install-the-temporal-server","operation guide"]
]}
/>
