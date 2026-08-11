export type TopicContent = {
  intro: string;
  practice: string;
  takeaway: string;
  nodes: [string, string, string];
};

const authContent = (intro: string, practice: string, takeaway: string): TopicContent => ({ intro, practice, takeaway, nodes: ["Threat", "Control", "Outcome"] });

export const topicCopy: Record<string, TopicContent> = {};

Object.assign(topicCopy, {
  "Azure resource group management": authContent(
    "An Azure resource group is a lifecycle and governance boundary for related resources. A useful grouping strategy follows ownership, environment, deployment, access, and deletion needs rather than placing everything for a company into one container.",
    "Create separate production and non-production groups with consistent names and required tags. Manage them through infrastructure as code, grant least-privilege roles to team groups, apply policy at the appropriate scope, protect critical resources with locks, and review cost and unused resources on a schedule.",
    "Group resources that change and retire together, then make ownership, policy, cost, and lifecycle visible through automation and tags.",
  ),
  "Sprint planning": authContent(
    "Sprint planning selects a realistic sprint goal and a coherent set of work based on product priority, team capacity, dependencies, operational responsibilities, and uncertainty. It is a collaborative forecast rather than a promise that every selected ticket will finish.",
    "Refine important work before planning, review recent throughput and actual availability, state one sprint goal, pull the smallest valuable slices, expose dependencies and risks, reserve capacity for support and defects, and stop adding work when the team believes the goal is achievable.",
    "Plan around a valuable outcome and honest capacity; use estimates to support conversation, not to manufacture certainty.",
  ),
  "Front-end ticket planning & tools": authContent(
    "A strong front-end ticket explains the user outcome, relevant flow, states, responsive behavior, accessibility expectations, data contract, analytics, and completion criteria without prescribing every implementation detail. It should be small enough to review, test, and release safely.",
    "Link the approved design and component source, list loading, empty, error, permission, and success states, identify API and feature-flag dependencies, add observable acceptance criteria, and split large work vertically. Track delivery in the team's issue tool and connect the ticket to design, pull request, preview environment, and test evidence.",
    "Make tickets implementation-ready by documenting behavior and boundaries; tools should connect evidence and decisions rather than replace them.",
  ),
});

Object.assign(topicCopy, {
  "Authentication vs authorization": authContent("Authentication establishes which principal is interacting with a system. Authorization decides what that authenticated principal may do. They are separate decisions made at different boundaries.", "A user signs in with a passkey, establishing identity. The document service then evaluates whether that user may edit document 42 based on ownership, role, and policy.", "Authenticate identity first; authorize every protected action against the specific resource."),
  "Principals, credentials & claims": authContent("A principal is the entity acting; a credential is evidence presented to prove identity; a claim is an assertion about that identity. Claims are inputs to policy, not automatically trusted facts.", "A session identifies principal user-123. A signed token asserts department=finance. The API validates the issuer and signature before using that claim in an access decision.", "Keep the actor, the proof, and assertions about the actor conceptually separate."),
  "Password storage": authContent("Passwords must be stored as salted, deliberately slow password hashes—not encrypted or fast general-purpose hashes. Argon2id is the preferred choice where available; bcrypt or scrypt may be appropriate with reviewed parameters.", "On registration, generate a unique salt and hash the password with a memory-hard KDF. On login, recompute and compare in constant time, then opportunistically rehash when parameters become outdated.", "Never store recoverable passwords; rate-limit verification and plan for hash-parameter upgrades."),
  "Sessions & cookies": authContent("A server session binds a random, opaque identifier to authenticated state held server-side. Browser cookies are a transport mechanism and need Secure, HttpOnly, SameSite, narrow Path, and appropriate Domain settings.", "After login, rotate the session identifier to prevent fixation. Store only the opaque ID in the cookie, expire idle sessions, and invalidate server state on logout or credential changes.", "Treat the session identifier as a bearer secret and minimize where the browser sends it."),
  "MFA & passkeys": authContent("Multi-factor authentication combines independent factor types. Passkeys use WebAuthn public-key credentials, resist phishing through origin binding, and avoid shared secrets on the server.", "Prefer a passkey as the primary sign-in method or add a phishing-resistant factor for sensitive accounts. Keep recovery codes protected and make account recovery at least as strong as normal login.", "Authentication is only as strong as its weakest enrollment and recovery path."),
  "What OAuth actually does": authContent("OAuth is an authorization delegation framework. It lets a client obtain limited access to a protected resource without receiving the resource owner’s password. OAuth alone does not define user login.", "A photo-printing app requests permission to read selected cloud photos. The authorization server issues an access token scoped for that API; the printing app never receives the user’s cloud password.", "Use OAuth for delegated API access; add OpenID Connect when the client needs authenticated user identity."),
  "OAuth roles": authContent("OAuth defines a resource owner, client, authorization server, and resource server. One product may operate several roles, but keeping their trust boundaries distinct is essential.", "The user authorizes a calendar client at the identity provider. The provider issues a token, and the calendar API independently validates that token before serving data.", "Name each role in the architecture before reasoning about credentials, tokens, or trust."),
  "Scopes & consent": authContent("Scopes are strings representing delegated capabilities requested by a client. They limit token authority but are not a complete replacement for resource-level authorization.", "A client requests calendar.read rather than calendar.admin. The API still checks which calendars and events the subject may access after accepting the scope.", "Request least privilege and enforce both token scope and domain authorization."),
  "Protocol endpoints & discovery": authContent("Authorization servers publish endpoints and supported capabilities through metadata. Clients use the authorization endpoint through the browser, the token endpoint over a protected back channel, and may use revocation, introspection, userinfo, and JWKS endpoints.", "Load trusted issuer metadata, verify its issuer exactly, and use the advertised endpoints. Do not accept an issuer or endpoint URL directly from an untrusted request.", "Configuration discovery reduces drift, but its issuer and endpoint trust must be anchored."),
  "OAuth vs OpenID Connect": authContent("OpenID Connect is an identity layer on OAuth. It defines an ID token, authentication request semantics, standard identity claims, UserInfo, discovery, and rules for validating the authentication result.", "A client uses the authorization code flow with scope openid. It validates the returned ID token to establish the signed-in user and uses the access token only when calling an API.", "ID tokens tell the client about authentication; access tokens authorize calls to resource servers."),
  "Access tokens": authContent("An access token is a credential presented to a resource server to exercise delegated authority. It may be opaque or structured, and its format is an agreement between the authorization server and resource server—not the client.", "The API validates the token’s issuer, intended audience, time bounds, and required scope before applying its own resource policy. The browser client does not decode the token to decide whether access is allowed.", "Keep access tokens short-lived, audience-restricted, minimally scoped, and out of logs and URLs."),
  "Refresh tokens": authContent("A refresh token is a high-value credential used at the token endpoint to obtain new access tokens without repeating interactive authorization. It is never sent to a resource server.", "A confidential web backend stores the refresh token encrypted at rest. A public client uses rotation so reuse of an older token exposes theft and invalidates the token family.", "Protect refresh tokens more strongly than access tokens and bind or rotate them for public clients."),
  "ID tokens": authContent("An ID token is a signed OpenID Connect assertion intended for the client. It describes an authentication event and subject; it is not a general-purpose API access token.", "The client validates iss, aud, exp, signature, and nonce where applicable, then maps the stable iss+sub pair to its local account. The API rejects the ID token as an authorization credential.", "Validate ID tokens for the exact client and never substitute them for access tokens."),
  "JWT anatomy": authContent("A JWT has base64url-encoded header, payload, and signature segments. Encoding is not encryption: anyone holding a normal signed JWT can read its claims.", "The header names an allowed signing algorithm and key ID; the payload carries claims such as iss, sub, aud, exp, and iat; the signature protects integrity. Sensitive data still does not belong in the payload.", "A JWT is a signed envelope, not proof by itself—validation creates trust."),
  "Validating JWTs": authContent("JWT validation requires an allowlisted algorithm, a trusted key, a valid signature, exact issuer and audience checks, acceptable time claims, and application-specific claim validation.", "Resolve kid only against keys from the configured issuer’s JWKS. Reject alg=none, unexpected algorithms, missing audience, expired tokens, and tokens for a different tenant or token type.", "Parsing a JWT is not validation; every trust assumption must be checked explicitly."),
  "Opaque tokens & introspection": authContent("Opaque tokens carry no client-readable claims. A resource server can validate them through local state or an authorization-server introspection endpoint, receiving an authoritative active status and metadata.", "The API authenticates to introspection, checks active=true plus audience and scope, and caches briefly within the token’s lifetime to balance availability with revocation freshness.", "Opaque tokens reduce claim leakage and enable central control at the cost of a validation dependency."),
  "Authorization Code + PKCE": authContent("The authorization code flow sends a short-lived, one-time code through the browser and exchanges it at the token endpoint. PKCE binds that exchange to a secret verifier generated by the client.", "Generate a high-entropy code_verifier, send its S256 challenge with the authorization request, and supply the verifier at redemption. An intercepted code is useless without it.", "Use authorization code with PKCE for public clients and generally for all redirect-based clients."),
  "Client Credentials": authContent("The client credentials grant represents a client acting as itself, without a user. It is suitable for confidential machine-to-machine workloads that can protect a credential.", "A scheduled billing worker authenticates to the token endpoint with a private key or managed workload identity and receives an audience-limited token for the invoicing API.", "Never imply a user where none exists; grant service identities narrowly scoped authority."),
  "Device Authorization": authContent("The device authorization grant supports devices with limited input or no suitable browser. The device shows a short user code while polling the token endpoint at the instructed interval.", "A television displays a verification URL and code. The user authorizes on a separate phone; the TV polls using the device code without handling the user’s credentials.", "Respect polling intervals, expire device codes quickly, and clearly bind the user’s confirmation to the device."),
  "Refresh token rotation": authContent("Rotation issues a new refresh token on every successful use and invalidates the previous token. Reuse of an old token signals that a token family may have been stolen.", "Store token-family lineage atomically. If token A is used, issue B and invalidate A; if A appears again, revoke B and the remaining family, then require reauthentication.", "Rotation needs replay detection and atomic state changes—not merely issuing another token."),
  "Deprecated OAuth flows": authContent("The implicit grant and resource owner password credentials grant are unsafe for modern deployments. Current security guidance avoids tokens in authorization responses and never asks clients to collect user passwords.", "Replace implicit with authorization code plus PKCE. Replace password grant with browser-based authorization, preserving MFA, federation, risk checks, and origin-bound authentication.", "Do not select legacy flows for convenience; migrate them behind standards-based authorization."),
  "Server-side web apps": authContent("A server-rendered web app is a confidential OAuth client. Its backend handles the code exchange and token storage, while the browser receives only a hardened session cookie.", "Validate state, issuer, and ID-token nonce; rotate the local session after callback; keep OAuth tokens encrypted in server storage and associate them with the session.", "Keep OAuth credentials and tokens out of browser JavaScript when a trusted backend is available."),
  "SPA & Backend-for-Frontend": authContent("A Backend-for-Frontend moves token handling from a single-page app into a same-origin server component. The browser uses a session cookie, and the BFF attaches access tokens to downstream API calls.", "Use Secure, HttpOnly, SameSite cookies plus CSRF defenses. The BFF validates the session and proxies only allowed API operations; tokens never enter localStorage.", "A BFF reduces token theft exposure but becomes a security boundary requiring CSRF and proxy controls."),
  "Native applications": authContent("Native apps are public clients and cannot safely hold a static client secret. They use an external user-agent, authorization code with PKCE, and claimed HTTPS or loopback redirects.", "Open the system browser, not an embedded webview. Bind the callback to the app, validate state and issuer, and store refresh credentials in platform-protected secure storage.", "Treat installed applications as public clients even when their binaries contain a client secret."),
  "Resource server design": authContent("A resource server accepts access tokens for its own audience and translates validated token authority into domain-level decisions. Token validation and business authorization are separate layers.", "Middleware validates signature or introspection, issuer, audience, expiry, and scope. The handler then verifies that the subject may modify the specific invoice identified by the route.", "A valid token is necessary, not sufficient: authorize the action on the target resource."),
  "Multi-tenant identity": authContent("Multi-tenant systems must bind identity to a trusted issuer and tenant context. Subject identifiers are only locally unique within an issuer, and tenant selection must not come from an unchecked claim or URL alone.", "Key accounts by issuer plus subject, validate the tenant’s configured issuer, and derive active organization membership from authoritative application data before applying roles.", "Never merge identities or authority across tenants based on email address alone."),
  "State, nonce & PKCE": authContent("state correlates an authorization response with a browser transaction and supports CSRF defense; nonce binds an ID token to an authentication request; PKCE binds authorization-code redemption to the initiating client.", "Create independent high-entropy values per attempt, bind them to the initiating session, use an S256 PKCE challenge, validate once on callback, and delete transaction state after use.", "These values solve different attacks; one is not a substitute for another."),
  "Redirect URI security": authContent("Redirect URIs define where authorization responses may be delivered. Loose matching and open redirectors can leak codes or tokens to an attacker.", "Pre-register complete HTTPS redirect URIs and compare them using exact string matching, with the native loopback port exception. Reject user-controlled forwarding after the callback.", "Treat redirect registration as an allowlist, never as a pattern or prefix."),
  "CSRF, XSS & token storage": authContent("CSRF abuses ambient browser credentials; XSS runs attacker script in your origin. HttpOnly cookies reduce token theft by script but require CSRF protection, while browser storage exposes bearer tokens to XSS.", "Use output encoding, a strict CSP, dependency hygiene, SameSite cookies, and anti-CSRF tokens or origin checks for state-changing requests. Avoid long-lived tokens in localStorage.", "Choose storage and controls from the actual browser threat model; there is no magic storage location."),
  "Sender-constrained tokens": authContent("Bearer tokens can be used by whoever steals them. Sender-constrained tokens bind use to a client-held key through mechanisms such as DPoP or mutual TLS.", "With DPoP, the client signs a fresh proof containing the request method and URI. The server validates the proof, replay identifiers, and the token’s key thumbprint binding.", "Proof of possession limits replay but does not replace TLS, token validation, or authorization."),
  "JWKS & key rotation": authContent("A JWKS publishes public verification keys. Safe rotation overlaps old and new keys long enough for issued tokens to expire while verifiers refresh keys from a trusted issuer.", "Select an allowed key by kid, refresh on an unknown key with rate limits, cache according to policy, and reject keys or JWKS URLs supplied by the token itself.", "Rotate deliberately and anchor key discovery to the configured issuer."),
  "Revocation & logout": authContent("Logout spans local application sessions, authorization-server sessions, access tokens, and refresh tokens. Clearing one browser cookie does not necessarily revoke the others.", "Terminate local state, revoke refresh credentials where supported, propagate back-channel logout when required, and keep access tokens short-lived because distributed revocation is not instantaneous.", "Define exactly which sessions and credentials each logout action terminates."),
  "Threat modeling & monitoring": authContent("Authentication systems need explicit assets, actors, trust boundaries, abuse cases, and detection signals. Secure protocol choices still fail under weak recovery, configuration, or operations.", "Monitor authorization errors, code and refresh-token reuse, issuer mismatches, impossible travel, MFA changes, recovery attempts, key changes, and anomalous client or scope activity without logging secrets.", "Design detection and incident response alongside prevention; assume credentials will eventually be targeted."),
});

Object.assign(topicCopy, {
  "Solution & project files": authContent("A solution file groups projects for tooling, while each .csproj is the actual MSBuild project definition: target framework, package references, project references, compiler settings, and build items.", "Keep deployable apps, reusable libraries, and test suites in separate projects only when the dependency boundary is meaningful. A small API can remain one project until complexity justifies more.", "Projects enforce compile-time boundaries; folders only organize files inside a project."),
  "Program.cs": authContent("Program.cs is the composition root. It creates the WebApplicationBuilder, registers services and configuration, builds the app, orders middleware, maps endpoints, and starts the host.", "Keep Program.cs readable by grouping registrations behind focused AddApplication, AddInfrastructure, and AddApi extension methods without hiding important middleware order.", "Wire the system at the edge; do not place business logic in the composition root."),
  "appsettings files": authContent("appsettings.json provides baseline configuration and environment-specific files override it. Environment variables and secret providers can override both through the default configuration pipeline.", "Commit safe defaults and structure, not credentials. Bind related settings to validated option classes and fail at startup when required production values are absent.", "Configuration belongs outside code; secrets belong outside source control."),
  "launchSettings.json": authContent("Properties/launchSettings.json defines local development launch profiles, URLs, environment variables, and browser behavior for dotnet run and IDE tooling. It is not deployed as production configuration.", "Use it for local ports and ASPNETCORE_ENVIRONMENT=Development. Put real runtime configuration in the deployment platform rather than assuming launch profiles affect production.", "launchSettings.json shapes the developer launch experience, not the deployed app."),
  "Dependencies & NuGet": authContent("The project file declares framework and package dependencies. ProjectReference creates compile-time links between solution projects; PackageReference resolves versioned NuGet packages.", "Keep the dependency graph directed inward, centralize package versions when the solution grows, commit the lock strategy your team chooses, and remove packages that duplicate framework capabilities.", "Every dependency expands maintenance and security surface; add it deliberately."),
  "Controllers vs Minimal APIs": authContent("ASP.NET Core supports controller-based APIs and Minimal APIs. Controllers provide conventions, filters, model binding features, and class organization; Minimal APIs offer a compact endpoint model with route groups and endpoint filters.", "Choose by complexity and team needs. Avoid mixing styles without a reason, and keep either approach thin by delegating business work to application use cases.", "The endpoint style is a delivery choice, not the architecture of the whole application."),
  "Endpoints & routing": authContent("Routing maps HTTP methods and URI templates to endpoint handlers. Route constraints, names, groups, versioning strategy, and resource-oriented URLs form the public API contract.", "Use nouns for resources, HTTP methods for intent, explicit status codes, stable route names for link generation, and route groups or controller prefixes for shared policy.", "Routes are public contracts; change them with the same care as method signatures."),
  "Contracts & DTOs": authContent("Request and response DTOs define the API wire contract. They should be distinct from EF entities and rich domain objects so persistence or domain refactors do not silently alter JSON.", "Place public contracts near the API feature or in a dedicated Contracts project only when other assemblies genuinely consume them. Make nullability and validation expectations explicit.", "Own the HTTP contract explicitly; never serialize persistence models by accident."),
  "Middleware pipeline": authContent("Middleware forms an ordered request pipeline. Each component can inspect the request, perform work before and after the next delegate, short-circuit, or transform the response.", "Place exception handling early, then forwarded headers and HTTPS policy as appropriate, routing-related middleware, authentication before authorization, and endpoint execution. Verify order against each middleware's requirements.", "Middleware order is behavior, not formatting."),
  Filters: authContent("Filters run around controller or endpoint execution at defined stages. They are useful for delivery-layer cross-cutting concerns that need action context, but they should not contain domain rules.", "Use filters for concerns such as consistent result transformation or action-specific auditing. Prefer middleware for concerns applying to the whole HTTP pipeline and policies for authorization.", "Choose the narrowest pipeline hook that has the context the concern requires."),
  "OpenAPI documentation": authContent("OpenAPI is a machine-readable description of endpoints, parameters, schemas, responses, and security requirements. ASP.NET Core can generate it from endpoint metadata and contracts.", "Document non-success responses, authentication schemes, examples, and stable operation names. Validate the generated document and use it for contract review or client generation.", "Generated documentation is only trustworthy when endpoint metadata is deliberate."),
  "Application layer": authContent("The application layer coordinates use cases. It accepts application input, loads domain state through abstractions, invokes business behavior, persists results, and returns an outcome without depending on HTTP or database implementations.", "Organize commands and queries around business capabilities. Keep ASP.NET types, EF queries tied to a provider, and serialization concerns outside this layer.", "Application code describes what the system does; infrastructure describes how external work is performed."),
  "Feature folders": authContent("Feature folders organize code vertically by capability—such as Orders/Create—instead of scattering one change across Controllers, Services, Validators, and DTO folders.", "Keep an endpoint, request contract, validator, handler, and mapping close when they change together. Share only stable domain concepts and infrastructure abstractions.", "Optimize structure for the changes developers make, not for a taxonomy of class suffixes."),
  "Domain entities": authContent("A domain entity has stable identity and protects business invariants through behavior. It is more than a mutable property bag and should not depend on ASP.NET Core or EF Core APIs.", "Construct entities only in valid states, expose intention-revealing methods, keep setters private where appropriate, and raise domain events for meaningful state transitions when needed.", "Put business rules with the model that owns the state they protect."),
  "Value objects": authContent("A value object is defined by its attributes rather than an identity. It is typically immutable, validates itself at creation, and uses structural equality.", "Represent EmailAddress, Money, DateRange, or OrderNumber as types when the value has rules or domain meaning that primitives cannot express safely.", "Replace ambiguous primitives with small types that make invalid states harder to represent."),
  "Use cases & services": authContent("A use-case handler coordinates one application action. Domain services hold domain logic that does not naturally belong to one entity; infrastructure services implement external capabilities.", "Name use cases after user intent such as PlaceOrder, not generic Manager or Helper classes. Keep transactions and orchestration explicit.", "A service should have a precise responsibility that its name can communicate."),
  "Validation & mapping": authContent("Input validation checks whether a request is structurally acceptable; domain validation protects business invariants. Mapping translates between API contracts, application inputs, domain types, and persistence shapes.", "Reject malformed input at the boundary, create domain types through validated factories, and keep mappings explicit enough that contract changes are reviewed.", "Boundary validation cannot replace invariants enforced by the domain."),
  "Infrastructure project": authContent("Infrastructure contains replaceable details: EF Core, file storage, email, queues, clocks, identity provider clients, and other adapters. It implements interfaces owned by inner application or domain projects.", "Register adapters through AddInfrastructure and keep vendor-specific types from leaking into the application layer.", "Infrastructure depends inward; business policy must not depend on infrastructure."),
  DbContext: authContent("An EF Core DbContext represents a unit of work and tracks entity changes. AddDbContext registers it as scoped by default, matching the common one-unit-of-work-per-request model.", "Keep DbContext focused on persistence, define DbSet properties intentionally, apply entity configurations, and avoid using one context concurrently across threads.", "DbContext is short-lived and not thread-safe; do not turn it into a singleton."),
  "Entity configurations": authContent("IEntityTypeConfiguration classes keep EF Core mapping rules—keys, constraints, conversions, relationships, indexes, and table names—out of domain entity classes.", "Place configurations beside persistence concerns and apply them from the assembly. Encode database constraints that mirror critical invariants.", "Persistence mapping belongs in infrastructure even when it maps domain types."),
  "EF Core migrations": authContent("Migrations are versioned transformations from one database schema to the next. They are deployable artifacts that require review, ordering, and an operational rollout plan.", "Generate migrations from the intended model change, inspect destructive operations and SQL, test against production-like data, and separate application startup from privileged migration execution in controlled environments.", "Treat schema changes as production changes, not generated trivia."),
  Repositories: authContent("A repository provides a domain-oriented collection abstraction when it adds a useful boundary. EF Core's DbContext already supplies repository and unit-of-work behavior, so generic wrappers often add indirection without value.", "Create repositories around aggregates or complex persistence contracts, not one generic CRUD repository per table. For simple applications, use DbContext directly from the application boundary if dependency policy permits.", "Add a repository for a domain or testing need—not because every project template has one."),
  "External service clients": authContent("Outbound HTTP and SDK integrations are infrastructure adapters. Typed HttpClient registrations provide configuration, handler pooling, resilience integration, and a focused API for the remote service.", "Define an application-owned interface, implement it with a typed client, set timeouts, propagate cancellation, handle transient failures carefully, and avoid retrying unsafe operations blindly.", "Remote calls are unreliable boundaries; make timeout, failure, and idempotency behavior explicit."),
  "Options & secrets": authContent("The options pattern binds related configuration into typed classes and can validate values at startup. Secrets should come from environment variables or a managed secret store, never committed appsettings files.", "Use ValidateDataAnnotations or custom validation plus ValidateOnStart. Choose IOptions, IOptionsSnapshot, or IOptionsMonitor according to lifetime and reload needs.", "Fail fast on invalid configuration and keep secret values out of logs."),
  "Unit test project": authContent("Unit tests verify isolated business behavior without starting the host, database, network, or filesystem. They belong in a separate test project referencing the code under test.", "Mirror feature names, test observable behavior and invariants, use real value objects, and fake only external boundaries. Keep tests deterministic and fast.", "Unit tests should make domain rules safe to change, not duplicate implementation details."),
  "Integration test project": authContent("Integration tests verify multiple real components together: routing, middleware, serialization, authentication, EF mappings, or external adapters with controlled infrastructure.", "Use a separate project, realistic test configuration, isolated data, and containers or an appropriate test database when provider behavior matters.", "Test the seams where configuration and components can disagree."),
  WebApplicationFactory: authContent("WebApplicationFactory boots the ASP.NET Core application in a test host and exposes an HttpClient for end-to-end requests without an external server process.", "Override services and configuration for tests, use a dedicated environment, authenticate through a test scheme when appropriate, and assert status codes plus response contracts.", "Exercise the real middleware and endpoint pipeline for high-value API scenarios."),
  "Directory.Build.props": authContent("Directory.Build.props applies shared MSBuild properties to projects beneath its directory. It centralizes nullable settings, warnings, language version, analyzers, and other build policy.", "Keep broadly applicable settings at the solution root and use nearer files only for intentional sub-tree overrides. Avoid hiding surprising project-specific behavior globally.", "Central build policy prevents projects from silently drifting apart."),
  "global.json & SDK pinning": authContent("global.json controls how the .NET CLI selects an installed SDK. It makes local machines and CI more reproducible while rollForward policy controls acceptable updates.", "Pin a supported feature band or version appropriate to the team, update deliberately, and ensure CI installs the same SDK.", "The target framework and the SDK used to build it are related but different choices."),
  "Analyzers & formatting": authContent("Compiler warnings, Roslyn analyzers, .editorconfig, and dotnet format encode code-quality and style rules as automated feedback.", "Enable nullable reference types, treat selected warnings as errors, adopt analyzers incrementally, and enforce formatting in CI without turning subjective rules into constant noise.", "Automate repeatable review comments so humans can focus on design."),
  "Dependency direction": authContent("In a layered or clean architecture, compile-time dependencies point toward business policy. API and Infrastructure can reference Application or Domain; the domain should not reference ASP.NET Core, EF Core, or vendor SDKs.", "Use project references to enforce the intended graph, then compose concrete infrastructure implementations in the API's composition root.", "A folder diagram is aspirational; project references make the boundary real."),
  "DI service lifetimes": authContent("Transient creates a service each resolution, scoped creates one per request scope, and singleton creates one for the app lifetime. Capturing a scoped dependency in a singleton promotes it incorrectly and can leak request state.", "Use scoped for DbContext and request units of work, singleton only for thread-safe shared services, and let the container dispose objects it creates.", "Choose lifetime from state, concurrency, ownership, and dependency lifetimes—not habit."),
  "Async & cancellation": authContent("Async I/O releases request threads while awaiting databases or networks. CancellationToken communicates that the client disconnected or a deadline expired, allowing cooperative work to stop.", "Pass cancellation tokens from endpoints through application handlers to EF Core and HttpClient. Avoid blocking on Task.Result and do not start fire-and-forget work inside a request.", "Async must flow through the call chain; cancellation only works when propagated."),
  "Problem Details": authContent("Problem Details provides a standard JSON error shape with type, title, status, detail, instance, and safe extensions. Central exception handling can map known failures consistently.", "Return validation problems as 400, authentication failures as 401, authorization failures as 403, missing resources as 404, conflicts as 409, and unexpected failures as sanitized 500 responses.", "Make errors predictable without leaking stack traces, SQL, secrets, or internal topology."),
  "Logging & observability": authContent("Structured logs describe events with named properties. Traces connect work across services, and metrics summarize rates, latency, errors, and saturation.", "Use ILogger message templates, correlation and trace IDs, OpenTelemetry instrumentation, redaction, and domain-relevant measurements. Never log credentials or sensitive payloads.", "Observability should answer what failed, where, for whom, and since when."),
  "Authentication & authorization": authContent("Authentication handlers validate credentials and build a ClaimsPrincipal. Authorization policies evaluate requirements for an endpoint or resource; authentication alone never grants blanket access.", "Configure schemes explicitly, validate issuer and audience for bearer tokens, prefer named policies over scattered role strings, and perform resource-based checks where ownership matters.", "Protect endpoints by default and make exceptional anonymous access explicit."),
  "Health checks": authContent("Health checks expose whether the process is alive and whether it is ready to receive traffic. Readiness may depend on critical infrastructure; liveness should not fail merely because a downstream service is temporarily unavailable.", "Expose separate liveness and readiness endpoints, tag checks, keep them fast, secure detailed diagnostics, and align orchestrator probes with startup behavior.", "A bad health check can amplify an outage by restarting healthy processes."),
  "Publishing & deployment": authContent("dotnet publish produces deployment-ready output for a target framework, runtime, and configuration. Deployment also includes configuration injection, database rollout, health verification, rollback, and observability.", "Build once in CI, test the artifact, run migrations as a controlled step, start with Production configuration, bind to the platform port, and use rolling or blue-green releases for safe rollback.", "Deployment is a repeatable system change, not copying the bin folder."),
  "REST constraints": authContent("REST is an architectural style built around client-server separation, stateless requests, cacheable responses, a uniform interface, layered systems, and optional code on demand. An HTTP API is not automatically RESTful merely because it uses JSON.", "Model stable resources with URLs, transfer representations through standard HTTP methods, and make each request carry the context needed to process it.", "Use REST constraints to gain interoperability and evolvability, not as a naming convention."),
  "Resources & representations": authContent("A resource is a conceptual thing identified by a URI; a representation is one serialized view of its current state. The same resource may have JSON, HTML, or another representation.", "Expose /orders/42 as the order identity and negotiate its representation with headers. Link related resources instead of leaking database table structure into every route.", "Design URLs around domain resources and keep their wire representations free to evolve."),
  "GraphQL execution model": authContent("GraphQL clients submit typed operations against a schema and select the exact response shape they need. The server validates the document, executes fields through resolvers, and returns data with structured errors.", "A product-page query can request a product, its price, and the first five reviews in one operation while omitting fields the screen does not use.", "GraphQL moves response-shape composition into a typed query language governed by the server schema."),
  "Choosing an API style": authContent("REST and GraphQL optimize different constraints. REST fits resource-oriented workflows, HTTP caching, and simple public integration; GraphQL excels when clients need flexible, connected views over many data sources.", "Compare client diversity, graph complexity, caching needs, operational maturity, and team expertise. A system may use REST for commands and public resources while a GraphQL gateway serves product UIs.", "Choose from concrete consumer and operational needs; neither style is a universal upgrade over the other."),
  "HTTP methods & safety": authContent("GET and HEAD are safe; PUT and DELETE are idempotent; POST usually is neither. Method semantics let clients, caches, gateways, and retry policies behave correctly.", "Use GET to retrieve, POST to create or invoke a non-idempotent action, PUT to replace at a known URI, and PATCH for a defined partial-update format.", "Honor HTTP semantics so retries and intermediaries do not create surprising side effects."),
  "Status codes & errors": authContent("Status codes communicate the broad outcome while a stable error body carries machine-readable detail. Successful, client-error, and server-error families must remain semantically distinct.", "Return 201 with a Location header after creation, 404 for a missing resource, 409 for a state conflict, and Problem Details for consistent error metadata.", "Make failures predictable without encoding every domain outcome into a custom status code."),
  "Filtering, sorting & pagination": authContent("Collection endpoints need bounded navigation and explicit query semantics. Cursor pagination remains stable under concurrent inserts more readily than deep offset pagination.", "Accept allowlisted filters and sort fields, cap page sizes, return an opaque next cursor, and document whether results have a stable ordering.", "Bound every collection and treat query parameters as a reviewed API contract."),
  "Caching & conditional requests": authContent("HTTP caching reuses fresh representations, while validators such as ETag and Last-Modified support conditional requests and prevent lost updates.", "Return Cache-Control and an ETag on GET; answer If-None-Match with 304 when unchanged; require If-Match for edits that must not overwrite a newer version.", "State cache policy explicitly and use validators for both efficiency and concurrency safety."),
  "Schemas & type systems": authContent("A GraphQL schema is the executable contract of object, scalar, enum, interface, union, and input types. It defines which fields exist, their arguments, and their nullability.", "Model domain concepts rather than storage tables, use purpose-built input types, document fields, and validate the schema in CI with representative operations.", "Treat the schema as a product interface whose types communicate guarantees."),
  "Queries, mutations & subscriptions": authContent("Queries read data, mutations initiate state changes, and subscriptions deliver event-driven updates. Mutation fields execute serially at the top level; query fields may resolve concurrently.", "Use a query for product search, a narrowly named mutation such as placeOrder for a business command, and subscriptions only where live delivery justifies persistent connections.", "Select an operation type by semantics, not merely by the transport being used."),
  "Resolvers & data loading": authContent("Resolvers produce field values and compose backend systems. Naive nested resolution can cause N+1 calls; request-scoped batching and caching consolidate repeated loads.", "Collect author IDs requested across a list of posts, fetch those authors in one batch, and map results back without sharing the loader cache across users or requests.", "Measure resolver behavior and batch at data-source boundaries without hiding authorization checks."),
  "Nullability & error handling": authContent("GraphQL fields are nullable by default. If a non-null field fails, null propagates to the nearest nullable parent while the response may contain both partial data and errors.", "Mark a field non-null only when the server can uphold that promise. Return typed domain outcomes for expected business failures and reserve errors for exceptional field execution failures.", "Nullability is a runtime guarantee with failure-propagation consequences, not decorative syntax."),
  "Versioning & evolution": authContent("APIs evolve safest through additive changes, tolerant readers, explicit deprecation, and usage evidence. REST may version incompatible contracts; GraphQL commonly evolves one schema by deprecating fields.", "Add an optional field before requiring it, publish deprecation reasons and replacement paths, observe remaining consumers, and remove only under an agreed lifecycle policy.", "Prefer compatible evolution; use versions as a deliberate escape hatch for true breaks."),
  "Authentication & field authorization": authContent("Authentication establishes the caller; authorization must still be enforced for every operation and resource. In GraphQL, endpoint-level protection alone cannot secure sensitive fields.", "Authorize an order against its tenant and owner in the service layer, and apply field-level policy before resolving sensitive values such as cost or personal data.", "Keep authorization close to protected data and apply it consistently across REST routes and GraphQL fields."),
  "Rate limits & query complexity": authContent("Request counts alone do not represent cost: one GraphQL document or REST expansion can trigger substantial work. Limits should account for identity, operation cost, depth, fan-out, and backend budgets.", "Cap list sizes, reject cyclic or excessive depth, assign schema-field costs, use persisted operations where appropriate, and return clear throttling metadata.", "Bound work before execution and align limits with actual resource consumption."),
  "Observability & testing": authContent("Production API confidence combines contract tests, integration tests, telemetry, and consumer-visible service objectives. Logs alone rarely explain latency across resolvers and dependencies.", "Trace operation names, routes, status, duration, resolver or dependency spans, and safe error categories. Test schema compatibility, HTTP semantics, authorization, and representative cost limits.", "Observe and test the contract at the boundary where consumers experience it."),
  "Files, pages & layers": authContent("A Figma file contains pages, and each page contains an ordered layer tree. Clear structure makes navigation, collaboration, and later changes dramatically easier.", "Separate exploration, approved flows, and archived work into intentional pages. Name important frames and layers by purpose, then remove obsolete duplicates before handoff.", "Treat the layer tree as shared project structure, not private drawing history."),
  "Frames & sections": authContent("Frames are layout containers with dimensions, constraints, clipping, grids, and prototype behavior. Sections organize related work at a higher level without replacing the frame hierarchy.", "Use frames for screens and components, nested frames for layout groups, and sections to label flows such as onboarding or checkout.", "Choose frames when elements need layout behavior; use sections to make the canvas understandable."),
  "Vector networks": authContent("Figma vectors use connected points and segments that can branch rather than requiring only traditional closed paths. Fill, stroke, joins, and winding determine the final shape.", "Build a simple icon on a consistent grid, minimize unnecessary points, align strokes optically, and test it at its intended display size.", "Optimize vectors for a clear silhouette and maintainable geometry, not the fewest possible clicks."),
  "Constraints & resizing": authContent("Constraints describe how a layer responds when its parent frame changes size. Fixed, anchored, centered, stretched, and scaled behavior should reflect the intended interface relationship.", "Anchor a close icon to the top-right, stretch a divider left and right, and test the parent at narrow and wide sizes before considering the layout complete.", "Define resizing behavior deliberately and verify it by changing the containing frame."),
  "Auto layout": authContent("Auto layout arranges children along an axis using padding, gaps, alignment, wrapping, and sizing rules. It turns static placement into a layout model that can adapt to content.", "Build a button from label content with horizontal and vertical padding, then place buttons in a wrapping action row whose width follows its container.", "Use auto layout where content or container size may change; encode relationships instead of coordinates."),
  "Typography systems": authContent("A typography system defines a small set of roles with intentional family, weight, size, line height, and letter spacing. Roles communicate function more effectively than arbitrary style names.", "Create roles such as display, heading, body, label, and caption. Test real long-form copy, localization, and narrow screens before publishing them.", "Design type as a readable hierarchy of roles, not a collection of isolated font sizes."),
  "Color styles & variables": authContent("Reusable color definitions separate semantic intent from a raw value. Semantic names such as surface, text-muted, or action-primary support themes and systematic change better than names such as blue-500 alone.", "Map semantic variables to palette values for light and dark modes, then use semantic variables in components rather than binding components directly to raw colors.", "Name color by purpose at the point of use and keep palette decisions behind that semantic layer."),
  "Grids, spacing & hierarchy": authContent("Grids align major regions, spacing creates rhythm, and visual hierarchy directs attention through scale, contrast, position, and whitespace. A small spacing scale reduces accidental inconsistency.", "Choose a base spacing rhythm, define column behavior for key breakpoints, and audit whether the primary action and reading order remain obvious without decorative noise.", "Use alignment and spacing to explain relationships before adding more visual treatment."),
  "Components & instances": authContent("A component defines reusable structure and behavior; an instance inherits it while allowing controlled overrides. Good components represent a meaningful product pattern rather than every possible group of layers.", "Create a reusable alert component, place instances across flows, and expose only the text, icon, and actions that consumers reasonably need to change.", "Componentize repeated product decisions and keep instances connected to their source."),
  "Variants & properties": authContent("Variants group related component states, while component properties expose intentional controls such as text, booleans, instance swaps, and variant selections.", "Model a button with size and emphasis variants plus optional icon properties. Avoid multiplying variants for content that can be expressed as a property or nested component.", "Expose a compact, understandable API for designers instead of a combinatorial variant matrix."),
  "Interactive prototypes": authContent("Prototypes connect frames and component states with triggers, actions, transitions, overlays, and scrolling behavior. Their purpose is to answer interaction questions, not imitate every production detail.", "Prototype the critical checkout path, include empty and error recovery states, and choose simple transitions unless motion itself is under evaluation.", "Build the smallest prototype that can validate the behavior or communicate the intended flow."),
  "Responsive component patterns": authContent("Responsive components combine auto layout, constraints, min or max dimensions, wrapping, and content priorities. They should remain useful across realistic widths and content lengths.", "Test a card with short and long titles, optional metadata, translated labels, and narrow containers. Decide explicitly which regions wrap, grow, reorder, or disappear.", "Test component behavior across content and width extremes, not only the polished default state."),
  "Libraries & governance": authContent("A shared library distributes approved components, styles, and variables across files. Governance defines ownership, contribution, review, publishing, migration, and deprecation practices.", "Publish reviewed changes with clear descriptions, communicate breaking impacts, provide migration guidance, and assign maintainers for foundational components.", "A library succeeds through stewardship and adoption, not merely through a large component count."),
  "Design critique & comments": authContent("Critique evaluates whether work meets user and product goals; comments record contextual discussion and decisions. Useful feedback is specific, grounded in evidence, and proportionate to the design stage.", "State the problem and review goal before critique, separate blocking issues from suggestions, resolve comments with a decision, and summarize changes that affect the team.", "Review the design against its goals and turn discussion into clear decisions."),
  "Developer handoff": authContent("Handoff is an ongoing collaboration that connects design intent to implementation constraints. Organized components, explicit states, responsive behavior, assets, and acceptance criteria reduce ambiguity.", "Review the flow with engineering, document unusual behavior and edge states, link to the canonical component, and verify the implementation rather than treating inspection values as a complete specification.", "Communicate behavior and intent alongside measurements; implementation is part of the design feedback loop."),
  "Accessible design workflows": authContent("Accessibility must be considered while defining structure, content, interaction, color, focus, and state—not checked only after a screen looks finished.", "Annotate heading order, accessible names, focus sequence, keyboard behavior, error messaging, and contrast-sensitive choices. Include zoom, long content, and non-pointer interaction in reviews.", "Make inclusive behavior visible in the design and validate it with people and implementation-level testing."),
  "Functional requirements": authContent("Functional requirements describe the user-visible capabilities and core flows the system must support. They establish scope before technology choices begin.", "Identify actors, top use cases, inputs, outputs, and explicit exclusions; rank the critical read and write paths.", "Design the smallest system that satisfies the important flows before expanding the scope."),
  "Quality attributes": authContent("Quality attributes turn words such as fast, reliable, and secure into measurable targets for latency, availability, durability, consistency, privacy, and cost.", "Define workload-specific targets such as p99 latency, recovery time, data-loss tolerance, and regional availability.", "Architecture decisions are tradeoffs among explicit quality targets, not abstract best practices."),
  "Capacity estimation": authContent("Back-of-the-envelope estimates translate users and behavior into requests, bandwidth, compute, memory, and storage over time.", "Estimate average and peak QPS, payload sizes, read-write ratio, retention, replication overhead, and expected growth; keep assumptions visible.", "Approximate early to identify orders of magnitude and likely bottlenecks."),
  "Architecture diagrams": authContent("A useful diagram communicates boundaries, responsibilities, data movement, trust zones, and failure dependencies at a chosen level of detail.", "Start with clients, entry points, services, stores, and external systems; annotate critical paths and create deeper diagrams only where needed.", "Every box and arrow should answer a design question for its audience."),
  "Monoliths & microservices": authContent("A modular monolith deploys one process with internal boundaries; microservices add independent deployment and scaling at the cost of networks, coordination, and operations.", "Begin with cohesive modules and split a service when ownership, scaling, reliability, or release independence provides evidence for the boundary.", "Choose service boundaries from organizational and runtime needs, not fashion."),
  "API gateways": authContent("An API gateway is an entry point for routing, authentication integration, quotas, protocol adaptation, and cross-cutting policy.", "Keep gateway policy focused and observable; avoid moving domain workflows into a central layer that becomes a bottleneck.", "Centralize edge concerns while keeping business ownership within services."),
  "Load balancing": authContent("Load balancers distribute traffic across healthy instances using algorithms informed by connections, latency, capacity, or locality.", "Combine health checks, connection draining, bounded timeouts, and zone-aware routing; understand when session affinity creates uneven load.", "Balance only across instances that can safely accept work."),
  "Service discovery": authContent("Service discovery maps a logical service identity to healthy network endpoints as instances appear, move, and disappear.", "Use platform DNS or a registry with health signals, cache records briefly, and handle stale results through retries against different endpoints.", "Treat discovery as dynamic control-plane data, not permanent configuration."),
  "SQL vs NoSQL": authContent("Relational and non-relational stores offer different query, transaction, schema, and scaling models. The workload matters more than the category label.", "Choose from access patterns, relationship complexity, transaction boundaries, scale, operational skills, and failure requirements.", "Select storage per bounded workload; polyglot persistence should earn its operational cost."),
  "Data modeling": authContent("Data models encode entities, relationships, invariants, ownership, and the shapes used by important reads and writes.", "Model around aggregate and transaction boundaries, then denormalize intentionally when measured query needs justify duplication.", "Start from access patterns and correctness constraints rather than mirroring UI screens."),
  "Indexes & query patterns": authContent("Indexes accelerate selected reads by maintaining additional ordered structures, consuming storage and making writes more expensive.", "Design composite indexes around filters, joins, and sort order; inspect query plans and remove redundant or unused indexes.", "Every index should support a known query and justify its write and storage cost."),
  Replication: authContent("Replication copies data across nodes for availability, read scale, or locality, introducing lag and failover complexity.", "Choose leader-based, multi-leader, or leaderless behavior from write patterns and consistency needs; test promotion and stale-read behavior.", "Replication improves redundancy but does not replace backups or eliminate consistency tradeoffs."),
  "Partitioning & sharding": authContent("Partitioning divides data and load across nodes. A shard key determines distribution, locality, routing, and the difficulty of rebalancing.", "Prefer high-cardinality keys with even traffic, plan for hotspots and cross-shard operations, and automate movement as capacity changes.", "A good partition key spreads load while keeping common operations local."),
  "Object storage & search": authContent("Object stores suit large immutable blobs, while search indexes provide text retrieval and ranking. Both are specialized projections rather than universal sources of truth.", "Store blob metadata and authorization in an authoritative database, use signed access, and update search asynchronously with repairable indexing jobs.", "Separate authoritative state from derived blob and search representations."),
  "Horizontal & vertical scaling": authContent("Vertical scaling gives a node more resources; horizontal scaling adds nodes. Each has different limits, complexity, and cost curves.", "Scale up for simplicity while headroom exists, then scale stateless workloads out and address state, coordination, and partitioning explicitly.", "Use the simplest scaling dimension that meets measured demand and recovery needs."),
  "Caching strategies": authContent("Caches trade freshness and complexity for latency and origin-load reduction. Placement, key design, invalidation, eviction, and failure behavior define correctness.", "Choose cache-aside, read-through, write-through, or write-behind deliberately; add TTL jitter and prevent stampedes on hot misses.", "Cache only with an explicit freshness contract and a safe miss path."),
  "CDNs & edge delivery": authContent("CDNs serve cacheable content near users and shield origins from bandwidth and request load.", "Define cache keys and directives carefully, version static assets, purge selectively, and keep personalized or sensitive responses from shared caches.", "Move stable bytes outward while preserving correct variation and access control."),
  "Backpressure & load shedding": authContent("Backpressure slows producers when consumers are saturated; load shedding rejects lower-value work before overload causes a total collapse.", "Bound queues and concurrency, propagate deadlines, return explicit overload signals, and prioritize critical operations.", "A controlled rejection is safer than unbounded waiting and cascading failure."),
  "CAP & PACELC": authContent("During a network partition, a distributed system must trade immediate consistency against availability. PACELC also highlights the normal-operation tradeoff between latency and consistency.", "Classify decisions per operation rather than labeling an entire product CP or AP; state what clients observe during partition and after recovery.", "Use CAP and PACELC to explain concrete behavior, not to assign simplistic database labels."),
  "Consistency models": authContent("Consistency models define which values operations may observe, from linearizable and serializable behavior to causal, session, and eventual guarantees.", "Apply strong guarantees to invariants such as unique ownership and weaker models to tolerant views such as counters or feeds.", "Promise the weakest model that safely supports each business invariant—and document it."),
  "Distributed transactions": authContent("Atomic change across services or stores requires coordination that affects latency and availability. Often the domain can tolerate staged progress with compensation.", "Keep transactions within one owner where possible; otherwise compare two-phase commit with sagas, outbox delivery, and reconciliation.", "Reduce cross-boundary atomicity before adding distributed coordination."),
  "Consensus & leader election": authContent("Consensus protocols let nodes agree on an ordered value despite failures; leader election assigns a coordinator for a term. Quorums and durable logs underpin safety.", "Use a proven coordination system, understand majority availability, fence stale leaders, and avoid implementing a custom consensus protocol.", "Delegate consensus to mature infrastructure and design for loss of quorum."),
  "Distributed IDs & clocks": authContent("Distributed systems need unique identifiers and ordering signals without assuming perfectly synchronized wall clocks.", "Choose UUIDs, time-sortable IDs, ranges, or a generator service based on ordering, privacy, index locality, and availability needs; use monotonic time for durations.", "Separate uniqueness, rough chronology, and causal ordering—they are different requirements."),
  "Queues & pub-sub": authContent("Queues distribute work among consumers; publish-subscribe delivers events to multiple interested subscriptions. Both decouple timing and availability.", "Define ownership, retention, retry, dead-letter, ordering, and consumer-scaling behavior before selecting a broker.", "Choose messaging semantics from the communication pattern and recovery needs."),
  "Event streaming": authContent("An event stream is an ordered, durable log that consumers read independently and can replay from offsets.", "Partition by an ordering key, version event schemas compatibly, track lag, and make consumers rebuildable from retained history.", "Treat events as durable contracts and consumers as independent state machines."),
  "Delivery semantics": authContent("At-most-once may lose work, at-least-once may duplicate it, and effective exactly-once behavior requires coordinated state and constrained boundaries.", "Assume redelivery, acknowledge only after durable processing, deduplicate with stable IDs, and test crash points.", "Design consumers for the broker behavior you can actually guarantee."),
  "Sagas & orchestration": authContent("A saga coordinates a long-running business process through local transactions and compensating actions, either by orchestration or choreography.", "Persist workflow state, use an outbox, define timeouts and compensation limits, and expose pending or failed states instead of pretending instant atomicity.", "Make partial progress and recovery first-class domain states."),
  "Timeouts & retries": authContent("Timeouts bound waiting; retries can recover transient failures but multiply load and side effects when used carelessly.", "Set deadlines from the caller budget, retry only safe failures with exponential backoff and jitter, and cap attempts across the request chain.", "Every remote call needs a timeout; every retry needs a budget and safety argument."),
  Idempotency: authContent("An idempotent operation has the same intended effect when repeated, making retries and duplicate delivery safer.", "Accept a scoped idempotency key, store the outcome atomically with the change, and return the original result for valid repeats.", "Design duplicate handling at the mutation boundary, not as an afterthought."),
  "Circuit breakers & bulkheads": authContent("Circuit breakers stop calls to a failing dependency; bulkheads isolate capacity so one failure cannot consume every worker, connection, or queue slot.", "Use bounded pools per dependency, open circuits from meaningful failure signals, probe recovery carefully, and expose fallback behavior.", "Contain failure before it spreads through shared resources."),
  "Rate limiting": authContent("Rate limits protect shared capacity and fairness using fixed windows, sliding windows, token buckets, or leaky buckets.", "Limit by authenticated tenant and operation cost, allow controlled bursts, return retry guidance, and coordinate enforcement where global limits matter.", "Align quotas with resource cost and product policy, not only raw request counts."),
  "Disaster recovery": authContent("Disaster recovery defines how service and data return after regional, operator, security, or infrastructure loss through RTO and RPO targets.", "Maintain isolated, tested backups; automate restoration; document dependencies; and rehearse failover, failback, and data reconciliation.", "A recovery plan is credible only after a timed restoration exercise."),
  "Security boundaries": authContent("Security architecture identifies identities, assets, trust zones, data classifications, and permitted flows, then applies least privilege and defense in depth.", "Threat-model entry points and service links, centralize identity, encrypt transport and storage, rotate secrets, and authorize at each protected resource.", "Draw trust boundaries early and enforce them independently at every crossing."),
  "Observability & SLOs": authContent("Metrics, logs, and traces explain behavior; service-level objectives define acceptable reliability from the user perspective and create an error budget.", "Choose indicators for availability and latency, propagate trace context, use structured events, and alert on actionable symptoms or rapid budget burn.", "Observe user outcomes and critical paths, not merely machine health."),
  "Deployment strategies": authContent("Rolling, blue-green, and canary deployments trade infrastructure cost, feedback speed, and rollback characteristics.", "Build immutable artifacts, separate deployment from release, use health gates and progressive traffic, and keep schema changes backward compatible.", "Make releases small, observable, and reversible across code and data."),
  "Multi-region design": authContent("Multi-region systems improve locality and disaster tolerance but add replication lag, routing, conflict, and operational complexity.", "Choose active-passive or active-active per workload, define data residency and write ownership, and test behavior during isolation and recovery.", "Add regions for explicit latency or resilience goals and specify the partition behavior."),
  "Cost & sustainability": authContent("Architecture cost includes steady compute, storage, transfer, managed services, operational labor, and inefficient overprovisioning.", "Attribute spend by workload, autoscale within safety bounds, tier cold data, reduce cross-region transfer, and compare optimization effort with expected savings.", "Treat cost as a quality attribute and optimize without eroding reliability targets."),
  "URL shortener": authContent("A URL shortener maps compact unique keys to destination URLs under a read-heavy workload with redirects on the critical path.", "Estimate key space and redirect QPS, generate collision-safe IDs, cache hot mappings, partition by key, and address abuse, expiry, and analytics asynchronously.", "Keep redirects fast and available while moving nonessential analytics off the request path."),
  "News feed": authContent("A news feed ranks posts from a changing social graph under high fan-out and personalized read requirements.", "Compare fan-out on write, fan-out on read, and a hybrid for high-follower accounts; store feed candidates, rank separately, and paginate with stable cursors.", "Choose where to pay fan-out cost based on publisher and reader distributions."),
  "Chat system": authContent("Chat combines persistent connections, message durability, per-conversation ordering, presence, fan-out, and multi-device synchronization.", "Route connections through gateways, partition conversations, assign server message IDs, track per-device cursors, and make presence explicitly ephemeral.", "Separate durable messaging guarantees from best-effort realtime signals."),
  "File storage service": authContent("A file service manages large blob upload, metadata, permissions, sharing, synchronization, and durable retrieval.", "Use multipart direct-to-object-storage uploads, verify integrity, store metadata transactionally, scan asynchronously, version changes, and deliver through signed URLs or a CDN.", "Keep bulk bytes out of application servers while protecting metadata and access decisions."),
  "Search autocomplete": authContent("Autocomplete returns low-latency ranked suggestions for a prefix while incorporating popularity, freshness, locale, and policy.", "Build compact prefix indexes or tries from an offline stream, cache hot prefixes at the edge, merge personalized candidates carefully, and filter unsafe results.", "Precompute aggressively so the interactive path performs bounded lookup and ranking."),
});

export const codeExamples: Record<string, { title: string; badLabel: string; bad: string; goodLabel: string; good: string }> = {
  "Choosing an API style": { title: "Match the interface to the consumer", badLabel: "Choose by trend", bad: `// \"GraphQL is newer, so every endpoint\n// should move behind one graph.\"`, goodLabel: "Choose by constraints", good: `REST    → cacheable resources, simple integrations\nGraphQL → connected, client-shaped UI data\n\nEvaluate both against real operations and SLOs.` },
  "HTTP methods & safety": { title: "Let method semantics describe the operation", badLabel: "A state change hidden in GET", bad: `GET /orders/42/cancel`, goodLabel: "An explicit command", good: `POST /orders/42/cancellations\nIdempotency-Key: 7f6...\n\n{ \"reason\": \"customer_request\" }` },
  "Schemas & type systems": { title: "Make the contract express its guarantees", badLabel: "Ambiguous strings everywhere", bad: `type Order {\n  id: String\n  status: String\n  total: String\n}`, goodLabel: "Purposeful types", good: `type Order {\n  id: ID!\n  status: OrderStatus!\n  total: Money!\n}` },
  "Resolvers & data loading": { title: "Batch repeated field loads per request", badLabel: "One query per parent", bad: `posts.map(post => db.author.find(post.authorId))`, goodLabel: "One batched lookup", good: `const author = await authorsById.load(post.authorId)\n\n// The request-scoped loader batches all IDs\n// into one data-source call.` },
  "Objects & classes": { title: "Put behavior beside the state it governs", badLabel: "Data with logic elsewhere", bad: `const product = { price: 100 }

function discountedPrice(p, rate) {
  return p.price * (1 - rate)
}`, goodLabel: "A cohesive object", good: `class Product {
  constructor(private price: number) {}

  discountedBy(rate: number) {
    return this.price * (1 - rate)
  }
}` },
  Encapsulation: { title: "Protect the object’s valid state", badLabel: "State anyone can corrupt", bad: `account.balance = -500
account.status = "active"`, goodLabel: "Rules live at the boundary", good: `class Account {
  #balance = 0

  withdraw(amount: number) {
    if (amount > this.#balance) throw Error("Insufficient funds")
    this.#balance -= amount
  }
}` },
  Abstraction: { title: "Expose intent, not machinery", badLabel: "Caller knows every detail", bad: `gateway.connect()
gateway.createToken(card)
gateway.authorize(token, amount)
gateway.capture(amount)`, goodLabel: "One meaningful operation", good: `interface PaymentGateway {
  charge(amount: Money): Promise<Receipt>
}

await gateway.charge(total)` },
  Inheritance: { title: "Inherit only when the subtype truly is-a base type", badLabel: "Reuse without substitutability", bad: `class Stack extends Array<string> {}

stack.splice(0, 4) // breaks stack rules`, goodLabel: "Compose the capability", good: `class Stack {
  #items: string[] = []
  push(item: string) { this.#items.push(item) }
  pop() { return this.#items.pop() }
}` },
  Polymorphism: { title: "Replace type switches with a shared contract", badLabel: "Branch for every new type", bad: `if (type === "email") sendEmail(message)
else if (type === "sms") sendSms(message)`, goodLabel: "Let each type respond", good: `interface Notifier { send(message: string): void }

class EmailNotifier implements Notifier { send(message) { /* email */ } }
class SmsNotifier implements Notifier { send(message) { /* sms */ } }` },
  "Single Responsibility": { title: "Separate code that changes for different reasons", badLabel: "Three jobs in one class", bad: `class Invoice {
  calculateTotal() {}
  saveToDatabase() {}
  emailPdf() {}
}`, goodLabel: "One focused responsibility", good: `class Invoice { calculateTotal() {} }
class InvoiceRepository { save(invoice) {} }
class InvoiceMailer { send(invoice) {} }` },
  "Open–Closed": { title: "Add behavior without reopening stable code", badLabel: "A growing conditional", bad: `function shipping(kind, order) {
  if (kind === "ground") return groundRate(order)
  if (kind === "air") return airRate(order)
}`, goodLabel: "An extension point", good: `interface ShippingPolicy { rate(order: Order): Money }

class GroundShipping implements ShippingPolicy { rate(order) { /* ... */ } }
class AirShipping implements ShippingPolicy { rate(order) { /* ... */ } }` },
  "Liskov Substitution": {
    title: "Don’t make a subtype break the promise",
    badLabel: "Breaks the contract",
    bad: `interface FileResource {
  read(): string
  write(data: string): void
}

class ReadOnlyFile implements FileResource {
  read() { return "contents" }
  write() { throw new Error("Not supported") }
}`,
    goodLabel: "Model honest capabilities",
    good: `interface Readable {
  read(): string
}

interface Writable {
  write(data: string): void
}

class ReadOnlyFile implements Readable {
  read() { return "contents" }
}`,
  },
  "Interface Segregation": { title: "Give each client only the contract it uses", badLabel: "A forced, oversized interface", bad: `interface Machine {
  print(): void
  scan(): void
  fax(): void
}

class BasicPrinter implements Machine {
  scan() { throw Error("Unsupported") }
}`, goodLabel: "Small capability interfaces", good: `interface Printer { print(): void }
interface Scanner { scan(): void }

class BasicPrinter implements Printer { print() {} }
class OfficeDevice implements Printer, Scanner { print() {}; scan() {} }` },
  "Dependency Inversion": { title: "Make business policy own the boundary", badLabel: "Policy imports a vendor", bad: `class Checkout {
  private stripe = new StripeClient()
  pay(total) { return this.stripe.charge(total) }
}`, goodLabel: "Detail implements policy’s port", good: `interface PaymentGateway { charge(total: Money): Receipt }

class Checkout {
  constructor(private payments: PaymentGateway) {}
}` },
  "Information Expert": { title: "Ask the object that already knows", badLabel: "Logic pulls data outward", bad: `function orderTotal(order) {
  return order.lines.reduce((sum, line) =>
    sum + line.product.price * line.quantity, 0)
}`, goodLabel: "The information owner decides", good: `class Order {
  total() {
    return this.lines.reduce((sum, line) => sum + line.subtotal(), 0)
  }
}` },
  Creator: { title: "Create an object where its ingredients live", badLabel: "A distant creator gathers details", bad: `const line = new OrderLine(
  order.id, product.id, product.price, quantity
)
order.add(line)`, goodLabel: "The aggregate creates its part", good: `class Order {
  add(product: Product, quantity: number) {
    this.lines.push(new OrderLine(product, quantity))
  }
}` },
  Controller: { title: "Give system events a clear entry point", badLabel: "UI contains the use case", bad: `button.onclick = async () => {
  validateCart()
  await database.save(order)
  await mailer.send(order)
}`, goodLabel: "UI delegates coordination", good: `button.onclick = () => checkout.placeOrder(input)

class CheckoutController {
  async placeOrder(input: OrderInput) { /* coordinate use case */ }
}` },
  "Low Coupling": { title: "Keep dependencies narrow and replaceable", badLabel: "Domain tied to a vendor SDK", bad: `class Checkout {
  charge(card) {
    return new VendorSdk.Client(apiKey).payments.create(card)
  }
}`, goodLabel: "Depend on a narrow seam", good: `interface Payments { charge(request: Charge): Receipt }

class Checkout {
  constructor(private payments: Payments) {}
}` },
  "High Cohesion": { title: "Keep each unit centered on one purpose", badLabel: "An unrelated grab bag", bad: `class Utils {
  calculateTax() {}
  resizeImage() {}
  sendEmail() {}
}`, goodLabel: "Purpose gives structure", good: `class TaxCalculator { calculate() {} }
class ImageResizer { resize() {} }
class Mailer { send() {} }` },
  "GRASP Polymorphism": { title: "Put variable behavior in the varying type", badLabel: "Central type knowledge", bad: `function discount(customer) {
  if (customer.type === "vip") return 0.2
  if (customer.type === "staff") return 0.3
}`, goodLabel: "Behavior follows the contract", good: `interface DiscountPolicy { rate(): number }

class VipDiscount implements DiscountPolicy { rate() { return 0.2 } }
class StaffDiscount implements DiscountPolicy { rate() { return 0.3 } }` },
  "Pure Fabrication": { title: "Invent a service to keep the domain clean", badLabel: "Entity owns infrastructure", bad: `class Order {
  save() {
    sql.execute("INSERT INTO orders ...")
  }
}`, goodLabel: "A fabricated repository", good: `class Order { /* business behavior only */ }

interface OrderRepository {
  save(order: Order): Promise<void>
}` },
  Indirection: { title: "Decouple collaborators with one useful mediator", badLabel: "Producer knows every consumer", bad: `order.complete()
mailer.send(order)
analytics.track(order)
warehouse.reserve(order)`, goodLabel: "Publish through a mediator", good: `events.publish(new OrderCompleted(order.id))

events.on(OrderCompleted, sendConfirmation)
events.on(OrderCompleted, trackSale)` },
  "Protected Variations": { title: "Wrap the detail most likely to change", badLabel: "Vendor format leaks inward", bad: `const rate = response.data.rates[0].mid_market_value
price.multiply(rate)`, goodLabel: "A stable internal boundary", good: `interface ExchangeRates {
  rate(from: Currency, to: Currency): number
}

price.convertWith(exchangeRates)` },
  Composable: { title: "Make small parts connect without adapters", badLabel: "Incompatible shapes", bad: `validateUser(raw) // throws
normalizeUser(jsonString) // expects string
saveUser(first, last, email)`, goodLabel: "Shared inputs and outputs", good: `const createUser = pipe(
  validateUser,
  normalizeUser,
  saveUser
)

createUser(raw)` },
  "Unix philosophy": { title: "Let one tool do one job well", badLabel: "One function does everything", bad: `async function report() {
  const data = await fetchData()
  validate(data); format(data)
  await save(data); await email(data)
}`, goodLabel: "Focused, chainable tools", good: `const data = await fetchReport()
const valid = validateReport(data)
const document = formatReport(valid)
await deliverReport(document)` },
  Predictable: { title: "Make the same input produce the same result", badLabel: "Hidden time and randomness", bad: `function quote(cart) {
  const surge = Math.random()
  return total(cart, new Date()) * surge
}`, goodLabel: "Dependencies are explicit", good: `function quote(cart, at: Date, surge: number) {
  return total(cart, at) * surge
}` },
  Idiomatic: { title: "Use the language readers already know", badLabel: "A private dialect", bad: `promise.then(
  value => callback(null, value),
  error => callback(error)
)`, goodLabel: "Follow ecosystem conventions", good: `try {
  const value = await promise
  return value
} catch (error) {
  handle(error)
}` },
  "Domain-based": { title: "Let business language shape the code", badLabel: "Generic technical names", bad: `class DataManager {
  processThing(input) {}
  updateStatus(id, 4) {}
}`, goodLabel: "Name the domain concepts", good: `class LoanApplication {
  acceptOffer(offer: LoanOffer) {}
  markAsFunded(at: Date) {}
}` },
  DRY: { title: "Give one business rule one authoritative home", badLabel: "The same rule copied twice", bad: `// Checkout
const eligible = age >= 18 && country === "US"

// Admin
const eligible = user.age >= 18 && user.country === "US"`, goodLabel: "One named policy", good: `class EligibilityPolicy {
  permits(user: User) {
    return user.age >= 18 && user.country === "US"
  }
}` },
  KISS: { title: "Choose the smallest design that solves today’s problem", badLabel: "Complexity without a need", bad: `RuleFactory
  .createStrategy("flat-rate")
  .getProvider()
  .resolve()
  .calculate(order)`, goodLabel: "A direct solution", good: `function shipping(order: Order) {
  return order.total > 50 ? 0 : 5
}` },
  YAGNI: { title: "Delete the feature nobody has asked for", badLabel: "Speculative flexibility", bad: `interface PricingPlugin {
  region: FutureRegion
  currency: FutureCurrency
  loadDynamicRules(): Promise<Rule[]>
}`, goodLabel: "Implement the verified need", good: `function priceForUS(product: Product): USD {
  return product.usPrice
}

// Generalize when a second market is real.` },
  "POLA / POLS": { title: "Make the name and behavior agree", badLabel: "A surprising side effect", bad: `function getExpiredUsers() {
  const users = db.findExpired()
  db.delete(users)
  mailer.sendCampaign(users)
  return users
}`, goodLabel: "One unsurprising query", good: `function findExpiredUsers() {
  return db.findExpired()
}

function removeUsers(users: User[]) { db.delete(users) }` },
  "Law of Demeter": { title: "Ask a friend; don’t navigate through strangers", badLabel: "A brittle object train", bad: `const city = order
  .customer
  .profile
  .primaryAddress
  .city`, goodLabel: "Tell the direct collaborator", good: `class Order {
  shippingCity() {
    return this.shippingAddress.city
  }
}

const city = order.shippingCity()` },
  "CQS / CQRS": { title: "Separate asking from changing", badLabel: "A query with a hidden command", bad: `function getCart(userId) {
  const cart = db.findCart(userId)
  cart.lastViewedAt = new Date()
  db.save(cart)
  return cart
}`, goodLabel: "Explicit query and command", good: `function cartByUser(userId): Cart { return db.findCart(userId) }

function recordCartViewed(cartId): void {
  db.updateViewedAt(cartId)
}` },
  "STUPID overview": { title: "Use the acronym as a design-smell scan", badLabel: "A STUPID dependency cluster", bad: `GlobalConfig.instance.db
  .query(new ServiceFactory()
  .getManager()
  .run(copiedRules))`, goodLabel: "Make the design visible", good: `class UseCase {
  constructor(
    private repository: Repository,
    private policy: Policy
  ) {}
}` },
  Singleton: { title: "Turn hidden global access into an explicit dependency", badLabel: "Global mutable state", bad: `class PricingService {
  price() {
    return Config.instance.currentTaxRate
  }
}`, goodLabel: "Dependency is visible", good: `class PricingService {
  constructor(private taxPolicy: TaxPolicy) {}

  price(order) { return this.taxPolicy.apply(order) }
}` },
  "Tight Coupling": { title: "Stop constructing concrete details inside policy", badLabel: "Impossible to replace", bad: `class OrderService {
  private db = new PostgresDatabase(prodUrl)
  save(order) { this.db.insert(order) }
}`, goodLabel: "Inject the needed capability", good: `class OrderService {
  constructor(private orders: OrderRepository) {}
  save(order) { this.orders.save(order) }
}` },
  Untestability: { title: "Move side effects behind controllable seams", badLabel: "Test depends on the world", bad: `function expiresTomorrow(subscription) {
  fetch("/billing/events", { method: "POST" })
  return subscription.end < new Date()
}`, goodLabel: "Pure decision, explicit effect", good: `function expiresTomorrow(subscription, today: Date) {
  return daysBetween(today, subscription.end) === 1
}

if (expiresTomorrow(sub, clock.today())) events.publish(...)` },
  "Premature Optimization": { title: "Measure first; optimize the demonstrated bottleneck", badLabel: "Complexity based on a guess", bad: `// Custom cache, pool, index and worker
// added before the feature has real traffic
return distributedMemoizedLookup(key)`, goodLabel: "Baseline, profile, improve", good: `const result = await repository.find(key)

// Profile production traces.
// Add caching only if this path is a bottleneck.` },
  "Excessive Indirection": { title: "Remove layers that add no decision or boundary", badLabel: "Five hops to one line", bad: `UserController
  → UserFacade
  → UserCoordinator
  → UserManager
  → UserService
  → repository.find(id)`, goodLabel: "Keep the useful boundary", good: `class GetUser {
  constructor(private users: UserRepository) {}
  execute(id: UserId) { return this.users.find(id) }
}` },
  Duplication: { title: "Unify copied knowledge after confirming it is the same", badLabel: "Rules can drift", bad: `// checkout.ts
tax = subtotal * 0.0825

// invoice.ts
tax = subtotal * 0.08`, goodLabel: "One authoritative rule", good: `class TaxPolicy {
  calculate(subtotal: Money) {
    return subtotal.multiply(this.currentRate)
  }
}` },
  WET: { title: "Make one change in one place", badLabel: "Write everything repeatedly", bad: `checkout: total > 50 ? freeShipping : standard
admin: total > 50 ? freeShipping : standard
mobile: total > 75 ? freeShipping : standard`, goodLabel: "One source of truth", good: `class ShippingPolicy {
  feeFor(order: Order) {
    return order.total > 50 ? Money.zero() : standardFee
  }
}` },
};

const authExample = (title: string, badLabel: string, bad: string, goodLabel: string, good: string) => ({ title, badLabel, bad, goodLabel, good });

Object.assign(codeExamples, {
  "Authentication vs authorization": authExample("Identity is not permission", "Authentication used as authorization", `// User has a valid session, so allow everything
if (session.user) {
  return documents.delete(request.params.id)
}`, "Authorize the resource and action", `const user = requireAuthenticated(session)
const document = await documents.find(request.params.id)

if (!policy.canDelete(user, document)) deny(403)
await documents.delete(document.id)`),
  "Principals, credentials & claims": authExample("Keep the actor, proof, and assertions separate", "Trust an unverified assertion", `const claims = decodeJwt(request.token)

// Decoding does not establish who issued this.
if (claims.role === "admin") allow()`, "Validate proof, then evaluate claims", `const token = await verifier.verify(request.token, {
  issuer: TRUSTED_ISSUER,
  audience: API_AUDIENCE
})

const principal = new Principal(token.iss, token.sub)
policy.authorize(principal, token.claims, action)`),
  "Password storage": authExample("Store a verifier, never a recoverable password", "Fast or reversible storage", `// Fast hashes are cheap to brute-force.
const stored = sha256(password)

// Encryption leaves passwords recoverable.
const stored = encrypt(password, appKey)`, "Salted, memory-hard verification", `const hash = await argon2id.hash(password, {
  memoryCost: reviewedMemory,
  timeCost: reviewedIterations
})

const valid = await argon2id.verify(hash, candidate)
if (valid && needsRehash(hash)) await upgradeHash()`),
  "Sessions & cookies": authExample("Make the browser session narrow and disposable", "A readable, long-lived cookie", `Set-Cookie: session=<user-and-role-json>;
  Max-Age=31536000; Domain=.example.com

// JavaScript and every subdomain can access it.`, "Opaque, hardened session cookie", `Set-Cookie: __Host-session=<random-opaque-id>;
  Path=/; Secure; HttpOnly; SameSite=Lax

// Rotate the ID after login and privilege changes.
// Enforce idle + absolute expiry server-side.`),
  "MFA & passkeys": authExample("Strengthen the whole authentication lifecycle", "Two versions of the same factor", `password + security_question

// Both are knowledge factors and both are phishable.
// Weak email recovery can bypass stronger login.`, "Origin-bound public-key authentication", `const options = await passkeys.beginAuthentication(user)
const assertion = await navigator.credentials.get({ publicKey: options })

await passkeys.verify(assertion, {
  expectedOrigin,
  expectedRpId,
  expectedChallenge
})`),
  "What OAuth actually does": authExample("Delegate API authority without sharing a password", "Client collects resource credentials", `POST /client/login
{ "cloudUsername": "sam", "cloudPassword": "secret" }

// The client can now impersonate the user everywhere.`, "Authorization server delegates a scope", `GET /authorize?
  client_id=photo-printer&
  scope=photos.read&
  response_type=code&
  code_challenge=...&
  code_challenge_method=S256

// Client receives limited API authority, not the password.`),
  "OAuth roles": authExample("Keep every protocol role explicit", "One vague auth service", `Browser → "Auth Service" → Database

// Who issues the token?
// Who consumes it?
// Which actor grants access?`, "Name the trust boundaries", `Resource owner → authorizes → Client
Client → requests token → Authorization server
Client → presents access token → Resource server
Resource server → validates issuer + audience + scope`),
  "Scopes & consent": authExample("Scope the delegation, then authorize the object", "A broad scope treated as final permission", `scope = "calendar"

if (token.scope.includes("calendar")) {
  return everyCalendarEvent()
}`, "Least scope plus resource policy", `requireScope(token, "calendar.events.read")

const calendar = await calendars.find(calendarId)
if (!membership.canRead(token.sub, calendar)) deny(403)
return calendar.events()`),
  "Protocol endpoints & discovery": authExample("Anchor discovery to a trusted issuer", "Endpoints supplied by the request", `const issuer = request.query.issuer
const metadata = await fetch(issuer + "/.well-known/openid-configuration")

// Attacker chooses where codes and credentials are sent.`, "Configured issuer, verified metadata", `const expectedIssuer = tenantConfig.issuer
const metadata = await discovery(expectedIssuer)

if (metadata.issuer !== expectedIssuer) reject()
tokenClient.use(metadata.token_endpoint)
keyStore.use(metadata.jwks_uri)`),
  "OAuth vs OpenID Connect": authExample("Use the correct token for the correct recipient", "Access token used as login proof", `const claims = decodeJwt(accessToken)
session.userId = claims.sub

// The client may not be the token's audience.`, "ID token establishes the client session", `const idToken = await verifyIdToken(tokens.id_token, {
  issuer,
  audience: CLIENT_ID,
  nonce: transaction.nonce
})

session.userId = accountKey(idToken.iss, idToken.sub)
api.call(tokens.access_token)`),
  "Access tokens": authExample("Validate authority at the resource server", "Decode and trust", `const token = decodeJwt(bearer)
if (token.scope.includes("orders.write")) updateOrder()

// No signature, issuer, audience, or time validation.`, "Validate before domain authorization", `const token = await verifyAccessToken(bearer, {
  issuer: "https://id.example",
  audience: "orders-api",
  algorithms: ["ES256"]
})

requireScope(token, "orders.write")
authorizeOrder(token.sub, orderId, "update")`),
  "Refresh tokens": authExample("Keep refresh credentials off the resource path", "Refresh token sent everywhere", `localStorage.setItem("refresh_token", token)

fetch("https://api.example/orders", {
  headers: { Authorization: "Bearer " + token }
})`, "Restricted token-endpoint use", `// Stored encrypted by the backend or in platform secure storage.
const next = await authorizationServer.refresh({
  refreshToken: vault.read(session.tokenRef),
  clientAuthentication
})

vault.replace(session.tokenRef, next.refreshToken)`),
  "ID tokens": authExample("Validate the authentication assertion for this client", "Claims accepted after parsing", `const { sub, email } = JSON.parse(base64url(idToken.split(".")[1]))
createSession(sub, email)`, "Full OIDC validation", `const claims = await oidc.verifyIdToken(idToken, {
  issuer: expectedIssuer,
  audience: CLIENT_ID,
  nonce: loginTransaction.nonce,
  clockTolerance: 30
})

createSession(accountKey(claims.iss, claims.sub))`),
  "JWT anatomy": authExample("Remember that signed does not mean secret", "Sensitive payload", `{
  "sub": "user-42",
  "password": "...",
  "medical_record": "..."
}

// Base64url is readable by the holder.`, "Minimal purpose-bound claims", `Header:  { "alg": "ES256", "kid": "2026-08" }
Payload: { "iss": "...", "sub": "...", "aud": "orders-api",
           "exp": 1786147200, "scope": "orders.read" }
Signature: ECDSA(header + "." + payload)`),
  "Validating JWTs": authExample("Turn an untrusted string into a verified token", "Algorithm and key chosen by token", `const header = decodeHeader(jwt)
const key = await fetch(header.jku)
verify(jwt, key, { algorithms: [header.alg] })`, "Policy chooses trust", `await verify(jwt, trustedIssuerKeys, {
  algorithms: ["ES256"],
  issuer: EXPECTED_ISSUER,
  audience: "payments-api",
  requiredClaims: ["exp", "iat", "sub"]
})

// Reject unknown kid; refresh only from configured JWKS.`),
  "Opaque tokens & introspection": authExample("Ask the issuer whether an opaque token is active", "Opaque value treated as an identifier", `const user = await users.findByToken(bearer)
return user.data

// No authority, audience, scope, or active-state check.`, "Authenticated introspection", `const result = await introspect(bearer, {
  clientId: API_CLIENT_ID,
  privateKey: API_PRIVATE_KEY
})

if (!result.active || result.aud !== "records-api") deny(401)
requireScope(result, "records.read")`),
  "Authorization Code + PKCE": authExample("Bind code redemption to the initiating client", "Code without a verifier", `GET /authorize?response_type=code&client_id=mobile

POST /token
grant_type=authorization_code&code=intercepted-code`, "S256 proof key", `verifier = randomBase64url(32)
challenge = base64url(sha256(verifier))

GET /authorize?...&code_challenge=<challenge>&code_challenge_method=S256

POST /token
grant_type=authorization_code&code=<code>&code_verifier=<verifier>`),
  "Client Credentials": authExample("Represent the workload—not an imaginary user", "Shared secret copied across services", `grant_type=client_credentials
client_id=all-workers
client_secret=same-secret-in-every-container
scope=admin`, "Narrow workload identity", `grant_type=client_credentials
client_id=billing-reconciler
client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
client_assertion=<short-lived-signed-assertion>
scope=invoices.reconcile
resource=https://invoices.example/api`),
  "Device Authorization": authExample("Keep credentials off the constrained device", "Device displays a login form", `TV asks for username + password
TV stores credentials for future access

// Difficult input, broad credential exposure.`, "Authorize on a separate user device", `TV → POST /device_authorization
AS → device_code + user_code + verification_uri
TV displays: "Visit example.com/device and enter H7KQ-P9"
User authorizes on phone
TV polls /token at the instructed interval until approved`),
  "Refresh token rotation": authExample("Detect replay across a token family", "Every refresh token remains valid", `A → use → returns B
A → use again → returns C

// A stolen copy can be replayed indefinitely.`, "Atomic rotation and reuse detection", `transaction {
  assert tokenA.status === "active"
  tokenA.status = "used"
  tokenB = issue({ family: tokenA.family })
}

if (usedTokenAppearsAgain) revokeFamily(tokenA.family)`),
  "Deprecated OAuth flows": authExample("Keep credentials and tokens out of the front channel", "Legacy implicit or password grant", `GET /authorize?response_type=token
# access_token appears in browser URL/history

POST /token
grant_type=password&username=...&password=...`, "Modern redirect flow", `GET /authorize?
  response_type=code&
  code_challenge=<S256 challenge>&
  code_challenge_method=S256

// One-time code is redeemed over TLS with the verifier.`),
  "Server-side web apps": authExample("Let the backend own OAuth tokens", "Tokens exposed to browser code", `browser.localStorage.accessToken = tokens.access_token
browser.localStorage.refreshToken = tokens.refresh_token`, "Browser holds only an opaque session", `Browser: Set-Cookie: __Host-session=<opaque>;
  Secure; HttpOnly; SameSite=Lax; Path=/

Backend session store:
  session → encrypted access/refresh tokens

Backend → API: Authorization: Bearer <access token>`),
  "SPA & Backend-for-Frontend": authExample("Use a BFF as a deliberate token boundary", "SPA owns long-lived bearer tokens", `const tokens = await oauth.exchange(code)
localStorage.setItem("access", tokens.access_token)
localStorage.setItem("refresh", tokens.refresh_token)`, "Same-origin session and controlled proxy", `Browser → BFF /api/orders
  Cookie: __Host-session=<opaque>
  X-CSRF-Token: <bound-token>

BFF validates session + CSRF
BFF → Orders API
  Authorization: Bearer <server-held-token>`),
  "Native applications": authExample("Treat installed code as a public client", "A secret embedded in the binary", `const CLIENT_SECRET = "shipped-inside-the-app"

// Anyone can extract it; it cannot authenticate the installation.`, "External browser plus PKCE", `openSystemBrowser(authorizationUrl({
  redirect_uri: "https://app.example/oauth/callback",
  code_challenge: s256(verifier)
}))

exchangeCode({ code, code_verifier: verifier })
secureStorage.save(rotatingRefreshToken)`),
  "Resource server design": authExample("Separate token acceptance from object-level permission", "Valid token means full access", `const token = verifySignature(bearer)
return invoices.find(request.params.id)

// No issuer, audience, scope, or ownership check.`, "Layer validation and authorization", `const token = await accessTokens.verify(bearer, {
  issuer, audience: "invoice-api"
})
requireScope(token, "invoice.read")

const invoice = await invoices.find(id)
if (!policy.canRead(token.sub, invoice)) deny(403)
return invoice`),
  "Multi-tenant identity": authExample("Bind identity to issuer and tenant", "Email used as a global identity", `const account = await users.findByEmail(token.email)
session.userId = account.id

// Another issuer can assert the same email.`, "Composite identity and authoritative membership", `const token = await tenantIssuer(tenantId).verify(rawToken)
const externalId = { issuer: token.iss, subject: token.sub }
const account = await identities.resolve(externalId)

const membership = await tenants.requireMembership(account.id, tenantId)
session.activate(account.id, membership.id)`),
  "State, nonce & PKCE": authExample("Use each transaction value for its own guarantee", "One static value reused", `state = "login"
nonce = state
code_verifier = state

// Guessable, correlated, reusable, and not session-bound.`, "Independent, single-use values", `transaction = {
  state: random(32),
  nonce: random(32),
  verifier: random(32),
  sessionId,
  expiresAt: now + 5.minutes
}

authorize({ state, nonce, code_challenge: s256(verifier) })
// Callback validates and atomically consumes the transaction.`),
  "Redirect URI security": authExample("Deliver authorization responses only to exact destinations", "Prefix and wildcard matching", `registered: https://client.example/*
received:   https://client.example/redirect?to=https://evil.example

// Code can be forwarded to the attacker.`, "Exact pre-registration", `registered = "https://client.example/oauth/callback"

if (request.redirect_uri !== registered) reject()

// Callback never forwards using a user-controlled URL.
// Native loopback redirects may vary only the port.`),
  "CSRF, XSS & token storage": authExample("Choose controls for both ambient and script access", "Bearer tokens in script storage", `localStorage.setItem("access_token", longLivedToken)

// Any successful XSS can read and export it.`, "Hardened cookie plus layered browser defenses", `Set-Cookie: __Host-session=<opaque>;
  Secure; HttpOnly; SameSite=Lax; Path=/

POST /transfer
Origin: https://app.example
X-CSRF-Token: <session-bound-token>

Content-Security-Policy: script-src 'nonce-<random>' 'strict-dynamic'`),
  "Sender-constrained tokens": authExample("Make a stolen token insufficient by itself", "Reusable bearer credential", `Authorization: Bearer <stolen-token>

// Replay works from another machine until expiry or revocation.`, "Token bound to a proof key", `Authorization: DPoP <access-token>
DPoP: <signed-proof-jwt>

proof = {
  htm: "GET", htu: "https://api.example/orders",
  iat: now, jti: random(), ath: hash(accessToken)
}

// API verifies proof signature, URI, method, freshness, replay, and key binding.`),
  "JWKS & key rotation": authExample("Rotate keys without trusting token-controlled locations", "Token chooses the key server", `header = decodeHeader(jwt)
keys = await fetch(header.jku)
key = keys.find(header.kid)

// Attacker supplies both token and verification key.`, "Issuer-anchored overlapping rotation", `metadata = cache.get(TRUSTED_ISSUER)
keys = cache.get(metadata.jwks_uri)
key = keys.find(jwt.header.kid)

if (!key) keys = rateLimitedRefresh(metadata.jwks_uri)
verify(jwt, key, { issuer: TRUSTED_ISSUER, algorithms: ["ES256"] })

// Publish old + new keys until old tokens expire.`),
  "Revocation & logout": authExample("Define every credential the logout terminates", "Only clear the visible cookie", `response.clearCookie("session")

// Refresh token still works.
// Other devices and IdP session remain active.`, "Deliberate session termination", `await sessions.revoke(currentSession.id)
await authorizationServer.revoke(refreshToken)
response.clearCookie("__Host-session")

// If policy requires: revoke all account sessions,
// initiate OIDC logout, and process back-channel logout events.`),
  "Threat modeling & monitoring": authExample("Instrument the authentication attack paths", "Secrets logged, attacks invisible", `logger.info("login", { password, accessToken, refreshToken })

// No signal for code replay, issuer mismatch, or recovery abuse.`, "Safe, actionable security events", `securityEvent("refresh_token_reuse", {
  tokenFamilyId,
  clientId,
  subjectHash,
  sourceNetwork,
  occurredAt
})

// Revoke family, notify user, preserve audit trail.
// Never log passwords, raw tokens, codes, or session IDs.`),
});

Object.assign(topicCopy, {
  "Event-driven design mental model": authContent("Event-driven design models meaningful facts as immutable events and lets independently owned consumers react asynchronously. Producers publish what happened without directing every downstream action.", "After an order is placed, publish OrderPlaced with stable identity and business context. Inventory, fulfillment, analytics, and notifications consume it independently under their own retry and failure policies.", "Publish durable business facts and let consumers own their reactions; do not disguise remote commands as events."),
  "Events, commands & messages": authContent("A command asks a specific owner to perform an action, an event states that something already happened, and message is the transport-neutral umbrella term. Their names, routing, and failure semantics should reflect those differences.", "Send ReserveInventory to the inventory capability; publish InventoryReserved only after the state change commits. Name events in past tense and commands with imperative intent.", "Make intent explicit: commands may be rejected, while events are immutable facts consumers must interpret."),
  "Domain, integration & notification events": authContent("Domain events express facts inside a domain model, integration events cross service boundaries, and notification events may carry only enough information for consumers to fetch current state. They need not share the same shape or transaction.", "Raise OrderPlaced inside the aggregate, translate it after commit into a versioned orders.order-placed integration event, and use a lightweight notification only when consumers can tolerate an additional source lookup.", "Translate internal facts into deliberate external contracts instead of leaking domain internals."),
  "Event storming & discovery": authContent("Event storming explores a business process through domain events, commands, actors, policies, aggregates, external systems, and hotspots. It reveals language and ownership before technology choices constrain the design.", "Walk from OrderSubmitted through PaymentAuthorized and OrderShipped, add the commands and policies that cause each fact, then mark unclear ownership and consistency boundaries for follow-up.", "Discover the business timeline and decision points before drawing topics, queues, or services."),
  "Bounded contexts & ownership": authContent("Bounded contexts own models and invariants. An event contract crosses that boundary, so its producer must own its meaning while consumers remain free to build local projections.", "Commerce owns OrderPlaced; Finance maps it into its own ledger concepts rather than reading Commerce tables or requiring Commerce to publish Finance's internal model.", "Keep events aligned with producer-owned language and translate at consumer boundaries."),
  "Choosing event-driven architecture": authContent("Event-driven architecture improves temporal decoupling, fan-out, and independent processing, but introduces eventual consistency, duplicates, ordering limits, operational dependencies, and harder debugging.", "Use asynchronous events for fulfillment after checkout, but keep a synchronous price quote when the user needs an immediate answer before deciding to buy.", "Choose events for real decoupling and latency tolerance, not to avoid defining a clear synchronous contract."),
  "Event envelope & metadata": authContent("An event envelope separates routing and operational metadata from the domain payload. Common metadata includes event id, type, version, source, subject, occurred time, correlation, causation, and trace context.", "Wrap an OrderPlaced payload in a consistent envelope, generate the event id once, preserve correlation across the workflow, and avoid embedding transport-specific partition or offset details in the domain contract.", "Standardize metadata for identity and observability while keeping domain facts transport-neutral."),
  "Schema design & evolution": authContent("Event schemas are long-lived contracts because retained events may be replayed years later. Compatible evolution generally adds optional fields and preserves existing meaning; semantic changes need a new event type or version strategy.", "Add an optional salesChannel with a documented default, run compatibility checks against registered consumers, and never redefine total from gross to net under the same field name.", "Evolve both structure and meaning compatibly, accounting for old producers, consumers, and stored history."),
  "Event granularity & payloads": authContent("Events range from minimal identifiers to complete state snapshots. Thin events reduce duplication but cause callback coupling; rich events improve consumer autonomy but increase exposure and evolution cost.", "Include order id, customer reference, currency, totals, and line facts needed by approved consumers, while excluding secrets and internal entity dumps unrelated to the business occurrence.", "Put enough stable business context in the event for autonomous processing, but no more than the contract warrants."),
  "Ordering, time & identity": authContent("Distributed systems rarely provide global order. Partition-local order, event occurrence time, ingestion time, aggregate versions, and causal relationships answer different questions.", "Partition order events by orderId, attach aggregateVersion, reject or defer a version gap, and use occurredAt for business time without assuming clocks establish causality across services.", "Define the exact ordering scope and use stable identity plus versioning instead of wall-clock guesses."),
  "Topics, queues & subscriptions": authContent("A queue typically distributes work among competing consumers, while a topic or stream lets independent subscriptions receive the same event. Durable subscriptions own their position and retry state.", "Publish order events to a topic, give Fulfillment and Analytics separate subscriptions, and scale multiple Fulfillment workers within its subscription as competing consumers.", "Choose topology from fan-out and ownership: each independent outcome needs independent consumption state."),
  "Partitioning & consumer groups": authContent("Partitions provide parallelism and an ordering boundary. A consumer group assigns each partition to one active member, limiting useful parallelism to the number of partitions.", "Partition by orderId to preserve per-order order, size partition count for expected throughput and future consumers, and rebalance cooperatively to reduce processing pauses.", "Choose a key that matches the required ordering boundary and plan partition count as a lasting capacity decision."),
  "Delivery semantics": authContent("At-most-once can lose messages, at-least-once can repeat them, and broker claims of exactly-once apply only within specific coordinated boundaries. End-to-end effects still require idempotent application design.", "Use at-least-once delivery, acknowledge after durable work, deduplicate financial effects by event id or business key, and test crashes before and after every commit boundary.", "Assume redelivery unless every side effect participates in the same proven transaction."),
  "Acknowledgement, retry & backoff": authContent("Acknowledgement advances consumption only after required work is durable. Retry policy must distinguish transient dependency failures from permanent validation or contract failures.", "Retry a timeout with exponential backoff and jitter, honor a total attempt budget, and route an invalid currency event directly to quarantine with diagnostic context.", "Retry only recoverable failures and keep retries bounded so poison messages cannot consume the system."),
  "Dead-letter & quarantine flows": authContent("Dead-letter or quarantine storage isolates messages that cannot progress while preserving evidence for diagnosis and controlled replay. It is an operational workflow, not a disposal bin.", "Capture original bytes, envelope, failure code, attempts, consumer version, and timestamps; alert the owning team; fix the cause; replay through an audited tool with rate controls.", "Give failed events ownership, diagnosis, repair, and safe replay procedures."),
  "Idempotent consumers": authContent("An idempotent consumer produces the same durable outcome when it receives the same logical event more than once. Deduplication records and business uniqueness constraints are common techniques.", "Insert the event id and ledger entry in one database transaction with a unique constraint. If the id already exists, acknowledge without repeating the credit.", "Make the side effect and deduplication decision atomic at the system that owns the effect."),
  "Transactional outbox": authContent("The transactional outbox stores an outgoing event in the same local transaction as the state change. A relay later publishes it, closing the dual-write gap between a database commit and broker send.", "Commit the order and outbox row together, publish rows with stable ids, mark them dispatched after broker acknowledgement, and tolerate relay retries through downstream idempotency.", "Atomically record state and publication intent; accept that relay delivery can repeat."),
  "Inbox & deduplication": authContent("An inbox records received message identity beside consumer work so redelivery can be recognized. Retention must cover the broker's possible replay window and business retry policy.", "Within one transaction, insert eventId into processed_events and update the projection. A uniqueness conflict means the event already produced its local effect.", "Store deduplication at the same consistency boundary as the consumer's durable effect."),
  "Change data capture": authContent("Change data capture reads committed database changes and emits a stream. It is useful for integration and migration but raw row changes often lack domain meaning and can expose storage evolution.", "Use CDC to feed a search index from an existing system, map table changes into an owned integration contract, and monitor log retention and connector lag.", "Treat CDC as a capture mechanism; add a semantic boundary before exposing database structure broadly."),
  "Eventual consistency & UX": authContent("Asynchronous projections lag behind the write model. Product behavior must make pending, confirmed, stale, and failed states understandable rather than pretending every view updates atomically.", "After checkout, return the accepted order id and status PENDING_FULFILLMENT, show progress, use read-your-write data where necessary, and notify the user if compensation changes the outcome.", "Design lag and failure into the user experience with explicit states and convergence expectations."),
  "Sagas & process managers": authContent("A saga coordinates a long-running business transaction through local commits and compensating actions. A process manager persists workflow state and decides the next command from events and policy.", "On OrderPlaced, command payment, then inventory, then fulfillment; persist each transition, use timeouts, and issue RefundPayment when inventory cannot be reserved.", "Model long-running progress as durable state with explicit compensation, timeout, and terminal outcomes."),
  "Orchestration vs choreography": authContent("Orchestration centralizes workflow decisions in a coordinator; choreography lets participants react to events. Orchestration clarifies complex progress, while choreography reduces central control but can hide a distributed workflow.", "Use a checkout process manager when ordering, timeouts, and compensation are critical. Use choreography for independent analytics and email reactions that do not govern the core transaction.", "Centralize business coordination when the workflow needs one accountable state machine; fan out independent reactions."),
  "Event sourcing fundamentals": authContent("Event sourcing stores an aggregate's ordered event history as the source of truth and rebuilds current state by replay. It differs from merely publishing events from a state-based database.", "Append AccountOpened and MoneyDeposited with expected stream version, fold them to rebuild balance, and derive query projections asynchronously.", "Adopt event sourcing only when event history and temporal behavior justify its modeling and operational cost."),
  "Aggregates & optimistic concurrency": authContent("An aggregate protects invariants within a consistency boundary. In an event store, appending with an expected stream version prevents concurrent commands from silently overwriting one another.", "Load order events through version 7, decide ShipOrder, and append OrderShipped only if the stream remains at version 7; otherwise reload and reconsider the command.", "Keep aggregates small and use stream versions to make conflicting decisions explicit."),
  "Projections, snapshots & replay": authContent("Projections fold events into query-optimized views. Snapshots can shorten aggregate rehydration, while replay rebuilds derived state from history and must be isolated from live side effects.", "Build an order summary keyed by order id, checkpoint source offsets, create versioned projection tables for a rebuild, then atomically switch readers after catching up.", "Make projections disposable and replayable, with versioned rebuilds and side effects disabled."),
  "Testing event-driven systems": authContent("Tests should verify event contracts, decision logic, idempotency, ordering assumptions, retries, projection convergence, and failure at transaction boundaries. Waiting with arbitrary sleeps creates slow, flaky confidence.", "Contract-test serialized events, unit-test a process manager as state plus input to output, run broker-backed integration tests, and poll a defined outcome with a deadline.", "Test deterministic decisions directly and use bounded eventual assertions for asynchronous integration."),
  "Observability & correlation": authContent("Async traces cross process and time boundaries, so event identity, correlation, causation, consumer group, partition, offset, lag, and processing outcome are essential signals.", "Propagate trace context in the envelope, start a consumer span linked to the producer, record safe event metadata and lag, and trace retry and dead-letter transitions without logging sensitive payloads.", "Make every event traceable from producer commit through each consumer outcome."),
  "Backpressure & load shedding": authContent("When arrival rate exceeds processing capacity, lag grows. Backpressure controls intake or concurrency; load shedding rejects or degrades optional work before critical dependencies collapse.", "Scale consumers from sustained lag, cap per-consumer concurrency to database capacity, pause partitions during dependency failure, and drop rebuildable low-value telemetry under an explicit policy.", "Protect downstream capacity first; an unbounded consumer simply moves the outage."),
  "Replay & incident recovery": authContent("Replay reprocesses retained events to rebuild state or recover missed effects. It can duplicate external actions, overload dependencies, and apply new code to old contracts if not isolated and controlled.", "Replay into a new projection with side-effect adapters disabled, choose an explicit offset range, rate-limit processing, compare counts and checksums, then promote the rebuilt view.", "Treat replay as a production change with scope, isolation, rate control, validation, and rollback."),
  "Event-driven production checklist": authContent("A production event-driven system needs contract ownership, retention, capacity, idempotency, failure handling, replay, security, observability, and recovery procedures across producers, brokers, and consumers.", "Before launch, test a broker outage, consumer crash at each commit point, poison event, schema rollout, partition rebalance, lag spike, replay, and region recovery; document owners and SLOs.", "Operate the complete event lifecycle, including duplicates, lag, poison data, evolution, and recovery—not only the happy-path publish."),
});

Object.assign(codeExamples, {
  "Event-driven design mental model": authExample("Publish a fact once for independent reactions", "Producer coordinates every consumer", `await inventory.reserve(order)\nawait email.send(order)\nawait analytics.track(order)\nawait fulfillment.start(order)`, "Publish an owned business fact", `await orders.commit(order)\nawait events.publish({\n  type: "commerce.order-placed.v1",\n  subject: order.id,\n  data: { orderId: order.id, total: order.total }\n})`),
  "Events, commands & messages": authExample("Name the message by intent", "Command disguised as an event", `{ "type": "SendWelcomeEmailEvent", "email": "..." }`, "Command followed by fact", `command: { type: "SendWelcomeEmail", userId }\n\nevent: { type: "WelcomeEmailSent", userId, sentAt }`),
  "Event envelope & metadata": authExample("Give every fact operational identity", "Payload without provenance", `{ "orderId": "ord_42", "total": 89.00 }`, "Consistent envelope", `{\n  "id": "evt_01K...",\n  "type": "commerce.order-placed.v1",\n  "source": "commerce/orders",\n  "subject": "ord_42",\n  "time": "2026-08-10T18:42:00Z",\n  "correlationId": "checkout_91",\n  "data": { "total": 89.00, "currency": "USD" }\n}`),
  "Schema design & evolution": authExample("Preserve old readers and stored history", "Change existing meaning", `// v1 total meant gross\n// v1 total now silently means net`, "Add compatible context", `{\n  "total": { "amount": "89.00", "currency": "USD" },\n  "salesChannel": "WEB" // optional for older events\n}`),
  "Partitioning & consumer groups": authExample("Align partitioning with ordering needs", "Random key for aggregate events", `publish(event, { key: randomUUID() })\n# One order can span many partitions.`, "Stable aggregate key", `publish(orderEvent, { key: orderEvent.orderId })\n\n# All events for one order share partition order;\n# different orders process in parallel.`),
  "Acknowledgement, retry & backoff": authExample("Classify failures before retrying", "Retry everything immediately", `while (true) {\n  try { await handle(event); ack(); break }\n  catch { /* immediate retry */ }\n}`, "Bounded policy by failure type", `if (error.transient && attempt < 6) {\n  retryAfter(exponentialBackoff(attempt) + jitter())\n} else {\n  quarantine(event, safeFailureContext)\n}`),
  "Idempotent consumers": authExample("Commit deduplication with the effect", "Check then act across separate commits", `if (!seen(event.id)) {\n  ledger.credit(event.amount)\n  markSeen(event.id)\n}`, "One local transaction", `BEGIN;\nINSERT INTO processed_events(id) VALUES (:eventId); -- UNIQUE\nINSERT INTO ledger_entries(event_id, amount) VALUES (:eventId, :amount);\nCOMMIT;`),
  "Transactional outbox": authExample("Close the database-to-broker dual-write gap", "Two unrelated writes", `await db.orders.save(order)\nawait broker.publish(orderPlaced)\n# A crash between calls loses the event.`, "State and publication intent together", `BEGIN;\nUPDATE orders SET status = 'PLACED' WHERE id = :id;\nINSERT INTO outbox(id, type, payload) VALUES (:eventId, :type, :payload);\nCOMMIT;\n\n# Relay publishes pending rows with retry.`),
  "Inbox & deduplication": authExample("Make projection updates repeat-safe", "Blindly apply every delivery", `projection.total += event.amount\nack()`, "Inbox and projection in one transaction", `BEGIN;\nINSERT INTO inbox(event_id) VALUES (:id); -- UNIQUE\nUPDATE account_summary SET total = total + :amount;\nCOMMIT;\n# Duplicate id: no second update, then acknowledge.`),
  "Eventual consistency & UX": authExample("Expose the workflow state honestly", "Promise synchronous completion", `POST /checkout → 200 { "status": "SHIPPED" }`, "Return accepted progress", `POST /checkout → 202\n{\n  "orderId": "ord_42",\n  "status": "PENDING_PAYMENT",\n  "statusUrl": "/orders/ord_42"\n}`),
  "Sagas & process managers": authExample("Persist progress and compensation", "Distributed transaction wish", `BEGIN DISTRIBUTED TRANSACTION\nchargeCard(); reserveStock(); createShipment();\nCOMMIT;`, "Explicit durable state machine", `OrderPlaced → AuthorizePayment\nPaymentAuthorized → ReserveInventory\nInventoryRejected → RefundPayment\nPaymentRefunded → OrderCancelled\n\n# State, deadlines, and processed event IDs are persisted.`),
  "Event sourcing fundamentals": authExample("Rebuild state from an append-only stream", "Overwrite current state only", `UPDATE accounts SET balance = 125 WHERE id = 'acct_7';`, "Append facts with expected version", `append("account-acct_7", expectedVersion: 4, [\n  { type: "MoneyDeposited", amount: 25, currency: "USD" }\n])\n\nbalance = events.reduce(evolve, initialState)`),
  "Projections, snapshots & replay": authExample("Rebuild derived views safely", "Mutate the live table during replay", `for (event of allHistory) update(liveProjection, event)`, "Versioned shadow projection", `replay history → order_summary_v3\nconsume live tail → checkpoint catches up\nvalidate counts + checksums\nswitch read alias: v2 → v3\nretain v2 for rollback`),
  "Testing event-driven systems": authExample("Assert eventual outcomes without fixed sleeps", "Hope the event finishes in time", `publish(event)\nawait sleep(5000)\nexpect(readModel.get(id)).toEqual(expected)`, "Poll a defined condition with a deadline", `await eventually({ timeout: 5000, interval: 50 }, async () => {\n  const order = await readModel.get(id)\n  expect(order.status).toBe("READY")\n})`),
  "Observability & correlation": authExample("Connect asynchronous work into one story", "Unrelated consumer logs", `log("received message")\nlog("handler failed")`, "Structured event processing signals", `event.id = "evt_01K..."\ncorrelation.id = "checkout_91"\ncausation.id = "cmd_72"\nconsumer.group = "fulfillment"\nmessaging.partition = 12\nmessaging.offset = 8841\nprocessing.outcome = "retry"`),
  "Backpressure & load shedding": authExample("Bound consumers by dependency capacity", "Unlimited parallel consumption", `onMessage(event => Promise.resolve(handle(event)))`, "Explicit concurrency and lag policy", `consumer.maxConcurrency = 32 // database-tested capacity\nif (database.saturated) consumer.pause(partitions)\nscale from sustained lag\nresume gradually after recovery`),
  "Replay & incident recovery": authExample("Isolate and validate replay", "Replay production side effects", `for (event of history) liveConsumer.handle(event)\n# Emails, charges, and webhooks repeat.`, "Dedicated replay mode", `target = "projection_v3"\nrange = offsets(120000, 980000)\nsideEffects = disabled\nrateLimit = 2000 events/sec\nvalidate = [rowCount, checksum, sampledQueries]`),
  "Event-driven production checklist": authExample("Test the failure lifecycle", "Only test publish and consume", `producer.publish(testEvent)\nexpect(consumer.received).toBe(true)`, "Production readiness gates", `contract compatibility ✓  idempotency ✓\noutbox relay recovery ✓  poison event ✓\nlag alert + backpressure ✓  rebalance ✓\ncontrolled replay ✓  broker outage ✓\nretention + regional recovery ✓`),
});

Object.assign(topicCopy, {
  "Kubernetes architecture": authContent("Kubernetes reconciles declared desired state through an API server, persistent cluster state, controllers, a scheduler, and node agents. Control-plane components decide what should happen; kubelets and runtimes make it happen on nodes.", "Create a Deployment through the API. The scheduler assigns pending Pods to suitable nodes, kubelets start containers, and controllers continuously replace failed replicas until observed state matches the specification.", "Reason about Kubernetes as cooperating control loops around a durable API, not as a collection of imperative deployment scripts."),
  "API objects & desired state": authContent("Kubernetes resources are versioned API objects with metadata, spec, and status. Users declare intent in spec; controllers report observations in status and converge the system toward that intent.", "Apply a manifest with three desired replicas, then inspect generation, observedGeneration, conditions, and events instead of assuming an accepted write means the workload is healthy.", "Declare intent in spec and use status and conditions as evidence of reconciliation."),
  "Namespaces, labels & annotations": authContent("Namespaces provide a naming and policy scope, labels are queryable identity used by selectors, and annotations hold non-identifying metadata. None is a hard security boundary by itself.", "Label workloads with app, component, environment, and owner using a governed vocabulary; annotate runbook and source links; apply quotas and policies to each team namespace.", "Use stable labels for selection and policy, annotations for context, and explicit controls for isolation."),
  "kubectl & declarative workflows": authContent("kubectl reads and writes the Kubernetes API, but repeatable operation comes from reviewed manifests and server-side reconciliation rather than a history of shell commands.", "Use diff and server-side dry-run in CI, apply versioned manifests through a delivery controller, and reserve imperative commands for diagnosis or documented emergency procedures.", "Keep desired state reproducible and reviewable; treat ad hoc cluster mutations as exceptions."),
  "Pods & container lifecycle": authContent("A Pod is the smallest schedulable unit and groups containers that share networking, volumes, and lifecycle. Pods are disposable instances, not durable machines.", "Run the application as the main container, add a sidecar only when it truly needs the same lifecycle and localhost boundary, and store durable state outside the Pod filesystem.", "Design Pods for replacement, with one cohesive runtime purpose and no local identity assumptions."),
  "Deployments & ReplicaSets": authContent("A Deployment manages ReplicaSets and performs declarative rollouts for interchangeable stateless Pods. Its strategy controls how old and new replicas overlap.", "Set replicas, RollingUpdate surge and unavailable limits, readiness probes, and progressDeadlineSeconds; watch rollout status and undo to the previous ReplicaSet when health gates fail.", "Use Deployments for replaceable workloads and connect rollout progress to real readiness."),
  "StatefulSets & identity": authContent("StatefulSets provide stable ordinal identity, ordered lifecycle, and per-Pod volume claims. They help operate stateful software but do not supply database replication, backup, or consensus semantics.", "Use stable names such as broker-0 and volumeClaimTemplates when members require durable identity; pair them with a headless Service and application-specific quorum and recovery procedures.", "Choose StatefulSet only when stable identity or storage is a real application requirement."),
  "DaemonSets, Jobs & CronJobs": authContent("DaemonSets run a Pod on selected nodes, Jobs drive finite work to completion, and CronJobs create Jobs on a schedule. Each controller expresses a different lifecycle contract.", "Use a DaemonSet for a node log agent, a Job for a schema migration with bounded retries, and a CronJob for nightly cleanup with concurrencyPolicy and history limits.", "Match the controller to daemon, finite, or scheduled work instead of forcing every process into a Deployment."),
  "Init containers & sidecars": authContent("Init containers complete sequential setup before app containers start. Sidecars run alongside the app and share the Pod lifecycle, network, and optionally volumes.", "Use an init container to render non-secret configuration or wait for a required artifact. Use a sidecar for a tightly coupled proxy, but avoid hiding unrelated platform services inside every Pod.", "Add containers to a Pod only when their ordering, fate, and resource accounting should be shared."),
  "Services & discovery": authContent("A Service provides a stable virtual endpoint and DNS name for a changing set of Pods selected by labels. ClusterIP, headless, NodePort, and LoadBalancer forms serve different reachability needs.", "Expose api Pods through a ClusterIP Service, call api.team.svc.cluster.local when cross-namespace qualification is useful, and verify EndpointSlices when traffic has no destinations.", "Target stable Services and let selectors track replaceable Pods."),
  "Ingress & Gateway API": authContent("Ingress and Gateway API configure north-south traffic through an installed controller. Gateway API separates infrastructure ownership from application routes and provides richer, typed routing relationships.", "Have the platform team own a Gateway and application teams attach HTTPRoutes with explicit hostnames, path rules, TLS references, and allowed namespace policy.", "Treat routing resources as configuration for a controller, and verify both acceptance status and the data-plane implementation."),
  "Cluster networking & DNS": authContent("Every Pod receives an address in the cluster network, Services add virtual discovery, and CoreDNS resolves service names. The CNI implementation supplies routing and network-policy enforcement capabilities.", "Trace a request from DNS lookup to Service VIP or EndpointSlice and then to a ready Pod; inspect CNI health, DNS latency, and conntrack limits when connectivity becomes intermittent.", "Debug networking layer by layer: name resolution, service selection, routing, policy, and application listener."),
  "NetworkPolicy": authContent("NetworkPolicy declares allowed Pod ingress and egress for supported CNI implementations. Policies are additive; a selected Pod becomes isolated for a direction while traffic allowed by any applicable policy remains allowed.", "Start with namespace default-deny, allow DNS egress, then permit the frontend to reach the API on its application port and the API to reach only required data services.", "Build connectivity from deny-by-default and test the exact flows your CNI enforces."),
  "ConfigMaps & configuration": authContent("ConfigMaps hold non-secret configuration consumed as environment variables, command arguments, or mounted files. Updates propagate differently by consumption method and do not automatically restart workloads.", "Mount a versioned application configuration, validate it at startup, and trigger a controlled rollout by including a content checksum in the Pod template.", "Make configuration changes observable, validated, and tied to an intentional rollout."),
  "Secrets & external secret stores": authContent("Kubernetes Secrets are API objects intended for sensitive values, but base64 encoding is not encryption. Protection depends on RBAC, encryption at rest, distribution limits, and preferably an external secret lifecycle.", "Sync a short-lived database credential from a managed vault, grant only the workload service account access, mount it without logging values, and rotate it without committing plaintext manifests.", "Minimize secret copies and lifetimes; protect access from source to Pod and through rotation."),
  "Volumes, PVs & PVCs": authContent("Volumes attach storage to Pods; PersistentVolumes represent provisioned storage, and PersistentVolumeClaims request capacity and access characteristics. StorageClasses enable dynamic provisioning.", "Request a PVC with an appropriate StorageClass and access mode, verify zone binding, snapshot support, expansion, and reclaim policy before placing production data on it.", "Select storage from durability, topology, access, backup, and recovery requirements—not only requested size."),
  "Storage lifecycle & backups": authContent("Persistent storage can outlive a Pod, but a volume is not itself a backup. Reclaim policies, snapshots, application consistency, restore ordering, and retention determine recoverability.", "Quiesce or coordinate the database, create a CSI snapshot plus off-cluster backup, restore into an isolated namespace, and measure the exercise against RPO and RTO.", "A backup strategy is complete only after a verified restore of application-consistent data."),
  "Requests, limits & QoS": authContent("Resource requests guide scheduling and reserve capacity; limits constrain runtime use. Their relationship determines Pod QoS and can produce CPU throttling or memory termination.", "Set requests from measured steady and peak usage, choose memory limits with headroom, observe throttling and OOMKilled events, and avoid copying identical settings across unrelated workloads.", "Use measurements to make scheduling honest without turning limits into self-inflicted outages."),
  "Scheduling & placement": authContent("The scheduler filters and scores nodes using resources, constraints, affinity, topology, taints, and tolerations. Placement rules affect both availability and whether Pods can schedule at all.", "Spread replicas across zones and hosts, use required node affinity only for hard hardware needs, prefer soft anti-affinity when capacity is limited, and tolerate dedicated nodes intentionally.", "Express hard constraints sparingly and use topology rules to preserve resilience under real capacity."),
  "Probes & graceful termination": authContent("Startup probes protect slow initialization, readiness gates traffic eligibility, and liveness triggers restart. On termination, endpoints drain while the process receives a signal and a bounded grace period.", "Use a startup probe for initialization, a lightweight readiness check for ability to serve, and liveness only for unrecoverable process deadlock; handle SIGTERM and stop accepting work before exit.", "Probe distinct failure modes and make shutdown long enough to drain, short enough to recover."),
  "Autoscaling workloads": authContent("Horizontal Pod Autoscaler changes replica count from metrics, Vertical Pod Autoscaler recommends or changes resource requests, and event-driven scalers react to external backlog. Scaling signals must lead demand rather than merely describe failure.", "Scale workers from queue depth per ready replica, set stabilization behavior, confirm downstream capacity, and load-test the complete loop including startup time.", "Choose a leading demand signal and validate that every dependency can absorb the scaled load."),
  "Cluster capacity & disruption": authContent("Node autoscaling supplies compute for unschedulable Pods, while PodDisruptionBudgets limit concurrent voluntary disruption. Neither fixes application designs that cannot tolerate node loss.", "Maintain multiple replicas across zones, set a realistic disruption budget, configure node pools for workload shapes, and rehearse drain while watching pending Pods and service availability.", "Plan Pod and node scaling together and test maintenance under constrained capacity."),
  "RBAC & service accounts": authContent("RBAC grants verbs on resource types or named resources to users, groups, and service accounts. Roles are namespaced; ClusterRoles may be cluster-wide or reusable within namespaces.", "Give each workload a dedicated service account, disable automatic token mounting when unused, bind a narrow Role, and audit wildcard verbs, secrets access, and impersonation permissions.", "Grant identities the smallest reviewed API capability and avoid shared default service accounts."),
  "Pod security & runtime hardening": authContent("Workload hardening reduces the impact of image or application compromise through non-root execution, capability removal, read-only filesystems, seccomp, namespace controls, and admission policy.", "Enforce the restricted Pod Security Standard, set runAsNonRoot, allowPrivilegeEscalation false, drop ALL capabilities, use RuntimeDefault seccomp, and add back only demonstrated needs.", "Make least privilege the admission default so insecure Pods fail before scheduling."),
  "Supply-chain & admission policy": authContent("Admission controllers can validate or mutate objects after authentication and authorization but before persistence. Supply-chain controls connect trusted source, builds, signed artifacts, policy, and runtime identity.", "Pin images by digest, verify signatures and provenance at admission, reject privileged or unapproved registries, generate an SBOM, and continuously scan deployed artifacts.", "Enforce artifact and workload policy at admission with an audited exception path."),
  "Helm & Kustomize": authContent("Helm packages parameterized templates and release metadata; Kustomize applies declarative overlays to plain resources. Both can reduce repetition, but generated manifests remain the contract sent to the API.", "Use a small base with environment overlays for direct composition, or a versioned Helm chart for a distributed package; render, validate, diff, and policy-check output before apply.", "Choose the lightest configuration tool that keeps rendered resources reviewable and predictable."),
  "GitOps & progressive delivery": authContent("GitOps controllers continuously reconcile cluster state from version control. Progressive delivery shifts traffic or replicas through measured stages and automatically promotes or rolls back.", "Merge an immutable image digest, let the controller reconcile it, canary 5 percent of traffic, evaluate error rate and latency, then promote or revert through versioned desired state.", "Make Git the auditable source of intent and use live signals to control rollout progression."),
  "Logs, metrics & traces": authContent("Kubernetes emits infrastructure and workload signals across events, logs, metrics, and distributed traces. Useful observability preserves workload identity and request context across ephemeral Pods.", "Collect structured stdout logs, RED metrics by service, node and control-plane saturation, and OpenTelemetry traces; attach namespace, workload, Pod, version, and trace identifiers without logging secrets.", "Correlate platform state with user requests and alert on symptoms tied to service objectives."),
  "Debugging failing workloads": authContent("Effective debugging starts from observed state and narrows across scheduling, image pull, startup, readiness, networking, dependencies, and resource pressure. Repeated restarts can erase the most useful evidence.", "Describe the Pod, read events in time order, inspect current and previous logs, compare spec with status, check endpoints and policy, and use an ephemeral debug container when the image lacks tools.", "Follow evidence from controller condition to container and dependency; avoid random restarts before capturing state."),
  "Upgrades, backup & disaster recovery": authContent("Cluster operations must preserve API compatibility, control-plane state, workloads, and persistent data across upgrades or regional failure. Managed control planes reduce work but not application recovery responsibility.", "Check deprecated APIs, upgrade one supported minor version at a time, canary node pools, back up cluster configuration and data, and restore into a clean environment during scheduled exercises.", "Treat upgrade and disaster recovery as tested system procedures spanning cluster and application state."),
});

Object.assign(codeExamples, {
  "Kubernetes architecture": authExample("Let controllers converge desired state", "Imperative host management", `ssh node-3\ndocker run api:v7\n# Nobody replaces it after node failure.`, "Declarative workload", `apiVersion: apps/v1\nkind: Deployment\nmetadata: { name: api }\nspec:\n  replicas: 3\n  selector:\n    matchLabels: { app: api }`),
  "API objects & desired state": authExample("Inspect reconciliation evidence", "Assume apply means healthy", `kubectl apply -f deployment.yaml\necho "Deployment complete"`, "Wait on observed status", `kubectl apply -f deployment.yaml\nkubectl rollout status deployment/api --timeout=5m\n\n# Also inspect status.conditions and events.`),
  "Pods & container lifecycle": authExample("Design for replacement", "Store durable state in the container", `writeFile("/app/orders.db", data)\n# Lost when the Pod is replaced.`, "Externalize durable state", `containers:\n  - name: api\n    image: registry.example/api@sha256:...\n    ports:\n      - { name: http, containerPort: 8080 }`),
  "Deployments & ReplicaSets": authExample("Bound rollout availability", "Uncontrolled replacement", `strategy:\n  type: Recreate`, "Measured rolling update", `strategy:\n  type: RollingUpdate\n  rollingUpdate:\n    maxUnavailable: 0\n    maxSurge: 1\nprogressDeadlineSeconds: 600`),
  "DaemonSets, Jobs & CronJobs": authExample("Select the controller by lifecycle", "Long-running Pod for scheduled work", `kind: Deployment\n# container sleeps 24h between cleanup runs`, "Explicit scheduled completion", `apiVersion: batch/v1\nkind: CronJob\nspec:\n  schedule: "0 2 * * *"\n  concurrencyPolicy: Forbid\n  jobTemplate: { ... }`),
  "Services & discovery": authExample("Route to ready interchangeable Pods", "Call a Pod address directly", `PAYMENTS_URL=http://10.42.7.19:8080`, "Use stable service discovery", `apiVersion: v1\nkind: Service\nmetadata: { name: payments }\nspec:\n  selector: { app: payments }\n  ports: [{ port: 80, targetPort: http }]`),
  "NetworkPolicy": authExample("Allow only required flows", "Every Pod can call every Pod", `# No NetworkPolicy objects in the namespace.`, "Default deny plus explicit allow", `kind: NetworkPolicy\nspec:\n  podSelector: {}\n  policyTypes: [Ingress, Egress]\n---\n# Add narrow DNS and app-to-api policies.`),
  "Secrets & external secret stores": authExample("Keep plaintext out of manifests", "Base64 mistaken for encryption", `data:\n  password: cHJvZHVjdGlvbi1wYXNzd29yZA==`, "Reference managed secret material", `volumes:\n  - name: db-credentials\n    csi:\n      driver: secrets-store.csi.k8s.io\n      volumeAttributes:\n        secretProviderClass: api-database`),
  "Requests, limits & QoS": authExample("Schedule from measured demand", "Arbitrary tiny defaults", `requests: { cpu: 10m, memory: 32Mi }\nlimits: { cpu: 50m, memory: 64Mi }`, "Evidence-based resources", `resources:\n  requests: { cpu: 250m, memory: 384Mi }\n  limits: { memory: 768Mi }\n# Revisit from utilization, throttling, and OOM data.`),
  "Scheduling & placement": authExample("Spread replicas across failure domains", "All replicas may share one node", `replicas: 3\n# No topology constraints.`, "Zone-aware topology spread", `topologySpreadConstraints:\n  - maxSkew: 1\n    topologyKey: topology.kubernetes.io/zone\n    whenUnsatisfiable: DoNotSchedule\n    labelSelector:\n      matchLabels: { app: api }`),
  "Probes & graceful termination": authExample("Separate startup, readiness, and liveness", "One deep check for every probe", `livenessProbe:\n  httpGet: { path: /health/all, port: http }\n# Database outage restarts every Pod.`, "Purpose-specific health signals", `startupProbe: { httpGet: { path: /health/startup, port: http } }\nreadinessProbe: { httpGet: { path: /health/ready, port: http } }\nlivenessProbe: { httpGet: { path: /health/live, port: http } }\nterminationGracePeriodSeconds: 30`),
  "Autoscaling workloads": authExample("Scale from meaningful demand", "CPU-only scaling for queue workers", `metric: cpu.utilization > 70%`, "Scale against backlog", `metric: queue_messages_ready\ntarget: 20 messages per ready replica\nminReplicas: 2\nmaxReplicas: 40\n# Confirm downstream capacity and startup latency.`),
  "RBAC & service accounts": authExample("Grant a narrow API capability", "Cluster admin for convenience", `kind: ClusterRoleBinding\nroleRef: { name: cluster-admin }\nsubjects: [{ kind: ServiceAccount, name: api }]`, "Namespaced least privilege", `kind: Role\nrules:\n  - apiGroups: [""]\n    resources: ["configmaps"]\n    resourceNames: ["api-flags"]\n    verbs: ["get"]`),
  "Pod security & runtime hardening": authExample("Default containers to least privilege", "Privileged defaults", `securityContext:\n  privileged: true\n  runAsUser: 0`, "Restricted runtime", `securityContext:\n  runAsNonRoot: true\n  allowPrivilegeEscalation: false\n  readOnlyRootFilesystem: true\n  capabilities: { drop: ["ALL"] }\n  seccompProfile: { type: RuntimeDefault }`),
  "Helm & Kustomize": authExample("Review the resources actually applied", "Trust templates without rendering", `helm upgrade --install api ./chart`, "Render, validate, diff, apply", `helm template api ./chart -f values.prod.yaml > rendered.yaml\nkubeconform rendered.yaml\npolicy-check rendered.yaml\nhelm diff upgrade api ./chart -f values.prod.yaml`),
  "GitOps & progressive delivery": authExample("Promote with measured evidence", "Mutable latest tag", `image: registry.example/api:latest\nkubectl set image deployment/api api=:latest`, "Immutable progressive rollout", `image: registry.example/api@sha256:91af...\nsteps:\n  - setWeight: 5\n  - pause: { duration: 5m }\n  - analysis: { templates: [{ name: api-slo }] }\n  - setWeight: 50`),
  "Debugging failing workloads": authExample("Preserve and follow evidence", "Restart first", `kubectl delete pod api-7d9...\n# Previous state and timing are lost.`, "Narrow the failing layer", `kubectl describe pod api-7d9...\nkubectl logs api-7d9... --previous\nkubectl get events --sort-by=.lastTimestamp\nkubectl get endpointslices -l kubernetes.io/service-name=api`),
  "Upgrades, backup & disaster recovery": authExample("Prove recovery before the incident", "Backups reported but never restored", `backup.status = "successful"`, "Timed isolated restore", `scan deprecated APIs → back up config and data\n  → create clean recovery cluster\n  → restore dependencies in order\n  → run integrity and user-journey checks\n  → record achieved RPO and RTO`),
});

Object.assign(topicCopy, {
  "Objects & classes": {
    intro: "Object-oriented programming organizes software around objects: focused units that hold data and provide the behavior that works with it. Classes give us a reusable blueprint for creating those objects.",
    practice: "A Product class defines a name, price, and discount behavior. Each product in a catalog is a separate object with its own values.",
    takeaway: "A class is the blueprint; an object is a working instance with identity, state, and behavior.",
    nodes: ["Identity", "State", "Behavior"],
  },
  "Encapsulation": {
    intro: "Encapsulation keeps an object’s internal state protected and exposes a clear public interface, reducing accidental coupling between different parts of a program.",
    practice: "A BankAccount keeps its balance private. Callers use deposit() and withdraw(), allowing the account to enforce its own rules.",
    takeaway: "Protect invariants inside the object and expose intention-revealing operations.", nodes: ["Private state", "Public API", "Safe change"],
  },
  "Abstraction": {
    intro: "Abstraction lets us work with the essential idea of something while hiding implementation details that are not relevant to the task at hand.",
    practice: "Code calls payment.charge() without needing to understand card networks, retries, encryption, or settlement.",
    takeaway: "Expose what a capability does; hide the incidental details of how it does it.", nodes: ["Intent", "Interface", "Details"],
  },
  "Inheritance": {
    intro: "Inheritance allows one class to build on another class’s behavior. Used carefully, it can model genuine is-a relationships and reduce repetition.",
    practice: "A SavingsAccount may extend Account only if it can honor every promise Account makes. Otherwise, composition is usually safer.",
    takeaway: "Use inheritance for stable substitutable relationships—not merely to reuse code.", nodes: ["Base type", "Subtype", "Shared contract"],
  },
  "Polymorphism": {
    intro: "Polymorphism lets different objects respond to the same interface in their own way, making software easier to extend without rewriting the code that uses them.",
    practice: "EmailNotifier and SmsNotifier both implement send(). The checkout flow depends on Notifier and does not need type-based conditionals.",
    takeaway: "Program to a stable contract and let each implementation supply its behavior.", nodes: ["One contract", "Many types", "Same call"],
  },
  "Single Responsibility": { intro: "A module should have one reason to change: it should serve one cohesive responsibility or actor.", practice: "Separate invoice calculation from PDF formatting and email delivery so each concern can evolve independently.", takeaway: "Group code by the reason it changes, not simply by technical convenience.", nodes: ["One module", "One actor", "One reason"] },
  "Open–Closed": { intro: "Software entities should be open for extension but closed for modification. Add behavior through stable extension points instead of repeatedly editing trusted code.", practice: "Add a new shipping calculator by implementing a ShippingPolicy interface rather than adding another branch to a large switch.", takeaway: "Create extension points where variation is real and recurring.", nodes: ["Stable core", "Extension", "New behavior"] },
  "Liskov Substitution": { intro: "Any subtype must be usable wherever its base type is expected without surprising the caller or weakening the original guarantees.", practice: "If a ReadOnlyFile cannot support write(), it should not inherit from a type whose contract promises writing.", takeaway: "Subtypes must preserve the behavior and promises of their parent contract.", nodes: ["Base promise", "Subtype", "Substitution"] },
  "Interface Segregation": { intro: "Clients should not depend on methods they do not use. Several focused interfaces are healthier than one oversized contract.", practice: "Split Machine into Printable, Scannable, and Faxable so a simple printer is not forced to fake unsupported features.", takeaway: "Shape interfaces around the needs of their consumers.", nodes: ["Client need", "Small contract", "Implementation"] },
  "Dependency Inversion": { intro: "High-level policy should not depend directly on low-level details. Both should depend on abstractions owned by the policy boundary.", practice: "An OrderService depends on a PaymentGateway contract while StripeGateway implements that contract at the application edge.", takeaway: "Point source-code dependencies toward stable business policy.", nodes: ["Policy", "Abstraction", "Detail"] },
  "Information Expert": { intro: "Assign a responsibility to the object that already has the information required to fulfill it.", practice: "An Order calculates its own total because it already owns the line items, quantities, and prices.", takeaway: "Put behavior close to the data it needs.", nodes: ["Information", "Owner", "Behavior"] },
  "Creator": { intro: "Let a class create another when it contains, records, closely uses, or has the initialization data for the created object.", practice: "An Order creates an OrderLine because it contains the line and already knows the product and quantity.", takeaway: "Place creation where the required knowledge naturally lives.", nodes: ["Container", "Creation data", "New object"] },
  "Controller": { intro: "Route a system event to a non-UI object that represents the overall system, use case, or session.", practice: "CheckoutController receives a place-order request and coordinates the domain objects without containing business rules itself.", takeaway: "Keep UI adapters thin and delegate use-case coordination to a controller.", nodes: ["System event", "Controller", "Domain"] },
  "Low Coupling": { intro: "Minimize the number and strength of dependencies between components so changes remain local and parts stay reusable.", practice: "Checkout depends on a TaxPolicy interface instead of importing a particular vendor SDK throughout the domain.", takeaway: "Prefer narrow, stable connections between collaborating objects.", nodes: ["Component A", "Small seam", "Component B"] },
  "High Cohesion": { intro: "Keep closely related responsibilities together and unrelated responsibilities apart.", practice: "A PricingService handles pricing rules, while persistence and notification remain in separate focused components.", takeaway: "A cohesive object has a clear purpose that is easy to name.", nodes: ["Related work", "Focused unit", "Clear purpose"] },
  "GRASP Polymorphism": { intro: "When behavior varies by type, assign responsibility through polymorphic operations rather than type checks.", practice: "Each DiscountPolicy calculates its own discount, eliminating a growing chain of if/else checks in checkout.", takeaway: "Let variation live behind a shared operation.", nodes: ["Variation", "Contract", "Implementations"] },
  "Pure Fabrication": { intro: "Introduce a service-like class that is not a domain concept when doing so improves cohesion, coupling, or reuse.", practice: "A Repository is a fabricated design object that keeps database mechanics out of domain entities.", takeaway: "Not every useful class needs a real-world counterpart.", nodes: ["Design need", "Service", "Clean domain"] },
  "Indirection": { intro: "Insert an intermediate object between components when it usefully reduces direct coupling or mediates change.", practice: "An event bus sits between order completion and downstream email, analytics, and fulfillment handlers.", takeaway: "Add indirection only when the decoupling benefit exceeds its mental cost.", nodes: ["Producer", "Mediator", "Consumer"] },
  "Protected Variations": { intro: "Identify points likely to vary and wrap them behind stable interfaces so change does not spread.", practice: "A CurrencyRateProvider shields pricing logic from changes between external exchange-rate vendors.", takeaway: "Encapsulate predicted variation behind a stable boundary.", nodes: ["Volatile detail", "Stable boundary", "Client"] },
  "Composable": { intro: "Code is composable when small parts combine cleanly into larger behavior without hidden constraints.", practice: "Small validation functions share a common result type and can be chained into complete workflows.", takeaway: "Design parts with clear inputs and outputs that work well together.", nodes: ["Small parts", "Composition", "Capability"] },
  "Unix philosophy": { intro: "Do one thing well. Prefer focused tools and components that communicate through simple, understandable boundaries.", practice: "A formatter transforms data; it does not also fetch, validate, persist, and send it.", takeaway: "Focused tools are easier to combine, replace, and reason about.", nodes: ["Input", "One job", "Output"] },
  "Predictable": { intro: "Behavior should be deterministic, observable, and unsurprising. Inputs, outputs, and side effects need to be clear.", practice: "A pricing function returns the same result for the same inputs and receives the current time explicitly.", takeaway: "Make dependencies and side effects visible.", nodes: ["Known input", "Clear behavior", "Expected output"] },
  "Idiomatic": { intro: "Use the conventions of the language and ecosystem so other developers can understand the code with less translation.", practice: "A TypeScript project uses familiar promises, discriminated unions, and naming conventions rather than inventing a private dialect.", takeaway: "Familiar patterns reduce the cost of reading and maintaining code.", nodes: ["Language", "Convention", "Fluency"] },
  "Domain-based": { intro: "Organize code around the language and concepts of the problem domain rather than around frameworks or technical layers alone.", practice: "A lending system speaks in Applications, Offers, and Repayments instead of generic Managers and Processors.", takeaway: "Let the business vocabulary shape the software model.", nodes: ["Domain language", "Model", "Code"] },
  "DRY": { intro: "Don’t Repeat Yourself means every business rule or piece of knowledge should have one authoritative representation.", practice: "Place the eligibility rule in one policy and reuse it from the API and batch process instead of copying the condition.", takeaway: "DRY is about a single source of knowledge—not eliminating every similar-looking line.", nodes: ["One rule", "Source of truth", "Many callers"] },
  "KISS": { intro: "Keep It Simple, Stupid asks us to choose the least complicated design that solves the problem clearly and correctly.", practice: "Use a direct function and a small data structure before introducing a rules engine for three stable conditions.", takeaway: "Complexity must earn its place.", nodes: ["Problem", "Direct path", "Solution"] },
  "YAGNI": { intro: "You Aren’t Gonna Need It warns against building capabilities for imagined future requirements.", practice: "Implement today’s single-region pricing rather than a speculative plugin platform for markets not on the roadmap.", takeaway: "Build for verified needs and leave the design open to evidence-driven change.", nodes: ["Need now", "Small design", "Feedback"] },
  "POLA / POLS": { intro: "The Principle of Least Astonishment—or Surprise—says code should behave the way a reasonable reader expects.", practice: "A method named getUser() should not silently delete expired users or trigger an email campaign.", takeaway: "Names, defaults, and side effects should align with established expectations.", nodes: ["Expectation", "Behavior", "No surprise"] },
  "Law of Demeter": { intro: "The Law of Demeter says an object should talk only to its direct collaborators—not navigate through a chain of strangers.", practice: "Ask order.shippingAddress() instead of reaching through order.customer.profile.address from distant code.", takeaway: "Tell a close collaborator what you need; do not traverse its internal object graph.", nodes: ["Caller", "Direct friend", "Request"] },
  "CQS / CQRS": { intro: "Command–Query Separation says an operation should either change state or return information, not both. CQRS applies that split at an architectural level.", practice: "updateProfile() performs a command; profileById() performs a query. Large systems may give each side separate models and storage paths.", takeaway: "Separate asking from doing; adopt full CQRS only when its operational cost is justified.", nodes: ["Command", "Boundary", "Query"] },
  "STUPID overview": { intro: "STUPID is a memory aid for six design smells: Singleton, Tight coupling, Untestability, Premature optimization, excessive Indirection, and Duplication.", practice: "Use it as a review checklist. A cluster of these smells often indicates hidden dependencies and unclear responsibilities.", takeaway: "STUPID identifies warning signs, not automatic verdicts; context still matters.", nodes: ["Spot smells", "Find cause", "Refactor"] },
  "Singleton": { intro: "Excessive Singleton use creates global state, hides dependencies, and makes lifecycle and test isolation difficult.", practice: "Inject a Clock or Configuration dependency instead of letting any object reach a global singleton at any time.", takeaway: "A single instance may be valid; globally accessible mutable state is the danger.", nodes: ["Global access", "Hidden state", "Coupling"] },
  "Tight Coupling": { intro: "Tight coupling binds code to concrete collaborators and their implementation details, making change expensive.", practice: "Domain logic that directly creates an HTTP client cannot be tested or reused without the network detail.", takeaway: "Depend on the smallest stable contract you actually need.", nodes: ["Concrete detail", "Hard link", "Ripple effect"] },
  "Untestability": { intro: "Untestable code mixes logic with time, randomness, networks, files, or globals so behavior cannot be checked in isolation.", practice: "Pass a clock and repository into a service, leaving its decision-making deterministic in unit tests.", takeaway: "Testability is design feedback: hard-to-test code often has hidden responsibilities.", nodes: ["Logic", "Side effect seam", "Fast test"] },
  "Premature Optimization": { intro: "Premature optimization adds complexity before measurement proves where performance work is valuable.", practice: "Write the clear query first, measure production behavior, then optimize the demonstrated bottleneck.", takeaway: "Profile before optimizing and preserve a correctness baseline.", nodes: ["Measure", "Bottleneck", "Optimize"] },
  "Excessive Indirection": { intro: "Too many abstractions and forwarding layers obscure simple logic, make navigation difficult, and increase cognitive load.", practice: "A one-line calculation does not need a factory, strategy, provider, adapter, and facade without real variation.", takeaway: "Every layer should solve a concrete problem.", nodes: ["Simple intent", "Too many layers", "Obscurity"] },
  "Duplication": { intro: "Copy-pasted business logic creates multiple sources of truth that drift and produce inconsistent fixes.", practice: "Extract a repeated tax rule into a named policy once the duplicated knowledge is genuinely the same.", takeaway: "Unify duplicated knowledge, but do not force unrelated code into a premature abstraction.", nodes: ["Copy", "Drift", "Defects"] },
  "WET": { intro: "Write Everything Twice—or Waste Everyone’s Time—is the costly opposite of DRY: duplicated knowledge that must be found and updated in several places.", practice: "If a fee rule exists in checkout, admin, and reporting, a change may fix one path while leaving two inconsistent.", takeaway: "Give each business rule one authoritative home and test it there.", nodes: ["Many copies", "One change", "Inconsistency"] },
});

export const dotnetPlacement: Record<string, { path: string; avoid: string }> = {
  "Solution & project files": { path: `Store.slnx\nsrc/Store.Api/Store.Api.csproj\nsrc/Store.Application/Store.Application.csproj\nsrc/Store.Domain/Store.Domain.csproj\nsrc/Store.Infrastructure/Store.Infrastructure.csproj\ntests/Store.UnitTests/Store.UnitTests.csproj\ntests/Store.IntegrationTests/Store.IntegrationTests.csproj`, avoid: `Store.Api/\n  Everything.cs\n  Tests.cs\n\n// One assembly allows every concern to depend on every other concern.` },
  "Program.cs": { path: `src/Store.Api/Program.cs\n\n// Composition root: register dependencies, order middleware, map endpoints.`, avoid: `Program.cs\n\n// Business rules, SQL queries, mapping, and endpoint bodies all mixed into startup.` },
  "appsettings files": { path: `src/Store.Api/\n  appsettings.json\n  appsettings.Development.json\n\nDeployment environment:\n  Payments__ApiKey=<secret>`, avoid: `appsettings.json\n  \"ApiKey\": \"production-secret\"\n\n// Credentials committed to source control.` },
  "launchSettings.json": { path: `src/Store.Api/Properties/launchSettings.json\n\n// Local profiles, ports, and Development environment only.`, avoid: `Properties/launchSettings.json\n\n// Treated as if it configures the deployed service.` },
  "Dependencies & NuGet": { path: `Directory.Packages.props\nsrc/*/*.csproj\n\nDomain ← Application ← Infrastructure / Api`, avoid: `Store.Domain.csproj\n  PackageReference: EF Core\n  ProjectReference: Infrastructure\n\n// Policy depends on details.` },
  "Controllers vs Minimal APIs": { path: `src/Store.Api/Features/Orders/Create/Endpoint.cs\n// or\nsrc/Store.Api/Controllers/OrdersController.cs\n\n// Both delegate to Application.`, avoid: `OrdersController.cs\n\n// HTTP, validation, pricing, persistence, and email in one action.` },
  "Endpoints & routing": { path: `src/Store.Api/Features/Orders/OrdersEndpoints.cs\n\nPOST   /api/orders\nGET    /api/orders/{id}\nDELETE /api/orders/{id}`, avoid: `POST /DoCreateNewOrder\nPOST /GetOrder\nPOST /DeleteTheOrder\n\n// RPC verbs replace HTTP semantics.` },
  "Contracts & DTOs": { path: `src/Store.Api/Features/Orders/Create/\n  CreateOrderRequest.cs\n  OrderResponse.cs\n\n// Explicit wire models.`, avoid: `return Results.Ok(efOrderEntity);\n\n// Database shape becomes the public JSON contract.` },
  "Middleware pipeline": { path: `src/Store.Api/Middleware/\n  CorrelationIdMiddleware.cs\n  RequestLoggingMiddleware.cs\n\nProgram.cs controls execution order.`, avoid: `Middleware/BusinessRulesMiddleware.cs\n\n// Domain decisions hidden in a global HTTP pipeline component.` },
  Filters: { path: `src/Store.Api/Filters/IdempotencyFilter.cs\n\n// Endpoint/action context required; no domain policy.`, avoid: `Filters/RefundEligibilityFilter.cs\n\n// Business rule coupled to ASP.NET execution.` },
  "OpenAPI documentation": { path: `src/Store.Api/OpenApi/\n  SecuritySchemeTransformer.cs\n  Examples/\n\nEndpoint metadata stays beside each feature.`, avoid: `swagger.json edited by hand\n\n// Documentation drifts from executable endpoints.` },
  "Application layer": { path: `src/Store.Application/\n  Abstractions/\n  Orders/PlaceOrder/\n    Command.cs\n    Handler.cs\n    Result.cs`, avoid: `src/Store.Application/\n  Controllers/\n  DbContext/\n  HttpClients/\n\n// Inner policy imports outer frameworks.` },
  "Feature folders": { path: `Features/Orders/Place/\n  Endpoint.cs\n  Request.cs\n  Validator.cs\n  Handler.cs\n  Response.cs`, avoid: `Controllers/OrdersController.cs\nServices/OrderService.cs\nDtos/OrderDto.cs\nValidators/OrderValidator.cs\n\n// One change touches every horizontal folder.` },
  "Domain entities": { path: `src/Store.Domain/Orders/\n  Order.cs\n  OrderLine.cs\n  OrderStatus.cs\n  Events/OrderPlaced.cs`, avoid: `src/Store.Api/Models/Order.cs\n\n// Public setters and framework attributes define the business model.` },
  "Value objects": { path: `src/Store.Domain/Common/\n  Money.cs\n  EmailAddress.cs\n  DateRange.cs`, avoid: `string email\ndecimal amount\nstring currency\n\n// Rules and meaning are repeated at every call site.` },
  "Use cases & services": { path: `src/Store.Application/Orders/Refund/\n  RefundOrderCommand.cs\n  RefundOrderHandler.cs\n  RefundOrderResult.cs`, avoid: `src/Store.Application/Services/OrderManager.cs\n\n// Generic manager grows without a coherent boundary.` },
  "Validation & mapping": { path: `src/Store.Api/Features/Orders/Create/RequestValidator.cs\nsrc/Store.Api/Features/Orders/Create/Mapping.cs\nsrc/Store.Domain/Orders/Quantity.cs`, avoid: `Common/AutoMapperProfile.cs\n\n// Magic global mappings plus DTO-only validation.` },
  "Infrastructure project": { path: `src/Store.Infrastructure/\n  Persistence/\n  Payments/\n  Email/\n  Time/\n  DependencyInjection.cs`, avoid: `src/Store.Application/StripeService.cs\nsrc/Store.Domain/SqlOrder.cs\n\n// Vendor details leak inward.` },
  DbContext: { path: `src/Store.Infrastructure/Persistence/StoreDbContext.cs\n\n// Scoped unit of work; never shared concurrently.`, avoid: `src/Store.Api/Data/GlobalDbContext.cs\n\n// Singleton context shared across requests.` },
  "Entity configurations": { path: `src/Store.Infrastructure/Persistence/Configurations/\n  OrderConfiguration.cs\n  OrderLineConfiguration.cs`, avoid: `src/Store.Domain/Order.cs\n  [Table]\n  [Column]\n  [ForeignKey]\n\n// Persistence metadata shapes the domain.` },
  "EF Core migrations": { path: `src/Store.Infrastructure/Persistence/Migrations/\nartifacts/migrate.sql\n\n// Generated, reviewed, tested, deployed once.`, avoid: `Program.cs → Database.EnsureCreated()\n\n// Every replica attempts unmanaged schema creation.` },
  Repositories: { path: `src/Store.Application/Abstractions/IOrders.cs\nsrc/Store.Infrastructure/Persistence/EfOrders.cs\n\n// Aggregate-specific operations only when useful.`, avoid: `IGenericRepository<T>\n  GetAll / Get / Insert / Update / Delete\n\n// EF is wrapped without adding a domain boundary.` },
  "External service clients": { path: `src/Store.Infrastructure/Inventory/\n  InventoryClient.cs\n  InventoryOptions.cs\n  InventoryResponse.cs`, avoid: `new HttpClient() inside OrderService\n\n// No lifecycle, timeout, cancellation, or integration boundary.` },
  "Options & secrets": { path: `src/Store.Infrastructure/Payments/PaymentOptions.cs\nDeployment secret store:\n  Payments__ApiKey`, avoid: `Constants.cs\n  public const string ApiKey = \"...\";\n\n// Secret compiled into the application.` },
  "Unit test project": { path: `tests/Store.UnitTests/\n  Orders/OrderTests.cs\n  MoneyTests.cs\n\n// References Domain and Application only.`, avoid: `src/Store.Api/Tests/\n\n// Tests compiled into the production project.` },
  "Integration test project": { path: `tests/Store.IntegrationTests/\n  Orders/CreateOrderTests.cs\n  Infrastructure/PostgresFixture.cs`, avoid: `UnitTests/OrdersControllerTests.cs\n\n// Every collaborator mocked; actual API boundary remains untested.` },
  WebApplicationFactory: { path: `tests/Store.IntegrationTests/StoreApiFactory.cs\n\n// Boots the real Program.cs and replaces only external infrastructure.`, avoid: `tests/TestApiProgram.cs\n\n// A separately built test application drifts from production startup.` },
  "Directory.Build.props": { path: `Directory.Build.props\n\nNullable = enable\nTreatWarningsAsErrors = true\nAnalysisLevel = latest-recommended`, avoid: `src/*/*.csproj\n\n// Compiler rules copied with different values in every project.` },
  "global.json & SDK pinning": { path: `global.json\n\n{\n  \"sdk\": {\n    \"version\": \"10.0.100\",\n    \"rollForward\": \"latestFeature\"\n  }\n}`, avoid: `No global.json\n\n// Local development and CI silently select unrelated SDKs.` },
  "Analyzers & formatting": { path: `.editorconfig\nDirectory.Build.props\n\nCI:\n  dotnet format --verify-no-changes\n  dotnet build --warnaserror`, avoid: `Style and correctness rules exist only in review comments.\n\n// Feedback is slow and inconsistent.` },
  "Dependency direction": { path: `Store.Api ─────────────┐\n    ↓                    │ runtime composition\nStore.Application → Store.Domain\n    ↑\nStore.Infrastructure ────┘`, avoid: `Domain → Infrastructure → EF Core\nApplication → Api → HttpContext\n\n// Business policy depends outward.` },
  "DI service lifetimes": { path: `Scoped:    DbContext, unit of work, request services\nTransient: stateless lightweight operations\nSingleton: thread-safe shared services`, avoid: `Singleton ReportService\n  → captures scoped AppDbContext\n\n// Request state becomes application state.` },
  "Async & cancellation": { path: `Endpoint CancellationToken\n  ↓\nUse-case handler\n  ↓\nEF Core / HttpClient async calls`, avoid: `.Result / .Wait()\nnew CancellationToken()\nfire-and-forget Task inside request\n\n// Threads block and abandoned work continues.` },
  "Problem Details": { path: `src/Store.Api/Errors/\n  DomainExceptionHandler.cs\n  ValidationExceptionHandler.cs\n\napplication/problem+json`, avoid: `return Results.Json(new {\n  error = exception.Message,\n  stack = exception.StackTrace\n});\n\n// Internals leak and clients receive inconsistent shapes.` },
  "Logging & observability": { path: `src/Store.Api/Observability/\n  OpenTelemetryExtensions.cs\n\nILogger + traces + metrics\ncorrelation/trace IDs`, avoid: `Console.WriteLine($\"User {email}, token {token}\");\n\n// Secrets leak and text cannot be queried reliably.` },
  "Authentication & authorization": { path: `src/Store.Api/Security/\n  AuthorizationPolicies.cs\n  OrderAuthorizationHandler.cs\n\nRequireAuthorization by default.`, avoid: `if (User.Identity?.IsAuthenticated == true) allow();\n\n// Identity is mistaken for permission.` },
  "Health checks": { path: `/health/live   → process is running\n/health/ready  → critical dependencies ready\n\nDetailed output restricted.`, avoid: `/health → calls every partner and runs a heavy query\n\n// A downstream outage causes healthy instances to restart.` },
  "Publishing & deployment": { path: `artifacts/app/           // immutable dotnet publish output\nartifacts/migrate.sql   // reviewed schema change\nrender.yaml / Dockerfile / pipeline\n\nBuild → test → migrate → release → verify`, avoid: `SSH → git pull → dotnet run\n\n// Every server rebuilds and mutates the database differently.` },
};

Object.assign(topicCopy, {
  "Transient services": authContent("A transient service is created each time it is requested from the container. It fits lightweight, stateless operations whose instances do not need to be shared within a request.", "Register formatters, mappers, or small calculation services as transient when construction is cheap. Dependencies created by the container are disposed with the scope that resolved them, even though multiple instances may exist in one request.", "Use transient for cheap, stateless behavior; do not assume two consumers receive the same instance."),
  "Scoped services": authContent("A scoped service is created once per dependency-injection scope. In ASP.NET Core, the framework creates one scope per HTTP request, so every component in that request receives the same scoped instance.", "DbContext and request-level units of work are normally scoped. Their tracked state stays consistent during one request and is disposed when that request ends.", "Use scoped for request-owned state and never allow it to escape into application-wide objects."),
  "Singleton services": authContent("A singleton service has one container-managed instance for the entire application lifetime. Every request and thread may use it concurrently, so its state and dependencies must be safe for that sharing model.", "Use singleton for thread-safe caches, immutable lookup data, clocks, or stateless coordination services. Avoid mutable request or user state, and let the container dispose singleton instances at shutdown.", "A singleton is shared concurrently and must depend only on singleton-safe collaborators."),
  "Captive dependencies & scopes": authContent("A captive dependency occurs when a longer-lived service captures a shorter-lived one, such as a singleton holding a scoped DbContext. The scoped object effectively becomes long-lived, breaking isolation and disposal assumptions.", "Do not inject scoped services into singletons. A BackgroundService can inject IServiceScopeFactory, create a scope for each unit of work, resolve scoped services inside it, and dispose that scope before the next iteration.", "A dependency must live at least as long as the service that captures it; otherwise create an explicit scope per operation."),
});

Object.assign(dotnetPlacement, {
  "Transient services": { path: `builder.Services.AddTransient<IPriceFormatter, PriceFormatter>();\n\n// Consumer A → PriceFormatter instance 1\n// Consumer B → PriceFormatter instance 2\n// Both are disposed with the resolving scope.`, avoid: `class PriceFormatter {\n  public static string CurrentCurrency;\n}\n\n// Mutable shared state conflicts with transient assumptions.` },
  "Scoped services": { path: `builder.Services.AddScoped<IUnitOfWork, EfUnitOfWork>();\nbuilder.Services.AddDbContext<StoreDbContext>();\n\nHTTP request scope:\n  Endpoint ─┐\n  Handler  ─┼→ same StoreDbContext instance\n  Repository┘`, avoid: `static StoreDbContext Current;\n\n// Request state leaks across users and concurrent requests.` },
  "Singleton services": { path: `builder.Services.AddSingleton<ISystemClock, SystemClock>();\nbuilder.Services.AddSingleton<IProductCache, ProductCache>();\n\n// Thread-safe, no request state, container-owned disposal.`, avoid: `builder.Services.AddSingleton<CurrentUser>();\n\n// One mutable user object is shared by every request.` },
  "Captive dependencies & scopes": { path: `sealed class SyncWorker(IServiceScopeFactory scopes) : BackgroundService\n{\n  protected override async Task ExecuteAsync(CancellationToken ct)\n  {\n    while (!ct.IsCancellationRequested)\n    {\n      await using var scope = scopes.CreateAsyncScope();\n      var job = scope.ServiceProvider.GetRequiredService<ScopedSyncJob>();\n      await job.Run(ct);\n    }\n  }\n}`, avoid: `builder.Services.AddSingleton<ReportCache>();\n\nsealed class ReportCache(StoreDbContext db) { }\n\n// Singleton captures a scoped, non-thread-safe DbContext.` },
});

// The dedicated GraphQL course deliberately uses its own topic names so it can
// go deeper without changing the shorter GraphQL overview in Course 04.
Object.assign(topicCopy, {
  "GraphQL mental model": authContent("GraphQL is a typed query language and execution model for application APIs. A client sends a document describing the fields it needs; the server validates that document against a schema and executes a resolver tree.", "For a product page, request the product, price, inventory summary, and review preview in one named operation. The response mirrors the selection set, making the operation an explicit view-model contract.", "Think in typed graphs and client operations, not in endpoints translated one-for-one into GraphQL fields."),
  "SDL & schema anatomy": authContent("Schema Definition Language describes root operations, object and input types, fields, arguments, enums, interfaces, unions, scalars, and directives. The schema is both an executable contract and the center of developer tooling.", "Start with a small schema file, run schema validation in CI, generate documentation from it, and keep descriptions beside public fields so consumers see intent in their editor.", "Design the schema as a public product surface, not as a serialization of database tables."),
  "Scalar, enum & custom types": authContent("Scalars represent leaf values; enums define closed symbolic sets; custom scalars encode values that need parsing and serialization rules beyond the built-in types.", "Use an enum for OrderStatus, an ISO-8601 DateTime scalar, and a structured Money object when consumers need both amount and currency rather than an ambiguous string.", "Use the narrowest type that communicates and enforces the value's real contract."),
  "Object relationships": authContent("Object fields form the graph. Relationships should reflect domain navigation useful to consumers while hiding storage joins, foreign keys, and service boundaries.", "Expose Product.category and Category.products with bounded arguments. Resolve each relationship through a domain service or loader rather than leaking categoryId as the only way to navigate.", "Model useful domain connections, then make every collection bounded and every hop operationally affordable."),
  "Interfaces & unions": authContent("Interfaces model a shared field contract across types; unions represent a value that may be one of several otherwise unrelated object types. Clients narrow abstract results with inline fragments.", "Return a SearchResult union of Product, Article, and Category, while a Node interface provides a stable id for globally addressable entities.", "Choose an interface for shared guarantees and a union for shared placement without forced common fields."),
  "Nullability & list semantics": authContent("GraphQL fields are nullable by default, and list and item nullability are independent. A non-null failure bubbles to the nearest nullable ancestor and can remove more data than the failing field alone.", "Use [Product!]! only when both the list and every item are guaranteed. Keep an unreliable enrichment field nullable so its failure can preserve the rest of the product response.", "Make non-null a promise the runtime can uphold, not a preference for cleaner generated types."),
  "Query documents & variables": authContent("A GraphQL document contains named operations and fragments. Variables keep runtime values separate from the document, enabling validation, safe encoding, persisted operations, and useful telemetry.", "Send ProductPage($id: ID!) with a JSON variables object instead of interpolating user input into a query string. Give every production operation a stable name.", "Use named, static documents with variables; never construct query syntax from untrusted values."),
  "Aliases, fragments & directives": authContent("Aliases rename response keys, fragments reuse selection sets, and built-in directives conditionally include fields. These features compose client views without changing the server schema.", "Alias two product lookups as primary and comparison, share a ProductCard fragment, and use @include for an optional stock panel controlled by a Boolean variable.", "Use document composition to express UI needs while keeping fragments cohesive and operations understandable."),
  "Pagination with connections": authContent("Cursor connections provide stable, bounded traversal with edges, nodes, cursors, and pageInfo. Cursors should be opaque and tied to a deterministic ordering.", "Request the first 20 orders after a cursor, order by createdAt plus id, fetch one extra row to calculate hasNextPage, and encode ordering values into an opaque cursor.", "Bound every list and make cursor ordering unique, deterministic, and opaque."),
  "Input objects & validation": authContent("Input objects group structured arguments but do not replace domain validation. GraphQL validates shape and declared types; the application still validates business invariants and permissions.", "Accept CreateOrderInput with line items and an idempotency key, reject empty carts in the use-case layer, and return field-specific validation issues through a typed payload.", "Separate transport-shape validation from business rules and authorization."),
  "Mutation payload design": authContent("Mutations should represent domain commands and return purpose-built payloads containing the changed resource plus expected outcome information. Top-level mutation fields execute serially.", "Prefer checkoutCart(input:) over a generic updateCart(status:), and return CheckoutCartPayload with order, userErrors, and a clientMutationId when correlation is useful.", "Name mutations after business intent and design stable, typed outcomes for expected failures."),
  "Idempotency & concurrency": authContent("Retries can repeat mutations after timeouts, while concurrent writers can overwrite one another. Idempotency keys deduplicate commands; version preconditions detect stale writes.", "Persist the caller, mutation name, idempotency key, and result atomically. Require expectedVersion when updating an order and return a typed conflict rather than silently applying stale input.", "Design mutation retries and write conflicts explicitly before clients encounter unreliable networks."),
  "Resolver anatomy": authContent("A resolver receives the parent value, arguments, request context, and execution metadata, then returns a value or promise for one field. Default property resolution is often sufficient for already-loaded values.", "Keep the Query.product resolver thin: validate access through a service, load by id, and return a domain view. Resolve Product.price from the parent without repeating database access.", "Resolvers coordinate field delivery; business rules belong in reusable application services."),
  "Context & dependency boundaries": authContent("Request context carries authenticated identity, scoped loaders, services, locale, and trace metadata. It must not become an untyped bag or a global mutable singleton.", "Create context once per operation from a verified request, expose explicit service interfaces, and construct loaders with that request's authorization scope.", "Keep context request-scoped, typed, minimal, and free of raw secrets."),
  "Solving N+1 with DataLoader": authContent("Nested fields can cause one backend call per parent. A request-scoped loader batches keys seen in the same execution window and memoizes results for that request.", "When 50 orders request customer, collect customer IDs, fetch them with one WHERE id IN query, and return results in exactly the same order as the keys, including missing values.", "Batch at data-source boundaries and scope caches per request and authorization context."),
  "Execution, parallelism & errors": authContent("After parse and validation, query sibling fields may execute concurrently; top-level mutation fields execute serially. Field errors include paths and may coexist with partial data.", "Trace resolver spans and preserve safe error extensions such as a stable code and correlation ID. Mask internal exceptions while retaining the response path needed to locate the failing field.", "Reason about execution as a field tree with partial results, not as one controller returning one status code."),
  "Authentication & field policy": authContent("Authentication normally happens before GraphQL execution, while authorization may apply at operation, object, or field boundaries. A single protected endpoint is not sufficient for a mixed-sensitivity graph.", "Resolve viewer from verified identity, check tenant access in the order loader, and require a finance policy before exposing Order.internalCost—even when the parent order is visible.", "Authorize the resource and sensitive fields close to the data, consistently across every path to them."),
  "Depth, breadth & cost limits": authContent("GraphQL flexibility allows documents with excessive nesting, aliases, list fan-out, or expensive fields. Static depth alone is an incomplete proxy for actual work.", "Set list maximums, limit aliases and tokens, assign field costs, multiply by pagination bounds, enforce a per-client budget before execution, and retain runtime timeouts.", "Bound worst-case work using schema-aware cost plus backend protections."),
  "Persisted & trusted operations": authContent("Persisted operations map a stable hash or identifier to an approved document. They reduce request size, improve allowlisting, and make cost and ownership known before execution.", "Publish operation manifests during client deployment, reject unknown hashes in trusted-document mode, and keep an emergency path for controlled rollout mismatches.", "Use persisted operations as an operational control, not as a replacement for authentication or authorization."),
  "Introspection & safe errors": authContent("Introspection powers GraphQL tooling but can disclose schema shape; errors can leak stack traces, SQL, or sensitive values if passed through directly. The appropriate policy depends on the API audience and environment.", "Allow authenticated developer tooling where needed, rate-limit introspection, disable it for untrusted production consumers when justified, and map internal exceptions to safe public codes.", "Treat schema discovery and error detail as explicit exposure decisions."),
  "Client caching & normalization": authContent("GraphQL client caches often normalize objects by typename and stable identifier, then assemble operation results from entity records. Correct updates depend on identity, field arguments, and merge policies.", "Return id and __typename for entities, configure cursor-page merge behavior, and update or invalidate affected records after a mutation instead of refetching the entire application.", "Give entities stable identity and define pagination and mutation cache behavior deliberately."),
  "Fragments & colocation": authContent("Colocated fragments let UI components declare the fields they consume. Composition builds page operations while keeping data dependencies near rendering code.", "A ProductCard owns ProductCard_product; the grid composes it into ProductGridQuery. Generate fragment types so removing a selected field produces a compile-time failure.", "Colocate stable component data needs, but avoid tiny fragments that obscure the final operation."),
  "Optimistic UI & mutations": authContent("An optimistic response updates the client before server confirmation. It must match the mutation payload shape and have a reconciliation strategy for rejection or canonical server values.", "Optimistically mark a todo complete using its stable id, disable duplicate submission, then replace the optimistic record with the server payload or roll it back on a typed conflict.", "Use optimistic updates only when rollback is clear and the likely server outcome is predictable."),
  "Subscriptions & live updates": authContent("Subscriptions execute a long-lived operation whose source emits events, commonly over WebSocket or server-sent transport. Connection lifecycle, authentication renewal, ordering, and replay require design beyond the schema field.", "Publish orderStatusChanged events keyed by tenant and order, authorize both at subscribe time and delivery time, reconnect with a cursor, and refetch if the replay window has expired.", "Use subscriptions for meaningful live state and specify reconnect, replay, and authorization behavior."),
  "Schema evolution & deprecation": authContent("GraphQL schemas usually evolve additively. Removing, renaming, changing nullability, or altering argument behavior can break existing documents even when server code still compiles.", "Add displayName, deprecate name with a replacement reason, measure field usage by operation, migrate consumers, and remove only after the published support window.", "Drive removals with operation evidence and make deprecations actionable."),
  "Schema registry & CI checks": authContent("A schema registry stores versions and compares proposed changes against known consumer operations. CI checks catch syntactic validity, breaking changes, and composition conflicts before deployment.", "Publish the candidate schema from a pull request, check it against recent production operations and registered clients, and require review for dangerous changes.", "Make compatibility a build-time gate informed by real consumers."),
  "Federation fundamentals": authContent("Federation composes subgraphs owned by different teams into one graph. Entity keys and cross-subgraph field dependencies form contracts that require governance and operational visibility.", "Let Catalog own Product identity and title while Reviews extends Product by id. Compose schemas centrally, trace a request across subgraphs, and avoid chatty entity lookups.", "Federate around stable domain ownership, not merely to split a large schema file."),
  "Testing GraphQL APIs": authContent("Useful tests cover schema compatibility, operation validation, resolver integration, authorization paths, loader batching, error shapes, and representative cost limits.", "Execute named operations against an in-memory server with real parsing and validation, seed isolated data, assert data plus errors, and count repository calls to catch N+1 regressions.", "Test through the GraphQL boundary and assert both contract behavior and backend work."),
  "Observability by operation": authContent("GraphQL usually uses one HTTP route, so route metrics hide which operations and fields are slow or failing. Safe observability uses operation names, normalized signatures, cost, and resolver or dependency spans.", "Record operationName, document hash, duration, error code, and estimated cost; trace slow resolvers without logging variables that may contain secrets.", "Observe logical operations and backend dependencies while keeping documents and variables out of unsafe logs."),
  "Production rollout checklist": authContent("A production GraphQL service needs more than a schema and resolvers: transport limits, timeouts, cost controls, authorization, caching policy, compatibility checks, telemetry, and incident procedures must work together.", "Canary a schema-compatible build, compare latency and error rates by operation hash, verify query-budget rejections, rehearse rollback, and publish ownership for fields and subgraphs.", "Ship the graph as an operated product with limits, evidence, ownership, and rollback."),
});

Object.assign(codeExamples, {
  "GraphQL mental model": authExample("Ask for the view the client needs", "Several fixed endpoint round trips", `GET /products/42\nGET /products/42/reviews?limit=3\nGET /inventory/42`, "One explicit operation", `query ProductPage($id: ID!) {\n  product(id: $id) {\n    name\n    price { amount currency }\n    inventory { available }\n    reviews(first: 3) { nodes { rating summary } }\n  }\n}`),
  "SDL & schema anatomy": authExample("Create a typed public contract", "Storage model exposed directly", `type products_table {\n  product_id: Int\n  category_fk: Int\n}`, "Domain-oriented schema", `type Query { product(id: ID!): Product }\n\ntype Product {\n  id: ID!\n  name: String!\n  category: Category!\n}`),
  "Nullability & list semantics": authExample("Read list syntax from the inside out", "Unexamined non-null everywhere", `type Query { products: [Product!]! }\n# One failed item can null the entire field.`, "Promises matched to reliability", `type Query { products: [Product!]! }\ntype Product {\n  id: ID!\n  recommendation: Recommendation # optional enrichment\n}`),
  "Query documents & variables": authExample("Keep values out of query syntax", "String interpolation", `const query = \`{ product(id: "\${input}") { name } }\``, "Named document plus variables", `query ProductById($id: ID!) {\n  product(id: $id) { id name }\n}\n\nvariables = { "id": "prod_42" }`),
  "Pagination with connections": authExample("Traverse a stable ordered collection", "Unbounded collection", `type Query { orders: [Order!]! }`, "Cursor connection", `orders(first: 20, after: $cursor) {\n  edges { cursor node { id total } }\n  pageInfo { hasNextPage endCursor }\n}`),
  "Mutation payload design": authExample("Model a business command and outcome", "Generic record patch", `mutation { updateOrder(field: "status", value: "PAID") }`, "Purpose-built mutation", `mutation Checkout($input: CheckoutCartInput!) {\n  checkoutCart(input: $input) {\n    order { id status }\n    userErrors { field code message }\n  }\n}`),
  "Resolver anatomy": authExample("Keep delivery logic thin", "Business workflow inside resolver", `resolve: async (_, args) => {\n  // validation, SQL, email, billing, mapping...\n}`, "Delegate to an application service", `product: (_, { id }, ctx) =>\n  ctx.catalog.getVisibleProduct({\n    id, viewer: ctx.viewer\n  })`),
  "Solving N+1 with DataLoader": authExample("Batch relationship loads", "One call for every order", `Order: {\n  customer: order => db.customers.find(order.customerId)\n}`, "Request-scoped batch", `Order: {\n  customer: (order, _, ctx) =>\n    ctx.customersById.load(order.customerId)\n}\n// SELECT ... WHERE id IN (...)`),
  "Authentication & field policy": authExample("Protect the field on every path", "Endpoint-only authorization", `app.use("/graphql", requireLogin)\n// Every authenticated user can resolve every field.`, "Resource and field policy", `Order: {\n  internalCost: (order, _, ctx) => {\n    ctx.policy.require("finance:read", order.tenantId)\n    return order.internalCost\n  }\n}`),
  "Depth, breadth & cost limits": authExample("Budget work before execution", "Only count HTTP requests", `limit: 100 requests/minute\n# One request can select thousands of fields.`, "Schema-aware operation budget", `cost = baseFieldCost\n     × boundedListSize\n     + childSelectionCost\n\nif (cost > viewer.budget) reject()`),
  "Persisted & trusted operations": authExample("Deploy known operation documents", "Accept arbitrary production documents", `POST /graphql\n{ "query": "query HugeDynamicQuery { ... }" }`, "Look up an approved hash", `POST /graphql\n{\n  "extensions": {\n    "persistedQuery": { "sha256Hash": "a91c..." }\n  },\n  "variables": { "id": "prod_42" }\n}`),
  "Client caching & normalization": authExample("Give cached entities stable identity", "Anonymous nested objects", `{ product { name category { title } } }`, "Select identity with the view", `{\n  product {\n    __typename id name\n    category { __typename id title }\n  }\n}`),
  "Subscriptions & live updates": authExample("Design delivery, not only a field", "Subscribe without recovery rules", `subscription { orderChanged { status } }`, "Identified, resumable stream", `subscription OrderUpdates($id: ID!, $after: Cursor) {\n  orderStatusChanged(orderId: $id, after: $after) {\n    cursor\n    order { id status version }\n  }\n}`),
  "Schema evolution & deprecation": authExample("Move consumers before removing fields", "Breaking rename", `type Product { displayName: String! }\n# name was removed immediately`, "Add, deprecate, observe", `type Product {\n  name: String! @deprecated(\n    reason: "Use displayName; removal after 2027-01-01"\n  )\n  displayName: String!\n}`),
  "Federation fundamentals": authExample("Compose around domain ownership", "Shared database as integration", `Catalog, Reviews, Search\n  └─ all read and write product tables`, "Entity extended across subgraphs", `# Catalog subgraph\ntype Product @key(fields: "id") { id: ID!, name: String! }\n\n# Reviews subgraph\ntype Product @key(fields: "id") { id: ID!, reviews: [Review!]! }`),
  "Testing GraphQL APIs": authExample("Exercise the real GraphQL boundary", "Call resolver functions directly", `await resolvers.Query.product(null, { id }, fakeContext)`, "Execute a representative operation", `const result = await server.executeOperation({\n  query: ProductPageDocument,\n  variables: { id: "prod_42" }\n})\nexpect(result.errors).toBeUndefined()\nexpect(repo.calls).toBe(1)`),
  "Observability by operation": authExample("Measure logical operations safely", "One route metric", `POST /graphql  200  840ms\n# Which operation? Which dependency?`, "Low-cardinality operation signals", `operation.name = "ProductPage"\noperation.hash = "a91c..."\noperation.cost = 42\nresolver.slowest = "Product.reviews"\n# Variables are not logged.`),
  "Production rollout checklist": authExample("Gate a release with evidence", "Deploy and wait for reports", `deploy(schema)\n// no compatibility check, limits, or rollback signal`, "Progressive rollout", `schema check → integration tests → canary\n  → compare errors/latency by operation\n  → verify cost limits → promote\n  → retain previous artifact for rollback`),
});
