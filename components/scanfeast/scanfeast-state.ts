export type OrderPhase =
  | "idle"
  | "placed"
  | "accepted"
  | "cooking"
  | "ready"
  | "served";

export type ChapterId =
  | "arrival"
  | "ordering"
  | "transmission"
  | "kitchen"
  | "ready"
  | "operations"
  | "system";

export type TimelineChapter = {
  id: ChapterId;
  number: string;
  label: string;
  start: number;
  end: number;
  phase: OrderPhase;
  title: string;
  body: string;
};

export const SCANFEAST_TIMELINE:
  readonly TimelineChapter[] = [
  {
    id: "arrival",
    number: "01",
    label: "ARRIVAL",
    start: 0,
    end: 0.10,
    phase: "idle",

    title:
      "THE RESTAURANT, CONNECTED.",

    body:
      "Scanfeast connects the diner, kitchen and management layer into one real-time operating system.",
  },

  {
    id: "ordering",
    number: "02",
    label: "DINER",
    start: 0.10,
    end: 0.24,
    phase: "placed",

    title:
      "ORDERING STARTS AT THE TABLE.",

    body:
      "Guests scan the table, browse the menu and place an order directly from the browser.",
  },

  {
    id: "transmission",
    number: "03",
    label: "TRANSMISSION",
    start: 0.24,
    end: 0.36,
    phase: "accepted",

    title:
      "ONE ORDER. ZERO FRICTION.",

    body:
      "The order moves immediately from the dining experience into the kitchen workflow.",
  },

  {
    id: "kitchen",
    number: "04",
    label: "KITCHEN",
    start: 0.36,
    end: 0.58,
    phase: "cooking",

    title:
      "THE KITCHEN KNOWS WHAT'S NEXT.",

    body:
      "FIFO ordering, live status, synchronized timers and automated preparation estimates keep the kitchen moving.",
  },

  {
    id: "ready",
    number: "05",
    label: "READY",
    start: 0.58,
    end: 0.68,
    phase: "ready",

    title:
      "READY WHEN THE GUEST IS.",

    body:
      "The finished order returns to the service flow without breaking the chain.",
  },

  {
    id: "operations",
    number: "06",
    label: "OPERATIONS",
    start: 0.68,
    end: 0.85,
    phase: "ready",

    title:
      "EVERYTHING, IN ONE VIEW.",

    body:
      "Managers see orders, revenue, kitchen activity and restaurant pressure in real time.",
  },

  {
    id: "system",
    number: "07",
    label: "SYSTEM",
    start: 0.85,
    end: 1,
    phase: "served",

    title:
      "THE SOFTWARE BEHIND THE RESTAURANT.",

    body:
      "REST APIs, WebSockets, persistence and resilience work together underneath the experience.",
  },
];

export function clamp01(
  value: number
) {
  return Math.min(
    1,
    Math.max(0, value)
  );
}

export function getChapter(
  progress: number
): TimelineChapter {
  const value =
    clamp01(progress);

  return (
    SCANFEAST_TIMELINE.find(
      (chapter) =>
        value >= chapter.start &&
        value < chapter.end
    ) ??
    SCANFEAST_TIMELINE[
      SCANFEAST_TIMELINE.length - 1
    ]
  );
}

export function getOrderPhase(
  progress: number
): OrderPhase {
  return getChapter(progress).phase;
}
