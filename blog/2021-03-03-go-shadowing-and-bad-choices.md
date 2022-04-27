---
tags:
  - v1
  - Temporal
  - microservice-orchestration
  - microservices
  - cloud
  - shadowing
  - golang
  - bug
posted_on_: 2021-03-03T00:00:09Z
slug: go-shadowing-bad-choices
title: 'How Go shadowing and bad choices caused our first data loss bug in years'
author: Ryland Goldstein
author_title: Head of Product (and some other stuff)
author_image_url: https://avatars2.githubusercontent.com/u/27736122?s=460&u=7b6a3e58ec7ed7157f23f51e91a2f4cd2028d606&v=4
release_version: V1.7.0
---

<!--truncate-->

I'm Ryland from Temporal - an MIT OSS platform for building highly reliable distributed applications. We pride ourselves on the reliability and consistency Temporal provides to our users mission critical applications. As a testament to that, in the last two years a data-loss bug has never reached production. Until last week.

- [Click here if you don't care about the narrative](#someone-pays-the-price)
- [Click here if you only care about the code](#the-bug)

### What happened?

Before we get into the details of the bug, I want to talk about how everything played out.

A few months ago, we started seeing strange behavior from the canary clusters we run for our cloud service. Some workflows were occasionally being created without an initial event, which left them in a highly inconsistent (ie: corrupted) state.

It's worth noting that Temporal is an incredibly well tested piece of technology, boasting thousands of unit, integration and scale tests. At the time the bug started appearing, we had also just moved to a new persistence vendor. This is why, we initially assumed that the bug was likely happening at the persistence level. So we reached out to the team who runs our persistence towards the end of December:

![](/img/go-shadowing/shadowing0.png)
_A concrete example. At this point we understood exactly what was wrong with the workflow. We just didn't know why._

At first, our persistence vendor agreed with the assessment. There had been some notable memory issues with the clusters running our persistence that seemed to directly correlate with the corruption we experienced. They very kindly quickly (and kindly) started investigating things on their side to root cause the out of memory issues.

![](/img/go-shadowing/shadowing1.png)
_We discovered that there was a curious set of OOM (Out of memory) issues that corresponded closely with the corruptions we were experiencing with workflows._

After a short time, they got back to us with what seemed like concrete progress. Their investigation had indeed found a memory issue with the cluster. At this point all we needed to do was validate that the memory issues always correlated with our workflow corruptions and we were golden.

![](/img/go-shadowing/shadowing2.png)
_First formal identification of the OOM issue and how it correlates with the Temporal specific bugs. To validate that it was the root cause we started trying to correlate OOMs with Temporal corruptions._

They immediately began working on a solution for the OOM issue. Within a week they had produced fixes and deployed those patches to the clusters running our persistence. We were very happy to get this issue behind us and get back to working on our product. Unfortunately this was not the end of the issues...

![](/img/go-shadowing/shadowing3.png)
_Our team converging with vendor on the OOM issues. At this point it seemed that fixing the OOM was the root cause and therefore fixing it would address our issues._

Initially we had doubts about how much the fixes solved the memory issues. But it started to become clearer and clearer that something else was going on.

![](/img/go-shadowing/shadowing4.png)
_Our vendor explaining that the OOM fix was in place and functioning correctly. Temporal was still experiencing issues at this point which meant it was bigger than OOM._

There was still the open question of why OOM's correlated so highly with the workflow corruptions, but we had to accept that it wasn't the full story. Our team began putting all of their energy into combing through our source code for potential issues. After a prolonged period of stress and frustration, one of the awesome engineers from our persistence vendor found the root cause:

![](/img/go-shadowing/shadowing5.png)
_An amazing find by the engineer working for our vendor. We are super appreciative for their incredible dedication to helping us._

Yes, you read it correctly. This entire mess was caused by a Golang variable shadowing issue in one small part of our persistence code.

This explains why the workflows were corrupted, but why was the issue so hard to reproduce and why did it only happen with Cassandra? The answer is complex, but the TL;DR; is that workflows would only become corrupted when Cassandra returns a specific error from a failed transaction. 99.9% of the time, Cassandra is operating correctly and these errors are never returned. Therefore 99.9% of the time workflows aren't corrupted. But in cases where Cassandra is experiencing instability (ie: ring changes, or OOM), it is possible for these errors to be returned thereby triggering the bug which was in Temporals persistence code. While we still don't fully understand the exhaustive set of conditions required for this to happen, we knew enough to reproduce the issue reliably.

Probably worth mentioning how we verified the fix. We asked the persistence provider to give us a cluster with OOM issue so we can run Temporal with the fix with frequent OOMs. We ran a stress workload for a 3 days with OOM every 1 hour and able to verified that no workflow executions were left in corrupted state.

## We mess up

Before I get into the details of the bug at a code level, I want to talk about how we responded very poorly to the situation. Once we confirmed the nature of the bug, we produced a patch and deployed it to our canaries. We then asked our persistence vendor to spin up a cluster that was experiencing the OOM issue. On the OOM cluster we ran a 3 day stress test with the patched version of Temporal. At the end of the test zero workflows were left in a corrupted state giving us confidence in the stability of the fix. We also scheduled some time to discuss how we want to handle this bug in regards to OSS releases. At this point we made a clear error in judgement. During the team meeting regarding the bug, we discussed whether we should explicitly announce the bug to our users. In hindsight, the fact that we even discussed "whether" instead of "how" was a problem in itself. If you hadn't already guessed, we chose to include the fix in the next release but not announce the bug itself. For those curious about the rationale, it was mixed:

- The bug only affects Cassandra users and we do not know of any production Cassandra users of Temporal (we still believe this was true at the time)
- The bug does not happen in 99% of cases, only when the underlying Cassandra cluster is experiencing instability. Specifically when someone is trying to scale the underlying Cassandra cluster.
- The bug does not affect existing workflows and only applies to ones that are newly created. It's cringeworthy to think about now, but we even questioned whether this is "really dataloss".

At the end of the day, even if the rationale had been good (it wasn't) it goes against the core values of our company and team. We believe transparency is a fundamental and inseparable part of Temporal and we were the opposite of transparent here.

Unfortunately, the story does not end at this point. We proceeded with releasing version 1.6.0 that included the fix, but failed to adequately call out the severity of the bug.

![](/img/go-shadowing/shadowing6.png)

## Someone pays the price

Last week, about 1 month after releasing 1.6.0 we received some very concerned messages from one of the largest OSS Temporal users. They had semi-recently moved into production and were noticing some errors which looked very similar to the corruption issues caused by the bug. After a bit of debugging, we confirmed that it was the same shadowing bug causing the issues. While we had properly fixed it in 1.6.0, they had not yet fully upgraded their Temporal deployment and therefore still had the broken code path. To be clear, the user should not be blamed at any level. If we had been more proactive about messaging in the first place, they would have definitely upgraded and never run into the issue. While we had made a lot of regrettable choices at this point, we decided to stop that trend the next day. An announcement was made to the entire community about the bug, and we backported the fix to all older versions.

That's nice and all, but it doesn't say anything about the future. Why won't this happen again? The short answer is that we are absolutely dedicated to this never happening again. We have a few actionable steps to make sure that ends up being the case:

- We will be adding tests to validate how the system behaves when Cassandra clusters(and potentially other persistence) are changed. In general we will be hardening our tests to properly handle dependency-level failures. [https://github.com/temporalio/temporal/issues/1153](https://github.com/temporalio/temporal/issues/1153)
- A linter will be added to catch the variable shadowing issue. We will also proactively re-evaluate our linting to determine if other lint rules can be added to reduce likelihood of bugs.
- Improvements will be made so that it will be easier to remove (or fix if possible) corrupted workflows gracefully. As of now they put extra load on the system and add noise to the logs. [https://github.com/temporalio/temporal/pull/1312](https://github.com/temporalio/temporal/pull/1312)
- Communication will be improved. In addition to being more transparent and vocal about such bugs over existing communication mediums, we will also add additional broadcast mechanisms to alert users of critical bugs ASAP. Specifically we will augment the version update mechanism of Temporal Web so it can alert users if they are running on Temporal versions with known issues. [https://github.com/temporalio/web/commit/45a7e9ccc36a7703f3270a664e40048cf077aeee](https://github.com/temporalio/web/commit/45a7e9ccc36a7703f3270a664e40048cf077aeee)

For those curious about why the bug was encountered when I previously said it only happens in 1% of cases. The user in question was unfortunately resizing their Cassandra cluster before the upgrade to 1.6.0. This caused the underlying stability issues necessary for the bug to occur.

## The bug

```go
var err error
if request.IsNewBranch {
	h.sortAncestors(branchInfo.Ancestors)
	treeInfoDataBlob, err := serialization.HistoryTreeInfoToBlob(&persistencespb.HistoryTreeInfo{
		BranchInfo: branchInfo,
		ForkTime:   timestamp.TimeNowPtrUtc(),
		Info:       request.Info,
	})

	if err != nil {
		return convertCommonErrors("AppendHistoryNodes", err)
	}
	
	batch := h.session.NewBatch(gocql.LoggedBatch)
	batch.Query(v2templateInsertTree,
		branchInfo.TreeId, branchInfo.BranchId, treeInfoDataBlob.Data, treeInfoDataBlob.EncodingType.String())
	batch.Query(v2templateUpsertData,
		branchInfo.TreeId, branchInfo.BranchId, request.NodeID, request.TransactionID, request.Events.Data, request.Events.EncodingType.String())
	err = h.session.ExecuteBatch(batch)
} else {
	query := h.session.Query(v2templateUpsertData,
		branchInfo.TreeId, branchInfo.BranchId, request.NodeID, request.TransactionID, request.Events.Data, request.Events.EncodingType.String())
	err = query.Exec()
}

if err != nil {
	return convertCommonErrors("AppendHistoryNodes", err)
}
return nil
```

_Buggy code_

Above is the original code. As you can see, `err` is declared as a proper `var` within the top level scope:

```go
var err error
if request.IsNewBranch {
	h.sortAncestors(branchInfo.Ancestors)
	treeInfoDataBlob, err := serialization.HistoryTreeInfoToBlob(&persistencespb.HistoryTreeInfo{
		BranchInfo: branchInfo,
		ForkTime:   timestamp.TimeNowPtrUtc(),
		Info:       request.Info,
	})
  ...
```

The intention of the author was that the subsequent call to `HistoryTreeInfoBlob` (purple) would set the previously defined `err` to the result of the operation err response. But in Golang, the `:=` operator is scoped. This means that because the call to `HistoryTreeInfoBlob` is within the `if` branch, a new variable `err` will be created. If the call succeeds, the code proceeds to `ExecuteBatch`:

```go
batch := h.session.NewBatch(gocql.LoggedBatch)
batch.Query(v2templateInsertTree,
	branchInfo.TreeId, branchInfo.BranchId, treeInfoDataBlob.Data, treeInfoDataBlob.EncodingType.String())
batch.Query(v2templateUpsertData,
	branchInfo.TreeId, branchInfo.BranchId, request.NodeID, request.TransactionID, request.Events.Data, request.Events.EncodingType.String())
err = h.session.ExecuteBatch(batch)
```

If this call succeeds, all is well. But if it fails disaster strikes. The error will be assigned to the scoped version of `err`. The top level scope `err` will therefore not hold any value and the error handler guarding the return will not evaluate:

```go
if err != nil {
	return convertCommonErrors("AppendHistoryNodes", err)
}
return nil
```

The result of missing the `err` check is a positive response being returned to the caller even though the call to `AppendHistoryNodes` failed. To fix the bug we removed the nesting and no longer set the error within a nested scope. Here is the bug free version:

```go
if !request.IsNewBranch {
	query := h.session.Query(v2templateUpsertData,
		branchInfo.TreeId, branchInfo.BranchId, request.NodeID, request.TransactionID, request.Events.Data, request.Events.EncodingType.String())
	if err := query.Exec(); err != nil {
		return convertCommonErrors("AppendHistoryNodes", err)
	}
	return nil
}

// request.IsNewBranch == true

h.sortAncestors(branchInfo.Ancestors)
treeInfoDataBlob, err := serialization.HistoryTreeInfoToBlob(&persistencespb.HistoryTreeInfo{
	BranchInfo: branchInfo,
	ForkTime:   timestamp.TimeNowPtrUtc(),
	Info:       request.Info,
})
if err != nil {
	return convertCommonErrors("AppendHistoryNodes", err)
}

batch := h.session.NewBatch(gocql.LoggedBatch)
batch.Query(v2templateInsertTree,
	branchInfo.TreeId, branchInfo.BranchId, treeInfoDataBlob.Data, treeInfoDataBlob.EncodingType.String())
batch.Query(v2templateUpsertData,
	branchInfo.TreeId, branchInfo.BranchId, request.NodeID, request.TransactionID, request.Events.Data, request.Events.EncodingType.String())
if err = h.session.ExecuteBatch(batch); err != nil {
	return convertCommonErrors("AppendHistoryNodes", err)
}
return nil
```

_Bug free code_

As bad as it sounds it's a surprisingly difficult bug to reproduce. Cassandra has to succeed with one operation and fail with another within a very short window of time. Under normal operation this is very rare. Regardless, the bug can and did happen.

In general, we learned a big lesson about Golang shadowing. We know our Golang at Temporal, but many were still surprised about how shadowing works in all cases. Alex (our first engineer), confused all of this with the following example.

**What do you think it prints?**

```go
func main() {
	var err error
	defer func() {
		fmt.Println(err)
	}()
	str, err := test()
	fmt.Println(str, err)
}
func test() (string, error){
	return "str", errors.New("error")
}
```

**Output**

```go
str error
error
```

**How about now?**

```go
func main() {
	var err error
	defer func() {
		fmt.Println(err)
	}()
	if true {
		str, err := test()
		fmt.Println(str, err)
	}
}
func test() (string, error){
	return "str", errors.New("error")
}
```

**Output**

```go
str error
<nil>
```

As you can see, in the right circumstances shadowing can be a complete nightmare.

## Conclusion

As with most software failures, humans (us) were the weakest point in the design. That being said, Golang came in a not so distant second. This incident has only strengthened our internal processes and culture and we plan to actionably do better moving forward.

As always, feel free to reach out with questions, comments or critical feedback via email, Slack or our community forum.

Email: [ryland@temporal.io](mailto:ryland@temporal.io)

Slack: [temporalio.slack.com](http://temporalio.slack.com/)

Forum: [https://community.temporal.io/](https://community.temporal.io/)
