---
id: certificates-requirements
title: Requirements for CA certificates in Temporal Cloud
sidebar_label: Certificate requirements
description: Certificates provided to Temporal for your Namespaces must meet certain requirements.
tags:
  - guide-context
---

:::caution

Temporal Cloud does not support TLS version 1.3.

:::

Certificates provided to Temporal for your [Namespaces](/namespaces) _must_ meet the following requirements.

### CA certificates

CA certificates _must_ meet the following criteria:

- The certificates must be X.509v3.
- Each certificate in the bundle must be either a root certificate or issued by another certificate in the bundle.
- Each certificate in the bundle must include `CA: true`.
- A certificate cannot be a well-known CA (such as DigiCert or Let's Encrypt) _unless_ the user also specifies certificate filters.
- The signing algorithm must be either RSA or ECDSA and must include SHA-256 or stronger message authentication.
  SHA-1 and MD5 cannot be used.

### End-entity certificates

An end-entity (leaf) certificate _must_ meet the following criteria:

- The certificate must be X.509v3.
- Basic constraints must include `CA: false`.
- The key usage must include Digital Signature.
- The signing algorithm must be either RSA or ECDSA and must include SHA-256 or stronger message authentication.
  SHA-1 and MD5 cannot be used.

When a client presents an end-entity certificate, and the whole certificate chain is constructed, each certificate in the chain (from end-entity to the root) must have a unique Distinguished Name.

:::caution

Distinguished Names are _not_ case sensitive; that is, uppercase letters (such as ABC) and lowercase letters (such as abc) are equivalent.

:::
