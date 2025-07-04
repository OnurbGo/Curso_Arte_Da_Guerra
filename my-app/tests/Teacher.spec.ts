import { test, expect } from "@playwright/test";

test.describe("Teste Professor", () => {

  test("Edição Do Usuario", async ({ page }) => {
    await page.goto("https://cursoartedaguerra.com.br");
    
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Chun-li");
    await page.getByLabel("Email").fill("Chunli@gmail.com");
    await page.getByLabel("CPF").fill("155.685.510-90"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Com chutes extremamente violentos, consegue derrotar muitos");
    await page.getByLabel("Especialidade").fill("Mestra de kung-fu");
    await page.getByTestId("password").fill("@Chuchu365");
    await page.getByTestId("confirmPassword").fill("@Chuchu365");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Cadastrar" }).click();
    await page.waitForTimeout(200);
    const cadastroSucesso = page.getByText("Usuário cadastrado com sucesso!");
    expect(cadastroSucesso).toBeTruthy();
    await page.waitForTimeout(200);
    await page.getByText("Faça Login aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("Chunli@gmail.com");
    await page.getByLabel("Senha").fill("@Chuchu365");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForTimeout(200);
    await page.getByText("Perfil").click();
    await page.getByText("Meu Perfil").click();
    await page.waitForTimeout(200);
    await page.waitForSelector('input[id="expertise"]', { timeout: 50000 });
    
    await page.getByLabel("Nome").fill("Carlos");
    await page.getByRole("textbox", { name: "Senha", exact: true }).fill("@Shoriuken712");
    await page.getByLabel("Confirmar Senha").fill("@Shoriuken712");

    await page.getByText("Salvar Alterações").click();

    
    await page.waitForSelector('input[id="expertise"]', { timeout: 20000 });
    await page.waitForSelector('textarea[id="biography"]', { timeout: 20000 });
    await page.getByLabel("Especialização").fill("drift de peugeot");
    await page.getByLabel("Biografia").fill("Sabio das artes de drift realizados unicamente com peugeot");

     await page.getByText("Salvar Dados do Professor").click();
  });

  test("Edição Do Usuario Sem Trocar De Senha", async ({ page }) => {
    await page.goto("https://cursoartedaguerra.com.br");
    
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Jamie da Birita");
    await page.getByLabel("Email").fill("Jamie@gmail.com");
    await page.getByLabel("CPF").fill("228.101.010-43"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Depois de 4 garrafas de birita, não tem quem pare a minha dança");
    await page.getByLabel("Especialidade").fill("Mestre do Boxe Bebado e breakdance");
    await page.getByTestId("password").fill("@Break365");
    await page.getByTestId("confirmPassword").fill("@Break365");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Cadastrar" }).click();
    await page.waitForTimeout(200);
    const cadastroSucesso = page.getByText("Usuário cadastrado com sucesso!");
    expect(cadastroSucesso).toBeTruthy();
    await page.waitForTimeout(200);
    await page.getByText("Faça Login aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("Jamie@gmail.com");
    await page.getByLabel("Senha").fill("@Break365");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Login" }).click();

    await page.getByText("Perfil").click();
    await page.getByText("Meu Perfil").click();
    
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Carlos");

    await page.getByText("Salvar Alterações").click();

    await page.waitForTimeout(200);

    await page.getByLabel("Especialização").fill("drift de peugeot");
    await page.getByLabel("Biografia").fill("Sabio das artes de drift realizados unicamente com peugeot");

     await page.getByText("Salvar Dados do Professor").click();
  });

  test("Edição Do Usuario Sem Trocar De Senha E Sem Alterar Dados", async ({ page }) => {
    await page.goto("https://cursoartedaguerra.com.br");
    
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Hashid");
    await page.getByLabel("Email").fill("Hashid@gmail.com");
    await page.getByLabel("CPF").fill("577.308.940-84"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Manipula as areias como extensão de sua própria mente");
    await page.getByLabel("Especialidade").fill("Mestre das areias");
    await page.getByTestId("password").fill("@Arabia365");
    await page.getByTestId("confirmPassword").fill("@Arabia365");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Cadastrar" }).click();
    await page.waitForTimeout(200);
    const cadastroSucesso = page.getByText("Usuário cadastrado com sucesso!");
    expect(cadastroSucesso).toBeTruthy();
    await page.waitForTimeout(200);
    await page.getByText("Faça Login aqui").click();
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("Hashid@gmail.com");
    await page.getByLabel("Senha").fill("@Arabia365");
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForTimeout(200);
    await page.getByText("Perfil").click();
    await page.getByText("Meu Perfil").click();
    
    await page.waitForTimeout(200);
    await page.getByLabel("Nome").fill("Carlos");

    await page.getByText("Salvar Alterações").click();
  });
  
  test("Logout", async ({ page }) => {
    await page.goto("https://cursoartedaguerra.com.br");
    
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Log In" }).click();
    await page.getByText("Crie Sua Conta Aqui").click();
    
    await page.getByLabel("Nome").fill("Luke");
    await page.getByLabel("Email").fill("Luke@gmail.com");
    await page.getByLabel("CPF").fill("388.261.560-50"); 
    await page.getByLabel("Tipo").selectOption("teacher");
    await page.getByLabel("Biografia").fill("Com chutes extremamente violentos, consegue derrotar muitos");
    await page.getByLabel("Especialidade").fill("Mestra de kung-fu");
    await page.getByTestId("password").fill("@UPpercut365");
    await page.getByTestId("confirmPassword").fill("@UPpercut365");
    
    await page.getByRole("button", { name: "Cadastrar" }).click();
    
    const cadastroSucesso = page.getByText("Usuário cadastrado com sucesso!");
    expect(cadastroSucesso).toBeTruthy();
    
    await page.getByText("Faça Login aqui").click();
    
    await page.waitForTimeout(200);
    await page.getByLabel("Email").fill("Luke@gmail.com");
    await page.getByLabel("Senha").fill("@UPpercut365");
    
    await page.getByRole("button", { name: "Login" }).click();

    await page.getByText("Perfil").click();
    
    await page.getByText("Deslogar").click();
  });
  
});
