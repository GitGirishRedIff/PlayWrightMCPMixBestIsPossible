import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { ConfigManager } from '../helpers/config';

export interface ICustomWorld extends World {
    browser: Browser | null;
    context: BrowserContext | null;
    page: Page | null;
    config: ConfigManager;
}

export class CustomWorld extends World implements ICustomWorld {
    browser: Browser | null = null;
    context: BrowserContext | null = null;
    page: Page | null = null;
    config: ConfigManager;

    constructor(options: IWorldOptions) {
        super(options);
        this.config = ConfigManager.getInstance();
    }
}

setWorldConstructor(CustomWorld);