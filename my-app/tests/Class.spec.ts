/*import { test } from "@playwright/test";

test.describe("Teste Classes", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("https://cursoartedaguerra.com.br");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Ryu");
    await page.getByLabel("Email").fill("Ryu@gmail.com");
    await page.getByLabel("CPF").fill("135.554.090-93"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Mestre das fugas tacticas, ninguém o encontrava");
    await page.getByLabel("Especialidade").fill("Mestre das fugas tacticas");
    await page.getByTestId("password").fill("@Shoriuken007");
    await page.getByTestId("confirmPassword").fill("@Shoriuken007");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Cadastrar" }).click();
    await page.waitForTimeout(200);
    await page.getByText("Faça Login aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("Ryu@gmail.com");
    await page.getByLabel("Senha").fill("@Shoriuken007");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForTimeout(200);
    await page.getByText("Perfil").click();
    await page.getByText("Meus Cursos").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Título").fill("1111");
    await page.getByLabel("Descrição").fill("1111");
    await page.getByLabel("URL da Imagem").fill("1111");
    await page.getByLabel("URL do Banner").fill("1111");
    await page.waitForTimeout(200);
    await page.getByText("Criar Curso").click(); 
    await page.waitForTimeout(200);
    await page.getByText("Criar Lição").click();
    await page.waitForTimeout(200);
    await page.getByPlaceholder("Título da Lição").fill("3333");
    await page.getByPlaceholder("Descrição da lição").fill("3333");
    await page.locator("#url_video").fill("3333");
    await page.locator("#url_img").fill("3333");
    await page.waitForTimeout(200);
    await page.getByText("Salvar").click();
    await page.waitForTimeout(200);
    await page.getByText("Criar Lição").click();
    await page.waitForTimeout(200);
    await page.getByPlaceholder("Título da Lição").fill("4444");
    await page.getByPlaceholder("Descrição da Lição").fill("4444");
    await page.locator("#url_video").fill("4444");
    await page.locator("#url_img").fill("4444");
    await page.waitForTimeout(200);
    await page.getByText("Salvar").click();
  });

    

    test("Incrição na aula", async ({ page }) => {
      await page.waitForTimeout(200);
      await page.getByText("Classes").click();
      await page.waitForTimeout(200);
      await page.getByAltText("1111").click();
      await page.getByAltText("Inscrever-se").click();
      await page.waitForTimeout(200);
      await page.getByText("Ver Lição").click();
      await page.waitForTimeout(200);
      await page.getByText("Marcar como concluído").click();
      await page.waitForTimeout(200);
      await page.getByText("Voltar para o Curso").click();

      await page.getByText("Ver Lição").click();

      await page.getByText("Marcar como concluído").click();

      await page.getByText("Próxima Lição").click();
    });
});
*/