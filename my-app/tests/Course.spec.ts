import { test } from "@playwright/test";

test.describe("Teste Cursos", () => {
  test("Cadastro De Lição", async ({ page }) => {
    await page.goto("https://cursoartedaguerra.com.br");
    await page.waitForTimeout(200);
      
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Robin");
    await page.getByLabel("Email").fill("Robin@gmail.com");
    await page.getByLabel("CPF").fill("633.272.340-86"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Ele é um super-herói, sempre pronto para ajudar os outros");
    await page.getByLabel("Especialidade").fill("Ajudante do Batman");
    await page.getByTestId("password").fill("@Robin007");
    await page.getByTestId("confirmPassword").fill("@Robin007");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Cadastrar" }).click();
    await page.waitForTimeout(200);
    await page.getByText("Faça Login aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("Robin@gmail.com");
    await page.getByLabel("Senha").fill("@Robin007");
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
    await page.getByText("Criar Lição").click();
    await page.waitForTimeout(200);  
    await page.getByPlaceholder("Título da Lição").fill("cccc");
    await page.getByPlaceholder("Descrição da lição").fill("cccc");
    await page.locator("#url_video").fill("cccc");
    await page.locator("#url_img").fill("cccc");

    await page.getByText("Salvar").click();
  })

  test("Ver Lição", async ({ page }) => {
    await page.goto("https://cursoartedaguerra.com.br");
    await page.waitForTimeout(200);
      
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Clarencio");
    await page.getByLabel("Email").fill("Clarencio@gmail.com");
    await page.getByLabel("CPF").fill("517.120.410-10"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Ele é muito otimista");
    await page.getByLabel("Especialidade").fill("Mestre em diversão");
    await page.getByTestId("password").fill("@Clarencio007");
    await page.getByTestId("confirmPassword").fill("@Clarencio007");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Cadastrar" }).click();
    await page.waitForTimeout(200);
    await page.getByText("Faça Login aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("Clarencio@gmail.com");
    await page.getByLabel("Senha").fill("@Clarencio007");
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
      
    await page.getByText("Ver Lições").click();
    await page.waitForTimeout(200);
    await page.getByText("Ocultar Lições").click();

  });

  test("Edição do Curso", async ({ page }) => {
    await page.goto("https://cursoartedaguerra.com.br");
    await page.waitForTimeout(200);
      
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Magali");
    await page.getByLabel("Email").fill("Magali@gmail.com");
    await page.getByLabel("CPF").fill("676.841.640-58"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Ela adora comer, especialmente melancia, e é uma mestra em comer");
    await page.getByLabel("Especialidade").fill("Mestra em comer");
    await page.getByTestId("password").fill("@Magali007");
    await page.getByTestId("confirmPassword").fill("@Magali007");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Cadastrar" }).click();
    await page.waitForTimeout(200);
    await page.getByText("Faça Login aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("Magali@gmail.com");
    await page.getByLabel("Senha").fill("@Magali007");
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
    await page.getByText("Editar Curso").click();
    await page.locator("#title_curse").fill("cccc");
    await page.locator("#description_curse").fill("cccc");
    await page.locator("#url_img").fill("cccc");
    await page.locator("#url_banner").fill("cccc");

    await page.getByText("Salvar").click();
  });

  test("Excluir Curso", async ({ page }) => {
    await page.goto("https://cursoartedaguerra.com.br");
    await page.waitForTimeout(200);
      
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Franjinha");
    await page.getByLabel("Email").fill("Franjinha@gmail.com");
    await page.getByLabel("CPF").fill("043.241.790-77"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Ele é um gênio da tecnologia, sempre inventando coisas novas");
    await page.getByLabel("Especialidade").fill("Mestre em tecnologia");
    await page.getByTestId("password").fill("@Franjinha007");
    await page.getByTestId("confirmPassword").fill("@Franjinha007");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Cadastrar" }).click();
    await page.waitForTimeout(200);
    await page.getByText("Faça Login aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("Franjinha@gmail.com");
    await page.getByLabel("Senha").fill("@Franjinha007");
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
    await page.getByText("Excluir Curso").click();
  });
});