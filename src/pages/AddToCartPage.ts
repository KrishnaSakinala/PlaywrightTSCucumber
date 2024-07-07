import { expect, Page } from '@playwright/test'

export default class AddToCartPage {
    constructor(private page: Page) {}

    private Elements = {
        sampleLocator: "input[placeholder='Username']"        
    }

    async verifyCartBadge(badgeCount: string) {
        expect(Number(badgeCount)).toBeGreaterThan(0);
    }
    
}