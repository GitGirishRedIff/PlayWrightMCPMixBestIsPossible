const reporter = require('multiple-cucumber-html-reporter');
const fs = require('fs-extra');
const path = require('path');

const cucumberJsonDir = path.resolve(process.cwd(), 'test-results');
const cucumberReportPath = path.resolve(process.cwd(), 'test-results/html');
const jsonFiles = fs.readdirSync(cucumberJsonDir).filter(file => file.endsWith('.json'));

try {
    // Generate HTML report
    reporter.generate({
        jsonDir: cucumberJsonDir,
        reportPath: cucumberReportPath,
        displayDuration: true,
        pageTitle: "Test Execution Report",
        reportName: "Test Execution Report",
        metadata: {
            browser: {
                name: 'Multiple',
                version: 'Multiple'
            },
            device: 'Local test machine',
            platform: {
                name: process.platform,
                version: process.version
            }
        },
        customData: {
            title: 'Run info',
            data: [
                { label: 'Project', value: 'Consolidated Test Framework' },
                { label: 'Release', value: process.env.npm_package_version },
                { label: 'Execution Start Time', value: new Date().toISOString() }
            ]
        }
    });

    console.log('HTML report generated successfully!');
} catch (err) {
    console.error('Error generating report: ', err);
}
