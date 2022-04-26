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

Why would a highly technical and backend engineering focused company even need a designer?

When I first started my design career, there was no YouTube, Twitter or responsive design and frankly, designers and developers didn’t talk. Designers and developers were on different floors, in different buildings, and in different cities. This was quite problematic and co-locating teams became the norm to force and foster collaboration.

In my earlier days I used to be insecure about being the only woman at the table and believed that I had to be territorial about my UX title. When engineers shared their opinions on what the user experience should be, I regrettably didn’t take their input very generously. I thought it was my job to be the expert and the sole person with an opinion on the UX.  Over the past 20 years I’ve had the privilege of working with some truly amazing engineers, solution architects, scrum masters, engineering managers, you name it. From those working experiences, I’ve really come to depend on my engineering counterparts to help shape and realize the UX vision.

This personal transformation took time. There were bumps, and I learned some really valuable lessons the hard way. The most important lesson I learned was how to build meaningful relationships across the aisle. I can say with a high degree of confidence that I owe a great part of my success to collaborating, pairing and partnering with engineers.  

What I love most about my job is that product designers cut across entire organizations. The success of the role is largely dependent on building trust and establishing true partnerships with key stakeholders. Design interfaces with growth marketing, dev rel, product, engineering and customer success. This gives us a really unique vantage point inside of a business, as we synthesize pain points, needs and business challenges across multiple business units. Contrast this with the visibility of prod-eng teams, who largely operate within their own scope, mandate and service area ownership. While these prod-eng teams have a very deep and specific understanding of their services and use cases, they have a limited knowledge of how other services or parts of the product work.

As companies grow, the service topology, dependencies and complexities grow hand-in-hand. Along with this growth, comes increased debt (both ux and tech), high on-call volumes, constant interruptions, unplanned work, and weak or unreliable institutional knowledge. Not only do these issues surface in the UX, but it’s often put on the product design teams to fix them, without fixing the underlying problems.

For example, I was once working with a prod-eng team to improve the usability of a core feature and we found, to our surprise, that when the user finished a 3 step create flow, the object wasn’t immediately created. The user was redirected back to the landing page without receiving a success message or any reference of the newly created item, because it in fact had not yet been created due to our adoption of eventual consistency. Unbeknown to the user, the request went into a queue and would eventually be created, and the user would proceed to re-try to create the item. .

What happens next depends on how long it takes for the queue to process the request. In most cases, by the time the user tried to re-enter the name input, the inline validation would throw an error that the name already exists. We observed that users would slightly change the name to satisfy the error message and continue, now adding a 2nd item into the queue and re-entering this loop. In other scenarios, users would move to the final step in the process, hit the create button and would get some gnarly errors because the name already exists and wasn’t caught on the first step, because it was still in the queue.

We pulled 90 days of historical data to understand what was actually causing delays for processing the request. We found that the majority of requests took between 3-8 seconds but could potentially last up to 5 minutes, and in rare circumstances even longer. With this data in hand, we started to ideate on different ways to handle this delay in the UI. We could definitely hold the button with a spinner to solve the 3 second delay, but that wouldn’t work for a 5 minute request. Anything longer than a few seconds and the user would assume the app had frozen. Due to the fact that we didn’t know how long the delay would be, we couldn’t actually design for different time ranges.

The only remedy was to go to the pipeline team and have them extract all the creation requests from the pipeline. This was well beyond the scope of this prod-eng team and considered part of the legacy machinery. Simply put, it’s just how things worked. The potential cost of this investment solely for presenting near real-time user experiences and eliminating confusing user errors and duplicative work, was unjustifiable. We accepted that the new UX was a big improvement as it was and moved on.
