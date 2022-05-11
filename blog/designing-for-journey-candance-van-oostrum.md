---
slug: designing-for-journey-candance-van-oostrum
title: Designing for the Journey
author: Candace Van Oostrum
author_title: First Designer
author_image_url: https://media-exp1.licdn.com/dms/image/C5603AQFq2qVIOpFU5Q/profile-displayphoto-shrink_200_200/0/1611000515802?e=1656547200&v=beta&t=xu184mRNVPc1qHTvHoZ3LE_udGzYG5_l2GtXf34kiD0
tags:
  - reflections
date: 2022-4-27T00:00:00Z
image: /img/an-error-occured.png
---

![An error coccured image](/img/an-error-occured.png)

<!-- truncate -->

Why would a highly technical and backend engineering–focused company even need a designer?

When I first started my design career, there was no YouTube, Twitter, or responsive design. Frankly, designers and developers didn’t talk. Designers and developers were on different floors, in different buildings, and in different cities. This was quite problematic, and co-locating teams became the norm to force and foster collaboration.

In my earlier days I used to be insecure about being the only woman at the table and believed that I had to be territorial about my UX title. When engineers shared their opinions on what the user experience should be, I regrettably didn’t take their input very generously. I thought it was my job to be the expert and the sole person with an opinion on the UX.  During the past 20 years I’ve had the privilege of working with some truly amazing engineers, solution architects, scrum masters, engineering managers, you name it. From those working experiences, I’ve really come to depend on my engineering counterparts to help shape and realize the UX vision.

This personal transformation took time. There were bumps, and I learned some really valuable lessons the hard way. The most important lesson I learned was how to build meaningful relationships across the aisle. I can say with a high degree of confidence that I owe a great part of my success to collaborating, pairing, and partnering with engineers.  

What I love most about my job is that product designers cut across entire organizations. The success of the role is largely dependent on building trust and establishing true partnerships with key stakeholders. Design interfaces with growth marketing, dev rel, product, engineering, and customer success. This gives us a unique vantage point inside a business because we synthesize pain points, needs, and business challenges across multiple business units. Contrast this with the visibility of prod-eng teams, who largely operate within their own scope, mandate, and service area ownership. Although these prod-eng teams have a very deep and specific understanding of their services and use cases, they have a limited knowledge of how other services or parts of the product work.

As companies grow, the service topology, dependencies, and complexities grow hand-in-hand. Along with this growth comes increased debt (both UX and tech), high on-call volumes, constant interruptions, unplanned work, and weak or unreliable institutional knowledge. Not only do these issues surface in the UX, but the product design teams are often assigned to fix them, without fixing the underlying problems.

For example, I worked with a prod-eng team to improve the usability of a core feature. We found, to our surprise, that when the user finished a three-step flow creation, the object wasn’t immediately created. The user was redirected back to the landing page without receiving a success message or any reference of the newly created item, because it in fact had not yet been created due to our adoption of eventual consistency. Unbeknown to the user, the request went into a queue and would eventually be created, and the user would retry creating the item. 

What happens next depends on how long it takes for the queue to process the request. In most cases, by the time the user tried to re-enter the name input, the inline validation would throw an error that the name already exists. We observed that users would slightly change the name to satisfy the error message and continue, now adding a second item to the queue and re-entering this loop. In other scenarios, users would move to the final step in the process, hit the create button, and get some gnarly errors because the name already existed and wasn’t caught in the first step because it was still in the queue.

We pulled 90 days of historical data to understand what was actually causing delays for processing the request. We found that the majority of requests took 3 to 8 seconds but could potentially last up to 5 minutes, and in rare circumstances even longer. With this data in hand, we started to ideate on different ways to handle this delay in the UI. We could definitely hold the button with a spinner to solve the 3-second delay, but that wouldn’t work for a 5-minute request. Anything longer than a few seconds and the user would assume the app had frozen. Because we didn’t know how long the delay would be, we couldn’t actually design for various time ranges.

The only remedy was to go to the pipeline team and have them extract all the creation requests from the pipeline. This was well beyond the scope of this prod-eng team and considered part of the legacy machinery. Simply put, it’s just how things worked. The potential cost of this investment solely for presenting near real-time user experiences and eliminating confusing user errors and duplicative work was unjustifiable. We accepted that the new UX was a big improvement as it was and moved on.

This is one simple and rather isolated example of issues that creep up in complex systems. That being said, it does illustrate how these siloed back-end services can quickly become UX issues. These issues also show up as errors when the UX, PM, and engineering manager weren’t aware of all the points of failure and hadn’t invested enough in graceful degradation. This is especially true in distributed systems where financial ledgers and payments are dropped or are charged twice, in growth funnel conversions when onboarding numbers plummet when applications crash and are not recoverable, and in customer success volumes when user interactions don’t perform as expected.

Organizations that have complex and distributed services become increasingly and informally dependent on the holistic operation of the product design team to have a deep knowledge of where these issues live and how to solve them. I started by saying that this was one of the best parts of the job, and it is, but it also has a dark side.

When any new product designer joins a company, builds relationships with product and engineering and gains a deep product understanding, they ultimately come to the realization that design alone cannot fix failures in distributed systems. Putting bandages, workarounds, and half measures in place becomes overwhelming, uninspiring, and a grind.

These constraints also have hidden implications for a designer’s career. At the onset of the create-workflow example mentioned earlier, the prod-eng team established KPIs and built the instrumentation to measure adoption and success of this effort. We were held accountable for improving this core feature and modernizing the user experience, even though we didn’t have access to the other services that interfered with our desired path. This dichotomy starts to seed into all initiatives, where there are no lack of high goals and aspirations but little actual ability to effect real change.

Hitting those KPIs is paramount for the designer, as a large part of their performance reviews and promotion cycles depend on it. This is after all how we quantify designers' direct impact on the business. However, so many factors are managed directly by the PM and EM that the designer has limited decision-making abilities. Our role in these situations is often to help provide the insights and data to enable the PM and EM to make the best decision. We may want the outcome to be different, but if the plumbing can’t do it or the business won’t fund it, we can’t do it. It’s that simple.

As a design leader, I am often making the case for my tremendously talented team and arguing that any deficiencies in their work product reflects the limitations of the systems and not those of  the designer. In the end, it ultimately comes down to whether leadership believes you, and hopefully they do. As a direct result, designers staffed on product areas supported by microservices and more modern tech stacks will be perceived as being more successful than their peers assigned to monolithic and legacy systems. It doesn’t take too many promotion cycles for designers to recognize this and ask for different assignments. Designers need to ship high-quality work they can put in their portfolio, or they leave.

I have worked in media, government, financial institutions, agencies, and client side. I’ve worked at startups and for the largest employers in the country. I know there are always challenges, and I know that the combination of leadership and culture can make or break teams. There’s no escaping the complexities of distributed complex systems, whether it be systems of people or servers. Or is there?

A friend recently reached out to me and told me that this really exciting startup, Temporal, was looking to hire their first designer. I took one look at their website, and the promise of eliminating the failures of complex distributed systems sounded like absolute magic. I remember thinking to myself, if this actually works, it would be unstoppable. I jumped at the opportunity and can say with absolute certainty that it does work as advertised.

At Temporal, we are embarking on a mission to change the way developers build applications. This presents itself initially as a paradigm shift in the way engineers think about building their applications, for the better. As a designer, building out these learning and onboarding flows, educational materials, an enterprise-grade cloud platform, and a whole new suite of developer tools is a dream come true.

As I write this, I am so wildly energized by the fact that app crashes can now go unnoticed to users and developers, eventual consistency is replaced with strong consistency, and that I might never have to design an error message ever again. 
