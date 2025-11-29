package sessions

import (
	"context"

	"go.temporal.io/sdk/activity"
)

type FileActivityParam struct {
	FileName string
}

type FileActivityResult struct {
	FileName string
}

type FileActivities struct{}

func (a *FileActivities) DownloadFile(ctx context.Context, param FileProcessingWFParam) (FileActivityResult, error) {
	logger := activity.GetLogger(ctx)
	logger.Info("Downloading file from", param.CloudFileLocation)
	// Introduce logic to download a file and save it.
	results := FileActivityResult{
		FileName: "some_pre_processed_file_name.mov",
	}
	logger.Info("Saving as", results.FileName)
	return results, nil
}

func (a *FileActivities) ProcessFile(ctx context.Context, param FileActivityParam) (FileActivityResult, error) {
	logger := activity.GetLogger(ctx)
	logger.Info("Processing file", param.FileName)
	// Introduce logic to process a file in some way.
	results := FileActivityResult{
		FileName: "some_post_processed_file_name.mp4",
	}
	logger.Info("Saving as", results.FileName)
	return results, nil
}

func (a *FileActivities) UploadFile(ctx context.Context, param FileActivityParam) error {
	logger := activity.GetLogger(ctx)
	logger.Info("Uploading post-processed file to new location")
	// Introduce logic to upload the file to some cloud storage.
	return nil
}
