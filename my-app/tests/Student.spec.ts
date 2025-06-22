import { test, expect } from "@playwright/test";

test.describe("Teste Aluno", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("https://cursoartedaguerra.com.br");
    
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Afonso");
    await page.getByLabel("Email").fill("Gustavo@gmail.com");
    await page.getByLabel("CPF").fill("222.365.660-93"); 
    await page.getByLabel("Tipo").selectOption("student");
    await page.getByTestId("password").fill("@Jose327");
    await page.getByTestId("confirmPassword").fill("@Jose327");
    
    await page.getByRole("button", { name: "Cadastrar" }).click();
    
    const cadastroSucesso = page.getByText("Usuário cadastrado com sucesso!");
    expect(cadastroSucesso).toBeTruthy();
    
    await page.getByText("Faça Login aqui").click();
    
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("Gustavo@gmail.com");
    await page.getByLabel("Senha").fill("@Jose327");
    
    await page.getByRole("button", { name: "Login" }).click();

    await page.getByText("Perfil").click();
  });

  test("Edição Do Usuario", async ({ page }) => {
    await page.getByText("Meu Perfil").click();
    
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Carlos");
    await page.getByRole("textbox", { name: "Senha", exact: true }).fill("@Shoriuken712");
    await page.getByLabel("Confirmar Senha").fill("@Shoriuken712");

    await page.getByText("Salvar Alterações").click();
  });

  test("Edição Do Usuario Sem Trocar De Senha", async ({ page }) => {
    await page.getByText("Meu Perfil").click();
    
    await page.getByLabel("Nome").fill("Carlos");

    await page.getByText("Salvar Alterações").click();
  });

  test("Logout", async ({ page }) => {
    await page.getByText("Deslogar").click();
  });
});
