import { test, expect } from "@playwright/test";

test("Teste", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  //verificar se isso aqui funciona
  const title = page.getByText("Aprenda a Arte da Guerra");
  expect(title).toBeTruthy();

  /*await page.getByRole("textbox").fill("Sherlock");
  await page.getByRole("button", { name: "Log In" }).click();
  await page.waitForSelector("ul > li");

  const listCount = await page.locator("ul > li").count();
  expect(listCount).toBeGreaterThan(0);

  const firstItem = await page.locator("ul > li").first();
  expect(firstItem).toContainText(/Sherlock/);*/
});



test("Login que não existe", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  
  await page.getByRole("button", { name: "Log In" }).click();

  await page.getByLabel("Email").fill("Akuma@godmail.com");
  await page.getByLabel("Senha").fill("@ShunGokusatsu712");

  await page.getByRole("button", { name: "Login" }).click();

  //mostrar que aparece o erro
});

//CRIAÇÃO/LOGIN DE PROFESSOR

test("Criando Conta professor", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByText("Crie Sua Conta Aqui").click();

  await page.getByLabel("Nome").fill("Akuma da Silva");
  await page.getByLabel("Email").fill("Akuma@godmail.com");
  await page.getByLabel("CPF").fill("079.031.159-36"); 
  await page.getByLabel("Tipo").selectOption("teacher");
  await page.getByLabel("Biografia").fill("Eu era um pródigio da arte de chutar idosas, com o tempo aperfeiçoei minha tecnica");
  await page.getByLabel("Especialidade").fill("Chutador de Idosas");
  await page.getByTestId("password").fill("@ShunGokusatsu712");
  await page.getByTestId("confirmPassword").fill("@ShunGokusatsu712");

  await page.getByRole("button", { name: "Cadastrar" }).click();
});

test("Login professor falhando", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  
  await page.getByRole("button", { name: "Log In" }).click();

  await page.getByLabel("Email").fill("Akuma@godmail.com");
  await page.getByLabel("Senha").fill("@Shoriuken712");

  await page.getByRole("button", { name: "Login" }).click();
});

test("Login professor funcionando corretamente", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  
  await page.getByRole("button", { name: "Log In" }).click();

  await page.getByLabel("Email").fill("Akuma@godmail.com");
  await page.getByLabel("Senha").fill("@ShunGokusatsu712");

  await page.getByRole("button", { name: "Login" }).click();
});

//CRIAÇÃO/LOGIN DE ALUNO

test("Criando Conta aluno", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByText("Crie Sua Conta Aqui").click();

  await page.getByLabel("Nome").fill("Carlos");
  await page.getByLabel("Email").fill("carlos@gojomail.com");
  await page.getByLabel("CPF").fill("092.200.321-90"); 
  await page.getByLabel("Tipo").selectOption("student");
  await page.getByTestId("password").fill("@Paulo327");
  await page.getByTestId("confirmPassword").fill("@Paulo327");

  await page.getByRole("button", { name: "Cadastrar" }).click();
});

test("Login Aluno falhando", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  
  await page.getByRole("button", { name: "Log In" }).click();

  await page.getByLabel("Email").fill("carlos@gojomail.com");
  await page.getByLabel("Senha").fill("@Chavier327");

  await page.getByRole("button", { name: "Login" }).click();
});

test("Login Aluno funcionando corretamente", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  
  await page.getByRole("button", { name: "Log In" }).click();

  await page.getByLabel("Email").fill("carlos@gojomail.com");
  await page.getByLabel("Senha").fill("@Paulo327");

  await page.getByRole("button", { name: "Login" }).click();
});