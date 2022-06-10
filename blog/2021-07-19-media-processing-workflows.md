---
tags:
  - temporal
  - community
  - golang
posted_on_: 2021-07-14T00:00:00Z
slug: media-processing-workflows
title: 'Media processing workflows'
author: Nir Padmanabhan
author_title: Engineering @ Stripe
author_image_url: https://avatars.githubusercontent.com/u/56231878?v=4
release_version: V1.10.5
---

<!--truncate-->

## Introduction
Many software workflows require complex stateful orchestration that goes beyond request-response cycles. More importantly, these workflows need to run in a fault-tolerant, reliable, and highly available manner. In this post, we’ll dive into a media processing problem that requires high reliability and fault tolerance, and cover how to build a robust solution to this problem using [Temporal](https://temporal.io/).

## Problem

Imagine you are working with a variety of 3rd party IoT vendors to obtain sensor data (e.g. video footage). The workflow needs to request sensor data from vendors, download the data, transform the data, and perform downstream processing to make the data available internally within your company. There can be various trigger conditions that start this workflow -- a CRON schedule, RPC from another microservice, or an ad hoc trigger. Due to real-world conditions, a variety of failure cases can arise - operational, software, and server hardware failures. For instance:
- The IoT devices might not always have connectivity (e.g. the battery of the device is drained, the device is momentarily located in low connectivity areas like tunnels or basements).
- The vendor API might be down for an hour.
- One of your workers crash while transforming the data.

And finally, as this workflow becomes more complex and important, you want to ensure that the code remains maintainable, well tested, and that workflow executions scale easily as more workflows are triggered.

![Media Processing Workflow](/img/media-processing/media_processing_figure1.png "Media Processing Workflow")

**Figure 1** A high level architecture of the problem being discussed.

## The Media Processing Workflow
Before writing a Temporal Workflow, let’s take a closer look at the business requirements and steps to accomplish our goals. For the purposes of this example, and to make the code simpler to work with, let’s assume we are working with video footage. These video files are created by IoT devices (e.g. drones and industrial video cameras). The videos are then transferred over to the vendor's servers, and subsequently made accessible through the vendor's API. The general workflow looks like the following:
1. Various triggers can start the workflow - a RPC by a microservice, an ad hoc trigger, or a distributed CRON schedule to periodically ping the vendors.

2. Once the workflow is started, make a request to the vendor API to check if a particular IoT device has video footage. The API returns one of the following 3 statuses for the request:
    - `success`: the vendor has immediate access to the footage and we can download it immediately.
    - `pending`: the vendor servers have not decided whether the footage can be obtained. This can arise in cases where the vendor servers do not have connectivity with the device. In this case, our workflow will be kept alive and will check on the status of the footage at certain intervals over time.
    - `not_obtainable`: The vendor believes data is not obtainable now or in the future. Therefore, we perform any cleanup tasks and complete the workflow early.

3. Assuming the IoT device has video footage, we make a download request to the vendor's Download API for the video footage.

4. Based on the response from the Download API, we save the provided media files to local disk.

5. Vendors may provide data in different file formats. Hence, we want to encode the footage to a file format of our desire (e.g. mp4).

6. Next, we merge the multiple encoded videos into one video.

7. Finally, we upload the merged file to our internal service.

## The Temporal Workflow
_**Note: The accompanying code for this post can be found in [this Github repo](https://github.com/nirpadma/temporal-workflows/tree/v0.1.3/media_processing_workflow).**_

Now that we have a good grasp of the steps in the business process, let’s see how this would look in Temporal. Each of the steps highlighted in the previous section can roughly be mapped over to [Activities](https://docs.temporal.io/activities) within Temporal.
 As prerequisites, ensure that
- the Temporal service is running as specified in the [Quickstart](https://docs.temporal.io/clusters/quick-install/) section of the Temporal docs.
- `ffmpeg` is installed. See instructions in the [official website](https://ffmpeg.org/download.html).

The code has only been tested to work in certain Linux distributions and macOS.

There are a few points to highlight about the code structure. There are two places - Workflow (`workflow.go`) and Activities (`activities.go`) - that contain the main logic of the media processing business process. The Worker contains a compiled executable that hosts the Workflow and Activity implementations, and executes the Activities in coordination with the Temporal service. In this example, we use an executable within the `starter` directory to trigger the execution of the Workflow. There is also a simple vendor API (located in `vendor_api` directory) that returns some data that can be configured to simulate the Workflow making a request to an external vendor API. And finally, after all the media encoding is done, we upload the merged file to an internal endpoint (defined in the `internal_api` directory).

The starting point for the workflow is in `MediaProcessingWorkflow`, which is located in `workflow.go`. It assembles together the business logic of the workflow steps. The activities are organized within the `MediaProcessingWorkflow` function as illustrated according to the transition diagram shown in Figure 2:

![Workflow Transition Diagram](/img/media-processing/workflow_activity_transitions_figure2.png "Workflow Transition Diagram")

**Figure 2** The Workflow and Activity transition diagram for the media processing workflow.

The details of the `MediaProcessingWorkflow` are shown in Listing 1:

```go
func MediaProcessingWorkflow(ctx workflow.Context, outputFileName string) (err error) {
	expAO := workflow.ActivityOptions{
		StartToCloseTimeout:    1 * time.Minute,
		RetryPolicy: &temporal.RetryPolicy{
			InitialInterval: time.Second,
			BackoffCoefficient: 2.0,
		},
	}
	ctx = workflow.WithActivityOptions(ctx, expAO)

	var a *Activities
	var status string
	err = workflow.ExecuteActivity(ctx, a.CheckMediaStatusActivity, deviceId).Get(ctx, &status)
	if err != nil {
		return err
	}

	// End the workflow early if the media is never obtainable
	if status == NotObtainable {
		// any clean-up activities would go here.
		return nil
	}

	uniformAO := workflow.ActivityOptions{
		StartToCloseTimeout:    5 * time.Minute,
		RetryPolicy: &temporal.RetryPolicy{
			InitialInterval: time.Second,
			BackoffCoefficient: 1.0,
		},
	}
	ctx = workflow.WithActivityOptions(ctx, uniformAO)

	var mediaURLs []string
	err = workflow.ExecuteActivity(ctx, a.GetMediaURLsActivity, deviceId).Get(ctx, &mediaURLs)
	if err != nil {
		return err
	}

	for i := 1; i <= sessionMaxAttempts; i++ {
		err = processMediaFiles(ctx, mediaURLs, outputFileName)
		if err == nil {
			break
		}
	}
	return err
}
```
**Listing 1** A portion of the Temporal Workflow for media processing.

The core atomic units of the business logic occur in the Activities and are organized within the workflow code. First, note the Activity Options definition (`workflow.ActivityOptions`). These options set important modifiers that affect how the activities are run and scheduled<sup>1</sup>. For instance, some activities may take a long time to complete. Hence, we may require a large value for the `StartToCloseTimeout` property. Other activities may be better equipped with a constant frequency retry policy. Activity Options should be modified with consideration to the expected behavior and the business context of execution.


As another point, note that the workflow could terminate early based on the run-time value returned from the vendor API (handled by `CheckMediaStatusActivity`). We'll address this aspect in more detail in the [Discussion](https://github.com/nirpadma/blog_posts/blob/master/media_processing.md#discussion) section.

The Activities we wish to schedule on the same worker are all organized within the `processMediaFiles` function as shown in Listing 2. We create a [session](https://docs.temporal.io/go/how-to-create-a-worker-session-in-go/) in order to specify the activities that are meant to be scheduled on the same worker instance.

```go
func processMediaFiles(ctx workflow.Context, mediaFilesOfInterest []string, outputFileName string) (err error) {
	// Create and use the session API for the activities that need to be scheduled on the same host
	so := &workflow.SessionOptions{
		CreationTimeout:  3 * time.Minute,
		ExecutionTimeout: 3 * time.Minute,
	}

	sessionCtx, err := workflow.CreateSession(ctx, so)
	if err != nil {
		return err
	}
	defer workflow.CompleteSession(sessionCtx)

	var a *Activities

	downloadedfileNames := []string{}
	err = workflow.ExecuteActivity(sessionCtx, a.DownloadFilesActivity, mediaFilesOfInterest).Get(sessionCtx, &downloadedfileNames)
	if err != nil {
		return err
	}

	encodedfileNames := []string{}
	for _, downloadedFile := range downloadedfileNames {
		logger.Info("encoding file", "file", downloadedFile)
		var encodedFileName string
		err = workflow.ExecuteActivity(sessionCtx, a.EncodeFileActivity, downloadedFile).Get(sessionCtx, &encodedFileName)
		if err != nil {
			return err
		}
		encodedfileNames = append(encodedfileNames, encodedFileName)
	}

	var mergedFile string
	err = workflow.ExecuteActivity(sessionCtx, a.MergeFilesActivity, encodedfileNames, outputFileName).Get(sessionCtx, &mergedFile)
	if err != nil {
		return err
	}

	var uploadSuccess bool
	err = workflow.ExecuteActivity(sessionCtx, a.UploadFileActivity, mergedFile).Get(sessionCtx, &uploadSuccess)
	if err != nil {
		return err
	}

	return nil
}
```
**Listing 2** The activities in a session in the Temporal Workflow for media processing.

All of the constituent Activity signatures of the media processing workflow are shown in Listing 3:


```go
// Check the vendor API to see if the media is available
func (a *Activities) CheckMediaStatusActivity(ctx context.Context, deviceId string) (bool, error)

// Obtain the media URLs to download from the vendor API
func (a *Activities) GetMediaURLsActivity(ctx context.Context, deviceId string) ([]string, error)

// Download the provided fileURLs
func (a *Activities) DownloadFilesActivity(ctx context.Context, fileURLs []string) ([]string, error)

// Encode the provided input file to a specified output format
func (a *Activities) EncodeFileActivity(ctx context.Context, fileName string) (string, error)

// Merge the provided files into an output file
func (a *Activities) MergeFilesActivity(ctx context.Context, fileNames []string, outputFileName string) (string, error)

// Upload the provided file to the internal api
func (a *Activities) UploadFileActivity(ctx context.Context, fileName string) (bool, error)
```
**Listing 3** The activities associated with the media processing workflow.

There are a couple points to highlight related to Listing 2, Listing 3, and Figure 2:

- First, as mentioned earlier, the vendor API could return one of 3 responses: (i) `success` (ii) `pending` or (iii) `not_obtainable`. In the case of `pending` or if for some reason the vendor API errored (e.g. due to a network failure), the workflow would repeatedly retry the Activity as specified by the activity retry options. In the case of `not_obtainable`, the workflow completes early. Only in the case of `success` status does the workflow proceed with the remainder of the activities. In the code, to simulate each of these conditions, the `mediastatus` endpoint (which is part of the vendor API) probabilistically returns one of these 3 responses. To always return success, set the `media_success_ratio` field to `1.0` in the `config.yaml` file located in the `vendor_api` directory and restart the vendor API.

- Second, there is a subset of our activities - `DownloadFilesActivity`, `EncodeFileActivity`, `MergeFilesActivity` and `UploadFileActivity` - that we wish to schedule on the same host. The output files of the `DownloadFilesActivity` becomes the input of `EncodeFileActivity` and the outputs of `EncodeFileActivity` becomes the input of `MergeFilesActivity`, and similarly for `UploadFileActivity`. The inputs and output files of these workers reside in local storage of the container that hosts the Temporal Worker. Hence, to accomplish this host-specific scheduling of activities, we'll utilize the [Session API](https://docs.temporal.io/go/how-to-create-a-worker-session-in-go/) provided by Temporal<sup>2</sup>. This is accomplished in the workflow by configuring a session context as shown in Listing 4, and using it for the relevant Activities:

```go
    // Create and use the session API for the activities that need to be scheduled on the same host
	so := &workflow.SessionOptions{
		CreationTimeout:  3 * time.Minute,
		ExecutionTimeout: 3 * time.Minute,
	}

	sessionCtx, err := workflow.CreateSession(ctx, so)
	if err != nil {
		return err
	}
	defer workflow.CompleteSession(sessionCtx)
```
**Listing 4** Configuring the session context to be used in activities meant to be part of a Session.

## Starting the Workflow
Now that we've gone through an overview of the media processing workflow, let's see the workflow running in action. As mentioned above, ensure that the Temporal service is running. The first step is to start the simulated vendor API.
1. Go to the `vendor_api` directory and start the vendor API:
```bash
go run *.go
```

2. Go to the `internal_api` directory and start the internal API. The workflow will upload the merged file to the internal API.
```bash
go run *.go
```

3. In another terminal session, start the worker by going to the `worker` directory and running:
```bash
go run *.go
```
_Note: It's possible to instantiate multiple workers by repeatedly running the command above. The activities in a session for a single workflow execution will be scheduled on the same worker._


4. Trigger the workflow by going to the `starter` directory and running the following command:
```bash
go run *.go
```
and it should show a log such as the following:
```bash
2021/04/18 17:49:07 Started workflow WorkflowID mediaprocessing_4a170154-6c54-44fd-9dea-84a0add77eee RunID 7a4e37d5-131e-4206-a6e9-fcf2d30fdd87
```
At this point, the workflow has been triggered.

There should be a stream of logs output in the terminal window of the `worker` directory.

If the workflow proceeds and completes according to the regular processing path (i.e. it does not complete early by taking the early completion path), we can see the output of a merged file in the `worker` directory. To always force the workflow to proceed according to the regular processing path, change the `media_success_ratio` field to `1.0` in the `config.yaml` file located in the `vendor_api` directory.

## Runtime Observability of the Workflow
One useful feature of the Temporal service is the Web UI (located at `http://localhost:8088`) that provides run-time visibility of the workflow executions. This host and port pairing may only be true if following the typical Temporal install instructions.

![Temporal Web UI](/img/media-processing/workflow_ui_top_level.png "Temporal Web UI")
**Figure 3** Temporal Web UI shows a catalog of recently-invoked workflows.

Viewing the workflow run by clicking on the `Run ID` of the workflow will show a useful set of run time information (see Figure 4 below).

![Temporal Web UI](/img/media-processing/workflow_run_web_ui.png "Temporal Web UI")
**Figure 4** Internal information shows a bunch of useful details about the workflow that was triggered.

A useful section of any workflow run is the graph that renders the timeline of the scheduling, start and completion times of the various activities. This is a useful part of the Web UI that allows for future optimizations. It provides a visual insight to parts of a workflow run that take the longest time. Another useful section is the table at the bottom of the timeline graph that shows a time-ordered list of events for the workflow. We can inspect this to see the various options that were used for the activities as well as the specific inputs and results from the activities.

## Discussion
Up to this point, this post has leaned towards a code walkthrough of the workflow and some details about Temporal concepts. What are the main takeaways? What are some key benefits we obtain by using Temporal for this problem?

By using Temporal, we've addressed some failure modes in a developer-friendly way through the guarantees provided by the Temporal service. First, if the vendor API is down for extended periods or if the API errors, the `RetryPolicy` will automatically retry the Activity according to the configured policy; there is no need to set up a custom retry wrapper. If there is a hardware failure and the Temporal Worker container crashes immediately after `GetMediaURLsActivity` succeeds but before `DownloadFilesActivity` begins, the workflow would retain the state up to the most recently succeeded Activity. The workflow would resume from this point when a Temporal Worker is brought back up<sup>3</sup>. From the developer's perspective, this complexity of handling such a failure is abstracted away and handled by the Temporal service.

As shown in Figure 2, there are cases when the vendor API could return `not_obtainable` (e.g. if the media device is out of battery). In this case, based on this response, we can decide at *run time* to complete the workflow early. In other words, the run time result within the workflow can direct the path for the workflow to proceed. This kind of general purpose programming language expressiveness within a workflow engine is significantly better in comparison to statically defined DSL systems or workflow systems that restrain workflows to a fixed execution topology.

Next, imagine that this workflow becomes critical to our business. We'd want to ensure correctness through a variety of different testing strategies. Temporal provides a testing framework that permits the testing of individual activities and the end-to-end workflow. Some simple examples of the workflow tests are added in `workflow_test.go`. Over time, if this workflow becomes popular and we expect hundreds of thousands or even millions of in-flight workflow invocations, we'll need to scale easily. On Temporal, this kind of scalability occurs at the worker level. We can increase the number of workers in the worker pool listening to the media processing [task queue](https://docs.temporal.io/concepts/what-is-a-task-queue). These workers can independently pick up activities from the task queue and drive the workflow executions to completion.

Finally, the workflow approach chosen for this post is only one of many ways to accomplish the problem at hand. There are other valid approaches. For instance, if there are hundreds of media files to download and encode within a single workflow execution, we can use [Child Workflows](https://docs.temporal.io/go/workflows#child-workflow-executions) to increase the parallelization of these steps.


## Summary
In this post, we looked at a business workflow involving coordination with external APIs and subsequent media processing. Such workflows have multiple inherent points of failure. We looked at how Temporal handles these kinds of failures in a way that abstracts away some of the complexities of dealing with them. Through code examples, we highlighted Temporal concepts relevant for a media processing workflow -- the session API, and choosing sufficiently long activity timeouts. Along the way, we also highlighted ways to gain visibility into workflow executions. Finally, the post also discussed other patterns and workflow architectures that can also be used to address this problem using Temporal.  

------------

### *Footnotes*
1. The Activity and Workflow options may be easy to overlook, and one could resort to simply copying and pasting values from examples. However, it's critical to think about your problem domain and choose appropriate values for these options as they can have a large impact on the Workflow execution.
2. Under the hood, the Session feature is implemented within Temporal as an Activity, with its own timeout settings.
3. In the Discussion section, it states that for hardware failures that occur after the `GetMediaURLsActivity` succeeds, but before `DownloadFilesActivity` begins, the workflow would resume when the workers restart. However, there is a subtle caveat that arises if the worker crashes during execution of an Activity meant to be scheduled on the same host (e.g. `EncodeFileActivity`). When a new worker is started, the worker container and the `workerID` could be different from the previous worker. Moreover, the downloaded files from the previous Activity (`DownloadFilesActivity`) will not be present in local storage for the `EncodeFileActivity` Activity.  Hence, the workflow will eventually timeout. To resolve this issue, one approach would be to retry the whole workflow (e.g. up to `maxAttempts` times). Another approach would be to move the activities meant to be executed on the same host into a Child Workflow.
