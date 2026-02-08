import { Locator, Page, expect } from "@playwright/test";

import { BasePage } from "../base-page";

export class LoginPage extends BasePage {
  //input
  readonly usernameInputLocator: Locator = this.page.locator("#username");
  readonly passwordInputLocator: Locator = this.page.locator("#password");

  //button
  readonly loginButtonLocator: Locator = this.page.getByRole("button", {
    name: "Login",
  });
  readonly logoutButtonLocator: Locator = this.page.getByRole("link", {
    name: "Logout",
  });

  //label
  readonly loginSuccessMessageLocator: Locator = this.page.locator("#flash", {
    hasText: "You logged into a secure area!",
  });
  readonly logoutSuccessMessageLocator: Locator = this.page.locator("#flash", {
    hasText: "You logged out of the secure area!",
  });
  readonly passwordInvalidErrorMessageLocator: Locator = this.page.locator("#flash", {
    hasText: "Your password is invalid!",
  });
  readonly usernameInvalidErrorMessageLocator: Locator = this.page.locator("#flash", {
    hasText: "Your username is invalid!",
  });

  //header
  readonly securePageHeaderLocator: Locator = this.page.locator("h2", {
    hasText: "Secure Area",
  });
  readonly loginPageHeaderLocator: Locator = this.page.locator("h2", {
    hasText: "Login Page",
  });
  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string): Promise<this> {
    await this.usernameInputLocator.fill(username);
    await this.passwordInputLocator.fill(password);
    await this.loginButtonLocator.click();

    return this;
  }
}
