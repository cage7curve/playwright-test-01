import { expect } from "@playwright/test";
import { test } from "../shared/fixtures/default-fixture";

test.describe("Login", () => {
  test("Login successful", async ({ page, loginPage }) => {
    const username = "tomsmith";
    const password = "SuperSecretPassword!";
    await page.goto("http://the-internet.herokuapp.com/login");
    expect(loginPage.loginPageHeaderLocator).toBeVisible()

    await loginPage.login(username, password);
    expect(loginPage.loginSuccessMessageLocator).toBeVisible()
    expect(loginPage.securePageHeaderLocator).toBeVisible()

    await loginPage.logoutButtonLocator.click()
    expect(loginPage.logoutSuccessMessageLocator).toBeVisible()
    expect(loginPage.loginPageHeaderLocator).toBeVisible()
  });

  test("Login with invalid password", async ({ page, loginPage }) => {
    const username = "tomsmith";
    const password = "Password!";
    await page.goto("http://the-internet.herokuapp.com/login");
    expect(loginPage.loginPageHeaderLocator).toBeVisible()

    await loginPage.login(username, password);
    expect(loginPage.passwordInvalidErrorMessageLocator).toBeVisible()
  });

  test("Login with invalid username", async ({ page, loginPage }) => {
    const username = "tomholland";
    const password = "Password!";
    await page.goto("http://the-internet.herokuapp.com/login");
    expect(loginPage.loginPageHeaderLocator).toBeVisible()

    await loginPage.login(username, password);
    expect(loginPage.usernameInvalidErrorMessageLocator).toBeVisible()
  });
});
