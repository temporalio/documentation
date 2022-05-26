---
tags:
  - temporal
  - community
posted_on_: 2022-02-28T00:00:00Z
slug: temporal-ui-beta
title: Temporal UI v2 is Now in Public Beta
author: Steve Kinney
author_title: Head of Engineering, Frontend
author_image_url: https://avatars.githubusercontent.com/u/251000?v=4
---

We're excited to announce the public beta of the new Temporal UI, which is available today as an opt-in feature for our open source users. We’d love [your feedback](https://github.com/temporalio/ui/issues).

![Screenshot of Web v2](https://user-images.githubusercontent.com/251000/159999018-d82dfe25-394b-4332-b6e8-a4fedeceec34.png)

<!--truncate-->

The new Temporal UI is a ground-up rewrite. This first release aims for parity with the current UI. Our goal was to lay the foundation for an architecture that we can iterate on. We'll continue to ship features and functionality for the foreseeable future. We also think it looks pretty nice.

We addressed dozens of quality-of-life issues and improved the performance of the user interface. We built the new web experience with [Svelte](https://svelte.dev/), which supports many of the best practices of modern web development. Svelte does the majority of its magic at compile time, which limits the amount of code shipped to operate the application at run time. The result is a significantly smaller application bundle and noticeably snappier performance.

![Event Summary View](https://user-images.githubusercontent.com/251000/160000073-fcc79ef6-4be3-4f4a-98c8-2831007a26f6.png)

We snuck in some new features along the way. In addition to a fresh look and feel, you'll notice that it's easier to see whether you're using a [Data Converter](https://docs.temporal.io/concepts/what-is-a-data-converter/). We store filter settings and queries in the URL. This means that sharing what you're currently looking at with your team is as easy as sharing a link.

The new user interface will eventually be the default experience for working with Temporal in the browser. In the meantime, we'd love for you to try it out as we continue to iterate on it. Taking the new UI for a spin is incredibly easy. If you pull down the latest version of Temporal’s [docker-compose](https://github.com/temporalio/docker-compose), it’s already running alongside the current UI but on port 8080.

![Event Full View](https://user-images.githubusercontent.com/251000/160000081-77f1b8b8-2c60-44b4-ab41-7461bcf9b558.png)

Big changes to the user interface can be tricky when you’re running mission-critical software like Temporal in production. For the time being, you can run both experiences in parallel. We’ll continue to support the existing UI as we polish and iterate on the new UI. But, over the next few weeks, we’ll begin to direct new users to use the new UI. We’ll release new versions multiple times each week as we get your feedback and solve for your use cases. On September 30, 2022, we’ll remove the current UI.

This is only the beginning for us. We have a lot of exciting features planned, now that we have this new architecture in place. We'd love to hear from you. If you encounter any issues or have any ideas for features that you'd like to see, file an issue in [our repository](https://github.com/temporalio/ui).
