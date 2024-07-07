import { chromium, firefox, LaunchOptions, webkit } from "@playwright/test";

const options: LaunchOptions = {
    // browser configuration
    headless: false
}

export const invokeBrowser = () => {
    const browserType = process.env.BROWSER;
    switch (browserType) {
        case "chrome":
            return chromium.launch(options);
            break;
        case "firefox":
            return firefox.launch(options);
            break;
        case "webkit":
            return webkit.launch(options);
            break;
        default:
            throw new Error("Please provide the proper browser.");
    }
}