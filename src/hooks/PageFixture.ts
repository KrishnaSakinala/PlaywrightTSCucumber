import { Page } from "@playwright/test";
import { Logger } from "winston";

export const fixture = {
    // @ts-ignore
    page: undefined as Page | undefined,
    logger: undefined as Logger | undefined
}