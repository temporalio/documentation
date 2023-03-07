---
id: manage-custom-search-attributes
title: Managing custom Search Attributes
description: You can create and remove custom Search Attributes.
sidebar_label: Custom Search Attributes
tags:
  - guide-context
---

You can create and remove custom Search Attribute keys in your Visibility store. However, with [SQL databases](/clusters/how-to-set-up-visibility-in-a-temporal-cluster) for Temporal Server v1.20 and later, creating a custom Search Attribute creates a mapping with a database field name in the Visibility store `custom_search_attributes` table. Removing a custom Search Attribute removes this mapping with the database field name, but does not remove the data. If you remove a custom Search Attribute and add a new one, it is possible that the new custom Search Attribute is mapped to the database field of the one that was recently removed. This may cause unexpected results when you use the List API to retrieve results using the new custom Search Attribute. These constraints do not apply if you use Elasticsearch.

Renaming a custom Search Attribute is not supported.
