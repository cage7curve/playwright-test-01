import { test as base } from '@playwright/test';
import { LoginPage } from '../page/login-page';

const fs = require('fs');

interface TestFixtures {
  isTabletView: boolean;
  isWebView: boolean;
  isMobileView: boolean;
  loginPage: LoginPage;
  
}

const test = base.extend<TestFixtures>({
  
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
});


export { test };
