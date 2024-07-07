import { When, Then } from "@cucumber/cucumber";
import { fixture } from "../../hooks/PageFixture";
import AddToCartPage from "../../pages/AddToCartPage";

let addToCartPage: AddToCartPage;

When('User add the {string} to the cart', async function (productName) {
  addToCartPage = new AddToCartPage(fixture.page);
  const addToCart = `//div[text()='${productName}']/../../../div[2]/button`;
  await fixture.page.locator(addToCart).click();
  fixture.logger.info("Clicked on the Add to cart button for a product: " +  productName);
});

Then('The cart badge should get updated', async function () {
  const badgeCount = await fixture.page.locator("span.shopping_cart_badge").textContent();
  //expect(Number(badgeCount)).toBeGreaterThan(0);
  await addToCartPage.verifyCartBadge(badgeCount);
  fixture.logger.info("Cart badge successfully updated");
});