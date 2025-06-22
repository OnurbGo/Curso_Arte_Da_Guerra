/*import { test } from "@playwright/test";

test.describe("Teste Classes", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("https://cursoartedaguerra.com.br");
      
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    
    await page.getByLabel("Nome").fill("James Bond");
    await page.getByLabel("Email").fill("James@gmail.com");
    await page.getByLabel("CPF").fill("577.308.940-84"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Mestre das fugas tacticas, ninguém o encontrava");
    await page.getByLabel("Especialidade").fill("Mestre das fugas tacticas");
    await page.getByTestId("password").fill("@Espiaobrabo007");
    await page.getByTestId("confirmPassword").fill("@Espiaobrabo007");
    
    await page.getByRole("button", { name: "Cadastrar" }).click();
    
    await page.getByText("Faça Login aqui").click();
    
    await page.getByLabel("Email").fill("James@gmail.com");
    await page.getByLabel("Senha").fill("@Espiaobrabo007");
    
    await page.getByRole("button", { name: "Login" }).click();

    await page.getByText("Perfil").click();
    await page.getByText("Meus Cursos").click();

    await page.getByLabel("Título").fill("aaaa");
    await page.getByLabel("Descrição").fill("aaaa");
    await page.getByLabel("URL da Imagem").fill("aaaa");
    await page.getByLabel("URL do Banner").fill("aaaa");

    await page.getByText("Criar Curso").click(); 
    
    await page.getByText("Criar Lição").click();
      
    await page.getByPlaceholder("Título do Curso").fill("cccc");
    await page.getByPlaceholder("Descrição do Curso").fill("cccc");
    await page.getByPlaceholder("URL da Imagem").fill("cccc");
    await page.getByPlaceholder("URL do Banner").fill("cccc");

    await page.getByText("Salvar").click();

    await page.getByText("Criar Lição").click();
      
    await page.getByPlaceholder("Título do Curso").fill("dddd");
    await page.getByPlaceholder("Descrição do Curso").fill("ddddd");
    await page.getByPlaceholder("URL da Imagem").fill("dddd");
    await page.getByPlaceholder("URL do Banner").fill("dddd");

    await page.getByText("Salvar").click();
  });

    

    test("Incrição na aula", async ({ page }) => {
      await page.getByText("Classes").click();

      await page.getByAltText("aaaa").click();
      await page.getByAltText("Inscrever-se").click();

      await page.getByText("Ver Lição").click();
      
      await page.getByText("Marcar como concluído").click();

      await page.getByText("Voltar para o Curso").click();

      await page.getByText("Ver Lição").click();

      await page.getByText("Marcar como concluído").click();

      await page.getByText("Próxima Lição").click();


    });
    
    test("edição da aula", async ({ page }) => {
      await page.getByText("Ver Lições").click();

      await page.getByText("Editar").click();
    });
});
*/