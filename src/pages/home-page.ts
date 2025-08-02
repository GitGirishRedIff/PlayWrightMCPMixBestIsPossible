import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
    private readonly headingSelector = 'h1';
    private readonly moreInfoLinkSelector = 'a';

    constructor(page: Page) {
        super(page);
    }

    async isHomePageVisible(): Promise<boolean> {
        return await this.isVisible(this.headingSelector);
    }

    async getHeadingText(): Promise<string | null> {
        return await this.getText(this.headingSelector);
    }

    async clickMoreInfo(): Promise<void> {
        await this.click(this.moreInfoLinkSelector);
    }
}
