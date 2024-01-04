package activities

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"

	"go.temporal.io/sdk/activity"

	"documentation-samples-go/dev-guide/chapters/activity_errors/common"
)

type Activities struct{}

// SSNPayload represents the structure of the SSN Trace API payload
type SSNPayload struct {
	SSN string `json:"ssn"`
}

// FederalSearchPayload represents the structure of the Federal Criminal Search API payload
type FederalSearchPayload struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	SSN       string `json:"ssn"`
}

// ChargeCardPayload represents the structure of the Federal Criminal Search API payload
type ChargeCardPayload struct {
	FirstName        string  `json:"first_name"`
	LastName         string  `json:"last_name"`
	CreditCardNumber string  `json:"ssn"`
	Amount           float32 `json:"amount"`
}

// RefundCardPayload represents the structure of the Federal Criminal Search API payload
type RefundCardPayload struct {
	FirstName        string  `json:"first_name"`
	LastName         string  `json:"last_name"`
	CreditCardNumber string  `json:"ssn"`
	Amount           float32 `json:"amount"`
}

// APIResponse represents the structure of the SSN Trace API response
type APIResponse struct {
	Message string `json:"message"`
}

const backgroundCheckCost = 100.00

/*
The code inside of the SSNTraceActivity function will cause a panic because the social security number is eleven characters long and the code is checking the "12th" slot in the array.

This is a great example of an application level error, and is more or less synonymous with a bug in your code.
There isn't a way for this to succeed, no matter how many times this code is retried.

To get this Activity to succeed, we will need to fix the bug and restart the Worker.
*/

// SSNTraceActivity is your custom Activity Definition
func (a *Activities) SSNTraceActivity(ctx context.Context, param common.PII) (*string, error) {
	var result string
	logger := activity.GetLogger(ctx)
	// highlight-start
	// To simulate an application level error, we will get the eleventh character of the SSN
	// But we will "accidentally" specify 11 as the index in the array, instead of 10
	// Remove this logic to "fix the bug" restart the Worker
	char := param.SSN[11]
	logger.Info("Eleventh char of the social security number", char)
	// highlight-end
	// Set the API endpoint
	url := "https://iq.temporal.io/api/background-check/flaky-ssn-trace"
	// Create payload
	payload := SSNPayload{
		SSN: "ssn-string", // replace with the actual SSN
	}
	// Marshal the payload into JSON
	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		logger.Error("Error marshalling JSON", err)
		return &result, err
	}
	// Create a new request with a POST method
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		logger.Error("Error creating request", err)
		return &result, err
	}
	// Set content type as JSON
	req.Header.Set("Content-Type", "application/json")
	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		// This code execute when the upstream API fails
		logger.Error("Error making POST request", err)
		return &result, err
	}
	defer resp.Body.Close()
	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		logger.Error("Error reading response body", err)
		return &result, err
	}

	// Unmarshal the JSON data into the ApiResponse struct
	var r APIResponse
	err = json.Unmarshal(body, &r)
	if err != nil {
		logger.Error("Error parsing JSON: %v\n", err)
		return &result, err
	}
	logger.Info("Response body", r.Message)
	result = "pass"
	return &result, nil
}

/*
Developers are still responsible for handling application level errors.
*/

func (a *Activities) FederalCriminalSearchActivity(ctx context.Context, param common.PII) (*string, error) {
	var result string
	logger := activity.GetLogger(ctx)
	url := "https://iq.temporal.io/api/background-check/up-federal-criminal-search"
	// Create payload
	payload := FederalSearchPayload{
		FirstName: param.FirstName,
		LastName:  param.LastName,
		SSN:       param.SSN,
	}
	// Marshal the payload into JSON
	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		logger.Error("Error marshalling JSON", err)
		return &result, err
	}
	// Create a new request with a POST method
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		logger.Error("Error creating request", err)
		return &result, err
	}
	// Set content type as JSON
	req.Header.Set("Content-Type", "application/json")
	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		// This code execute when the upstream API fails
		logger.Error("Error making POST request", err)
		return &result, err
	}
	defer resp.Body.Close()
	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		logger.Error("Error reading response body", err)
		return &result, err
	}

	// Unmarshal the JSON data into the ApiResponse struct
	var r APIResponse
	err = json.Unmarshal(body, &r)
	if err != nil {
		logger.Error("Error parsing JSON: %v\n", err)
		return &result, err
	}
	logger.Info("Response body", r.Message)

	result = "pass"
	return &result, nil
}

func (a *Activities) ChargeCreditCardActivity(ctx context.Context, param common.PII) (*string, error) {
	var result string
	logger := activity.GetLogger(ctx)
	url := "https://iq.temporal.io/api/background-check/charge-credit-card"
	// Create payload
	payload := ChargeCardPayload{
		FirstName:        param.FirstName,
		LastName:         param.LastName,
		CreditCardNumber: param.CreditCardNumber,
		Amount:           backgroundCheckCost,
	}
	// Marshal the payload into JSON
	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		logger.Error("Error marshalling JSON", err)
		return &result, err
	}
	// Create a new request with a POST method
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		logger.Error("Error creating request", err)
		return &result, err
	}
	// Set content type as JSON
	req.Header.Set("Content-Type", "application/json")
	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		// This code execute when the upstream API fails
		logger.Error("Error making POST request", err)
		return &result, err
	}
	defer resp.Body.Close()
	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		logger.Error("Error reading response body", err)
		return &result, err
	}

	// Unmarshal the JSON data into the ApiResponse struct
	var r APIResponse
	err = json.Unmarshal(body, &r)
	if err != nil {
		logger.Error("Error parsing JSON: %v\n", err)
		return &result, err
	}
	logger.Info("Response body", r.Message)
	result = "success"
	return &result, nil
}

func (a *Activities) RefundCreditCardActivity(ctx context.Context, param common.PII) (*string, error) {
	var result string
	logger := activity.GetLogger(ctx)
	url := "https://iq.temporal.io/api/background-check/refund-credit-card"
	// Create payload
	payload := RefundCardPayload{
		FirstName:        param.FirstName,
		LastName:         param.LastName,
		CreditCardNumber: param.CreditCardNumber,
		Amount:           backgroundCheckCost,
	}
	// Marshal the payload into JSON
	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		logger.Error("Error marshalling JSON", err)
		return &result, err
	}
	// Create a new request with a POST method
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		logger.Error("Error creating request", err)
		return &result, err
	}
	// Set content type as JSON
	req.Header.Set("Content-Type", "application/json")
	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		// This code execute when the upstream API fails
		logger.Error("Error making POST request", err)
		return &result, err
	}
	defer resp.Body.Close()
	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		logger.Error("Error reading response body", err)
		return &result, err
	}

	// Unmarshal the JSON data into the ApiResponse struct
	var r APIResponse
	err = json.Unmarshal(body, &r)
	if err != nil {
		logger.Error("Error parsing JSON: %v\n", err)
		return &result, err
	}
	logger.Info("Response body", r.Message)
	result = "success"
	return &result, nil
}
