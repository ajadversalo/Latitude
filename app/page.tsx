"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Lesson = {
  number: string;
  title: string;
  duration: string;
  topics: string[];
};

type TopicContent = {
  intro: string;
  practice: string;
  takeaway: string;
  nodes: [string, string, string];
};

const lessons: Lesson[] = [
  {
    number: "01",
    title: "APIE · OOP principles",
    duration: "38 min",
    topics: ["Objects & classes", "Encapsulation", "Abstraction", "Inheritance", "Polymorphism"],
  },
  {
    number: "02",
    title: "SOLID",
    duration: "48 min",
    topics: ["Single Responsibility", "Open–Closed", "Liskov Substitution", "Interface Segregation", "Dependency Inversion"],
  },
  {
    number: "03",
    title: "GRASP",
    duration: "62 min",
    topics: ["Information Expert", "Creator", "Controller", "Low Coupling", "High Cohesion", "GRASP Polymorphism", "Pure Fabrication", "Indirection", "Protected Variations"],
  },
  {
    number: "04",
    title: "CUPID",
    duration: "42 min",
    topics: ["Composable", "Unix philosophy", "Predictable", "Idiomatic", "Domain-based"],
  },
  {
    number: "05",
    title: "Simple & pragmatic",
    duration: "46 min",
    topics: ["DRY", "KISS", "YAGNI", "POLA / POLS", "Law of Demeter", "CQS / CQRS"],
  },
  {
    number: "06",
    title: "Antipatterns",
    duration: "44 min",
    topics: ["STUPID overview", "Singleton", "Tight Coupling", "Untestability", "Premature Optimization", "Excessive Indirection", "Duplication", "WET"],
  },
];

const authLessons: Lesson[] = [
  { number: "01", title: "Identity foundations", duration: "54 min", topics: ["Authentication vs authorization", "Principals, credentials & claims", "Password storage", "Sessions & cookies", "MFA & passkeys"] },
  { number: "02", title: "OAuth & OpenID Connect", duration: "68 min", topics: ["What OAuth actually does", "OAuth roles", "Scopes & consent", "Protocol endpoints & discovery", "OAuth vs OpenID Connect"] },
  { number: "03", title: "Tokens in depth", duration: "82 min", topics: ["Access tokens", "Refresh tokens", "ID tokens", "JWT anatomy", "Validating JWTs", "Opaque tokens & introspection"] },
  { number: "04", title: "Grants & flows", duration: "76 min", topics: ["Authorization Code + PKCE", "Client Credentials", "Device Authorization", "Refresh token rotation", "Deprecated OAuth flows"] },
  { number: "05", title: "Application architecture", duration: "74 min", topics: ["Server-side web apps", "SPA & Backend-for-Frontend", "Native applications", "Resource server design", "Multi-tenant identity"] },
  { number: "06", title: "Security & operations", duration: "96 min", topics: ["State, nonce & PKCE", "Redirect URI security", "CSRF, XSS & token storage", "Sender-constrained tokens", "JWKS & key rotation", "Revocation & logout", "Threat modeling & monitoring"] },
];

const dotnetLessons: Lesson[] = [
  { number: "01", title: "Solution anatomy", duration: "62 min", topics: ["Solution & project files", "Program.cs", "appsettings files", "launchSettings.json", "Dependencies & NuGet"] },
  { number: "02", title: "The API boundary", duration: "78 min", topics: ["Controllers vs Minimal APIs", "Endpoints & routing", "Contracts & DTOs", "Middleware pipeline", "Filters", "OpenAPI documentation"] },
  { number: "03", title: "Application & domain", duration: "86 min", topics: ["Application layer", "Feature folders", "Domain entities", "Value objects", "Use cases & services", "Validation & mapping"] },
  { number: "04", title: "Infrastructure & data", duration: "88 min", topics: ["Infrastructure project", "DbContext", "Entity configurations", "EF Core migrations", "Repositories", "External service clients", "Options & secrets"] },
  { number: "05", title: "Tests & shared tooling", duration: "72 min", topics: ["Unit test project", "Integration test project", "WebApplicationFactory", "Directory.Build.props", "global.json & SDK pinning", "Analyzers & formatting"] },
  { number: "06", title: "Production practices", duration: "142 min", topics: ["Dependency direction", "DI service lifetimes", "Transient services", "Scoped services", "Singleton services", "Captive dependencies & scopes", "Async & cancellation", "Problem Details", "Logging & observability", "Authentication & authorization", "Health checks", "Publishing & deployment"] },
];

const allCourseLessons = [...lessons, ...authLessons, ...dotnetLessons];

const lessonMeaning: Record<string, string> = {
  "01": "Abstraction · Polymorphism · Inheritance · Encapsulation",
  "02": "Single responsibility · Open–closed · Liskov substitution · Interface segregation · Dependency inversion",
  "03": "General Responsibility Assignment Software Patterns",
  "04": "Composable · Unix philosophy · Predictable · Idiomatic · Domain-based",
  "05": "Small rules for keeping software direct, understandable, and useful",
  "06": "Singleton · Tight coupling · Untestability · Premature optimization · Indirection · Duplication",
};

const authLessonMeaning: Record<string, string> = {
  "01": "Identity, credentials, password handling, sessions, and modern authentication factors",
  "02": "Delegated authorization and the OpenID Connect identity layer",
  "03": "Access, refresh, and ID tokens—including safe validation and lifecycle",
  "04": "How clients obtain and renew authority across different environments",
  "05": "Trust boundaries for web, browser, native, API, and multi-tenant systems",
  "06": "Attack resistance, key lifecycle, revocation, detection, and incident readiness",
};

const dotnetLessonMeaning: Record<string, string> = {
  "01": "The files that define, configure, build, and start an ASP.NET Core solution",
  "02": "The HTTP-facing boundary: routes, request contracts, pipeline behavior, and documentation",
  "03": "Business use cases and domain rules kept independent from delivery and persistence details",
  "04": "Database access, external integrations, configuration, and other replaceable implementation details",
  "05": "Fast feedback, realistic API tests, consistent builds, and shared engineering policy",
  "06": "Dependency safety, runtime correctness, security, diagnostics, health, and deployment",
};

const expandedName: Record<string, string> = {
  DRY: "Don’t Repeat Yourself",
  KISS: "Keep It Simple, Stupid",
  YAGNI: "You Aren’t Gonna Need It",
  "POLA / POLS": "Principle of Least Astonishment / Principle of Least Surprise",
  "Law of Demeter": "LoD · Law of Demeter",
  "CQS / CQRS": "Command–Query Separation / Command Query Responsibility Segregation",
  "STUPID overview": "Singleton · Tight coupling · Untestability · Premature optimization · excessive Indirection · Duplication",
  WET: "Write Everything Twice / Waste Everyone’s Time",
};

const authContent = (intro: string, practice: string, takeaway: string): TopicContent => ({ intro, practice, takeaway, nodes: ["Threat", "Control", "Outcome"] });

const topicCopy: Record<string, TopicContent> = {};

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
});

const codeExamples: Record<string, { title: string; badLabel: string; bad: string; goodLabel: string; good: string }> = {
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

const diagramKind: Record<string, string> = {
  "Objects & classes": "object", Encapsulation: "boundary", Abstraction: "boundary", Inheritance: "hierarchy", Polymorphism: "branch",
  "Single Responsibility": "split", "Open–Closed": "plug", "Liskov Substitution": "contract", "Interface Segregation": "split", "Dependency Inversion": "inversion",
  "Information Expert": "owner", Creator: "creator", Controller: "controller", "Low Coupling": "bridge", "High Cohesion": "cohesion", "GRASP Polymorphism": "branch", "Pure Fabrication": "adapter", Indirection: "mediator", "Protected Variations": "shield",
  Composable: "pipeline", "Unix philosophy": "pipeline", Predictable: "equation", Idiomatic: "path", "Domain-based": "translate",
  DRY: "source", KISS: "path", YAGNI: "trim", "POLA / POLS": "expectation", "Law of Demeter": "neighbors", "CQS / CQRS": "split",
  "STUPID overview": "smell", Singleton: "bottleneck", "Tight Coupling": "tangle", Untestability: "sealed", "Premature Optimization": "detour", "Excessive Indirection": "maze", Duplication: "drift", WET: "drift",
};

function ConceptDiagram({ topic, nodes }: { topic: string; nodes: [string, string, string] }) {
  const kind = diagramKind[topic] ?? "pipeline";
  const labels = nodes.map((node, index) => <div className={styles.visualNode} key={node}><small>0{index + 1}</small><strong>{node}</strong></div>);

  if (["boundary", "shield", "sealed"].includes(kind)) return (
    <div className={`${styles.conceptVisual} ${styles.visualBoundary}`}>
      <div className={styles.outerBoundary}><span>{kind === "sealed" ? "hidden side effects" : "stable boundary"}</span><div className={styles.innerBoundary}>{labels[0]}{labels[1]}</div></div>
      <div className={styles.boundaryGate}>controlled access →</div>{labels[2]}
    </div>
  );

  if (["hierarchy", "branch", "contract", "plug"].includes(kind)) return (
    <div className={`${styles.conceptVisual} ${styles.visualBranch}`}>
      <div className={styles.branchTop}>{kind === "plug" ? "extension point" : kind === "contract" ? "promised contract" : labels[0]}</div>
      <div className={styles.branchStem} /><div className={styles.branchBar} />
      <div className={styles.branchChildren}>{labels[1]}{labels[2]}</div>
      <p>{kind === "contract" ? "Both implementations must keep the same promise" : "One stable shape, multiple valid behaviors"}</p>
    </div>
  );

  if (["split", "inversion"].includes(kind)) return (
    <div className={`${styles.conceptVisual} ${styles.visualSplit}`}>
      <div className={styles.splitSource}>{labels[0]}</div>
      <div className={styles.splitFork}><span>↙</span><b>{kind === "inversion" ? "abstraction" : "separate"}</b><span>↘</span></div>
      <div className={styles.splitTargets}>{labels[1]}{labels[2]}</div>
    </div>
  );

  if (["owner", "creator", "cohesion", "object"].includes(kind)) return (
    <div className={`${styles.conceptVisual} ${styles.visualOwner}`}>
      <div className={styles.ownerBox}><span>{topic}</span><div>{labels}</div></div>
      <p>Responsibility stays with the object that has the knowledge</p>
    </div>
  );

  if (["controller", "bridge", "adapter", "mediator", "neighbors", "translate"].includes(kind)) return (
    <div className={`${styles.conceptVisual} ${styles.visualMediator}`}>
      {labels[0]}<span className={styles.flowArrow}>→</span><div className={styles.mediatorCore}>{kind}</div><span className={styles.flowArrow}>→</span>{labels[2]}
      <div className={styles.mediatorCaption}>{labels[1]}</div>
    </div>
  );

  if (["source", "drift"].includes(kind)) return (
    <div className={`${styles.conceptVisual} ${styles.visualSource}`}>
      <div className={styles.sourceRoot}>{kind === "source" ? "one source of truth" : "copied rule"}</div>
      <div className={styles.sourceLines}><i /><i /><i /></div>
      <div className={styles.sourceCopies}>{labels}</div>
      {kind === "drift" && <div className={styles.driftMark}>version drift</div>}
    </div>
  );

  if (["path", "trim", "detour", "maze"].includes(kind)) return (
    <div className={`${styles.conceptVisual} ${styles.visualPath}`}>
      <div className={styles.pathStart}>need</div>
      <div className={`${styles.pathRoute} ${kind !== "path" ? styles.pathRouteBad : ""}`}><i /><i /><i /><i /></div>
      <div className={styles.pathFinish}>working solution</div>
      <div className={styles.directRoute}>direct path →</div>
      <p>{kind === "trim" ? "Remove imagined requirements" : "Complexity lengthens the route"}</p>
    </div>
  );

  if (["smell", "tangle", "bottleneck"].includes(kind)) return (
    <div className={`${styles.conceptVisual} ${styles.visualSmell}`}>
      <div className={styles.tangleLines}><i /><i /><i /><i /></div>
      <div className={styles.smellCore}>{kind === "bottleneck" ? "global instance" : "hidden coupling"}</div>
      <div className={styles.smellSymptoms}>{labels}</div>
    </div>
  );

  return (
    <div className={`${styles.conceptVisual} ${styles.visualPipeline}`}>
      {labels.map((label, index) => <div className={styles.pipelinePart} key={index}>{label}{index < 2 && <span>→</span>}</div>)}
      <p>{kind === "equation" ? "same input + explicit context = same output" : "Small, legible steps compose into behavior"}</p>
    </div>
  );
}

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

const dotnetPlacement: Record<string, { path: string; avoid: string }> = {
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

export default function Home() {
  const [openLessons, setOpenLessons] = useState<number[]>([0]);
  const [activeTopic, setActiveTopic] = useState("Objects & classes");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [openCourses, setOpenCourses] = useState<string[]>(["01"]);
  const [savedTopic, setSavedTopic] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("latitude-theme");
    const initialTheme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    const storedTopic = window.localStorage.getItem("latitude-saved-topic");
    if (storedTopic && allCourseLessons.some((lesson) => lesson.topics.includes(storedTopic))) setSavedTopic(storedTopic);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("latitude-theme", nextTheme);
  };

  const toggleLesson = (index: number) => {
    setOpenLessons((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  const toggleCourse = (course: string) => {
    setOpenCourses((current) =>
      current.includes(course) ? current.filter((item) => item !== course) : [...current, course],
    );
  };

  const selectTopic = (topic: string) => {
    const inCourseOne = lessons.some((lesson) => lesson.topics.includes(topic));
    const inCourseTwo = authLessons.some((lesson) => lesson.topics.includes(topic));
    const course = inCourseOne ? "01" : inCourseTwo ? "02" : "03";
    const courseLessons = inCourseOne ? lessons : inCourseTwo ? authLessons : dotnetLessons;
    const offset = inCourseOne ? 0 : inCourseTwo ? 100 : 200;
    const lessonIndex = courseLessons.findIndex((lesson) => lesson.topics.includes(topic));
    setOpenCourses((current) => current.includes(course) ? current : [...current, course]);
    if (lessonIndex >= 0) setOpenLessons((current) => current.includes(lessonIndex + offset) ? current : [...current, lessonIndex + offset]);
    setActiveTopic(topic);
    setMenuOpen(false);
  };

  const bookmarkTopic = () => {
    if (savedTopic === activeTopic) {
      setSavedTopic(null);
      window.localStorage.removeItem("latitude-saved-topic");
      return;
    }
    setSavedTopic(activeTopic);
    window.localStorage.setItem("latitude-saved-topic", activeTopic);
  };

  const resumeSavedTopic = () => {
    if (!savedTopic) return;
    const inCourseOne = lessons.some((lesson) => lesson.topics.includes(savedTopic));
    const inCourseTwo = authLessons.some((lesson) => lesson.topics.includes(savedTopic));
    const course = inCourseOne ? "01" : inCourseTwo ? "02" : "03";
    const courseLessons = inCourseOne ? lessons : inCourseTwo ? authLessons : dotnetLessons;
    const offset = inCourseOne ? 0 : inCourseTwo ? 100 : 200;
    const lessonIndex = courseLessons.findIndex((lesson) => lesson.topics.includes(savedTopic)) + offset;
    setOpenCourses((current) => current.includes(course) ? current : [...current, course]);
    setOpenLessons((current) => current.includes(lessonIndex) ? current : [...current, lessonIndex]);
    selectTopic(savedTopic);
  };

  const copy = topicCopy[activeTopic] ?? {
    intro: "This topic is ready for its lesson content, examples, and diagrams.",
    practice: "A practical example for this principle will be added here.",
    takeaway: "Use the principle when it makes the design easier to understand and change.",
    nodes: ["Principle", "Decision", "Outcome"] as [string, string, string],
  };
  const activeLesson = allCourseLessons.find((lesson) => lesson.topics.includes(activeTopic)) ?? lessons[0];
  const oopTopics = lessons.flatMap((lesson) => lesson.topics);
  const authTopics = authLessons.flatMap((lesson) => lesson.topics);
  const dotnetTopics = dotnetLessons.flatMap((lesson) => lesson.topics);
  const allTopics = [...oopTopics, ...authTopics, ...dotnetTopics];
  const activeCourse = oopTopics.includes(activeTopic) ? "01" : authTopics.includes(activeTopic) ? "02" : "03";
  const activeCourseTopics = activeCourse === "01" ? oopTopics : activeCourse === "02" ? authTopics : dotnetTopics;
  const courseTopicIndex = activeCourseTopics.indexOf(activeTopic);
  const activeIndex = allTopics.indexOf(activeTopic);
  const nextTopic = allTopics[(activeIndex + 1) % allTopics.length];
  const placement = dotnetPlacement[activeTopic];
  const codeExample = codeExamples[activeTopic] ?? (placement ? {
    title: `Give ${activeTopic.toLowerCase()} a clear home`,
    badLabel: "Avoid unclear ownership",
    bad: placement.avoid,
    goodLabel: "Recommended structure",
    good: `${placement.path}\n\n// ${copy.takeaway}`,
  } : undefined);

  const renderLessons = (courseLessons: Lesson[], offset: number, label: string) => (
    <nav className={styles.lessonNav} aria-label={label}>
      {courseLessons.map((lesson, index) => {
        const lessonKey = index + offset;
        const isOpen = openLessons.includes(lessonKey);
        return (
          <div className={styles.lesson} key={lesson.number}>
            <button className={styles.lessonHeader} onClick={() => toggleLesson(lessonKey)} aria-expanded={isOpen}>
              <span className={styles.lessonNumber}>{lesson.number}</span>
              <span className={styles.lessonTitle}><strong>{lesson.title}</strong><small>{lesson.duration}</small></span>
              <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}>⌄</span>
            </button>
            <div className={`${styles.topicList} ${isOpen ? styles.topicListOpen : ""}`}>
              {lesson.topics.map((topic, topicIndex) => (
                <button key={topic} className={`${styles.topicButton} ${activeTopic === topic ? styles.topicActive : ""}`} onClick={() => selectTopic(topic)}>
                  <span>{String(topicIndex + 1).padStart(2, "0")}</span>{topic}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );

  const sidebar = (
    <>
      <div className={styles.brand}>
        <span className={styles.brandMark}>L</span>
        <span>Latitude</span>
      </div>
      <div className={styles.courseStack}>
        <section className={styles.courseGroup}>
          <button className={styles.courseHeader} onClick={() => toggleCourse("01")} aria-expanded={openCourses.includes("01")}>
            <span><small>Course 01</small><strong>Object-oriented design</strong></span>
            <span className={`${styles.courseChevron} ${openCourses.includes("01") ? styles.courseChevronOpen : ""}`}>⌄</span>
          </button>
          <div className={`${styles.courseBody} ${openCourses.includes("01") ? styles.courseBodyOpen : ""}`}>
            <div className={styles.courseBodyInner}>
              <div className={styles.courseMeta}>
                <h2>Object-oriented design,<br />made clear.</h2>
                <div className={styles.progressRow}>
                  <span>{activeCourse === "01" ? Math.round(((courseTopicIndex + 1) / oopTopics.length) * 100) : 0}% complete</span>
                  <span>{activeCourse === "01" ? courseTopicIndex + 1 : 0} / {oopTopics.length}</span>
                </div>
                <div className={styles.progressTrack}><span style={{ width: `${activeCourse === "01" ? ((courseTopicIndex + 1) / oopTopics.length) * 100 : 0}%` }} /></div>
                {savedTopic && oopTopics.includes(savedTopic) && (
                  <button className={styles.resumeButton} onClick={resumeSavedTopic}>
                    <span>Resume</span><strong>{savedTopic}</strong><b>→</b>
                  </button>
                )}
              </div>
              {renderLessons(lessons, 0, "Course 01 lessons")}
            </div>
          </div>
        </section>
        <section className={styles.courseGroup}>
          <button className={styles.courseHeader} onClick={() => toggleCourse("02")} aria-expanded={openCourses.includes("02")}>
            <span><small>Course 02</small><strong>Authentication</strong></span>
            <span className={`${styles.courseChevron} ${openCourses.includes("02") ? styles.courseChevronOpen : ""}`}>⌄</span>
          </button>
          <div className={`${styles.courseBody} ${openCourses.includes("02") ? styles.courseBodyOpen : ""}`}>
            <div className={styles.courseBodyInner}>
              <div className={styles.courseMeta}>
                <h2>Authentication,<br />from first principles.</h2>
                <div className={styles.progressRow}>
                  <span>{activeCourse === "02" ? Math.round(((courseTopicIndex + 1) / authTopics.length) * 100) : 0}% complete</span>
                  <span>{activeCourse === "02" ? courseTopicIndex + 1 : 0} / {authTopics.length}</span>
                </div>
                <div className={styles.progressTrack}><span style={{ width: `${activeCourse === "02" ? ((courseTopicIndex + 1) / authTopics.length) * 100 : 0}%` }} /></div>
                {savedTopic && authTopics.includes(savedTopic) && (
                  <button className={styles.resumeButton} onClick={resumeSavedTopic}>
                    <span>Resume</span><strong>{savedTopic}</strong><b>→</b>
                  </button>
                )}
              </div>
              {renderLessons(authLessons, 100, "Course 02 lessons")}
            </div>
          </div>
        </section>
        <section className={styles.courseGroup}>
          <button className={styles.courseHeader} onClick={() => toggleCourse("03")} aria-expanded={openCourses.includes("03")}>
            <span><small>Course 03</small><strong>ASP.NET Core Web API</strong></span>
            <span className={`${styles.courseChevron} ${openCourses.includes("03") ? styles.courseChevronOpen : ""}`}>⌄</span>
          </button>
          <div className={`${styles.courseBody} ${openCourses.includes("03") ? styles.courseBodyOpen : ""}`}>
            <div className={styles.courseBodyInner}>
              <div className={styles.courseMeta}>
                <h2>ASP.NET Core APIs,<br />structured for change.</h2>
                <div className={styles.progressRow}>
                  <span>{activeCourse === "03" ? Math.round(((courseTopicIndex + 1) / dotnetTopics.length) * 100) : 0}% complete</span>
                  <span>{activeCourse === "03" ? courseTopicIndex + 1 : 0} / {dotnetTopics.length}</span>
                </div>
                <div className={styles.progressTrack}><span style={{ width: `${activeCourse === "03" ? ((courseTopicIndex + 1) / dotnetTopics.length) * 100 : 0}%` }} /></div>
                {savedTopic && dotnetTopics.includes(savedTopic) && (
                  <button className={styles.resumeButton} onClick={resumeSavedTopic}>
                    <span>Resume</span><strong>{savedTopic}</strong><b>→</b>
                  </button>
                )}
              </div>
              {renderLessons(dotnetLessons, 200, "Course 03 lessons")}
            </div>
          </div>
        </section>
      </div>
    </>
  );

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      {menuOpen && <button className={styles.backdrop} onClick={() => setMenuOpen(false)} aria-label="Close lesson menu" />}
      <aside className={`${styles.mobileSidebar} ${menuOpen ? styles.mobileSidebarOpen : ""}`}>{sidebar}</aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <button className={styles.menuButton} onClick={() => setMenuOpen(true)} aria-label="Open lesson menu">☰</button>
          <div className={styles.breadcrumb}><span>Course {activeCourse} · Lesson {activeLesson.number}</span><b>/</b><strong>{activeTopic}</strong></div>
          <div className={styles.topActions}>
            <button className={`${styles.bookmarkButton} ${savedTopic === activeTopic ? styles.bookmarkActive : ""}`} onClick={bookmarkTopic} aria-label={savedTopic === activeTopic ? "Remove saved position" : "Save this topic as your position"} title={savedTopic === activeTopic ? "Remove saved position" : "Save where you left off"}>
              <span aria-hidden="true">{savedTopic === activeTopic ? "★" : "☆"}</span>
            </button>
            <button className={styles.themeToggle} onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
              <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
            </button>
          </div>
        </header>

        <article className={styles.article}>
          <div className={styles.articleIntro}>
            <p className={styles.eyebrow}>Course {activeCourse} · Lesson {activeLesson.number} · {activeLesson.title}</p>
            <h1>{activeTopic}</h1>
            {expandedName[activeTopic] && <p className={styles.expandedName}>{expandedName[activeTopic]}</p>}
            <div className={styles.definition}>
              <span>What it means</span>
              <p>{copy.intro}</p>
            </div>
            <p className={styles.familyMeaning}><strong>{activeLesson.title.split(" · ")[0]}</strong> {activeCourse === "01" ? lessonMeaning[activeLesson.number] : activeCourse === "02" ? authLessonMeaning[activeLesson.number] : dotnetLessonMeaning[activeLesson.number]}</p>
          </div>

          <div className={styles.readingGrid}>
            <div>
              <p className={styles.sectionNumber}>02 — Applied</p>
              <h2>{codeExample?.title ?? `A concrete ${activeTopic} decision.`}</h2>
            </div>
            <div className={styles.bodyCopy}>
              <div className={styles.appliedContext}>
                <span>{activeCourse === "01" ? "Example context" : "Implementation guidance"}</span>
                <p>{copy.practice}</p>
              </div>
              {codeExample && (
                <div className={styles.codeComparison}>
                  <div className={styles.codePanelBad}>
                    <span><b>×</b>{codeExample.badLabel}</span>
                    <pre><code>{codeExample.bad}</code></pre>
                  </div>
                  <div className={styles.codePanelGood}>
                    <span><b>✓</b>{codeExample.goodLabel}</span>
                    <pre><code>{codeExample.good}</code></pre>
                  </div>
                </div>
              )}
              <aside><span>Design rule</span>{copy.takeaway}</aside>
            </div>
          </div>

          <footer className={styles.nextTopic}>
            <span><small>Up next</small><strong>{nextTopic}</strong></span>
            <button onClick={() => selectTopic(nextTopic)}>Continue <span>→</span></button>
          </footer>
        </article>
      </section>
    </main>
  );
}
