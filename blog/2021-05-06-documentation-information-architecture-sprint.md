---
tags:
  - documentation
  - information-architecture
  - temporal
  - site design
posted_on_: 2021-05-06T00:00:00Z
slug: docs-info-arch-2021
title: 'How we structured docs for user personas'
author: Cully Wakelin
author_title: SDE Technical Writer
author_image_url: https://avatars2.githubusercontent.com/u/34380806
image: /img/documentation-landing-page-april-2021.png
release_version: V1.9.1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--truncate-->

A few weeks ago, around the end of March 2021, I set my focus on finally refreshing the information around Temporal's core concepts.
Refreshing the core concepts documentation area had become a major priority in my mind.
The area had largely gone untouched in the last couple of years, and user feedback suggested it consisted of far too many industry terms laden with heavy connotations and lacking in practical purpose and use case.

I figured the best place to start was with Workflows.
As I tried to wrap my head around the best approach to introduce this concept to a new user, I fell back on a first principle to writing documentation, asking myself "what does it do?"

And this is when a wave of realization crashed over me.
Like a surfer working their way past the break line, I had been bobbing about in between sets and another had just rolled in.

![Duck dive](https://i.gifer.com/71xf.gif)

I had to take a breath, duck under the wall of white water and try and find my angle of approach, suddenly aware that if we didn't get past the break line soon, we may be stuck here for awhile.

The realization was that the answer to my question was already fairly well defined across any number of resources;
A "workflow" is a sequence of processes, from initiation to completion, through which a piece of work passes.
A Temporal Workflow is just that, hence the name.
Within the context of Temporal, it is _how_ that happens, and _why_ it happens in the way that is does that is the secret sauce.

However, one must learn not only of Temporal's overall strategy, but also language specific implementation details simultaneously to get a taste of that secret sauce.
At the time of writing this, we supported three implementation languages with a fourth on the way, with each language presenting its own unique way of defining and writing Workflows.
My instinct was that something fundamental was off in the current approach to presenting this information.

I needed to think.
So, I went for a run.

![Run gif](https://media.giphy.com/media/13ZPuK9cmWembe/giphy.gif)

With my legs pumping freshly oxygenated blood through my brain, my heart, and my veins, I set my mind to the task at hand.
I tried to come at the problem from a new user's perspective.
This is how I discovered a problem that I hadn't fully noticed before.

## User personas

The thing is, not all users are after the same information.
Unlike many other technologies, we don't offer a single service or API endpoint.
Temporal's boundaries are high and wide, and there are at least four unique user groups accessing the documentation.

1. **Infrastructure and operations engineers** looking to deploy and operate their own Temporal Server cluster.
2. **Developers and software engineers** looking to start building applications.
3. **Operators and SREs** looking to troubleshoot, debug, or generally monitor the system's health.
4. **Business decision makers** evaluating the technology as a whole or considering the use of our cloud service (still in beta).

A single person may bridge multiple personas, but while embodying one, they won't want to be bogged down by information directed at the other.
This particular aspect of our users convinced me that in order to meet our user's information needs, separating content based on our user's personas was the first step towards a fundamentally sound base to build off of.

Building documentation is an iterative process.
And, up until that point, we had iterated our documentation such that this is what our landing page looked like:

![Temporal docs landing page March 2021](/img/documentation-landing-page-march-2021.png)

It's not entirely bad.
But, as you can see, it doesn't provide a very clear path for a new user with a particular agenda.
Someone might spend a good deal of effort wading through the full spectrum of information to potentially find what they are looking for.
Thus, I decided, information architecture was a key variable in this equation.

## Now you're speaking my language

Now that I was convinced that changes were needed to our information architecture to address our user's personas more appropriately, I revisited the problem of our core concepts.

At this stage, I was able to make the following connections:

1. From an application development perspective, everything boils down to about six core concepts:
    - Workflows
    - Activities
    - Workers
    - Task Queues
    - Signals
    - Queries
2. The developer/software engineer persona is the one who is primarily concerned with internalizing and fully understanding these concepts.
3. One can only fully describe any of these concepts within the context of a particular language.
4. A developer is almost certainly only going to be interested in learning in a single language.

Look at how a Workflow is defined across each language:

<Tabs
  defaultValue="go"
  values={[
    {label: 'Go', value: 'go'},
    {label: 'Java', value: 'java'},
    {label: 'PHP', value: 'php'},
  ]
}>

<TabItem value="go">

```go
func SimpleWorkflow(ctx workflow.Context, someArg string) (string, error) {
  // Do something
  if err != nil {
    return "", err
  }
  return "success", nil
}
```

</TabItem>
<TabItem value="java">

```java
@WorkflowInterface
public interface SimpleWorkflow {

    @WorkflowMethod
    String simpleWorkflowMethod(String someArg);

}

public static class SimpleWorkflowImpl implements SimpleWorkflow {

   @Override
   public String simpleWorkflowMethod(String someArg) {
       // Do the stuff
       return something
   }
}
```

</TabItem>
<TabItem value="php">

```php
#[WorkflowInterface]
interface SimpleWorkflowInterface {

    #[WorkflowMethod]
    #[ReturnType("string")]
    public function simpleWorkflowMethod(string $someArg);
}

class SimpleWorkflow implements SimpleWorkflowInterface
{

    public function __construct()
    {
        // Do stuff
    }

    public function simpleWorkflowMethod(string $someArg): \Generator
    {
        // Do stuff
        return something;
    }
}
```

</TabItem>
</Tabs>

While, one could tabulate between languages within a concept like above, as you get into the details, it becomes much more complicated. Additionally, not all features are available across each language, like [Sessions in Go](/go/how-to-create-a-worker-session-in-go) for example.
And, because the implementation details and terminology can be so different from language to language, the obvious solution presented itself:

1. Each language should be visually separated from the others as its own topic area.
2. We must present each of these core concepts within the context of each language specifically.

At the same time, we couldn't just abandon a high-level concepts section, because from a practical perspective we need to be able to offer a linkable landing page for each concept that is still independent of a specific language.
Imagine trying to share Temporal with someone but only having a language specific link to provide.
That would create a bit of a conundrum for those trying to share our page links.

Thus, our core concepts section would become a sort directory for each of the languages, directing developers to language specific concept pages.

## April 2021 changes

In April, the Temporal Product Team set about iterating towards these solutions.
And we are excited with the results!

We redesigned our documentation landing page, [docs.temporal.io](/):

![Temporal documentation landing page April 2021](/img/documentation-landing-page-april-2021.png)

We implemented a new SDK landing page, [docs.temporal.io/application-development](/application-development):

![Temporal documentation app dev landing page April 2021](/img/documenation-app-dev-landing-page-april-2021.png)

And we created a much more immersive experience for the user personas that we identified above:

- Go developers for example, [docs.temporal.io/go](/go):

![Go topic area](/img/go-topic-area.png)

- Infra engineers for example, [docs.temporal.io/server](/clusters):

![Server topic area](/img/server-topic-area.png)

And we started converting the core concepts into a directory for new users learning about Temporal:

![Core concepts area](/img/concepts-topic-area.png)

## Still day one

We have finally arrived at a place where there is an information architecture that fundamentally matches our user's personas.
With this change in focus, our hope is that learning about the how and why of a particular concept becomes a much more rewarding and informative experience.

We know we have a LOT more work to do.
We still lack full coverage of the concepts within each language, and the navigation and search experience can be made more intuitive.
If you have ideas for how to improve them, [email us](mailto:docs@temporal.io)!
