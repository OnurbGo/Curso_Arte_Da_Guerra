import { test } from "@playwright/test";

test.describe("Teste Cursos", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("https://cursoartedaguerra.com.br");
    await page.waitForTimeout(200);
      
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("James Bond");
    await page.getByLabel("Email").fill("James@gmail.com");
    await page.getByLabel("CPF").fill("792.550.390-40"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Mestre das fugas tacticas, ninguém o encontrava");
    await page.getByLabel("Especialidade").fill("Mestre das fugas tacticas");
    await page.getByTestId("password").fill("@Espiaobrabo007");
    await page.getByTestId("confirmPassword").fill("@Espiaobrabo007");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Cadastrar" }).click();
    await page.waitForTimeout(200);
    await page.getByText("Faça Login aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("James@gmail.com");
    await page.getByLabel("Senha").fill("@Espiaobrabo007");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForTimeout(200);
    await page.getByText("Perfil").click();
    await page.getByText("Meus Cursos").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Título").fill("aaaa");
    await page.getByLabel("Descrição").fill("aaaa");
    await page.getByLabel("URL da Imagem").fill("aaaa");
    await page.getByLabel("URL do Banner").fill("aaaa");
    await page.waitForTimeout(200);
    await page.getByText("Criar Curso").click(); 
  });

  test("Cadastro De Lição", async ({ page }) => {
    await page.waitForTimeout(200);
    await page.getByText("Criar Lição").click();
    await page.waitForTimeout(200);  
    await page.getByPlaceholder("Título da Lição").fill("cccc");
    await page.getByPlaceholder("Descrição da lição").fill("cccc");
    await page.locator("#url_video").fill("cccc");
    await page.locator("#url_img").fill("cccc");

    await page.getByText("Salvar").click();
  })

  test("Ver Lição", async ({ page }) => {
      await page.getByText("Ver Lições").click();
      await page.waitForTimeout(200);
      await page.getByText("Ocultar Lições").click();

    });

  test("Edição do Curso", async ({ page }) => {
      await page.getByText("Editar Curso").click();
      await page.locator("#title_curse").fill("cccc");
      await page.locator("#description_curse").fill("cccc");
      await page.locator("#url_img").fill("cccc");
      await page.locator("#url_banner").fill("cccc");

      await page.getByText("Salvar").click();
    });
});