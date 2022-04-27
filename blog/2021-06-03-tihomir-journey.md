---
tags:
  - Temporal
  - Workflow
  - Reflections
posted_on_: 2021-06-03T00:00:00Z
slug: tihomir-journey-to-temporal
title: 'My journey to Temporal'
author: Tihomir Surdilovic
author_title: Product
author_image_url: https://avatars.githubusercontent.com/u/119422?v=4
image: https://avatars.githubusercontent.com/u/119422?v=4
release_version: V1.9.2
---

import { ResponsivePlayer } from '../src/components'

<!--truncate-->

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bbyrstkmia07llagoz14.png)

My 12-year journey with workflows has finally led me to [Temporal](https://temporal.io/), and I do not believe it was by chance.
For a long time I was trying to fit in with different workflow ecosystems, without much success.
I have been involved in writing workflow runtimes such as jBPM, Web and Editor tools, libraries, as well as
[defining workflow language specifications](https://serverlessworkflow.io/), but often felt as something was missing.

### Looking back

I have been involved with open-source workflow technologies since 2009, right when they started taking off. Back then we were enthusiastic about it but more importantly, the work was done with the right mindset while focusing on the community.
Fast-forward 12 years and I find myself in a situation where things seem to be heading in a significantly different direction.
The ecosystem I was involved with had stagnated, mostly due to its inability to adapt and keep up with the increasing demand for workflow technologies in modern architectures.
Innovation took a back seat to pulling wool over people's eyes, luring them into vendor locks and outdated technologies all while using buzz words like “standards” and “best practices” as bait.

The situation made me want to try my luck in a different tech field, but I never gave up hope that there are open source companies still doing it right. My search ended at Temporal, and it could not have been a better fit.

On the technical side of things, Temporal is no joke. When they say they enable developers to build resilient apps at a massive scale, they really mean it. There are no fake promises, no switch and bait tactics, no hidden agendas.
Temporal has a strong focus on the community. If you have any questions, just reach out on our [Community Website](https://community.temporal.io/) or [Slack](https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw).

### Control

Temporal is very un-intrusive which really stood out to me, given my past experiences. Typically, when you want to adopt a new workflow technology, you’re forced to change the way you code and architect applications. You sacrifice a lot of control and have to conform to the rules of the workflow engines you adopt.

With Temporal, the story is completely different. It doesn’t matter if you have an existing application or are developing a new one; you can easily integrate it with a lot of different architectures and programming models. You pick and choose which parts of your code (typically your core business logic) you want to turn into resilient, transactional, and stateful Workflows.

### Programming model

Another thing I want to mention is how workflows are defined in Temporal. My past experience revolved around representing workflows via some domain-specific language defined with XML, JSON, or YAML. DSLs can be great and often very useful, assuming they target a specific business domain and do that well.
There are currently very few workflow DSLs that are open source and vendor neutral that focus on this important fact.

With Temporal, users write workflow definitions with standard programming languages. This is a much more powerful approach to writing workflows. Not only are programming languages better at representing control flow logic (compared to DSLs for example), but along with the Temporal SDKs it’s easy to implement very complex things like:

- Sync/async execution
- Compensation (SAGA)
- Retries
- Periodic execution (cron)
- Event handling
- True parallel execution
- Cancellations
- Complex error handling

These are things that are very hard to define right or at all using any DSL. Temporal also solves a very profound problem with DSLs and workflows in general - testing. Temporal SDKs provide a very sophisticated testing API which can easily be integrated into existing testing/mocking frameworks and CI/CD pipelines.

If you are interested in using any DSL, you can write any DSL interpreter on top of Temporal.
This instantly brings all the Temporal benefits to your DSL of choice.

There are many more technical benefits I’d love to talk about, but will leave that for future posts. After a month and a half I am still learning cool new things every day.
Check out the Temporal intro video I made which shows off some of the benefits of Temporal we touched upon in this blog:

<ResponsivePlayer url='https://www.youtube.com/watch?v=23rX78xqYUg'/>

<br/>

### Joining Temporal

Being able to work on amazing technology is great, but what about the people inTemporal? From the beginning of my interview process until now, I still cannot believe how great the people are that work here. There hasn't been a single person I have interacted with that I didn't feel comfortable with. From the start, my co-workers went above and beyond to try to help me; from setting up health benefits, to signing up into the payment systems, and getting my laptop shipped.
Shortly after I started, I received a box full of Temporal swag in the mail. Everyone has been patient with me while trying to learn as much as possible to start being productive. And if it’s not enough to be surrounded by nice people, this team is also super smart and are leaders in the open source community. You can learn so much from them!
The team atmosphere at Temporal is real, and I think it’s something that a lot of us long for. I sure have.

If you have any questions or would like to share your thoughts, feel free to reach out to me at [tihomir@temporal.io](mailto:tihomir@temporal.io).
Also don't forget, [Temporal is hiring](https://temporal.io/careers).
