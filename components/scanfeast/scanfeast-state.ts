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
  scene: string;
};

export const SCANFEAST_TIMELINE: readonly TimelineChapter[] = [
  {
    id: "arrival",
    number: "01",
    label: "ARRIVAL",
    start: 0,
    end: 0.10,
    phase: "idle",
    title: "THE RESTAURANT, CONNECTED.",
    body:
      "A real-time operating layer connecting the diner, kitchen and management.",
    scene: "ESTABLISH",
  },
  {
    id: "ordering",
    number: "02",
    label: "DINER",
    start: 0.10,
    end: 0.235,
    phase: "placed",
    title: "ORDERING STARTS AT THE TABLE.",
    body:
      "Guests scan the table, browse the menu and place an order directly from the browser.",
    scene: "TABLE",
  },
  {
    id: "transmission",
    number: "03",
    label: "TRANSMISSION",
    start: 0.235,
    end: 0.34,
    phase: "accepted",
    title: "ONE ORDER. ZERO FRICTION.",
    body:
      "The order moves from the dining experience through the service layer into the kitchen in real time.",
    scene: "EVENT",
  },
  {
    id: "kitchen",
    number: "04",
    label: "KITCHEN",
    start: 0.34,
    end: 0.56,
    phase: "cooking",
    title: "THE KITCHEN KNOWS WHAT'S NEXT.",
    body:
      "FIFO queueing, live status, synchronized timers and automated preparation estimates.",
    scene: "FULFILLMENT",
  },
  {
    id: "ready",
    number: "05",
    label: "READY",
    start: 0.56,
    end: 0.67,
    phase: "ready",
    title: "READY WHEN THE GUEST IS.",
    body:
      "The finished order crosses the service pass and returns to the delivery workflow.",
    scene: "HANDOFF",
  },
  {
    id: "operations",
    number: "06",
    label: "OPERATIONS",
    start: 0.67,
    end: 0.85,
    phase: "ready",
    title: "EVERYTHING, IN ONE VIEW.",
    body:
      "Managers see orders, kitchen activity, revenue and restaurant pressure in real time.",
    scene: "OVERVIEW",
  },
  {
    id: "system",
    number: "07",
    label: "SYSTEM",
    start: 0.85,
    end: 1,
    phase: "served",
    title: "THE SOFTWARE BEHIND THE RESTAURANT.",
    body:
      "REST APIs, realtime events, persistence and resilience working as one system.",
    scene: "ARCHITECTURE",
  },
];

export function clamp01(
  value: number,
) {
  return THREEClamp(value, 0, 1);
}

function THREEClamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    max,
    Math.max(min, value),
  );
}

export function getChapter(
  progress: number,
): TimelineChapter {
  const value = clamp01(progress);

  return (
    SCANFEAST_TIMELINE.find(
      (chapter) =>
        value >= chapter.start &&
        value < chapter.end,
    ) ??
    SCANFEAST_TIMELINE[
    SCANFEAST_TIMELINE.length - 1
    ]
  );
}

export function getChapterProgress(
  progress: number,
) {
  const chapter =
    getChapter(progress);

  return clamp01(
    (clamp01(progress) -
      chapter.start) /
    Math.max(
      chapter.end -
      chapter.start,
      0.0001,
    ),
  );
}

export function getOrderPhase(
  progress: number,
): OrderPhase {
  return getChapter(progress).phase;
}

export function getChapterIndex(
  progress: number,
) {
  return SCANFEAST_TIMELINE.findIndex(
    (chapter) => {
      return (
        progress >= chapter.start &&
        progress < chapter.end
      );
    },
  );
}