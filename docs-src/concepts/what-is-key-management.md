---
id: what-is-key-management
title: What is Key Management
sidebar_label: Key Management
description: Key Management is a necessary component of an encryption solution
tags:
  - keys
  - encryption
  - secrets
---

Key Management is a fundamental part of working with encryption keys.

There are many computational and logistical aspects to generating and rotating keys, and this usually calls for a dedicated application in your stack. Here are some general recommendations for working with encryption keys for Temporal applications:

- [Symmetric Encryption](https://en.wikipedia.org/wiki/Symmetric-key_algorithm)  is generally faster and will produce smaller payloads than asymmetric. Normally, an advantage of _asymmetric_ encryption is that it allows you to distribute your encryption and decryption keys separately, but depending on your infrastructure, this might not offer any security benefits with Temporal.

- AES-based algorithms are [hardware accelerated in Go](https://pkg.go.dev/crypto/aes) and other languages. AES algorithms are widely vetted and trusted, and there are many different variants that may suit your requirements. Load tests using `ALG_AES_256_GCM_HKDF_SHA512_COMMIT_KEY` have performed well.

- Store your encryption keys in the same manner as you store passwords, config details, and other sensitive data. When possible, load the key into your application, so you don't need to make a network call to retrieve it. Separate keys for each environment or namespace as much as possible.

- Make sure you have a key rotation strategy in place in the event that your keys are compromised or need to be replaced for another reason. Consider using a dedicated secrets engine or a key management system (KMS). Note that when you rotate keys, you may also need to retain old keys to query old Workflows.

### Key Rotation

National Institute of Standards and Technology (NIST) guidance recommends periodic rotation of encryption keys. For AES-GCM keys, rotation should occur before approximately 2^32 encryptions have been performed by a key version, following the guidelines of NIST publication 800-38D.

It is recommended that operators estimate the encryption rate of a key and use that to determine a frequency of rotation that prevents the guidance limits from being reached. For example, if one determines that the estimated rate is 40 million operations per day, then rotating a key every three months is sufficient.

Key rotation should generally be transparent to the Temporal Data Converter implementation. Temporal's `Encode()` and `Decode()` steps only need to trigger as expected, and Temporal has no knowledge of how or when you are generating your encryption keys.

You should design your Encode and Decode steps to accept all the necessary parameters for your key management, such as the key version, alongside your payloads. Like the Data Converters, keys should be mapped to a Namespace in Temporal.

### Using Vault for Key Management

[This repository](https://github.com/zboralski/codecserver) provides a robust and complete example of using Temporal with HashiCorp's [Vault](https://www.vaultproject.io/) secrets engine.
