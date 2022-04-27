---
slug: good-compliance-programs-do-not-require-a-fancy-platform
title: Good compliance programs don't require a fancy platform
author: Cully Wakelin
author_title: SDE Technical Writer
author_image_url: https://avatars2.githubusercontent.com/u/34380806
tags:
  - compliance
  - soc2
date: 2021-10-18T00:00:00Z
---

<!--truncate-->

Several companies offer compliance automation platforms—[Vanta](https://www.vanta.com/), [Strike Graph](https://www.strikegraph.com/), [Drata](https://drata.com/), and others.
Depending on who you ask, these platforms are either the best thing since sliced bread or they are selling snake oil.
The truth, from my experience, is somewhere in the middle, with many of the pros and cons of these platforms shifting depending on your company's experience level.

To be clear, System and Organization Controls (SOC) 2 makes up most of my experience when it comes to compliance, so my current view is through that lens.
But I would argue that the goal of any compliance effort—SOC 2, HIPAA, or ISO 27001—is the same: establishing customer trust. (See the following section, "Why compliance frameworks are important," for my take on this.)

<details>
<summary> Why compliance frameworks are important
</summary>

If you already understand this, feel free to skip this section.
But if you are new to compliance and are trying to figure why you should even care (and how it translates to customer trust), this explanation might help.

A technology company can have a great story around security, integrity, availability, privacy, and confidentiality without ever thinking about compliance.

Is it likely to happen organically or be maintainable as the business scales, or adjusts to meet market demands?
Probably not.

That would require significant levels of contribution, coordination, and discipline from many experienced individuals, routinely, even in a small (20–50 person) company.
Personnel, products, processes, and user needs constantly change.
It is possible, but nearly improbable to maintain and scale best practices in such a dynamic environment without some sort of framework to fall back on.

## Compliance frameworks

A compliance framework gives organizations something to fall back to.
Let's take SOC2 for example, which stands for Service Organization Control 2 framework.
The SOC 2 framework is just a list of criteria, established by the technology service industry, that represents best practices and guiding principles.

The idea is that an organization can map their current processes to the list of criteria to validate that what they are doing is ideal, or to find gaps that could leave them exposed to some sort of risk (think data breach, or a malicious attack on a system's availability).
To ensure that mapping is done in an objective fashion, you pay a third-party auditor to review your organization's processes and issue a report on their findings.

## Controls

A Control (particularly with SOC 2) is a statement that captures the essence of what an organization does—the behavior, if you will, of some aspect of the organization.
The scope of a Control can be broad or extremely granular.
For example, a broad Control might be one that declares that the "organization conducts a formal risk assessment every 6 months," while a granular Control might declare that "a vulnerability scan is performed on the code base for every change that is requested to be merged into the main branch of the core SaaS repository."

An auditor then:

- Looks at the set of Controls that the organization has declared
- Maps them to the compliance framework criteria
- Identifies any gaps of coverage
- Analyzes evidence to determine whether the organization is adhering to their Control Statements

## The report

The auditor then issues a report.
In their report, they include their assessment of the Controls and evidence, as well as a "system description" of the organization that describes the company and its products in a fairly high degree of detail.

The report that the auditor issues is—more often than not—an extremely comprehensive analysis and honest view of the organization and how it operates.

## Conclusion

**In recent years, a compliance report (such as SOC 2) has become a cornerstone factor in whether a customer decides to place their trust in the organization**.
In a lot of cases, many businesses won't even consider a B2B relationship if the other business is not compliant within a framework

That is why you should care.
If your organization is compliant within a framework, it is following best practices to the best of its abilities, and thus your customers can feel good about placing their trust with you.

</details>

So what role do these platforms play in helping you do that?

Well, each one has a slightly different angle.
Almost all of them promote themselves as a way to "simplify" the compliance process by providing a set of tools to help you organize your resources and automate compliance processes, particularly around an audit.
Personally, I think you should be wary of any of these platforms that say they can make things "simple" for you, because that is silly.
This stuff is complex.
What I _do_ value are platforms that can help you understand how your internal operations map to compliance framework criteria.
That is the art, the heart, and the best-kept secret of this whole thing that is so often glazed over.

Consider this well-known adage:

> Give a man a fish, feed him for a day. Teach a man to fish, feed him for a lifetime.

Most of these platforms teach only when they have to, as a means of getting you to pay to use their tools.
They don't want to teach, they want you to keep coming back to them.
The truth is, after you learn how to parse the language of compliance framework criteria and how to map real-world operations to it, you don't need these platforms.

Now, to be fair, learning this is not super easy.

I recently asked a SOC 2 expert, [Martin Cozzi](https://www.marana.io/), how he learned.
He said it was the same way I was learning: through experience.
(He has been through more than 50 audits.)
He knows of no course that teaches this.

To me, what makes a compliance audit easy (instead of a slogging and demoralizing haze) is not whether you have fancy automation tools, a fancy web UI, or an all-in-one auditing platform.
What matters is whether your company has embraced the framework against which you want to be compliant and understands how your operations fit into it.
That's it.
You either know what you are doing, or you don't.
And the unfortunate truth is that many of these platforms take advantage of those who don't know what they are doing and sell them a set of tools that are effective only if you know what you are doing.

What these platforms could (and should) be doing is teaching.

## Keys to a successful compliance program

I have now been through two SOC 2 audits with Temporal Technologies.
Throughout each of them I acted as the compliance lead, a sort of project manager.
My primary responsibilities were to organize materials, gather evidence for audits, schedule meetings, and generally create a structure to operate in.
I was also the auditor's point of contact with our company, funneling and prioritizing communications, and translating requirements into action items for our team.
I kept other key players up to date.
And if necessary, I pushed them when deadlines closed in.

I have worked with both [Strike Graph](https://www.strikegraph.com/), one of the compliance platforms, and [Martin Cozzi](https://www.marana.io/), an independent consultant.

From these experiences, here are my five key things that shaped our successful compliance program.

### 1. Retain the help of an expert to get ramped up

Compliance programs offer little room for trial and error, and they have too many pitfalls to overcome through self study.
So, I definitely recommend getting someone with experience to help.

For startups and other small companies that do not have in-house experience yet, platforms like Strike Graph (for SOC 2 at least) are actually not a bad way to go.
They can help you get going for a lot less money than a dedicated consultant.
As an example: Strike Graph maintains a team of customer success agents who can steer you in the right direction by providing a lot of context and boilerplate policies.

But just remember they are not in the business of understanding your business, and therefore they most likely will not be able to help with precise custom Control Statements that scale for you.
Additionally, they may not be able to help accurately translate the expectations of your auditing partner into action steps.

And using a compliance platform means that you have yet another external, third-party system to sign in to
and learn how to use.
Managing Control Statements and evidence outside of normal business tools often means "out of sight, out of mind" and greatly reduces visibility into compliance processes internally.

If you can afford a personalized consultant, such as Martin Cozzi, I would highly recommend that route.

Consultants like Martin take the time to understand your business in conjunction with the expectations of the auditing firm, to craft a compliance strategy that is best suited to your company.
This also means that they can translate auditor expectations into actionable steps for you.
They can help write custom Control Statements that accurately reflect what you are doing and map them to compliance criteria.
And my favorite part: Consultants like Martin can show you how easy it is to manage compliance materials by using the project management tools that _you already use_.
If you don't use project management tools, all you need is a spreadsheet.
When you are oriented in the compliance world, you don't need a fancy UI and tools to keep track of the state of your compliance efforts.

### 2. Do what you say you are doing

When you write a Control Statement, it must be one that is accurate and true.
You want your implementation of that Control to be done in a way where you can prove that you did those things during a period of time.

For example, if you have a Control Statement that says "The engineering team is notified whenever there is a release to production", then (A) that should actually be happening, and (B) you should be able to prove that.

But really think about this statement for moment, because it forces you to define the following:

- What is the "engineering team"? Who is in that scope?
- What is our method or mechanism of notification?
- What is considered a "release to production"?

By ironing all of that out and ensuring that you have a history of evidence to gather, this Control Statement (and the associated actions you take) can scale with the company for a very long time.

### 3. Internally manage Control Statements and resources

This one piggybacks a bit on the first key to success and draws a line in the sand about deciding whether to use a compliance platform.
I feel strongly about it because I have seen just how much more engagement occurs across the company when Control Statements and resources are managed using "normal" and "routine" tools.

For example, at Temporal Technologies we use [Notion](https://www.notion.so/) for just about all of our internal documentation and project management.
With just a little bit of effort, we were able to track our compliance efforts by using the same project management tools in Notion that we already use for Engineering and Product efforts.

As it turns out, this was a pretty big deal, because everyone in the company has access to Notion.
Everyone can see the Control Statements, what criteria those statements map to, the policies that we wrote for processes to adhere to, the progress of any given compliance effort, and so on.
This level of transparency also means that we can easily see how any internal task rolls up under a compliance-related effort, or has been generated by it.
Essentially, this approach puts the compliance program right at the heart of our operating mindset, which is so critical for the long term.

### 4. Use a reliable auditing partner

Many companies offer auditing services, but finding the right one for your company can be a challenge.
That's because each company does things a little differently.

We have worked with two different auditors so far, and for us we found our experience with [Schneider Downs](https://www.schneiderdowns.com/) to be really good.
Martin recommended them, and he has worked with them for a few years.

The pros that we really liked were:

- They were highly communicative.
- They had previous experience with developer-facing SaaS companies.
- They had a polished system for evidence submission that gave us clear visibility into the status of our audit.

I definitely cannot say that this is the case for the other companies we talked to and worked with previously.

### 5. Spread out the workload

While spreading out the workload helps to prevent any single person from getting overwhelmed, it is also about knowing the roles that individuals play in the compliance effort.
We found that any given person generally falls into one of three roles.

#### The Department Head

This is a very important role.
The Department Head's responsibility is to make sure that people are doing the things we say we are doing.
The Department Head must have a good sense of Control Statements that fall into their area.
They are the "buck stops here" person in terms of driving their department to think and care about the compliance process.

In our last period we had four Department Heads who were heavily involved in the process:

- HR
- Engineering
- Security
- Product

#### The Project Manager

As I mentioned before, the Project Manager has the responsibility of generally creating a structure to operate in.

- Organize materials, gather evidence for audits, and schedule meetings.
- Be the auditor's point of contact with the company, funnel and prioritize communications, and translate requirements into action items for the team.
- Keep other key players up to date and push on them when deadlines close in.

As the Project Manager for Temporal's SOC 2 efforts, I created and maintained a section in Notion for all of our policies, Control Statements, and evidence aggregation.
I established a routine way of escalating requests for evidence and scheduling decision-making sessions.
I also worked very closely with Martin, picking his brain, to provide internal guidance when needed.

#### The Evidence Gatherer

The Evidence Gatherer is someone who captures evidence based on a request for the auditing process.

An Evidence Gatherer must be someone who is familiar with the domain to know what to gather and how to gather it, working with both the Project Manager and the Department Heads to do that.

In our last audit, we had to submit well over a hundred pieces of evidence, most of them unique, and some large in scope.
We had at least a dozen Evidence Gatherers, including Department Heads, and me as the Project Manager.

## Summary

So with all that said, if I had to reduce my sentiment to a single sentence it would be this:

> Embrace and learn your compliance framework; do not outsource the responsibilities of understanding it.

Does that mean you shouldn't ever use one of the compliance platforms with a shiny UI and automation tools?
No, it just means that if you choose to use one, make sure it is integrated into the heart of your business and its operating processes.
Try to extract from them every ounce of knowledge you can.
Just like an individual needs to be their own advocate when it comes to their health and wealth, a company needs to be its own advocate when it comes to understanding its operating processes in the context of any given compliance framework.

If you know what you are doing, a compliance platform could help you.
If you don't, it could become just another complex layer blocking you from figuring it all out.
A good compliance program doesn't need fancy tools and a UI.
It just needs internal accountability.
