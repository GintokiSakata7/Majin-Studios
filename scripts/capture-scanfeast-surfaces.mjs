import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE_URL =
  process.env.SCANFEAST_URL ||
  "http://localhost:3000";

const DINER_URL =
  process.env.SCANFEAST_DINER_URL ||
  `${BASE_URL}/scanfeast`;

const KDS_URL =
  process.env.SCANFEAST_KDS_URL ||
  `${BASE_URL}/kitchen`;

const MANAGER_URL =
  process.env.SCANFEAST_MANAGER_URL ||
  `${BASE_URL}/manager`;

const OUTPUT =
  "public/scanfeast/images";

mkdirSync(OUTPUT, { recursive: true });

const browser = await chromium.launch();

try {
  const jobs = [
    {
      name: "diner@3x.png",
      url: DINER_URL,
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      wait: 900,
    },
    {
      name: "kds@2x.png",
      url: KDS_URL,
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
      wait: 1100,
    },
    {
      name: "manager@2x.png",
      url: MANAGER_URL,
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
      wait: 1100,
    },
  ];

  for (const job of jobs) {
    const page = await browser.newPage({
      viewport: job.viewport,
      deviceScaleFactor: job.deviceScaleFactor,
    });

    await page.goto(job.url, {
      waitUntil: "networkidle",
    });

    await page.waitForTimeout(job.wait);

    await page.screenshot({
      path: `${OUTPUT}/${job.name}`,
      fullPage: false,
      animations: "disabled",
    });

    console.log(
      `Captured ${job.name} from ${job.url}`,
    );

    await page.close();
  }
} finally {
  await browser.close();
}
