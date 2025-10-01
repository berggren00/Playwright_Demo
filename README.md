# Saucedemo E2E Tests (Playwright + TypeScript)

End-to-end tests for [saucedemo.com] using Playwright and the Page Object Model (POM).

## Tech

- Playwright + TypeScript
- Page Object Model (POM)

## Project Structure

```bash
project-root/
├─ pages/ # Page Objects
│ ├─ LoginPage.ts
│ ├─ ProductList.ts
│ ├─ CheckoutPage.ts
│ └─ SettingsPage.ts
├─ tests/ # Test files & fixtures only
│ ├─ fixtures/
│ │ └─ PageFixtures.ts
│ ├─ products/
│ │ ├─ add-to-cart.spec.ts
│ ├─ checkout/
│ │ └─ checkout.spec.ts
│ └─ settings/
│ └─ settings.spec.ts
├─ playwright.config.ts
└─ package.json
```

## Setup

```bash
# 1) Install deps
npm i -D @playwright/latest

# 3) Run tests
npx playwright test

# 4) View report
npx playwright show-report
```
