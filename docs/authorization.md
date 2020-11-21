---
id: authorization
title: Authorization in Temporal
sidebar_label: Security
---

Temporal supports controlling access to API calls via the optional Authorization mechanism.
It allows application to admit or deny individual calls based on the caller's permissions, API name, and target namespace.
Authorization logic is pluggable, which makes it customizable for a variety of use cases and identity schemes.
The Authorization feature is still work in progress, with the aim to expand it to support more scenarios and a finer grain access control in the future.

## Authorizer Interface and Plug-in

`Authorizer` is the interface that enables access control to API calls. It is defined in the `authorization` package as follows.

```go
type Authorizer interface {
	Authorize(ctx context.Context, caller *Claims, target *CallTarget) (Result, error)
}
```

When Authorization is enabled, for each incoming API call received by the Frontend gRPC service the authorizer's `Authorize` method is invoked.
It returns one of the two possible decisions within `Result.Decision` field: `DecisionDeny` or `DecisionAllow`.
If the authorizer return `DecisionDeny` or an error, the requested API doesn't get invoked, and an error is returned to the caller.
Otherwise, the API gets invoked.

Authorizer makes its allow/deny decision based on the arguments passed to it and potentially other out-of-band data, such as configuration.
The arguments include:

- General context of the call `ctx` of type `context.Context`.
- Claims about the roles assigned to the caller. `Claims` struct and its intended use is [described below](#Claims).
- Target of the API call as a `CallTarget` struct

`CallTarget` includes the full API name, for example, `"/temporal.api.workflowservice.v1.WorkflowService/StartWorkflowExecution"`, and target namespace if applicable.

```go
CallTarget struct {
		APIName   string
		Namespace string
}
```

For APIs that do not target a specific namespace `CallTarget.Namespace` is set to an empty string.

### Authorizer Plug-in

Authorizer is a pluggable component that can be set via the `temporal.WithAuthorizer` [server options mechanism](server-options.md).
Here's an example of how this can be done.

```go
s := temporal.NewServer(
	temporal.ForServices(services),
	temporal.WithConfig(cfg),
	temporal.WithAuthorizer(myAuthorizer),
)

err = s.Start()
```

By default, Temporal sets up the `nopAuthority` authorizer that unconditionally allows all API call to pass through.
The codebase also includes `defaultAuthorizer` [described below].

## Claims

`Claims` struct contains information about permission claims granted to the caller.
Authorizer assumes that the caller has been properly authenticated and trusts the claims passed to it as input for making an authorization decision.
`Claims` struct includes three pieces of information:

- Identity of the caller (subject)
- System wide role of the caller
- Roles of the caller within zero or more namespaces

```go
type Claims struct {
	subject string
	system Role
	namespaces map[string]Role
}

```

This information is filled by the claim mapper component, typically by extracting information from the authentication token and/or mutual TLS certificate associated with the gRPC connection over which that call has arrived.
`Role` is a bit mask that is a combination of one or more the role constants:

```go
const (
	RoleWorker = Role(1 << iota)
	RoleReader
	RoleWriter
	RoleAdmin
	RoleUndefined = Role(0)
)
```

For example, a role can be set as

```go
role := authorization.RoleReader | authorization.RoleWriter
```

## Claim Mapper

Claim mapper is a pluggable component responsible for converting information about the caller provided via an authorization token, such as a JWT access token, and/or a mutual TLS certificate into a set of claims about caller's roles in the Temporal taxonomy.
`ClaimMapper` is the plug-in interface.

```go
type ClaimMapper interface {
	GetClaims(authInfo *AuthInfo) (*Claims, error)
}
```

The `AuthInfo` struct that is passed to claim mapper's `GetClaims` method contains an authorization token extracted from `"authorization"` header of the gRPC request and a pointer to the `pkix.Name` struct that contains a X.509 distinguished name from the caller's mutual TLS certificate.

```go
type AuthInfo struct {
	authToken  string
	tlsSubject *pkix.Name
}
```

Claim mapper can be set via the `temporal.WithClaimMapper` [server option](server-options.md).
Here's an example of how this can be done.

```go
s := temporal.NewServer(
	temporal.ForServices(services),
	temporal.WithConfig(cfg),
    temporal.WithAuthorizer(myAuthorizer),
    temporal.WithClaimMapper(func(cfg *config.Config) authorization.ClaimMapper {
		return authorization.NewNoopClaimMapper(cfg)
	}),
)

err = s.Start()
```
