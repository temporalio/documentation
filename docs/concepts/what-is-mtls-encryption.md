---
id: what-is-mtls-encryption
title: What is mTLS Encryption?
sidebar_label: What is mTLS Encryption?
---

## Overview

Mutual Transport Layer Security (mTLS) is a method of encrypting network traffic between services within a Temporal Cluster, or between application processes and a Cluster.

Like TLS, self-signed or properly minted certificates can be used for authenticating users.

## Configuration

Mutual TLS can be enabled in Temporal’s TLS configuration. This configuration can be passed along through WithConfig or WithConfigLoader.

This configuration includes two sections that serve to separate intra-cluster and external traffic. That way, different certificates and settings can be used to encrypt each section of traffic:

- internode: configuration for encrypting communication between nodes within the Cluster.
- frontend: configuration for encrypting the Frontend's public endpoints

See TLS configuration reference for more information concerning mTLS encryption.
