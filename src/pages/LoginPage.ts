import { expect, Page } from '@playwright/test'

export default class LoginPage {
    constructor(private page: Page) {}

    private Elements = {
        userNameInput: "input[placeholder='Username']",
        passwordInput: "input[placeholder='Password']",
        loginButton: "input[type='submit']"
    }

    async navigateToApplication() {
        await this.page.goto(process.env.BASEURL);
    }

    async enterUserName(userName: string) {
        await this.page.locator(this.Elements.userNameInput).fill(userName);
    }

    async enterPassword(password: string) {
        await this.page.locator(this.Elements.passwordInput).fill(password);
    }

    async clickOnLoginButton() {
        await this.page.locator(this.Elements.loginButton).click();
    }

    async logIntoApplication(userName: string, password: string) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickOnLoginButton();
    }

    async verifyLogin() {
        expect(this.page.url()).toBe("https://www.saucedemo.com/inventory.html");
    }
}