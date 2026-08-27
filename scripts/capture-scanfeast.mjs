import { chromium } from "playwright";

async function captureScreenshots() {
  const browser = await chromium.launch();

  console.log("Capturing Diner (Mobile)...");
  const dinerPage = await browser.newPage({
    viewport: {
      width: 390,
      height: 844,
    },
    deviceScaleFactor: 3,
  });

  // Setup deterministic state
  await dinerPage.goto("http://localhost:3000/scanfeast?demo=diner&table=1");
  await dinerPage.waitForTimeout(2000); // Wait for animations/fonts
  await dinerPage.screenshot({
    path: "public/scanfeast/images/diner@3x.png",
    fullPage: false,
  });
  await dinerPage.close();

  console.log("Capturing KDS (Desktop)...");
  const kdsPage = await browser.newPage({
    viewport: {
      width: 1440,
      height: 900,
    },
    deviceScaleFactor: 2,
  });

  await kdsPage.goto("http://localhost:3000/scanfeast?demo=kds&order=4029&status=cooking");
  await kdsPage.waitForTimeout(2000);
  await kdsPage.screenshot({
    path: "public/scanfeast/images/kds@2x.png",
  });
  await kdsPage.close();

  console.log("Capturing Manager (Desktop)...");
  const managerPage = await browser.newPage({
    viewport: {
      width: 1440,
      height: 900,
    },
    deviceScaleFactor: 2,
  });

  await managerPage.goto("http://localhost:3000/manager?demo=manager");
  await managerPage.waitForTimeout(2000);
  await managerPage.screenshot({
    path: "public/scanfeast/images/manager@2x.png",
  });
  await managerPage.close();

  await browser.close();
  console.log("Screenshots captured successfully.");
}

captureScreenshots().catch(console.error);
