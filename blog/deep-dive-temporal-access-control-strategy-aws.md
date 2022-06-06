---
slug: deep-dive-temporal-access-control-strategy-aws
title: A Deep Dive into Temporal's Access Control Strategy in AWS
author: Brandon Sherman
author_title: Staff Security Engineer
author_image_url: /img/brandon-sherman.png
tags:
  - security
  - transparency
  - cloud
date: 2022-06-06T00:00:00Z
image: /img/temporal-access-control.jpeg
---

This blog post gives some insight into Temporal's strategy for securing our cloud environment. It also calls attention to an unexpected facet of AWS access policies encountered along the way.

![Photo of dodgy-looking ATM beside a security grate](/img/temporal-access-control.jpeg)

<!-- truncate -->

Finally, I'll come around to what I discovered—what I thought I wanted isn't what I needed—and describe what I need.

## The Challenges

Our long-term goal is to develop an access-control mechanism that can be flexible, scalable, and secure. After we reviewed various strategies, a [Biba-style model](https://en.wikipedia.org/wiki/Biba_Model) of segmenting our AWS accounts seems to be the best fit for us. Each account forms a hard<sup>1</sup> "perimeter" and provides an easy way to set, measure, and maintain the maximum "blast radius" of each account. If we assume an account has been breached, what is the maximum extent of damage an attacker can inflict? 

Setting up numerous smaller accounts can constrain possible damage, but this approach makes our management infrastructure a more compelling target. Connfiguring only one management account to allow those with access to assume roles into all other accounts greatly expands the blast radius in the event of a breach. **Clearly, this is not ideal.**

We want to provide strong isolation guarantees to our customers as well as ourselves. An engineer paged at 3:00 AM needs the confidence to fix the problem at hand—without the fear of causing more widespread problems. To provide these strong isolation guarantees, we plan to have a small number of trusted core accounts.

Think of these as Ring 0: interacting with the infrastructure of these accounts in any way should be a big event.<sup>2</sup> The next ring of accounts, Ring 1, will only listen to commands from Ring 0 and issue commands to Ring 2. Similarly, our core accounts—those Ring 0 and Ring 1 accounts—should not be able to read the data in those outer rings.

It's easy enough to describe this approach, but promises are meaningful only if you follow through with them! The first step for me was to codify this concept into our AWS service control policies (SCPs). SCPs are extremely powerful tools because they apply to all principals within an AWS account, including the all-powerful root user. Effective SCP layout and implementation is critical to a well-secured AWS environment.

## Digression 

Before SCPs became available, all AWS Identity Access Management (IAM) functioned via [discretionary access control](https://en.wikipedia.org/wiki/Discretionary_access_control). There was no way to restrict the actions of an AWS account. Controlling the permissions of subsections of an AWS account has been possible since the release of AWS IAM, but these were entirely the user's responsibility to put in place—and it was impossible to mandate that some actions always be denied.<sup>3</sup> With privilege escalation readily usable—for either legitimate or malicious purposes—within an account, it remains unwise to rely on a single AWS account.

When SCPs were released, AWS IAM gained the ability to set [mandatory access controls](https://en.wikipedia.org/wiki/Mandatory_access_control). An SCP applied to anything and everything in the AWS account, including the root user. It doesn't matter if the permissions are allowed within the account—SCPs are more powerful.

To escalate permissions within an AWS account, an attacker must first break into another AWS account and take actions to enable their attack on the initial target. AWS CloudTrail logs an event any time a user encounters an "Access denied" message due to SCPs, and CloudTrail can also log actions such as moving accounts between OUs and adding, removing, or modifying SCPs for an OU or account. In short, breaking into an AWS account this way requires a series of steps that are much noisier–and therefore more easily monitored.

## How Mandatory are SCPs?

Let's set the stage.

We have a group of AWS accounts. Some accounts need the ability to assume a role into a separate group of accounts to perform infrastructure/maintenance/control tasks.

We have the ability to **mandate** what an account is able to do. All that I need to do is mandate that our accounts operate in this manner. We will have our rings of AWS accounts, and AWS will handle the enforcement of what a principal can do. This is how AWS recommends SCPs be used, as guardrails around an account.<sup>4</sup>

I wasn't worried about the positive case: granting the permissions of one account to assume-role into another. Instead, I wanted to test the negative case: disallowing any principal except for a particular role in an account in the correct ring to assume-role.<sup>5</sup>

I reached for the tool that I assumed would be the right one: an SCP with conditionals.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": [
        "sts:AssumeRole"
      ],
      "Resource": [
        "arn:aws:iam::575555303850:role/TestAssumedRole"
      ],
      "Condition": {
        "StringNotEqualsIgnoreCase": {
          "aws:PrincipalTag/AssumeRole": [
            "OK"
          ]
        }
      }
    }
  ]
}
```

My understanding was that this SCP would disallow the role in this account (creatively named `TestAssumedRole`) from being assumed, unless the Principal performing the AssumeRole API call had a key/value tag pairing of "AssumeRole/OK". The initial test was successful. **But when I removed the tag from the role doing the assumption ... it still worked.**

Surprising, right? Well, maybe not. IAM is complicated. My initial assumption was that I had somehow screwed up the Condition section. This is a common occurrence. If you haven't messed up an IAM policy yet, you will. My next step was to apply an SCP that denied _all_ API calls.

If you're struggling with permissions in AWS, check CloudTrail. From the CloudTrail record, it's possible to infer what conditionals might be useful or what underlying API calls need to be allowed or disallowed.


```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyAll",
      "Effect": "Deny",
      "Action": [
        "*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```

You had one job, SCP—don't let anything happen. Yet, this happened:

```bash
aws sts assume-role --role-arn 'arn:aws:iam::575555303850:role/TestAssumedRole' --role-session-name 'nope'
```

Credentials came back. Those credentials can't do anything, _but_ they still work.

```json
{
    "Credentials": {
        "AccessKeyId": "ASIAYMAOE7GVFJQZXUXH",
        "SecretAccessKey": "F1L82dBoYUbk9V...G1S9Yve6+GgbEiG3z5L",
        "SessionToken": "IQoJb3JpZ2luX2V...is2NDpHyKlAa",
        "Expiration": "2022-03-31T05:45:04+00:00"
    },
    "AssumedRoleUser": {
        "AssumedRoleId": "AROAYMAOE7GVP5EH66UUY:nope",
        "Arn": "arn:aws:sts::575555303850:assumed-role/TestAssumedRole/nope"
    }
}
```

Even with an SCP that denies _everything_, the AssumeRole API call succeeds and returns valid credentials. This is visible in the CloudTrail logs for the account; amongst a sea of Permission Denied errors is one successful API call: the one to AssumeRole.

![Screen shot of event details in AWS CloudTrail event history](/img/cloud-trail-success.png)

I contacted AWS Security. After some initial confusion, I was helped to understand where IAM in practice and my understanding of IAM differed.<sup>6</sup> My mental model was that SCPs applied to an account, and even the root user cannot override an SCP's grants. This is true, but put on a lawyer-hat and read that again. "SCPs applied to an account" is true in a very, very literal sense.<sup>7</sup> Another lesson: Not everything that shows up in CloudTrail has passed through the permission matrix that decides whether an action is successful.

To be extremely clear, it is a good thing that AssumeRole calls made against an AWS account are logged, regardless of source. It's a subtle nuance worth knowing.

Now, let's go back to the limitation of SCPs.

Initially, the SCP didn't seem to be working. As it turns out, this is by design. Technically, everything is working as it should. This surprised me, and I set out writing this post to help other people know about the times when SCPs don't apply.

You see, an SCP is applied to all principals in the account it is applied to. An SCP does not impact principals outside of the account. The initial, tagged, role exists in an account unencumbered by an SCP and therefore had no restrictions on assuming roles. Meanwhile, the credentials returned by the assume-role API call _were_ encumbered by the SCP and thus could not do anything.

With this understanding, it makes sense. An IAM role in a different account is not encumbered by this SCP and therefore will not have the `sts:AssumeRole` call blocked. But when a principal that is subject to the SCP tries to take an action, it _will_ be blocked.

This presents a problem for us. Although we can specify that our inner accounts can communicate to only the next ring of accounts, we have limited options for specifying which outer-ring accounts can accept commands from inner-ring accounts.<sup>8</sup>

There are currently no easy workarounds. The Assume Role Policy Document (ARPD) can be constantly updated to maintain a listing of AWS accounts allowed to assume the role the ARPD is attached to, but modification to the ARPD comes from _inside_ the account. We are back to the early days of IAM, when mandatory access controls were unavailable. It is possible to constantly, exhaustingly, manage this by assuming roles into an account and updating the ARPD attached to various IAM roles, but there is no dynamic way to prevent an account from listening to anyone except those who are trusted. Although it is certainly possible to use an SCP to prevent updates to an IAM role by applying a Deny policy, that is only a partial solution—and it still doesn't solve the problem. It can even generate more problems because the permissions needed to prevent malicious ARPD updates are also needed to create service-linked roles, maintain existing IAM roles, or even to remove unknown accounts trusted by the ARPD.

## The Actual Problem

Even if I spent the time and energy to build (and test) a system to keep everything updated, and it was automated, and I could define/tag various accounts and specify who is allowed to access them, and AWS IAM enforced that for me, I'll still have a problem: vendors.

Really, what I want is an official way to know who owns an AWS account. Scott Piper runs the ["well known AWS" text file](https://github.com/duo-labs/cloudmapper/blob/main/vendor_accounts.yaml), but I could just edit it to claim an account number.<sup>9</sup> There's no formal verification here. Further, absence of an entry in this file is no indication either way of the trustworthiness of the account. AWS should be providing that capability so that vendors can give out trusted account numbers for me to verify before establishing that IAM role can assume an IAM role in my account.

There are implications even beyond simple IAM roles. For example: How can a Temporal customer know, if they want that from a trustworthy source. The actual item today is called the "Assume Role Policy Document," and that is very literally true. But we (as a community) have been calling it a Trust Relationship or Trust Policy for so long we've blurred the lines too much.<sup>10</sup> Having an ARPD is fine, but I as an operator of the system need to:

1. Plan the update process
2. Update all those documents for all my accounts
    * Move an account out of an OU that prevents IAM modifications by SCP
    * Make the change
    * Verify the change
    * Move the account back into the production OU
3. Monitor for drift or attempts to cause drift
4. Update list for the steps I forgot the last time
    * Fix inevitable bugs in the process
5. Repeat

That's hard work, but I'm not afraid of hard work. However, what I really need is a way to verify that an account number is actually who I think it is, instead of trusting documentation. **AWS should provide a verified account number service.**

## Conclusion

My end goal is the same as when I started: to define the trust relationship from one account to another. But currently, all I have is an ARPD, and it is up to me to manually calculate that trust relationship. I would like AWS to handle some of that for me, to make it easier for me to know who I can trust (and then apply those trust relationships across all of Temporal's accounts!).

-----

 <sup>1</sup>Relatively speaking.

 <sup>2</sup>Sets off pagers, enforce a "no lone zone", etc. The sort of place you stay on the well-defined path and don't go directly accessing the AWS APIs.

 <sup>3</sup>[Subjunctive mood](https://en.wikipedia.org/wiki/Subjunctive_mood)

 <sup>4</sup>[How to use service control policies to set permission guardrails across accounts in your AWS Organization](https://aws.amazon.com/blogs/security/how-to-use-service-control-policies-to-set-permission-guardrails-across-accounts-in-your-aws-organization/)

 <sup>5</sup>There's a joke in here somewhere about security people and testing the "unhappy path," the development of which is left as an exercise for the reader.

 <sup>6</sup>[Vulnerability Reporting](https://pages.awscloud.com/GLOBAL_GC_vulnerability-reporting_2021127_7014z000000rnU1.html) form. I can't imagine the volume of inbound flow this receives; I cut the initial responders some slack, especially because even I didn't understand how IAM worked.

 <sup>7</sup>Please remove your lawyer-hat now.

 <sup>8</sup>The boundaries AWS recently released are SCP-based and therefore work only on principals that exist in an account; they cannot do anything about the outside world wanting to come in.

 <sup>9</sup>Remember, AWS account numbers are not secrets!

 <sup>10</sup>The official AWS documentation for [AssumeRole](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html) call it a "trust policy", but the actual API call only calls it an "[assume role policy](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/update-assume-role-policy.html)." Amusingly, even the documentation admits this confusion: "This is typically referred to as the 'role trust policy'."
