---
slug: things-i-learned-from-soc2-part-1
title: Things I learned about SOC 2 - Part I
author: Cully Wakelin
author_title: SDE Technical Writer
author_image_url: https://avatars2.githubusercontent.com/u/34380806
tags:
  - compliance
  - soc2
date: 2021-09-15T00:00:00Z
---

<!--truncate-->

This post is the first in a series where I highlight some of the things I learned from my experience with the SOC 2 compliance process.

## Why SOC 2 is important

It's my understanding that SOC 2 is important because many businesses won't even consider a B2B relationship if the other business is not SOC 2 compliant, and there is a reason for that.

*Let me explain.*

It's absolutely possible for a technology company to curate operating processes that optimally address security risks, processing integrity, product availability, user privacy, and user confidentiality without even thinking about compliance.

But is it likely that will happen organically or be maintainable as the company grows, or adjusts to meet market demands?
Not really.
It requires a significant level of contribution and coordination from many experienced individuals to do that in even a small 20-50 person company.
People come and go, products change, processes change, user needs change.
It is possible, but nearly improbable to maintain and scale best practices in such a dynamic environment without something to fall back on.

### Service Organization Control 2 framework (SOC 2)

While the name of the framework (SOC 2) is not very attractive to me, the idea behind it is sound and simple.
The SOC 2 framework is just a list of criteria, established by the technology service industry, that represents best practices and guiding principles.

The idea is that an organization can map their current processes to the list of criteria as a way to validate what they are doing is ideal, or find gaps that could potentially leave them exposed.

To ensure that mapping is done in an objective fashion you can pay a third party "auditor" to review your organization's processes and issue a report on their findings.

### Controls

A Control is a statement that captures the essence of what an organization does, the behavior, if you will, of some aspect of the organization.
Controls can be broad, or extremely granular in scope.
For example, a more broad Control might be one that declares that the "organization conducts a formal risk assessment every 6 months", while a more granular Control might declare that "a vulnerability scan is performed on the code base for every change that is requested to be merged into the main branch of the core SaaS repository".

An auditor looks at the set of Controls that the organization has declared, maps them to the SOC 2 criteria, ensures there are no gaps of coverage, and then analyzes "evidence" to determine whether the organization is adhering to their Control Statements.

### The report

The auditor then issues a report.
In their report they include their assessment of the controls and evidence, as well as a "system description" of the organization that describes the company and its products in a fairly high degree of detail.

The report that the auditor issues is subsequently, more often than not, an extremely comprehensive analysis and honest view of the organization and how it operates.

### Conclusion

**Therefore, in recent years, a SOC 2 report has become a cornerstone factor in whether a customer decides to place their trust in the organization.
In a lot of cases, many businesses won't even consider a B2B relationship if the other business is not SOC 2 compliant.**

It's this exact reason why Temporal, as an entirely B2B startup offering mission-critical infrastructure to multi-billion-dollar publicly listed companies, decided to prioritize SOC 2 compliance early on.
We knew that a SOC 2 report would serve as a confidence booster for our customers, and cut through a lot of the red tape that is otherwise associated with B2B relationships.
We also hoped that the compliance process would help us organize ourselves internally to optimally reduce our exposure to risks and provide the best experience for our customers, which it did.

## There are two types of SOC 2 reports

Like the title says...

### Type 1

A Type 1 is a report that identifies compliance at a very specific point in time.
For example if a Type 1 report is issued for March 31st 2021, then that means that on March 31st 2021, the organization appeared to be compliant with its control statements.
When it comes to evidence gathering and analysis, it is easy to cherry pick in order to satisfy the control statement.
For example, if the control statement states that "new employees agree to and sign an employee handbook", you really only need to provide one example of that happening to satisfy the audit.

Because of this, there is usually a lot less friction in acquiring a SOC2 Type 1 report as a startup.
The lower friction of a Type 1 means that you can use the audit as an exercise to identify your processes that can be captured as a control, and build up around the gaps.

### Type 2

A Type 2 report identifies compliance throughout a 6-12 month period of time.
The organization can choose the period.
What makes it more challenging is that the organization must be able to show that they are adhering to their control statements 100% of the time during that period.
This means that for the same control that states "new employees agree to and sign an employee handbook", you must be able to show evidence that every single employee who joined the company in the period has signed the most recent version of the employee handbook.
The auditors may not review each an every one, but their sampling is random.

### How to choose

My personal, high-level assessment here is that a startup-level organization should only really attempt a Type 2 of the gate, if the scope of the business is limited, there is minimal exposure to risk, and/or they have had enough time to establish and strictly adhere to internal processes that are industry standard best practices.

At Temporal, we started with a Type 1 and used it as a way to build up to our Type 2.

## Outsourcing only gets you so far

**Ah, experience... the ultimate teacher.**

At Temporal, we started looking at the SOC 2 compliance process in late 2020, but internally we did not have a lot of experience with it.
For this reason we networked to find someone who did, to help us out.

### Strike Graph

[Strike Graph](https://www.strikegraph.com/) is a company that provides their own "framework" for building up a control library and a UI to do it in.

Their strategy is based on a risk assessment, what they call a "risk-based" approach.
Their team has compiled a library of general risks, controls, and types of evidence that are common in the SOC 2 domain.
By assessing potential risks and selecting control statements that "mitigate" a given risk, it is possible get a solid foundation going.

In this respect, credit is due where credit is earned.
Strike Graph's "risk-based" approach did help us build a substantial foundation to work from.
Their team provided templates for policies, and also put us in touch with an auditing firm.
At the time, this was super helpful, and the effort was successful.

In February of 2021 we received a clean SOC 2 Type 1 Security report issued for January 31, 2021.
However, by the end of our audit, the smooth experience had eroded significantly and we discovered some truths about what we needed to be successful in the eyes of the SOC 2 framework moving forward.

As we looked towards the Type 2, we evaluated the bumps we encountered towards the end of our Type 1 audit.
While we had all increased our understanding of the SOC 2 process, we needed a better understanding of how our internal repeatable processes should be captured as control statements and how those control statements mapped to criteria.

### Martin Cozzi

[Martin Cozzi](https://www.marana.io/) is a consultant who specializes in the SOC 2 compliance process, and we were extremely fortunate to have retained Martin's services going into our Type 2 period.

Its probably not surprising in retrospect, but the biggest thing we learned from Martin, is that the internal culture of the organization, and its fundamental understanding and commitment to the SOC 2 framework, is what ultimately makes an audit feel like a smooth routine exercise, versus a slogging and demoralizing haze.
Martin helped us understand that we needed to embrace SOC2, not outsource it.
For an organization, we learned, SOC 2 compliance essentially affects our day to day way of life.

The other thing that Martin did, which is truly an art form, and where third party services like Strike Graph struggle, is writing custom Control Statements.
For a Type 1, Control Statements can be broad, less than accurate, or sometimes irrelevant, and you can still get by.
For ongoing Type 2 compliance, Control Statements should be super accurate, concise, and specific to the organization's systems.

I asked Martin once, "is there a course that I can take to learn to do this?".
"Unfortunately, no, at least not yet", he said.

Martin explained that he learned how to write control statements from years of experience working in the industry and working through dozens of audits.
To do it effectively, requires an in-depth understanding of the organization, the SOC 2 criteria, and the auditing partner's expectations.

With Martin's guidance, we were able to dial-in our internal processes, establish a compliance-responsibility hierarchy, and curate a rock solid set of control statements.

Not only did we manage to execute a Type 2 audit with very little friction, we managed to do it, not just for Security, but Availability and Confidentiality as well.

---

Stay tuned for the next post in this series.
