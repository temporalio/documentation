---
slug: defining-workflows
title: Defining Workflows
author: Tihomir Surdilovic
author_title: Developer Advocate
author_image_url: https://avatars.githubusercontent.com/u/119422?v=4
image: https://avatars.githubusercontent.com/u/119422?v=4
tags:
  - workflow
  - community
  - temporal
date: 2021-10-11T00:00:00Z
---

<!--truncate-->

## Introduction

Workflows are based on the concept of capturing and expressing our business processes in a structured way. Workflow technologies are software components that promote the use of workflows for building understandable, explainable applications.

All workflow technologies provide two core capabilities:

1. Ways to define your workflows
2. A runtime that executes them

Additionally, most provide integrations with different frameworks, testing and debugging capabilities, visibility and observability features, etc.

In the first of two articles, we will give a general introduction to workflows and their importance. We will also look into different, currently-relevant approaches of defining workflows and provide their pros and cons. In the subsequent article, we will dive deeper into this subject and provide more insight into developing a real-life workflow solution using these different approaches.

## Defining workflows

Workflows can be defined in many different ways. One way that we are probably most familiar with is by just using a pen and paper. As we are planning out our day, we can write all of our tasks as a list with some defined order. This list then represents our workflow, or our structured business plan for the day. Let’s say that we write the following initial outline of our morning tasks. Note this is actually our first workflow definition.

![Initial workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ofupug76zsdoq64rdkrn.png)
_Figure 1. Initial workflow_

Workflows typically have a set goal, the result we are trying to achieve. In our case, the goal is to get to work on time. Each task in our workflow can be seen as a sub-goal or task that is important to achieve in order to reach our goal.

Our initial workflow is not perfect, and can be improved. For example, we notice that in order to give us more time to eat breakfast, we could shower and brush our teeth at the same time. Furthermore, we can make our breakfast while making coffee and lunch, as well as read our newspaper while eating. We can update our workflow to look like this:

![Revised workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/80ea8yh5xqbl72uk0omk.png)
_Figure 2. Revised workflow_

Next thing we need to realize is that this plan represents a “perfect” scenario. It does not for example deal with failures that we know could happen. We need to update our workflow to deal with predictable failures. Updating workflows is an iterative process. Updates can be based on plain common sense, but also from experience gained over time. One update we want to add to our current workflow is to check the traffic report before driving to work. If the traffic is bad, we will need to notify our boss that we will be late:
re 3. Further updates

![Further updates](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zn3zogzvwphkgbnr98fk.png)

_Figure 3. Further updates_

Notice that we used the adjectives “ok” and “bad” to describe traffic conditions. These adjectives correspond to what we think is ok or bad depending on things like the distance from our home to work, our current car condition, our driving abilities, etc. An important part of the way we define and think about workflows is very domain-specific, meaning that it is closely related to our own reasoning, how we process information, and our current circumstances.

One thing we realize is that no matter how bullet-proof we think our workflow is, it often is not. Uncertainty and having to deal with unexpected issues is part of life.
For example, let’s say we are making our breakfast burrito, it falls on the floor and our dog eats it. We can recover from this failure by making another one, while still maintaining the successful completion of our main goal. In the case we don’t have the ingredients any more to make another burrito, we can recover from this intermittent failure by making a sandwich instead.

Adding all possible intermittent failures to our workflow definitions is not feasible. There are just too many of them, some of which we cannot predict. Our workflow needs to have the capability however to recover from any such intermittent failures. One possible way to recover is to retry a task that failed, another is to be able to compensate for a task that failed with one or more other ones, all while still being able to reach our goal.

Defining workflows in our tech world is based on the same principles we used to describe using our simple morning routine workflow written on a piece of paper.
All the strategies we were able to apply to our morning routine workflow so far, such as
Iteration-based improvements, domain-specific terminology , dealing with known and unknown failures, recovering from failure, and the ability to adapt to changes, all apply to workflows targeting any domain.

## Why workflows, really

Over the last decade and more that I’ve been involved with workflow technologies, people often asked me to define what is a workflow, and why to use workflows.

The answer to “What is a workflow?” is kind of a tricky one. If you put ten people in the same room, you will get ten different answers and each one is going to be correct.
One answer that resonates to me more than others is that workflows are means to define a structured set of objectives or tasks needed to achieve a desired goal.

The answer to “Why use workflows?” (especially in the tech field), is very important to me on the other hand, and is the reason why I have been a workflow enthusiast for many years.
It’s true that we can write any sort of application without using workflows. However, by doing so, we are missing out. Workflows provide the most natural way to describe how our processes should work to both humans as well as computers.
Our workflow definition maps to how we think our applications should behave and give instructions to computers on how to execute them.

Unfortunately we cannot just scan our workflow definition that we wrote on a piece of paper and execute it. Workflow technologies, over the last years, have developed many different approaches to defining executable workflows. In the next sections we will talk about the most widely used ones.

## Common approaches for defining workflows

The two most widely used approaches for defining workflows are

- Domain-specific languages
- General-purpose programming languages

### Domain-specific languages

Domain-specific languages (DSLs) provide a higher level of abstraction compared to general-purpose programming languages. They also tend to target a very specific class of problems. The idea of domain-specific languages is to expose a smaller subset of functionality that can be used to write our workflows. This subset should be very specific to a single technology domain, and thus can be more efficient for defining workflows in that domain.
DSLs can thus be seen as specialized languages. Trying to solve a problem in one domain using a DSL that specializes in another is often inefficient or even impossible. Similarly, DSLs that attempt to specialize in multiple technology domains often lack functionality of those that specialize solely on one.

Domain-specific languages are typically exposed in three ways:

- Flowcharts
- Forms
- Markup

Both Flowchart-based and Form-based DSLs allow us to visually create our workflow definitions. They target non-technical businesses to allow them to share and describe workflows to other non-technical, as well as technical parties.

Flowchart and Form-based workflow solutions have been around for many years and are in most cases suited to represent workflows of small to medium complexities.

![Sample visual workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s66vvrvrq3an44w0aicn.png)

_Figure 4. Sample visual workflow_

Markup-based DSLs allow us to use light-weight formats such as JSON or YAML to define our workflows. They too target specific technology domains so are well suited for workflows of small to medium complexities. Markup-based DSLs do not rely on a visual representation; however many tools exist to provide this feature. In addition, they can be embedded inside resource definitions of many different frameworks and container-based solutions which use the same markup, making them attractive for integration into existing tech solutions.

![Sample markup-based DSL workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lh8svxp3ah96wmpnv0n9.png)

_Figure 5. Sample markup-based DSL workflow_

It is important to mention that whether we use flowchart, form, or markup-based DSLs, these definitions are not executable by computers and require an additional translation step which converts them into executable programming language code.

#### Pros and Cons of defining workflows with DSLs

We already touched upon some benefits of defining workflows with DSLs such as domain-specialization, visualization, ability to be understood by both technical and non-technical users, as well as easy integration with existing frameworks and tools for markup-based DSLs.

Flowchart-based DSLs typically provide a drag-and-drop experience that is intuitive to many users. Markup-based DSLs can benefit from being easily integrated into existing tooling, such as many different editors and can benefit from their Intellisense features, as well have the ability to be visualized.
Markup-based DSLs also have the benefit of being fairly easy to create and can be customized to fit the end-users specific needs.

As mentioned, when writing workflows using DSLs we should focus on solving problems of small to medium-sized complexities.

DSLs often run into issues when trying to use them for complex workflow definitions.
For flowchart-based workflows, the visualization aspect can quickly lose its benefits and become hard to understand and reason over.

![Example large flowchart-based workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lr5kkf8dy59hlitj79me.png)

_Figure 6. Example large flowchart-based workflow_

Another issue we can run into is the need to overuse programming language code that is embeddable into the visual workflow representations. Flowchart-based DSLs allow for embedding code as non-visual parameters of certain control-flow logic blocks. This code performs some aspects of the control-flow logic that cannot be expressed by visualization alone. For complex workflow definitions, we often need to add large amounts of code to define certain parts of our workflow logic that can lead to our visual model becoming misleading as to what our workflow is actually supposed to do.

![Code inside flow-chart-based DSL](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qo4aor9twlbn4itzlh3l.png)

_Figure 7. Code inside flow-chart-based DSL_

Markup-based DSLs experience similar issues when dealing with complex workflow definitions.
As they heavily rely on string-based references, defining complex workflow control-flow logic can become very hard to follow and understand. The same applies again for possible over-use of code, in the case of Markup-based DSLs, expression language syntax inside complex workflow definitions that can become hard to grasp.

One more thing that’s important to mention about DSLs is their benefit of being very domain-specific and ability to be used by both technical and non-technical users comes at a price.
DSLs often demand custom ecosystem support, namely tooling that has to be specifically created for that DSL (which are oftentimes proprietary). This is especially the case for flowchart-based DSLs.
Switching from one DSL to another to define our workflow solutions for different technology domains often leads us to having to not only learn a new DSL, but also having to get familiar with vastly different ways to test, debug, deploy, and interact with our workflows.

### General-purpose programming languages

General-purpose programming language workflow models target technical users (developers).
As the name implies, they also target a generic class of problems and can be leveraged to define workflows targeting a broad set of technology domains. For this reason they include a much wider set of features compared to those typically exposed by DSLs.

When writing our workflow definitions using code, we can take advantage of many and often all of the programming languages features, and just like generic code that we write, our workflow definitions can scale along with their complexity.

![Sample programming-language based workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5l9oer3kyyx395twh4ij.png)

_Figure 8. Sample programming-language based workflow_

#### Pros and Cons of defining workflows using programming languages

Programming languages are one of the most widely used and popular technology standards out there. Because of this popularity they have very large ecosystems and mature tooling support for things like documentation, testing, debugging, deployment and framework integration. Many IDEs and frameworks have support for multiple programming languages which makes switching out workflow definitions from one language to another a lot easier. Popular programming languages often have huge communities which leads to stable continuous language innovation, as well as quick turnarounds on improvements and bug fixes.

For developers, learning to write workflow definitions using programming languages comes naturally, as they are already familiar with coding and can easily integrate workflows as part of their existing and new development/architecture efforts.

Code-based workflow definitions do not appeal to non-technical users and cannot be easily used as means to describe business logic across different teams with wide ranges of technical knowledge levels.

Given that they are based on general-purpose programming languages, code-based workflow definitions can become complex to understand. Defining a common set of libraries and solutions for specific control-flow logic implementations, alongside the language's features such as reusability, orthogonality, and abstraction amongst many others, can often aid in lowering this complexity.

## Conclusion

I hope that this article has given you a good introduction to what workflows are and why you should use them. In addition, we went through the most common approaches to defining workflows and mentioned their pros and cons.

In the next article, we will dive deeper into this subject and provide more insight into developing a real-life workflow solution using these different approaches.

Stay tuned :)
