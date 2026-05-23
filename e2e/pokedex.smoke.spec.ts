import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
  });
});

test("positive: search pokemon, open detail, add to collection, and see it in collection page", async ({
  page,
}) => {
  await page.goto("/pokedex");

  await expect(page.getByRole("heading", { name: "Pokedex" })).toBeVisible();

  await page.getByPlaceholder("Search by name...").fill("Pikachu");
  const pikachuCardLink = page.getByRole("link", { name: /#025.*Pikachu/ });
  await expect(pikachuCardLink).toBeVisible();

  await pikachuCardLink.click();
  await expect(page).toHaveURL(/\/pokedex\/25$/);
  await expect(page.getByRole("button", { name: "Add to Collection" })).toBeVisible();

  await page.getByRole("button", { name: "Add to Collection" }).click();
  await expect(page.getByRole("heading", { name: "Capture to Collection" })).toBeVisible();

  await page.getByPlaceholder("Enter nickname").fill("Sparky");
  await page.getByRole("combobox").selectOption("Team");
  await page.getByPlaceholder("Optional notes").fill("Fast electric attacker");
  await page.getByRole("button", { name: "Save to Collection" }).click();

  await page.getByRole("link", { name: "View Collection" }).click();
  await expect(page.getByRole("heading", { name: "Collection" })).toBeVisible();
  await expect(page.getByText("Pikachu")).toBeVisible();
  await expect(page.getByText(/Nickname:\s*Sparky/)).toBeVisible();
});

test("negative: cannot submit collection form without nickname", async ({ page }) => {
  await page.goto("/pokedex");
  await page.getByPlaceholder("Search by name...").fill("Bulbasaur");
  const bulbasaurCardLink = page.getByRole("link", { name: /#001.*Bulbasaur/ });
  await expect(bulbasaurCardLink).toBeVisible();
  await bulbasaurCardLink.click();

  await expect(page.getByRole("heading", { name: "Bulbasaur" })).toBeVisible();
  await page.getByRole("button", { name: "Add to Collection" }).click();
  await expect(page.getByRole("heading", { name: "Capture to Collection" })).toBeVisible();

  await page.getByPlaceholder("Enter nickname").fill("");
  await page.getByRole("button", { name: "Save to Collection" }).click();

  await expect(page.getByText("Nickname is required")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Capture to Collection" })).toBeVisible();
  await page.getByRole("button", { name: "Close capture form" }).click();

  await page.getByRole("link", { name: "View Collection" }).click();
  await expect(page.getByRole("heading", { name: "Collection" })).toBeVisible();
  await expect(page.getByText("Your collection is still empty.")).toBeVisible();
});
