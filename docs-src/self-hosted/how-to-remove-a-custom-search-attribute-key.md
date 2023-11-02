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
Removing Search Attributes is not supported on Temporal Cloud.

For example, if using Elasticsearch for advanced Visibility, to remove a custom Search Attribute called `CustomSA` of type Keyword use the following command:

`tctl search-attribute remove --name CustomSA`

With Temporal Server v1.20, if using a SQL database for advanced Visibility, you need to specify the Namespace in your command, as shown in the following command:

`tctl  --ns yournamespace search-attribute remove --name CustomSA`

To check whether the Search Attribute was removed, run `tctl search-attribute list` and check the list.
If you're on Temporal Server v1.20 and later, specify the Namespace from which you removed the Search Attribute.
For example, `tctl  --ns yournamespace search-attribute list`.

Note that if you use [SQL databases](/self-hosted/how-to-set-up-visibility-in-a-temporal-cluster) with Temporal Server v1.20 and later, a new custom Search Attribute is mapped to a database field name in the Visibility store `custom_search_attributes` table.
Removing this custom Search Attribute removes the mapping with the database field name but does not remove the data.
If you remove a custom Search Attribute and add a new one, the new custom Search Attribute might be mapped to the database field of the one that was recently removed.
This might cause unexpected results when you use the List API to retrieve results using the new custom Search Attribute.
These constraints do not apply if you use Elasticsearch.
