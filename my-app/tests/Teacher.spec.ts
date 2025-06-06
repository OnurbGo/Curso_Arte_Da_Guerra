import { test } from "@playwright/test";

test("Login professor funcionando corretamente", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  
  await page.getByRole("button", { name: "Log In" }).click();

  await page.getByLabel("Email").fill("Akuma@godmail.com");
  await page.getByLabel("Senha").fill("@ShunGokusatsu712");

  await page.getByRole("button", { name: "Login" }).click();
});

test("edição do usuario professor", async ({ page }) => {
  await page.goto("http://localhost:5173/");
});
test("criação de curso", async ({ page }) => {
  await page.goto("http://localhost:5173/");
});
test("criação de aula", async ({ page }) => {
  await page.goto("http://localhost:5173/");
});
test("edição da aula", async ({ page }) => {
  await page.goto("http://localhost:5173/");
});
test("edição do curso", async ({ page }) => {
  await page.goto("http://localhost:5173/");
});
