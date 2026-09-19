export const engineeringPrinciples = [
  {
    id: "clean-architecture",
    number: "01",
    title: "CLEAN ARCHITECTURE",
    description:
      "Keep responsibilities separated so business logic remains easier to understand, test and evolve.",
    technologies: ["Controller", "Service", "Repository", "Database"],
    diagramType: "layers",
  },
  {
    id: "solid-separation",
    number: "02",
    title: "SOLID / SEPARATION",
    description:
      "Design components around clear responsibilities and boundaries instead of tightly coupled application logic.",
    technologies: ["Domain", "Service", "Data", "API"],
    diagramType: "modules",
  },
  {
    id: "api-first",
    number: "03",
    title: "API-FIRST",
    description:
      "Design predictable REST APIs with DTOs, validation, consistent responses and centralized exception handling.",
    technologies: ["Client", "REST API", "Service", "Data"],
    diagramType: "api",
  },
  {
    id: "security",
    number: "04",
    title: "SECURITY",
    description:
      "Build protected application flows using authentication, authorization and role-based access control.",
    technologies: ["JWT", "Authentication", "Authorization", "Role Access"],
    diagramType: "security",
  },
  {
    id: "real-time",
    number: "05",
    title: "REAL-TIME SYSTEMS",
    description:
      "Use WebSocket/STOMP and event-driven patterns when applications need live communication and state updates.",
    technologies: ["Client", "WebSocket / STOMP", "Spring Boot"],
    diagramType: "realtime",
  },
  {
    id: "testing",
    number: "06",
    title: "TESTABLE CODE",
    description:
      "Use unit testing and mocking to verify business behavior and keep changes safer.",
    technologies: ["JUnit", "Mockito"],
    diagramType: "testing",
  },
];
