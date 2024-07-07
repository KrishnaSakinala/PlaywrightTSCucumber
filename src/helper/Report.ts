import report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation Report",
    pageTitle: "Sauce Labs Test Report",
    displayDuration: true,
    metadata: {
        browser: {
            name: "chrome",
            version: "112",
        },
        device: "Krishna-PC",
        platform: {
            name: "Windows",
            version: "11",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            {label: "Project", value: "Sauce Labs Application"},
            {label: "Release", value: "1.2.3"},
            {label: "Cycle", value: "Smoke-1"},
        ],
    },
})