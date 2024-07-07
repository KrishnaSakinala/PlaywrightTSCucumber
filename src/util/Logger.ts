import { transports, format } from "winston";

export function options(uniqueScenarioName: string, scenarioName: string) {
    return {
        transports: [
            new transports.File({
                filename: `test-results/logs/${uniqueScenarioName}/${scenarioName}_log.log`,
                level: 'info',
                format: format.combine(
                    format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss ' }),
                    format.align(),
                    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
                )
            }),
        ]
    }
};