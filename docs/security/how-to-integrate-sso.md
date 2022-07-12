---
id: how-to-integrate-sso
title: How to Integrate Single Sign-on (SSO)
sidebar_label: Integrating Single Sign-on
---

Single sign-on (SSO) is a method that allows a user to log in with a single ID to multiple platforms.

SSO is kept secure by verifying a user's authentication factors. These factors are found in a certificate from a valid Certificate Authority (CA). Each platform connected through SSO has to have a similar authentication process.

SSO can be integrated with either `ClaimMapper` or `Authorizer`. The default JWT `ClaimMapper` can be used as a base for a custom implementatio of an SSO-related plugin. If you want one application to be more exclusive, you can require an additional authentication factor on top of SSO.
