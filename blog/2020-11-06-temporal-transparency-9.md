---
tags:
- v1
- community
- transparency
- auth
- code-first
posted_on_: 2020-11-06T23:06:09Z
slug: temporal-transparency-9
title: 'Temporal Transparency Update #9: Auth is Coming'
author: Swyx (Shawn Wang)
author_title: Product Manager
author_image_url: https://avatars2.githubusercontent.com/u/6764957?s=460&u=97ad815028595b73b06ee4b0510e66bbe391228d&v=4
release_version: V1.2

---
<!--truncate-->

**Latest Release at Time of Writing:** V1.2.1

Hey Temporal community, it's Friday again! It's been a long week with *ahem* a lot of other things going on in real life, but work has continued apace on Temporal.

# Update November 6, 2020

It's been a while since we published one of these updates, but in our defence, we were busy:

- [Announcing Temporal v1.0](https://docs.temporal.io/blog/temporal-v1-announcement), our first production-ready release
- [Announcing our Seed and Series A rounds](https://docs.temporal.io/blog/funding-announcement) led by Amplify and Sequoia
- Shipping [our new Landing Page](http://temporal.io/) (ft. a well received [2 minute explainer video](https://www.youtube.com/watch?v=f-18XztyN6c&feature=emb_title)) and [three case studies with Box, Checkr, and Coinbase](https://docs.temporal.io/blog/tags/case-study) (fun thing we noticed, they all have [blue logos](https://www.logomaker.com/blog/2017/09/27/blue-logos/))
- [PostgreSQL 9.6 support](https://github.com/temporalio/temporal/releases/tag/v1.2.1) (`v1.1.x` included schema changes for our MySQL and Cassandra support - see [release notes](https://github.com/temporalio/temporal/releases/tag/v1.1.1) for migration tools)

The team has grown some (including me!) and [we're absolutely hiring](https://www.temporal.io/careers/)!

## Authentication is Coming

### TL;DR

We're working on Authentication for Temporal Web, and are looking for beta testers. Please <a href="mailto:swyx@temporal.io">get in touch at `swyx@temporal.io`</a> if you're interested in helping to test!

### Context

Temporal is a highly critical system for many businesses, so security is paramount.
Communication is already encrypted with [TLS](https://docs.temporal.io/server/configuration/#tls), 
and you can put Temporal behind a reverse proxy. However,
one of our longest standing requests has been for an authentication/authorization layer for Temporal.
This is what we are tackling first,
as it is also necessary for [the upcoming Temporal Cloud](https://temporal.us17.list-manage.com/subscribe/post?u=2334a0f23e55fd1840613755d&id=bbbbd4709f) service offering.

It's not ready for release yet, but we'd like to share how we're shipping this major feature. We basically followed the classic converge/diverge pattern:

<img src="https://user-images.githubusercontent.com/6764957/98401393-92855580-20a0-11eb-8098-0f331163c87a.png" align="center" />

- **Diverge**:
  - **Collecting Requirements**: [Ryland](https://twitter.com/taillogs) had been meticulously collecting feedback from prospective customers for the past 6 months. Having this "CRM" (entirely done in Notion) ensured that we started with a strong idea of what our customers' most common requirements would be. For example, we realized that many companies use SAML and LDAP for authentication, but virtually everyone uses the OAuth/OpenID Connect (OIDC) open standard ([more info on OAuth and OIDC here](https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc)). We also wanted a solution that would work for both the self-hosted open-source version of Temporal, and for the coming Temporal Cloud offering.
  - **Comparable Research**: Sometimes customers don't tell you what they want. It can help to supplement customer research with comparable products. This helps surface ideas and perspectives we hadn't considered. We did a broad search of peer tools. This offered an even broader range of options, including the controversial "[The Prometheus project takes the stance that server side security features are outside its scope]( https://www.robustperception.io/prometheus-security-authentication-authorization-and-encryption)". Our search also showed that a surprising number of tools offered Certificate Authority auth. I was quite impressed by [the wide range of auth options offered by Grafana](https://grafana.com/docs/grafana/latest/auth/).
- **Converge**:
  - **Narrowing Scope**: One of the most impactful things you can do to ship faster is to say no as much as possible during the design phase.
    - [Maxim](https://www.linkedin.com/in/fateev/) suggested offering authentication within the `tctl` CLI. However it would have involved crossing language and client-server boundaries that would have added undue complexity.
    - [Sergey](https://dev.to/temporalio/why-i-joined-temporal-19dg) had the retrospectively brilliant insight that most customers would demand OIDC Single Sign-On eventually. If we built our own username/password solution, it would be a lot of effort and it wouldn't be used by enterprises anyway. We decided that we would go all in on OIDC Single Sign-On.
    - Finally, we saw that Grafana had a wide range of OAuth options because they were incrementally adopted over the span of 4 years. We, as a greenfield solution, had the opportunity to leapfrog all that.
  - **Researching Implementation**: Temporal Web is in Node.js, and the dominant authentication library has been [Passport.js](http://www.passportjs.org/) for years. After [confirming nothing had changed](https://twitter.com/swyx/status/1315754745412284416), we went with the obvious choice. In my research I had figured that we would pursue [Okta](http://www.passportjs.org/packages/passport-okta-oauth) and [Auth0](http://www.passportjs.org/packages/passport-auth0) integration first. But [Ruslan](https://www.linkedin.com/in/feedmeapples) found a [node-openid-client](https://github.com/panva/node-openid-client) that would fit our generic OAuth requirement found :tada:

The process we envision will be as simple as providing your OAuth identity provider information in a config file (currently at `/server/config.yml`, both the location and the schema of this config are subject to change):

```yaml
auth:
  enabled: true
  providers:
    # example provider config
	  - label: 'googleoidc'
	    type: oidc
	    issuer: https://accounts.google.com
	    client_id: xxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
	    client_secret: xxxxxxxxxxxxxxxxxxxxxxxx
	    callback_base_uri: http://localhost:8088
```

In future we may support multiple auth providers, but we expect the vast majority of users to just use one.

We are currently in the implementation phase, and just did our first internal demo of the full authentication process this week.

![temporal1](https://user-images.githubusercontent.com/6764957/98414812-0599c680-20b7-11eb-8d95-aea7ec64e230.gif)

It felt slightly surreal to be the first people to "log in to Temporal", though that is no exaggeration. A normal process might also have involved some UI design to ensure a delightful and accessible frontend experience. However we are holding out for a possible total design revamp sometime in the near future.

### Seeking Beta Testers!

If you have been waiting for this authentication feature, we'd love to send you an early preview of this for testing and feedback. Please <a href="mailto:swyx@temporal.io">email me at `swyx@temporal.io`</a>!

## Conclusion

We are working hard to bring you authentication and other top feature requests you are asking for. If you'd like to receive updates on Temporal Cloud, do make sure to [sign up for our mailing list](https://temporal.us17.list-manage.com/subscribe/post?u=2334a0f23e55fd1840613755d&id=bbbbd4709f).

That's it from the Temporal side, have a great weekend everyone! As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [swyx@temporal.io](mailto:swyx@temporal.io)

Slack: [temporalio.slack.com](https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw)

Forum: [https://community.temporal.io/](https://community.temporal.io/ "https://community.temporal.io/")
