---
tags:
  - v1
  - Temporal
  - snipsync
  - documentation
posted_on_: 2021-02-26T00:00:00Z
slug: snipsync-overview
title: How we keep our code examples fresh
author: Cully Wakelin
author_title: SDE Technical Writer
author_image_url: https://avatars2.githubusercontent.com/u/34380806
image: https://raw.githubusercontent.com/temporalio/documentation-images/main/static/snipsync-terminal-example.png
---

import { ResponsivePlayer } from '../src/components'

<!--truncate-->

In a previous post, about [the making of our SDK tutorials](/blog/the-making-of-new-user-sdk-tutorials), I talked a bit about a tool called [Snipsync](https://github.com/temporalio/snipsync).
In essence it merges source code snippets directly into our documentation, and we have been steadily converting our code examples to use it.

Thus far, in the context of our current documentation ecosystem it has been quite a wonderful little tool.
And because it has been working well for us, I wanted share a bit more about how it works with all of you.
This short video provides a decent overview of the functionality and how to use it:

<ResponsivePlayer url='https://youtu.be/_qEFcOYYjqU' />

<br/>

There are some considerations to using Snipsync however.
The source code snippets need to make sense within the context of the documentation.
Comments should be carefully selected, and additional variables and function calls within the snippet should be minimized. Essentially, a little extra effort is usually needed to align the code snippet and the documentation to work together. But even so, over the long term, it should help alleviate the painful process of scouring documentation to make sure code examples are up-to-date.
