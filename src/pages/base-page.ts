import { Page } from '@playwright/test';
import { ConfigManager } from '../helpers/config';

export class BasePage {
    protected page: Page;
    protected config: ConfigManager;

    constructor(page: Page) {
        this.page = page;
        this.config = ConfigManager.getInstance();
    }

    async navigate(path: string = ''): Promise<void> {
        await this.page.goto(`${this.config.getBaseUrl()}${path}`);
    }

    async waitForElement(selector: string, options: { timeout?: number; state?: 'visible' | 'hidden' | 'attached' | 'detached' } = {}): Promise<void> {
        const timeout = options.timeout || this.config.getDefaultTimeout();
        const state = options.state || 'visible';
        await this.page.waitForSelector(selector, { timeout, state });
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({
            path: `${this.config.getScreenshotsPath()}/${name}.png`,
            fullPage: true
        });
    }

    async getText(selector: string): Promise<string | null> {
        return await this.page.$eval(selector, (el) => el.textContent);
    }

    async click(selector: string): Promise<void> {
        await this.waitForElement(selector);
        await this.page.click(selector);
    }

    async type(selector: string, text: string): Promise<void> {
        await this.waitForElement(selector);
        await this.page.fill(selector, text);
    }

    async isVisible(selector: string): Promise<boolean> {
        const element = await this.page.$(selector);
        return element !== null && await element.isVisible();
    }
}
