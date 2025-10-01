import { test, expect } from "../fixtures/PageFixtures";
import { SettingsPage } from "../../pages/SettingsPage";

// Not actually testing anything due to there not being a settings page - just an example

test("update user settings", async ({ page }) => {
  const settings = new SettingsPage(page);
  await settings.open();
  await settings.updateInfo("Mina", "Lockheed", "mlockheed@gmail.com", "2000");
});
