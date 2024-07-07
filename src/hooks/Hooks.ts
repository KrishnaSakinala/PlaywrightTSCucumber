import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test"
import { createLogger } from "winston";
import { invokeBrowser } from "../helper/browsers/BrowserManager";
import { getEnv } from "../helper/env/Env";
import { options } from "../util/Logger";
import { fixture } from "./PageFixture";
import * as fs from 'fs-extra';

let browser: Browser;
let browserContext: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name;
    const uniqueScenarioName = scenarioName + pickle.id;
    browserContext = await browser.newContext({
        /*recordVideo: {
            dir: "test-results/videos"
        },*/
    });
    await browserContext.tracing.start({
        name: uniqueScenarioName,
        title: scenarioName,
        sources: true,
        screenshots: true,
        snapshots: true
    })
    const page = await browserContext.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(uniqueScenarioName, scenarioName));
});

After(async function ({ pickle, result }) {
    let videoPath: string | undefined;
    let image: Buffer | undefined;
    const path = `./test-results/trace/${pickle.id}.zip`;
    if (result?.status == Status.FAILED) {
        if (fixture.page) {
            image = await fixture.page.screenshot({ path: "./test-results/screenshots/" + pickle.name, type: "png" });
            const video = fixture.page.video();
            if (video) {
                videoPath = await fixture.page.video().path();
            }
        }
    }
    await browserContext.tracing.stop({ path: path });

    if (fixture.page) {
        await fixture.page.close();
    }
    if (browserContext) {
        await browserContext.close();
    }
    if (result?.status == Status.FAILED && image && videoPath) {
        this.attach(image, "image/png");
        this.attach(fs.readFileSync(videoPath), 'video/webm');
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
        await this.attach(`Trace file: ${traceFileLink}`, 'text/html');
    }
});

AfterAll(async function () {
    await browser.close();
});