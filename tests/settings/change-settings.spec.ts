import { test, expect } from "../fixtures/PageFixtures";
import { SettingsPage } from "../../pages/SettingsPage";

test("update user settings", async ({ page }) => {
  const settings = new SettingsPage(page);
  await settings.open();
  await settings.updateInfo("Mina", "Lockheed", "mlockheed@gmail.com", "2000");
});
