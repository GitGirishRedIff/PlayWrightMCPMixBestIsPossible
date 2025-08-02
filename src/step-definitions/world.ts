import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { ConfigManager } from '../helpers/config';

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

setWorldConstructor(PlaywrightWorld);
