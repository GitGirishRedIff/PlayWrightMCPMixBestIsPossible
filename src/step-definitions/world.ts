import { setWorldConstructor, World , After, AfterStep  } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { ConfigManager } from '../helpers/config';
import fs from 'fs';
import path from 'path';

export interface CustomWorld extends World {
    browser: Browser | null;
    context: BrowserContext | null;
    page: Page | null;
    config: ConfigManager;
}

class PlaywrightWorld extends World implements CustomWorld {
    browser: Browser | null = null;
    context: BrowserContext | null = null;
    page: Page | null = null;
    config: ConfigManager;

    constructor(options: any) {
        super(options);
        this.config = ConfigManager.getInstance();
    }
}

// After(async function (scenario) {
//   // if (scenario.result?.status === 'FAILED') {
//     const screenshotPath = path.resolve(`reports/screenshots/${Date.now()}.png`);
//     await this.page.screenshot({ path: screenshotPath, fullPage: true });

//     if (!fs.existsSync('reports/screenshots')) {
//       fs.mkdirSync('reports/screenshots', { recursive: true });
//     }

//     // Attach screenshot to scenario (for HTML formatter or embedding)
//     this.attach(fs.readFileSync(screenshotPath), 'image/png');
//   // }

//   await this.page?.close();
//   await this.context?.close();
//   await this.browser?.close();
// });

AfterStep(async function ({ pickleStep }) {
  const stepName = pickleStep.text.replace(/[^a-z0-9]/gi, '_');  // Clean filename
  const timestamp = Date.now();
  const screenshotDir = 'reports/screenshots';

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const filePath = path.join(screenshotDir, `${timestamp}_${stepName}.png`);

  await this.page.screenshot({ path: filePath, fullPage: true });

  // Attach screenshot to report
  this.attach(fs.readFileSync(filePath), 'image/png');
});

setWorldConstructor(PlaywrightWorld);
