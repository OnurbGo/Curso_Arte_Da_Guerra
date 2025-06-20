import { test } from "@playwright/test";

test.describe("Teste Professor", () => {
  /*test.beforeEach(async ({page}) => {
    await page.goto("https://cursosartedaguerra.com.br");
      
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    
    await page.getByLabel("Nome").fill("Akuma da Silva");
    await page.getByLabel("Email").fill("Akuma@gmail.com");
    await page.getByLabel("CPF").fill("577.308.940-84"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Eu era um pródigio da arte de chutar idosas, com o tempo aperfeiçoei minha tecnica");
    await page.getByLabel("Especialidade").fill("Chutador de Idosas");
    await page.getByTestId("password").fill("@ShunGokusatsu712");
    await page.getByTestId("confirmPassword").fill("@ShunGokusatsu712");
    
    await page.getByRole("button", { name: "Cadastrar" }).click();
    
    const cadastroSucesso = page.getByText("Usuário cadastrado com sucesso!");
    expect(cadastroSucesso).toBeTruthy();
    
    await page.getByText("Faça Login aqui").click();
    
    await page.getByLabel("Email").fill("Akuma@gmail.com");
    await page.getByLabel("Senha").fill("@ShunGokusatsu712");
    
    await page.getByRole("button", { name: "Login" }).click();
  })
  
  test("edição do usuario professor", async ({ page }) => {
    await page.getByText("Perfil").click();
    await page.getByRole("button", { name: "Meu Pefil" }).click();
  });*/
  test("criação de curso", async ({ page }) => {
  await page.goto("https://cursosartedaguerra.com.br");
  });
  test("criação de aula", async ({ page }) => {
  await page.goto("https://cursosartedaguerra.com.br");
  });
  test("edição da aula", async ({ page }) => {
  await page.goto("https://cursosartedaguerra.com.br");
  });
  test("edição do curso", async ({ page }) => {
  await page.goto("https://cursosartedaguerra.com.br");
  });
});
