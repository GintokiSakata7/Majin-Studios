export const SCANFEAST_CASE_STUDY = {
  eyebrow: "CASE STUDY / RESTAURANT OPERATING SYSTEM",

  title: "SCANFEAST",

  subtitle:
    "A smart contactless ordering system connecting diners, chefs and management through real-time web technology.",

  category:
    "WEB SAAS / BUSINESS APPLICATION",

  role:
    "DESIGN / FULL-STACK DEVELOPMENT / DEPLOYMENT",

  stack: [
    "REACT",
    "NODE.JS",
    "SOCKET.IO",
    "MONGODB",
  ],

  productSurfaces: [
    {
      id: "diner",
      number: "01",
      label: "DINER EXPERIENCE",
      title:
        "Ordering starts at the table.",
      description:
        "QR-based mobile ordering with live order status.",
    },

    {
      id: "kds",
      number: "02",
      label: "KITCHEN DISPLAY SYSTEM",
      title:
        "The kitchen knows what's next.",
      description:
        "FIFO order handling, timers and live preparation status.",
    },

    {
      id: "manager",
      number: "03",
      label: "MANAGER OPERATIONS",
      title:
        "Everything, in one view.",
      description:
        "Revenue, menu control, help desk and rush-hour visibility.",
    },
  ],

  engineering: [
    {
      number: "01",
      label: "TIME SYNCHRONIZATION",
      title:
        "Never trust the client clock.",
    },

    {
      number: "02",
      label: "SMART PREP",
      title:
        "Preparation time from the order itself.",
    },

    {
      number: "03",
      label: "NETWORK RESILIENCE",
      title:
        "Realtime first. Canonical fallback always.",
    },
  ],

  outcomes: [
    {
      value: "100%",
      label: "DIGITAL ORDERING WORKFLOW",
    },

    {
      value: "<60s",
      label: "TESTED ORDER PLACEMENT",
    },

    {
      value: "RESILIENT",
      label: "ORDER DELIVERY",
    },
  ],
} as const;
