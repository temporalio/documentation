---
id: how-to-remove-a-custom-search-attribute-key
title: How to remove custom Search Attributes
sidebar_label: Remove custom Search Attributes
description: Remove custom Search Attributes from your self-hosted Temporal Cluster Visibility store using `tctl`.
tags:
  - operation-guide
  - filtered-lists
  - visibility
---

To remove a Search Attribute key from your self-hosted Temporal Cluster Visibility store, use the command `tctl search-attribute remove`.

For example, if using Elasticsearch for Advanced Visibility, to remove a custom Search Attribute called `CustomSA` of type Keyword use the following command:

`tctl search-attribute remove --name CustomSA`

With Temporal Server v1.20, if using a SQL database for Advanced Visibility, you need to specify the Namespace in your command, as shown in the following command:

`tctl  --ns yournamespace search-attribute remove --name CustomSA`

To check whether the Search Attribute was removed, run `tctl search-attribute list` and check the list.
If you're on Temporal Server v1.20 and later, specify the Namespace from which you removed the Search Attribute.
For example, `tctl  --ns yournamespace search-attribute list`.
