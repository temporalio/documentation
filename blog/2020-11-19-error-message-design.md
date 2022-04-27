---
tags:
- developer-experience
- errors
posted_on_: 2020-11-19T23:06:09Z
slug: error-message-design
title: Write Errors That Don't Make Me Think
author: Swyx (Shawn Wang)
author_title: Product Manager
author_image_url: https://avatars2.githubusercontent.com/u/6764957?s=460&u=97ad815028595b73b06ee4b0510e66bbe391228d&v=4
release_version: V1.3

---

<!--truncate-->

There is nothing more frustrating than a cryptic error message.

When something goes wrong, chances are you already knew it - all a cryptic error message does is confirm your suspicion _and_ tell you that you're gonna need to read through a bunch of code to figure out your error.

As framework and library designers, we can and should do better for our users by carefully following a few design principles.

## Why We Should Care

Who among us hasn't thrown up their hands at an unhelpful `Error: NullPointerException` or `undefined is not a function`? Of course, this is a [straw man](https://en.wikipedia.org/wiki/Straw_man) - unanticipated errors always leak internals. We should do our best to handle these errors as much as possible!

The frustrating part comes from errors that were _anticipated_ but obviously not given any thought:

![Example of unhelpful error message from Twitter screenshot](https://dev-to-uploads.s3.amazonaws.com/i/qiivj3cdvkbo07fwrxq6.png)

This is particularly aggravating because it compounds an already unhappy situation with an even worse debugging and bug reporting experience.

Thoughtful error message design is one of the less glamorous, but most important, parts of [Developer Exception Engineering](https://www.swyx.io/developer-exception/). Most framework developers instinctively write error messages that make sense to _them_, but a few minutes of extra effort can save DAYS of debugging for _everyone else_ (including maintainers!).

We must acknowledge two things:

- there is immense information asymmetry between the framework developer and the framework user (developers know the codebase far better than users)
- error messages are part of your developer experience too

You might be familiar with the old adage "If you fail to plan, you plan to fail." Here, we have a slight twist: **If you fail to plan to fail, you are planning to fail your users when they need you most.** Touting great developer experience with lousy error message design is like selling a beautiful car with seatbelts that don't work when there's a crash.

## Error Message Style Guide

At Temporal, our current style guide reflects our engineering roots in [Uber](https://github.com/uber-go/guide/blob/master/style.md#error-types) and [Golang](https://blog.golang.org/go1.13-errors) with some tactical recommendations:

- Use `errors.New` for simple messages and `fmt.Errorf` for formatted messages. Make sure you're using the standard `errors` go package.
- Error messages start with lowercase and no punctuation at the end: `unable to open file` instead of `Unable to open file..`
- Error messages should be actionable, e.g. `no such directory` instead of `loading service config`.
- Use `unable to...` instead of `failed to...`, `can't...`, or `could not...`.
- Messages should reflect the logical action, not merely a function name: `load service config` instead of `LoadServiceConfig`. This message should add actionable, meaningful context to the existing error message.

That said, as we evolve our developer experience philosophy, we are looking toward higher level design principles that help guide successful outcomes.

## Error Message Design Principles

We are still in the early stages of pinning down our beliefs in what makes for great error messages, but here are some candidate principles running through my mind:

- **Errors should be written for USERS, not maintainers**: Your error should make sense from a user point of view. For example, you should cite user-supplied configs and values familiar to users, not the internal variable and function names familiar to maintainers.
- **Errors should suggest WHY they happened**, or even better - HOW to fix them: As a maintainer, you probably have a high amount of context as to the possible causes of an error - take the time to write down some hints for users. If there's a high probability you know what's wrong, the error message itself can suggest how to fix it. But even without that certainty, think about what the user is likely to need to log out to debug the error, and offer it in the error message itself. Where relevant, **Errors should display what was expected vs what was received**.
- **Errors should be searchable**: Your users are most likely going to paste your errors into the search bars of your issue tracker, docs site, or Google. Consider the "SEO" of your errors. Sometimes offering a unique, human readable ID for each error can help narrow things down very quickly!
- **Errors should be logged**: Errors that happen far more often than they ought to are a signal of a deeper issue. If a user code or configuration error happens too often, it isn't the user's fault - you have bad API design. If inside a terminal environment, you should offer some text formatting to make your errors visually distinct from normal log messages.
- Last but not least, **Errors should not be too verbose**: You might be tempted to dump every piece of information under the sun, but this can be very annoying when scrolling through reams of errors. Most users don't read entire errors - make your words count, and link out to docs for fuller context. **Errors are not docs.**

Ultimately, the same high level principle applies to error messages as they do for anything involving human computer interaction: **[Don't Make Me Think](https://en.wikipedia.org/wiki/Don%27t_Make_Me_Think)**!
