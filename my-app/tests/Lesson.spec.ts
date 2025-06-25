import { test } from "@playwright/test";

test.describe("Teste Lição", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("https://cursoartedaguerra.com.br");
    await page.waitForTimeout(200);
      
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Cebolinha");
    await page.getByLabel("Email").fill("Cebola@gmail.com");
    await page.getByLabel("CPF").fill("792.550.390-40"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Não consegue falar o R, mas é um mestre em criar planos infalíveis");
    await page.getByLabel("Especialidade").fill("Mestle em falal elado");
    await page.getByTestId("password").fill("@Cebola007");
    await page.getByTestId("confirmPassword").fill("@Cebola007");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Cadastrar" }).click();
    await page.waitForTimeout(200);
    await page.getByText("Faça Login aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("Cebola@gmail.com");
    await page.getByLabel("Senha").fill("@Cebola007");
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
    await page.waitForTimeout(200);
    await page.getByText("Criar Lição").nth(0).click();
    await page.waitForTimeout(200);  
    await page.getByPlaceholder("Título da Lição").fill("cccc");
    await page.getByPlaceholder("Descrição da lição").fill("cccc");
    await page.locator("#url_video").fill("cccc");
    await page.locator("#url_img").fill("cccc");
    await page.getByText("Salvar").click();
    await page.getByText("Ver Lições").nth(0).click();
      await page.waitForTimeout(200);
  });

    test("Editar Lição", async ({ page }) => {
      await page.locator("#edit_lesson").nth(0).click();
      await page.getByPlaceholder("Título da Lição").fill("jjjj");
      await page.getByPlaceholder("Descrição da lição").fill("jjjj");
      await page.locator("#url_video").fill("jjjj");
      await page.locator("#url_img").fill("jjjj");
    });

    test("Excluir Lição", async ({ page }) => {
      await page.locator("#delete_lesson").nth(0).click();

    });
});