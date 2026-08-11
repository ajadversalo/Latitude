"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { codeExamples, dotnetPlacement, topicCopy } from "./course-content";

type Lesson = {
  number: string;
  title: string;
  duration: string;
  topics: string[];
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

const apiLessons: Lesson[] = [
  { number: "01", title: "API foundations", duration: "52 min", topics: ["REST constraints", "Resources & representations", "GraphQL execution model", "Choosing an API style"] },
  { number: "02", title: "REST API design", duration: "72 min", topics: ["HTTP methods & safety", "Status codes & errors", "Filtering, sorting & pagination", "Caching & conditional requests"] },
  { number: "03", title: "GraphQL design", duration: "78 min", topics: ["Schemas & type systems", "Queries, mutations & subscriptions", "Resolvers & data loading", "Nullability & error handling"] },
  { number: "04", title: "Production APIs", duration: "84 min", topics: ["Versioning & evolution", "Authentication & field authorization", "Rate limits & query complexity", "Observability & testing"] },
];

const figmaLessons: Lesson[] = [
  { number: "01", title: "Figma foundations", duration: "48 min", topics: ["Files, pages & layers", "Frames & sections", "Vector networks", "Constraints & resizing"] },
  { number: "02", title: "Layout & visual systems", duration: "66 min", topics: ["Auto layout", "Typography systems", "Color styles & variables", "Grids, spacing & hierarchy"] },
  { number: "03", title: "Components & prototypes", duration: "74 min", topics: ["Components & instances", "Variants & properties", "Interactive prototypes", "Responsive component patterns"] },
  { number: "04", title: "Collaboration & delivery", duration: "62 min", topics: ["Libraries & governance", "Design critique & comments", "Developer handoff", "Accessible design workflows"] },
];

const systemDesignLessons: Lesson[] = [
  { number: "01", title: "Framing the system", duration: "64 min", topics: ["Functional requirements", "Quality attributes", "Capacity estimation", "Architecture diagrams"] },
  { number: "02", title: "Services & traffic", duration: "78 min", topics: ["Monoliths & microservices", "API gateways", "Load balancing", "Service discovery"] },
  { number: "03", title: "Data & storage", duration: "94 min", topics: ["SQL vs NoSQL", "Data modeling", "Indexes & query patterns", "Replication", "Partitioning & sharding", "Object storage & search"] },
  { number: "04", title: "Scale & performance", duration: "86 min", topics: ["Horizontal & vertical scaling", "Caching strategies", "CDNs & edge delivery", "Backpressure & load shedding"] },
  { number: "05", title: "Distributed systems", duration: "108 min", topics: ["CAP & PACELC", "Consistency models", "Distributed transactions", "Consensus & leader election", "Distributed IDs & clocks"] },
  { number: "06", title: "Messaging & workflows", duration: "82 min", topics: ["Queues & pub-sub", "Event streaming", "Delivery semantics", "Sagas & orchestration"] },
  { number: "07", title: "Reliability patterns", duration: "92 min", topics: ["Timeouts & retries", "Idempotency", "Circuit breakers & bulkheads", "Rate limiting", "Disaster recovery"] },
  { number: "08", title: "Production architecture", duration: "88 min", topics: ["Security boundaries", "Observability & SLOs", "Deployment strategies", "Multi-region design", "Cost & sustainability"] },
  { number: "09", title: "Design exercises", duration: "126 min", topics: ["URL shortener", "News feed", "Chat system", "File storage service", "Search autocomplete"] },
];

const companyBestPracticesLessons: Lesson[] = [
  {
    number: "01",
    title: "Operating a growing product team",
    duration: "90 min",
    topics: ["Azure resource group management", "Sprint planning", "Front-end ticket planning & tools"],
  },
];

const graphqlLessons: Lesson[] = [
  { number: "01", title: "GraphQL foundations", duration: "82 min", topics: ["GraphQL mental model", "SDL & schema anatomy", "Scalar, enum & custom types", "Object relationships", "Interfaces & unions", "Nullability & list semantics"] },
  { number: "02", title: "Query language in depth", duration: "76 min", topics: ["Query documents & variables", "Aliases, fragments & directives", "Pagination with connections", "Input objects & validation"] },
  { number: "03", title: "Mutations & workflows", duration: "68 min", topics: ["Mutation payload design", "Idempotency & concurrency"] },
  { number: "04", title: "Server execution", duration: "92 min", topics: ["Resolver anatomy", "Context & dependency boundaries", "Solving N+1 with DataLoader", "Execution, parallelism & errors"] },
  { number: "05", title: "Security & demand control", duration: "84 min", topics: ["Authentication & field policy", "Depth, breadth & cost limits", "Persisted & trusted operations", "Introspection & safe errors"] },
  { number: "06", title: "Client architecture", duration: "78 min", topics: ["Client caching & normalization", "Fragments & colocation", "Optimistic UI & mutations", "Subscriptions & live updates"] },
  { number: "07", title: "Evolution & federation", duration: "74 min", topics: ["Schema evolution & deprecation", "Schema registry & CI checks", "Federation fundamentals"] },
  { number: "08", title: "Testing & production", duration: "72 min", topics: ["Testing GraphQL APIs", "Observability by operation", "Production rollout checklist"] },
];

const kubernetesLessons: Lesson[] = [
  { number: "01", title: "Cluster foundations", duration: "84 min", topics: ["Kubernetes architecture", "API objects & desired state", "Namespaces, labels & annotations", "kubectl & declarative workflows"] },
  { number: "02", title: "Workload controllers", duration: "96 min", topics: ["Pods & container lifecycle", "Deployments & ReplicaSets", "StatefulSets & identity", "DaemonSets, Jobs & CronJobs", "Init containers & sidecars"] },
  { number: "03", title: "Networking & traffic", duration: "92 min", topics: ["Services & discovery", "Ingress & Gateway API", "Cluster networking & DNS", "NetworkPolicy"] },
  { number: "04", title: "Configuration & storage", duration: "88 min", topics: ["ConfigMaps & configuration", "Secrets & external secret stores", "Volumes, PVs & PVCs", "Storage lifecycle & backups"] },
  { number: "05", title: "Resources & scheduling", duration: "94 min", topics: ["Requests, limits & QoS", "Scheduling & placement", "Probes & graceful termination", "Autoscaling workloads", "Cluster capacity & disruption"] },
  { number: "06", title: "Security & policy", duration: "86 min", topics: ["RBAC & service accounts", "Pod security & runtime hardening", "Supply-chain & admission policy"] },
  { number: "07", title: "Delivery & packaging", duration: "72 min", topics: ["Helm & Kustomize", "GitOps & progressive delivery"] },
  { number: "08", title: "Production operations", duration: "92 min", topics: ["Logs, metrics & traces", "Debugging failing workloads", "Upgrades, backup & disaster recovery"] },
];

const eventDrivenLessons: Lesson[] = [
  { number: "01", title: "Event-driven foundations", duration: "86 min", topics: ["Event-driven design mental model", "Events, commands & messages", "Domain, integration & notification events", "Event storming & discovery", "Bounded contexts & ownership", "Choosing event-driven architecture"] },
  { number: "02", title: "Event contract design", duration: "82 min", topics: ["Event envelope & metadata", "Schema design & evolution", "Event granularity & payloads", "Ordering, time & identity"] },
  { number: "03", title: "Brokers & delivery", duration: "92 min", topics: ["Topics, queues & subscriptions", "Partitioning & consumer groups", "Delivery semantics", "Acknowledgement, retry & backoff", "Dead-letter & quarantine flows"] },
  { number: "04", title: "Consistency patterns", duration: "88 min", topics: ["Idempotent consumers", "Transactional outbox", "Inbox & deduplication", "Change data capture", "Eventual consistency & UX"] },
  { number: "05", title: "Distributed workflows", duration: "82 min", topics: ["Sagas & process managers", "Orchestration vs choreography"] },
  { number: "06", title: "Event sourcing", duration: "90 min", topics: ["Event sourcing fundamentals", "Aggregates & optimistic concurrency", "Projections, snapshots & replay"] },
  { number: "07", title: "Testing & observability", duration: "78 min", topics: ["Testing event-driven systems", "Observability & correlation", "Backpressure & load shedding"] },
  { number: "08", title: "Production recovery", duration: "72 min", topics: ["Replay & incident recovery", "Event-driven production checklist"] },
];

const rabbitMqLessons: Lesson[] = [
  { number: "01", title: "Messaging foundations", duration: "72 min", topics: ["Why asynchronous messaging", "RabbitMQ architecture", "AMQP 0-9-1 model", "Connections & channels", "Virtual hosts"] },
  { number: "02", title: "Exchanges, queues & routing", duration: "96 min", topics: ["Declaring topology", "Direct exchanges", "Fanout exchanges", "Topic exchanges", "Headers exchanges", "Default exchange & bindings"] },
  { number: "03", title: "Publishing reliably", duration: "102 min", topics: ["Message properties & metadata", "Publisher confirms", "Mandatory publishing & returns", "Durable topology & persistent messages", "Message ordering", "Publisher connection recovery"] },
  { number: "04", title: "Consuming safely", duration: "112 min", topics: ["Consumer acknowledgements", "Prefetch & flow control", "Competing consumers", "Idempotent consumers", "Consumer cancellation", "Graceful shutdown"] },
  { number: "05", title: "Failures, retries & dead letters", duration: "118 min", topics: ["Negative acknowledgements", "Dead-letter exchanges", "Retry topologies", "Poison messages", "Time-to-live & expiration", "Quorum queue delivery limits"] },
  { number: "06", title: "Patterns & workflows", duration: "126 min", topics: ["Work queues", "Publish-subscribe", "Request-reply", "Correlation identifiers", "Saga messaging", "Outbox & inbox patterns"] },
  { number: "07", title: "Queues at scale", duration: "116 min", topics: ["Classic vs quorum queues", "Streams & super streams", "Lazy queue behavior", "Single active consumer", "Priority queues", "Backpressure & capacity planning"] },
  { number: "08", title: "Security & operations", duration: "124 min", topics: ["TLS & client authentication", "Users, permissions & vhosts", "Resource alarms", "Metrics & observability", "Clustering & partitions", "Backup, recovery & upgrades"] },
  { number: "09", title: "Production architecture", duration: "138 min", topics: ["High availability design", "Federation & Shovel", "Schema evolution", "Testing message-driven systems", "Performance tuning", "Production readiness review"] },
];

const allCourseLessons = [...lessons, ...authLessons, ...dotnetLessons, ...apiLessons, ...figmaLessons, ...systemDesignLessons, ...companyBestPracticesLessons, ...graphqlLessons, ...kubernetesLessons, ...eventDrivenLessons, ...rabbitMqLessons];

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

const apiLessonMeaning: Record<string, string> = {
  "01": "The core models behind resource-oriented REST and schema-oriented GraphQL APIs",
  "02": "Predictable HTTP semantics, responses, collection navigation, and cache behavior",
  "03": "Strong schemas, operation types, efficient resolution, and explicit failure behavior",
  "04": "Safe evolution, layered access control, abuse resistance, diagnostics, and confidence",
};

const figmaLessonMeaning: Record<string, string> = {
  "01": "The document structure, drawing model, frames, and resizing rules behind dependable design files",
  "02": "Repeatable layout, type, color, spacing, and hierarchy decisions that create visual coherence",
  "03": "Reusable UI building blocks and realistic interaction models across screen sizes and states",
  "04": "Shared libraries, constructive feedback, implementation-ready specifications, and inclusive design",
};

const systemDesignLessonMeaning: Record<string, string> = {
  "01": "Turning an ambiguous problem into explicit workloads, constraints, estimates, and system boundaries",
  "02": "Shaping service boundaries and routing traffic safely to healthy, discoverable compute",
  "03": "Choosing data models and storage paths from access patterns, scale, and correctness needs",
  "04": "Growing throughput and controlling latency while protecting the system under pressure",
  "05": "Reasoning about consistency, coordination, time, and failure across independent machines",
  "06": "Decoupling work with asynchronous delivery, durable logs, and long-running workflow patterns",
  "07": "Containing failure, making repetition safe, controlling demand, and planning recovery",
  "08": "Operating secure, observable, deployable, multi-region systems within a sustainable budget",
  "09": "Applying the design process to familiar systems with distinct workloads and tradeoffs",
};

const companyBestPracticesLessonMeaning: Record<string, string> = {
  "01": "Practical cloud governance, delivery planning, and implementation-ready front-end work for small and growing teams",
};

const graphqlLessonMeaning: Record<string, string> = {
  "01": "The type system, graph model, and nullability guarantees behind every GraphQL API",
  "02": "Writing safe, reusable operations and navigating large collections predictably",
  "03": "Domain commands with typed outcomes, safe retries, and concurrency protection",
  "04": "How fields execute, how dependencies are scoped, and how batching prevents N+1 work",
  "05": "Layered authorization, bounded query cost, trusted documents, and controlled exposure",
  "06": "Normalized caches, colocated data needs, responsive mutations, and realtime delivery",
  "07": "Compatibility-driven schema change and graphs composed across domain teams",
  "08": "Contract tests, operation-level telemetry, progressive delivery, and rollback readiness",
};

const kubernetesLessonMeaning: Record<string, string> = {
  "01": "The API, control loops, object model, and declarative workflow behind a cluster",
  "02": "Choosing controllers and Pod composition from the lifecycle and identity a workload needs",
  "03": "Stable discovery, north-south routing, cluster data paths, DNS, and least-privilege connectivity",
  "04": "Delivering configuration and secrets while selecting durable, recoverable storage",
  "05": "Honest resource accounting, resilient placement, health, scaling, and planned disruption",
  "06": "Least-privilege identities, hardened runtimes, trusted artifacts, and admission enforcement",
  "07": "Reviewable packaging, continuously reconciled state, and evidence-driven rollouts",
  "08": "Correlated telemetry, systematic diagnosis, safe upgrades, and verified recovery",
};

const eventDrivenLessonMeaning: Record<string, string> = {
  "01": "Business facts, message intent, domain discovery, ownership, and the tradeoffs of asynchronous collaboration",
  "02": "Durable event identities, useful payloads, compatible schemas, and explicit ordering guarantees",
  "03": "Topology, partitioning, delivery, retries, and poison-message handling across brokered systems",
  "04": "Closing dual-write gaps, making repeated delivery safe, and designing honest eventually consistent experiences",
  "05": "Durable multi-service workflows with explicit coordination, timeouts, and compensation",
  "06": "Event history as source of truth, aggregate concurrency, projections, snapshots, and controlled rebuilds",
  "07": "Deterministic tests, end-to-end correlation, bounded consumers, and dependency-aware flow control",
  "08": "Safe replay, incident recovery, and production readiness across the complete event lifecycle",
};

const rabbitMqLessonMeaning: Record<string, string> = {
  "01": "The broker, protocol, isolation boundaries, and client primitives behind RabbitMQ messaging",
  "02": "Explicit exchange and binding rules that route messages into queues without coupling publishers to consumers",
  "03": "Knowing whether the broker accepted a message and preserving intent through failures and reconnects",
  "04": "Controlling work, acknowledging only completed effects, and stopping consumers without losing messages",
  "05": "Bounded redelivery, delayed retries, quarantine, expiration, and safe handling of permanently failing work",
  "06": "Reusable messaging interactions and consistency patterns for workflows that cross service boundaries",
  "07": "Selecting queue types and controlling memory, disk, throughput, ordering, and consumer concurrency",
  "08": "Protecting, observing, clustering, restoring, and upgrading a production RabbitMQ deployment",
  "09": "Combining reliability, compatibility, testing, performance, and recovery into an operable system",
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


export default function Home() {
  const [openLessons, setOpenLessons] = useState<number[]>([0]);
  const [activeTopic, setActiveTopic] = useState("Objects & classes");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [openCourses, setOpenCourses] = useState<string[]>(["01"]);
  const [courseFilter, setCourseFilter] = useState("");
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
    const inCourseThree = dotnetLessons.some((lesson) => lesson.topics.includes(topic));
    const inCourseFour = apiLessons.some((lesson) => lesson.topics.includes(topic));
    const inCourseFive = figmaLessons.some((lesson) => lesson.topics.includes(topic));
    const inCourseSix = systemDesignLessons.some((lesson) => lesson.topics.includes(topic));
    const inCourseSeven = companyBestPracticesLessons.some((lesson) => lesson.topics.includes(topic));
    const inCourseEight = graphqlLessons.some((lesson) => lesson.topics.includes(topic));
    const inCourseNine = kubernetesLessons.some((lesson) => lesson.topics.includes(topic));
    const inCourseTen = eventDrivenLessons.some((lesson) => lesson.topics.includes(topic));
    const course = inCourseOne ? "01" : inCourseTwo ? "02" : inCourseThree ? "03" : inCourseFour ? "04" : inCourseFive ? "05" : inCourseSix ? "06" : inCourseSeven ? "07" : inCourseEight ? "08" : inCourseNine ? "09" : inCourseTen ? "10" : "11";
    const courseLessons = inCourseOne ? lessons : inCourseTwo ? authLessons : inCourseThree ? dotnetLessons : inCourseFour ? apiLessons : inCourseFive ? figmaLessons : inCourseSix ? systemDesignLessons : inCourseSeven ? companyBestPracticesLessons : inCourseEight ? graphqlLessons : inCourseNine ? kubernetesLessons : inCourseTen ? eventDrivenLessons : rabbitMqLessons;
    const offset = inCourseOne ? 0 : inCourseTwo ? 100 : inCourseThree ? 200 : inCourseFour ? 300 : inCourseFive ? 400 : inCourseSix ? 500 : inCourseSeven ? 600 : inCourseEight ? 700 : inCourseNine ? 800 : inCourseTen ? 900 : 1000;
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
    const inCourseThree = dotnetLessons.some((lesson) => lesson.topics.includes(savedTopic));
    const inCourseFour = apiLessons.some((lesson) => lesson.topics.includes(savedTopic));
    const inCourseFive = figmaLessons.some((lesson) => lesson.topics.includes(savedTopic));
    const inCourseSix = systemDesignLessons.some((lesson) => lesson.topics.includes(savedTopic));
    const inCourseSeven = companyBestPracticesLessons.some((lesson) => lesson.topics.includes(savedTopic));
    const inCourseEight = graphqlLessons.some((lesson) => lesson.topics.includes(savedTopic));
    const inCourseNine = kubernetesLessons.some((lesson) => lesson.topics.includes(savedTopic));
    const inCourseTen = eventDrivenLessons.some((lesson) => lesson.topics.includes(savedTopic));
    const course = inCourseOne ? "01" : inCourseTwo ? "02" : inCourseThree ? "03" : inCourseFour ? "04" : inCourseFive ? "05" : inCourseSix ? "06" : inCourseSeven ? "07" : inCourseEight ? "08" : inCourseNine ? "09" : inCourseTen ? "10" : "11";
    const courseLessons = inCourseOne ? lessons : inCourseTwo ? authLessons : inCourseThree ? dotnetLessons : inCourseFour ? apiLessons : inCourseFive ? figmaLessons : inCourseSix ? systemDesignLessons : inCourseSeven ? companyBestPracticesLessons : inCourseEight ? graphqlLessons : inCourseNine ? kubernetesLessons : inCourseTen ? eventDrivenLessons : rabbitMqLessons;
    const offset = inCourseOne ? 0 : inCourseTwo ? 100 : inCourseThree ? 200 : inCourseFour ? 300 : inCourseFive ? 400 : inCourseSix ? 500 : inCourseSeven ? 600 : inCourseEight ? 700 : inCourseNine ? 800 : inCourseTen ? 900 : 1000;
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
  const apiTopics = apiLessons.flatMap((lesson) => lesson.topics);
  const figmaTopics = figmaLessons.flatMap((lesson) => lesson.topics);
  const systemDesignTopics = systemDesignLessons.flatMap((lesson) => lesson.topics);
  const companyBestPracticesTopics = companyBestPracticesLessons.flatMap((lesson) => lesson.topics);
  const graphqlTopics = graphqlLessons.flatMap((lesson) => lesson.topics);
  const kubernetesTopics = kubernetesLessons.flatMap((lesson) => lesson.topics);
  const eventDrivenTopics = eventDrivenLessons.flatMap((lesson) => lesson.topics);
  const rabbitMqTopics = rabbitMqLessons.flatMap((lesson) => lesson.topics);
  const allTopics = [...oopTopics, ...authTopics, ...dotnetTopics, ...apiTopics, ...figmaTopics, ...systemDesignTopics, ...companyBestPracticesTopics, ...graphqlTopics, ...kubernetesTopics, ...eventDrivenTopics, ...rabbitMqTopics];
  const activeCourse = oopTopics.includes(activeTopic) ? "01" : authTopics.includes(activeTopic) ? "02" : dotnetTopics.includes(activeTopic) ? "03" : apiTopics.includes(activeTopic) ? "04" : figmaTopics.includes(activeTopic) ? "05" : systemDesignTopics.includes(activeTopic) ? "06" : companyBestPracticesTopics.includes(activeTopic) ? "07" : graphqlTopics.includes(activeTopic) ? "08" : kubernetesTopics.includes(activeTopic) ? "09" : eventDrivenTopics.includes(activeTopic) ? "10" : "11";
  const activeCourseTopics = activeCourse === "01" ? oopTopics : activeCourse === "02" ? authTopics : activeCourse === "03" ? dotnetTopics : activeCourse === "04" ? apiTopics : activeCourse === "05" ? figmaTopics : activeCourse === "06" ? systemDesignTopics : activeCourse === "07" ? companyBestPracticesTopics : activeCourse === "08" ? graphqlTopics : activeCourse === "09" ? kubernetesTopics : activeCourse === "10" ? eventDrivenTopics : rabbitMqTopics;
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
  const normalizedCourseFilter = courseFilter.trim().toLocaleLowerCase();
  const courseMatches = (title: string, courseLessons: Lesson[]) =>
    !normalizedCourseFilter || [title, ...courseLessons.flatMap((lesson) => [lesson.title, ...lesson.topics])]
      .some((value) => value.toLocaleLowerCase().includes(normalizedCourseFilter));
  const visibleCourseCount = [
    ["Object-oriented design", lessons],
    ["Authentication", authLessons],
    ["ASP.NET Core Web API", dotnetLessons],
    ["GraphQL & REST APIs", apiLessons],
    ["Figma", figmaLessons],
    ["System Design", systemDesignLessons],
    ["Small to medium company best practices", companyBestPracticesLessons],
    ["GraphQL in depth", graphqlLessons],
    ["Kubernetes in depth", kubernetesLessons],
    ["Event-Driven Design", eventDrivenLessons],
    ["RabbitMQ", rabbitMqLessons],
  ].filter(([title, courseLessons]) => courseMatches(title as string, courseLessons as Lesson[])).length;

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
      <div className={styles.courseSearch}>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={courseFilter}
          onChange={(event) => setCourseFilter(event.target.value)}
          placeholder="Find a course or topic"
          aria-label="Filter courses by title, lesson, or topic"
        />
        {courseFilter && <button onClick={() => setCourseFilter("")} aria-label="Clear course filter">×</button>}
      </div>
      <div className={styles.courseStack}>
        {visibleCourseCount === 0 && <p className={styles.noCourseResults}>No courses match “{courseFilter.trim()}”.</p>}
        <section className={styles.courseGroup} hidden={!courseMatches("Object-oriented design", lessons)}>
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
        <section className={styles.courseGroup} hidden={!courseMatches("Authentication", authLessons)}>
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
        <section className={styles.courseGroup} hidden={!courseMatches("ASP.NET Core Web API", dotnetLessons)}>
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
        <section className={styles.courseGroup} hidden={!courseMatches("GraphQL & REST APIs", apiLessons)}>
          <button className={styles.courseHeader} onClick={() => toggleCourse("04")} aria-expanded={openCourses.includes("04")}>
            <span><small>Course 04</small><strong>GraphQL & REST APIs</strong></span>
            <span className={`${styles.courseChevron} ${openCourses.includes("04") ? styles.courseChevronOpen : ""}`}>⌄</span>
          </button>
          <div className={`${styles.courseBody} ${openCourses.includes("04") ? styles.courseBodyOpen : ""}`}>
            <div className={styles.courseBodyInner}>
              <div className={styles.courseMeta}>
                <h2>GraphQL and REST,<br />designed with intent.</h2>
                <div className={styles.progressRow}>
                  <span>{activeCourse === "04" ? Math.round(((courseTopicIndex + 1) / apiTopics.length) * 100) : 0}% complete</span>
                  <span>{activeCourse === "04" ? courseTopicIndex + 1 : 0} / {apiTopics.length}</span>
                </div>
                <div className={styles.progressTrack}><span style={{ width: `${activeCourse === "04" ? ((courseTopicIndex + 1) / apiTopics.length) * 100 : 0}%` }} /></div>
                {savedTopic && apiTopics.includes(savedTopic) && (
                  <button className={styles.resumeButton} onClick={resumeSavedTopic}>
                    <span>Resume</span><strong>{savedTopic}</strong><b>→</b>
                  </button>
                )}
              </div>
              {renderLessons(apiLessons, 300, "Course 04 lessons")}
            </div>
          </div>
        </section>
        <section className={styles.courseGroup} hidden={!courseMatches("Figma", figmaLessons)}>
          <button className={styles.courseHeader} onClick={() => toggleCourse("05")} aria-expanded={openCourses.includes("05")}>
            <span><small>Course 05</small><strong>Figma</strong></span>
            <span className={`${styles.courseChevron} ${openCourses.includes("05") ? styles.courseChevronOpen : ""}`}>⌄</span>
          </button>
          <div className={`${styles.courseBody} ${openCourses.includes("05") ? styles.courseBodyOpen : ""}`}>
            <div className={styles.courseBodyInner}>
              <div className={styles.courseMeta}>
                <h2>Figma,<br />from canvas to handoff.</h2>
                <div className={styles.progressRow}>
                  <span>{activeCourse === "05" ? Math.round(((courseTopicIndex + 1) / figmaTopics.length) * 100) : 0}% complete</span>
                  <span>{activeCourse === "05" ? courseTopicIndex + 1 : 0} / {figmaTopics.length}</span>
                </div>
                <div className={styles.progressTrack}><span style={{ width: `${activeCourse === "05" ? ((courseTopicIndex + 1) / figmaTopics.length) * 100 : 0}%` }} /></div>
                {savedTopic && figmaTopics.includes(savedTopic) && (
                  <button className={styles.resumeButton} onClick={resumeSavedTopic}>
                    <span>Resume</span><strong>{savedTopic}</strong><b>→</b>
                  </button>
                )}
              </div>
              {renderLessons(figmaLessons, 400, "Course 05 lessons")}
            </div>
          </div>
        </section>
        <section className={styles.courseGroup} hidden={!courseMatches("System Design", systemDesignLessons)}>
          <button className={styles.courseHeader} onClick={() => toggleCourse("06")} aria-expanded={openCourses.includes("06")}>
            <span><small>Course 06</small><strong>System Design</strong></span>
            <span className={`${styles.courseChevron} ${openCourses.includes("06") ? styles.courseChevronOpen : ""}`}>⌄</span>
          </button>
          <div className={`${styles.courseBody} ${openCourses.includes("06") ? styles.courseBodyOpen : ""}`}>
            <div className={styles.courseBodyInner}>
              <div className={styles.courseMeta}>
                <h2>System design,<br />from requirements to scale.</h2>
                <div className={styles.progressRow}>
                  <span>{activeCourse === "06" ? Math.round(((courseTopicIndex + 1) / systemDesignTopics.length) * 100) : 0}% complete</span>
                  <span>{activeCourse === "06" ? courseTopicIndex + 1 : 0} / {systemDesignTopics.length}</span>
                </div>
                <div className={styles.progressTrack}><span style={{ width: `${activeCourse === "06" ? ((courseTopicIndex + 1) / systemDesignTopics.length) * 100 : 0}%` }} /></div>
                {savedTopic && systemDesignTopics.includes(savedTopic) && (
                  <button className={styles.resumeButton} onClick={resumeSavedTopic}>
                    <span>Resume</span><strong>{savedTopic}</strong><b>→</b>
                  </button>
                )}
              </div>
              {renderLessons(systemDesignLessons, 500, "Course 06 lessons")}
            </div>
          </div>
        </section>
        <section className={styles.courseGroup} hidden={!courseMatches("Small to medium company best practices", companyBestPracticesLessons)}>
          <button className={styles.courseHeader} onClick={() => toggleCourse("07")} aria-expanded={openCourses.includes("07")}>
            <span><small>Course 07</small><strong>Small to medium company best practices</strong></span>
            <span className={`${styles.courseChevron} ${openCourses.includes("07") ? styles.courseChevronOpen : ""}`}>⌄</span>
          </button>
          <div className={`${styles.courseBody} ${openCourses.includes("07") ? styles.courseBodyOpen : ""}`}>
            <div className={styles.courseBodyInner}>
              <div className={styles.courseMeta}>
                <h2>Practical company practices,<br />built for growing teams.</h2>
                <div className={styles.progressRow}>
                  <span>{activeCourse === "07" ? Math.round(((courseTopicIndex + 1) / companyBestPracticesTopics.length) * 100) : 0}% complete</span>
                  <span>{activeCourse === "07" ? courseTopicIndex + 1 : 0} / {companyBestPracticesTopics.length}</span>
                </div>
                <div className={styles.progressTrack}><span style={{ width: `${activeCourse === "07" ? ((courseTopicIndex + 1) / companyBestPracticesTopics.length) * 100 : 0}%` }} /></div>
                {savedTopic && companyBestPracticesTopics.includes(savedTopic) && (
                  <button className={styles.resumeButton} onClick={resumeSavedTopic}>
                    <span>Resume</span><strong>{savedTopic}</strong><b>→</b>
                  </button>
                )}
              </div>
              {renderLessons(companyBestPracticesLessons, 600, "Course 07 lessons")}
            </div>
          </div>
        </section>
        <section className={styles.courseGroup} hidden={!courseMatches("GraphQL in depth", graphqlLessons)}>
          <button className={styles.courseHeader} onClick={() => toggleCourse("08")} aria-expanded={openCourses.includes("08")}>
            <span><small>Course 08</small><strong>GraphQL in depth</strong></span>
            <span className={`${styles.courseChevron} ${openCourses.includes("08") ? styles.courseChevronOpen : ""}`}>⌄</span>
          </button>
          <div className={`${styles.courseBody} ${openCourses.includes("08") ? styles.courseBodyOpen : ""}`}>
            <div className={styles.courseBodyInner}>
              <div className={styles.courseMeta}>
                <h2>GraphQL,<br />from schema to production.</h2>
                <div className={styles.progressRow}>
                  <span>{activeCourse === "08" ? Math.round(((courseTopicIndex + 1) / graphqlTopics.length) * 100) : 0}% complete</span>
                  <span>{activeCourse === "08" ? courseTopicIndex + 1 : 0} / {graphqlTopics.length}</span>
                </div>
                <div className={styles.progressTrack}><span style={{ width: `${activeCourse === "08" ? ((courseTopicIndex + 1) / graphqlTopics.length) * 100 : 0}%` }} /></div>
                {savedTopic && graphqlTopics.includes(savedTopic) && (
                  <button className={styles.resumeButton} onClick={resumeSavedTopic}>
                    <span>Resume</span><strong>{savedTopic}</strong><b>→</b>
                  </button>
                )}
              </div>
              {renderLessons(graphqlLessons, 700, "Course 08 lessons")}
            </div>
          </div>
        </section>
        <section className={styles.courseGroup} hidden={!courseMatches("Kubernetes in depth", kubernetesLessons)}>
          <button className={styles.courseHeader} onClick={() => toggleCourse("09")} aria-expanded={openCourses.includes("09")}>
            <span><small>Course 09</small><strong>Kubernetes in depth</strong></span>
            <span className={`${styles.courseChevron} ${openCourses.includes("09") ? styles.courseChevronOpen : ""}`}>⌄</span>
          </button>
          <div className={`${styles.courseBody} ${openCourses.includes("09") ? styles.courseBodyOpen : ""}`}>
            <div className={styles.courseBodyInner}>
              <div className={styles.courseMeta}>
                <h2>Kubernetes,<br />from cluster to production.</h2>
                <div className={styles.progressRow}>
                  <span>{activeCourse === "09" ? Math.round(((courseTopicIndex + 1) / kubernetesTopics.length) * 100) : 0}% complete</span>
                  <span>{activeCourse === "09" ? courseTopicIndex + 1 : 0} / {kubernetesTopics.length}</span>
                </div>
                <div className={styles.progressTrack}><span style={{ width: `${activeCourse === "09" ? ((courseTopicIndex + 1) / kubernetesTopics.length) * 100 : 0}%` }} /></div>
                {savedTopic && kubernetesTopics.includes(savedTopic) && (
                  <button className={styles.resumeButton} onClick={resumeSavedTopic}>
                    <span>Resume</span><strong>{savedTopic}</strong><b>→</b>
                  </button>
                )}
              </div>
              {renderLessons(kubernetesLessons, 800, "Course 09 lessons")}
            </div>
          </div>
        </section>
        <section className={styles.courseGroup} hidden={!courseMatches("Event-Driven Design", eventDrivenLessons)}>
          <button className={styles.courseHeader} onClick={() => toggleCourse("10")} aria-expanded={openCourses.includes("10")}>
            <span><small>Course 10</small><strong>Event-Driven Design</strong></span>
            <span className={`${styles.courseChevron} ${openCourses.includes("10") ? styles.courseChevronOpen : ""}`}>⌄</span>
          </button>
          <div className={`${styles.courseBody} ${openCourses.includes("10") ? styles.courseBodyOpen : ""}`}>
            <div className={styles.courseBodyInner}>
              <div className={styles.courseMeta}>
                <h2>Event-driven design,<br />from domain facts to production.</h2>
                <div className={styles.progressRow}>
                  <span>{activeCourse === "10" ? Math.round(((courseTopicIndex + 1) / eventDrivenTopics.length) * 100) : 0}% complete</span>
                  <span>{activeCourse === "10" ? courseTopicIndex + 1 : 0} / {eventDrivenTopics.length}</span>
                </div>
                <div className={styles.progressTrack}><span style={{ width: `${activeCourse === "10" ? ((courseTopicIndex + 1) / eventDrivenTopics.length) * 100 : 0}%` }} /></div>
                {savedTopic && eventDrivenTopics.includes(savedTopic) && (
                  <button className={styles.resumeButton} onClick={resumeSavedTopic}>
                    <span>Resume</span><strong>{savedTopic}</strong><b>→</b>
                  </button>
                )}
              </div>
              {renderLessons(eventDrivenLessons, 900, "Course 10 lessons")}
            </div>
          </div>
        </section>
        <section className={styles.courseGroup} hidden={!courseMatches("RabbitMQ", rabbitMqLessons)}>
          <button className={styles.courseHeader} onClick={() => toggleCourse("11")} aria-expanded={openCourses.includes("11")}>
            <span><small>Course 11</small><strong>RabbitMQ</strong></span>
            <span className={`${styles.courseChevron} ${openCourses.includes("11") ? styles.courseChevronOpen : ""}`}>⌄</span>
          </button>
          <div className={`${styles.courseBody} ${openCourses.includes("11") ? styles.courseBodyOpen : ""}`}>
            <div className={styles.courseBodyInner}>
              <div className={styles.courseMeta}>
                <h2>RabbitMQ,<br />from message to production.</h2>
                <div className={styles.progressRow}>
                  <span>{activeCourse === "11" ? Math.round(((courseTopicIndex + 1) / rabbitMqTopics.length) * 100) : 0}% complete</span>
                  <span>{activeCourse === "11" ? courseTopicIndex + 1 : 0} / {rabbitMqTopics.length}</span>
                </div>
                <div className={styles.progressTrack}><span style={{ width: `${activeCourse === "11" ? ((courseTopicIndex + 1) / rabbitMqTopics.length) * 100 : 0}%` }} /></div>
                {savedTopic && rabbitMqTopics.includes(savedTopic) && (
                  <button className={styles.resumeButton} onClick={resumeSavedTopic}>
                    <span>Resume</span><strong>{savedTopic}</strong><b>→</b>
                  </button>
                )}
              </div>
              {renderLessons(rabbitMqLessons, 1000, "Course 11 lessons")}
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
            <p className={styles.familyMeaning}><strong>{activeLesson.title.split(" · ")[0]}</strong> {activeCourse === "01" ? lessonMeaning[activeLesson.number] : activeCourse === "02" ? authLessonMeaning[activeLesson.number] : activeCourse === "03" ? dotnetLessonMeaning[activeLesson.number] : activeCourse === "04" ? apiLessonMeaning[activeLesson.number] : activeCourse === "05" ? figmaLessonMeaning[activeLesson.number] : activeCourse === "06" ? systemDesignLessonMeaning[activeLesson.number] : activeCourse === "07" ? companyBestPracticesLessonMeaning[activeLesson.number] : activeCourse === "08" ? graphqlLessonMeaning[activeLesson.number] : activeCourse === "09" ? kubernetesLessonMeaning[activeLesson.number] : activeCourse === "10" ? eventDrivenLessonMeaning[activeLesson.number] : rabbitMqLessonMeaning[activeLesson.number]}</p>
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
