---
id: certificate-authority-certificate
title: tcld generate-certificates certificate-authority-certificate
sidebar_label: certificate-authority-certificate
description: Generate CA certificates using tcld.
tags:
  - tcld
  - cli-reference
---

The `tcld generate-certificates certificate-authority-certificate` command generates certificate authority (CA) certificates for Temporal Cloud.

`tcld generate-certificates certificate-authority-certificate <modifiers>`

Alias: `ca`

The following modifiers control the behavior of the command.

#### --organization

Specify an organization name for certificate generation.

Alias: `--org`

**Example**

```bash
tcld generate-certificates certificate-authority-certificate --organization <value>
```

#### --validity-period

Specify the duration for which the certificate is valid.
Format values as d/h (for example, `30d10h` for a certificate lasting 30 days and 10 hours).

Alias: `-d`

**Example**

```bash
tcld generate-certificates certificate-authority-certificate --validity-period <value>
```

#### --ca-certificate-file

Specify a path where the generated x509 certificate file will be stored.

Alias: `--ca-cert`

**Example**

```bash
tcld generate-certificates certificate-authority-certificate --ca-certificate-file <path>
```

#### --ca-key-file

Specify a path where the certificate's private key will be stored.

Alias: `--ca-key`

**Example**

```bash
tcld generate-certificates certificate-authority-certificate --ca-key-file <path>
```

#### --rsa-algorithm

When enabled, a 4096-bit RSA keypair is generated for the certificate instead of an ECDSA P-384 keypair.
Since an ECDSA P-384 keypair is the recommended default, this option is disabled.

Alias: `--rsa`

Specify a path to store the generated x509 certificate file.

Alias: `--ca-cert`

**Example**

```bash
tcld generate-certificates certificate-authority-certificate --rsa-algorithm <boolean>
```
