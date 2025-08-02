import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, firefox, webkit, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { ICustomWorld } from '../support/custom-world';

let homePage: HomePage;

Before(async function(this: ICustomWorld) {
    const browserType = this.config.getBrowser();
    switch (browserType) {
        case 'chromium':
            this.browser = await chromium.launch({ headless: this.config.isHeadless() });
            break;
        case 'firefox':
            this.browser = await firefox.launch({ headless: this.config.isHeadless() });
            break;
        case 'webkit':
            this.browser = await webkit.launch({ headless: this.config.isHeadless() });
            break;
        default:
            throw new Error(`Browser ${browserType} is not supported`);
    }
    
    this.context = await this.browser.newContext({
        viewport: this.config.getViewport()
    });
    this.page = await this.context.newPage();
    homePage = new HomePage(this.page);
});

After(async function(this: ICustomWorld) {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
});

Given('I am on the home page', async function(this: ICustomWorld) {
    await homePage.navigate();
});

Then('I should see the home page', async function(this: ICustomWorld) {
    const isVisible = await homePage.isHomePageVisible();
    expect(isVisible).toBeTruthy();
});

Then('I should see the heading {string}', async function(this: ICustomWorld, expectedText: string) {
    const headingText = await homePage.getHeadingText();
    expect(headingText).toBe(expectedText);
    // Take a screenshot after verifying the heading
    await homePage.takeScreenshot('home-page-heading');
});

When('I click the more information link', async function(this: ICustomWorld) {
    await homePage.clickMoreInfo();
});

Then("I should be redirected to IANA's website", async function(this: ICustomWorld) {
    const url = this.page?.url();
    expect(url).toContain('iana.org');
});
