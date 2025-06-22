import { test, expect } from "@playwright/test";

test.describe("Login Conta Aluno", async () => {
    test.beforeEach(async ({page}) => {
        await page.goto("https://cursoartedaguerra.com.br");
  
        await page.getByRole("button", { name: "Log In" }).click();
        await page.getByText("Crie Sua Conta Aqui").click();

        await page.getByLabel("Nome").fill("Carlos");
        await page.getByLabel("Email").fill("carlos@gmail.com");
        await page.getByLabel("CPF").fill("092.200.321-90"); 
        await page.getByLabel("Tipo").selectOption("student");
        await page.getByTestId("password").fill("@Paulo327");
        await page.getByTestId("confirmPassword").fill("@Paulo327");

        await page.getByRole("button", { name: "Cadastrar" }).click();

        const cadastroSucesso = page.getByText("Usuário cadastrado com sucesso!");
        expect(cadastroSucesso).toBeTruthy();

        await page.getByText("Faça Login aqui").click();
    })

    test("Login Aluno Sucesso", async ({ page }) => {
        await page.getByLabel("Email").fill("carlos@gmail.com");
        await page.getByLabel("Senha").fill("@Paulo327");

        await page.getByRole("button", { name: "Login" }).click();  
    })
    
    test("Login Aluno Falha", async ({ page }) => {
        await page.getByLabel("Email").fill("carlos@gmail.com");
        await page.getByLabel("Senha").fill("@Chavier327");

        await page.getByRole("button", { name: "Login" }).click();
    });
});


test.describe("Login Conta Professor", async () => {
    test.beforeEach(async ({page}) => {
        await page.goto("https://cursoartedaguerra.com.br");
  
        await page.getByRole("button", { name: "Log In" }).click();
        await page.getByText("Crie Sua Conta Aqui").click();

        await page.getByLabel("Nome").fill("Akuma da Silva");
        await page.getByLabel("Email").fill("Akuma@gmail.com");
        await page.getByLabel("CPF").fill("843.886.040-03"); 
        await page.getByLabel("Tipo").selectOption("teacher");
        await page.getByLabel("Biografia").fill("Eu era um pródigio da arte de chutar idosas, com o tempo aperfeiçoei minha tecnica");
        await page.getByLabel("Especialidade").fill("Chutador de Idosas");
        await page.getByTestId("password").fill("@ShunGokusatsu712");
        await page.getByTestId("confirmPassword").fill("@ShunGokusatsu712");

        await page.getByRole("button", { name: "Cadastrar" }).click();

        const cadastroSucesso = page.getByText("Usuário cadastrado com sucesso!");
        expect(cadastroSucesso).toBeTruthy();

        await page.getByText("Faça Login aqui").click();
    });

    test("Login Professor Sucesso", async ({ page }) => {
        await page.getByLabel("Email").fill("Akuma@gmail.com");
        await page.getByLabel("Senha").fill("@ShunGokusatsu712");
        await page.getByRole("button", { name: "Login" }).click();
    });

    test("Login Professor Falha", async ({ page }) => {

        await page.getByLabel("Email").fill("Akuma@gmail.com");
        await page.getByLabel("Senha").fill("@Shoriuken712");

        await page.getByRole("button", { name: "Login" }).click();
    
        const erroLogin = page.getByText("Erro ao fazer login");
        expect(erroLogin).toBeTruthy();
    });
});

test("Login que não existe", async ({ page }) => {
  await page.goto("https://cursoartedaguerra.com.br");
  
  await page.getByRole("button", { name: "Log In" }).click();

  await page.getByLabel("Email").fill("bambino@gmail.com");
  await page.getByLabel("Senha").fill("@Espaguetti902");

  await page.getByRole("button", { name: "Login" }).click();

  const erroLogin = page.getByText("Erro ao fazer login");
  expect(erroLogin).toBeTruthy();
});