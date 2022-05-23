---
tags:
  - Temporal
  - open source
  - Kubernetes
posted_on_: 2021-09-02T00:00:09Z
slug: temporal-and-kubernetes
title: 'Self Hosting Temporal: To Kubernetes or Not To Kubernetes?'
author: swyx
author_title: Head of Developer Experience
author_image_url: https://avatars.githubusercontent.com/u/6764957?v=4
release_version: V1.11.3
---


<!--truncate-->

Open Source Temporal users often ask about the optimal deployment strategy — the right answer varies depending on Kubernetes expertise, tooling preferences, and intended cluster size. We hosted a discussion between Temporal's Kubernetes experts: Derek Wilson, Ryland Goldstein, Dominik Tornow, and Tihomir Surdilovic.

**If you are attending Kubecon in Los Angeles**, Temporal will be hosting a happy hour on Oct 13 and 14th! [Sign up to our mailing list](https://temporal.io/subscribe) to get details!

import { ResponsivePlayer } from '../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=11I87HKS_NM' />

## Show notes

- **Baseline Context**
    - #1 goal of Helm is for packaging apps
    - People use helm charts to "grab and go"
    - We use helm charts to template
    - K8s has resources, no notion of application
- **Is Kubernetes a good platform for deploying Temporal?**
    - Yes for Temporal core service roles - [History, Matching, Frontend, Worker](/concepts/what-is-a-temporal-cluster)
    - No for Cassandra and ElasticSearch
    - "any general purpose container orchestration solution that allows cross container communication eg Kubernetes”
- **Is Helm a good tool for deploying Temporal on Kubernetes?** [https://github.com/temporalio/helm-charts](https://github.com/temporalio/helm-charts)
    - Pros: Popular, Lots of PRs
    - Cons: Hard to make changes, Go templates not a great fit for YAML
        - Doesn't fit Immutable Infra concept
    - Helm is fine if you generate the manifests and incorporate them into your production deployment pipeline for only the temporal server components
    - Use helm-template, dont use helm to manage deployments
- **Alternatives to Helm**
    - Rancher
    - Kustomize: good for merging yml, not programmatic infra
    - Programming langs → configuration
        - Cue - types are values, values form lattices
        - Jsonnet - freeform, declarative, modeled after Google config lang
            - use OPA for validating generated manifests
    - Ytt
    - Kapp
    - 1 yaml file - kubectl apply
- **Alternatives to Kubernetes**
    - Nomad
    - Mesos
    - AWS ECS
    - [How To Deploy Temporal to Azure Container Instances](https://mikhail.io/2020/10/how-to-deploy-temporal-to-azure-container-instances/)
    - [How To Deploy Temporal to Azure Kubernetes Service (AKS)](https://mikhail.io/2020/11/how-to-deploy-temporal-to-azure-kubernetes-aks/)

## Helm Charts

As a result of this discussion, Dominik is leading an effort to clarify our [provided Helm charts](https://github.com/temporalio/helm-charts) so that they are easy to extend, rather than catering to every possible need. Watch that repo for updates and [join our Slack](https://temporal.io/slack) to get involved!

## Minikube

If you'd like to test run Temporal with Kubernetes locally, see Tiho's recent video on running Temporal with Minikube:


<ResponsivePlayer url='https://youtu.be/f6N3ZcWHygU' />
