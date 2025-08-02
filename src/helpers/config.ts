import * as fs from 'fs';
import * as path from 'path';

export interface Config {
    baseUrl: string;
    defaultTimeout: number;
    screenshotsPath: string;
    reportsPath: string;
    retries: number;
    browser: 'chromium' | 'firefox' | 'webkit';
    headless: boolean;
    viewport: {
        width: number;
        height: number;
    };
}

export class ConfigManager {
    private static instance: ConfigManager;
    private config: Config;

    private constructor() {
        const env = process.env.NODE_ENV || 'development';
        const configPath = path.join(__dirname, '..', 'config', 'env.json');
        const configFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        this.config = configFile[env];
    }

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    public getConfig(): Config {
        return this.config;
    }

    public getBaseUrl(): string {
        return this.config.baseUrl;
    }

    public getDefaultTimeout(): number {
        return this.config.defaultTimeout;
    }

    public getScreenshotsPath(): string {
        return this.config.screenshotsPath;
    }

    public getReportsPath(): string {
        return this.config.reportsPath;
    }

    public getBrowser(): string {
        return this.config.browser;
    }

    public isHeadless(): boolean {
        return this.config.headless;
    }

    public getViewport(): { width: number; height: number } {
        return this.config.viewport;
    }

    public getRetries(): number {
        return this.config.retries;
    }
}
