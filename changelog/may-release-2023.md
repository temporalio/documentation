---
slug: may-release-2023
title: May 04 2023
date: 2023-05-04T00:00:00Z
---

Since the last change log in March 2023, there have been changes to the Developer's guide, Production readiness guide, and to the Temporal Cloud docs.

## Languge specific developer guides

The "Dev guide" is now language specific.

- [Go](/application-development/golang)
- [Java](/application-development/java)
- [PHP](/application-development/php)
- [Python](/application-development/python)
- [TypeScript](/application-developemnt/typescript)

### Context

About 1 year ago there was a release of the first version of the Developer’s guide.

Prior to this, there was no standard way to present SDK documentation outside of the SDK references.
Each SDK had a set of pages that described things in their own way.
And yet there has always been a desire to have “how to” information regarding app development presented in a more standardized and structured way.
The creation of the "Dev guide" provided that structure by which to categorize guidance on feature usage.

The remaining unstructured content moved to [https://legacy-documentation-sdks.temporal.io/](https://legacy-documentation-sdks.temporal.io/).

Overall the structure of the Dev guide has proven to be effective in surfacing the “how-to” type of information.

However, one thing the Dev guide tried to do was create a single narrative that provided tabs for reviewing the content in the language of your choice.
But, there are several problems as a result of the single narrative with tabs.

- SEO issues: Google doesn't do well indexing tabulated content.
- UX issues while switching tabs: Pages jump due to content size differences.
- Adding additional languages: More SDKs are in development, and there is no more room for additional tabs.

While the guide is "reverting" to language specific information, it's still embracing and building on the information architecture laid out by the original single narrative Dev guide.

## Production readiness guide

Starting with Data encryption, the [Develop guide](https://docs.temporal.io/production-readiness/develop) focuses on the production aspects of Temporal Application development.

## Temporal Cloud SAML integration guide

The [SAML integration guide](/cloud/how-to-manage-saml-with-temporal-cloud) shows you how to integrate with your SAML based identity provider.
