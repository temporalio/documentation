---
id: manage-custom-search-attributes
title: Managing custom Search Attributes
description: You can create custom Search Attributes. On a self-hosted Temporal Cluster, you can remove them; on Temporal Cloud, you can rename them.

sidebar_label: Custom Search Attributes
tags:
  - guide-context
---

To manage your custom Search Attributes on Temporal Cloud, use `tcld`.
With Temporal Cloud, you can create and rename custom Search Attributes.

To manage your custom Search Attributes on self-hosted Temporal Clusters, use `tctl`. With self-hosted Temporal Cluster, you can create and remove custom Search Attributes.
Note that if you use [SQL databases](/self-hosted/how-to-set-up-visibility-in-a-temporal-cluster) with Temporal Server v1.20 and later, creating a custom Search Attribute creates a mapping with a database field name in the Visibility store `custom_search_attributes` table.
Removing a custom Search Attribute removes this mapping with the database field name but does not remove the data.
If you remove a custom Search Attribute and add a new one, the new custom Search Attribute might be mapped to the database field of the one that was recently removed.
This might cause unexpected results when you use the List API to retrieve results using the new custom Search Attribute.
These constraints do not apply if you use Elasticsearch.
