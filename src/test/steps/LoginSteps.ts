import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../hooks/PageFixture";
import LoginPage from "../../pages/LoginPage";

let loginPage: LoginPage;

Given('User navigates to the application', async function () {
  loginPage = new LoginPage(fixture.page);
  await loginPage.navigateToApplication();
  //await fixture.page.goto(process.env.BASEURL);
  fixture.logger.info("Navigating to the application");
});

Given('User enter the username as {string}', async function (username) {
  //await fixture.page.locator("input[placeholder='Username']").fill(username);
  await loginPage.enterUserName(username);
  fixture.logger.info("Provided username: " + username);
});

Given('User enter the password as {string}', async function (password) {
  //await fixture.page.locator("input[placeholder='Password']").fill(password);
  await loginPage.enterPassword(password);
  fixture.logger.info("Provided password: " + password);
});

When('User clicks on the login button', async function () {
  //await fixture.page.locator("input[type='submit']").click();
  await loginPage.clickOnLoginButton();
  fixture.logger.info("Clicked on login button");
});

Then('Login should be success', async function () {
  //expect(fixture.page.url()).toBe("https://www.saucedemo.com/inventory.html");
  await loginPage.verifyLogin();
  fixture.logger.info("Successfully logged in");
});