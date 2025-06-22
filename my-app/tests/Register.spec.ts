import { test, expect } from "@playwright/test";

test("Teste", async ({ page }) => {
  await page.goto("https://cursoartedaguerra.com.br");

  //verificar se isso aqui funciona
  const title = page.getByText("Aprenda a Arte da Guerra");
  expect(title).toBeTruthy();
});

//CRIAÇÃO/LOGIN DE PROFESSOR

test("Criando Conta Professor Sucesso", async ({ page }) => {
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

  await page.getByLabel("Email").fill("Akuma@gmail.com");
  await page.getByLabel("Senha").fill("@ShunGokusatsu712");

  await page.getByRole("button", { name: "Login" }).click();
});

test("CPF Invalido - Professor", async ({ page }) => {
  await page.goto("https://cursoartedaguerra.com.br");
  
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByText("Crie Sua Conta Aqui").click();

  await page.getByLabel("Nome").fill("Akuma da Silva");
  await page.getByLabel("Email").fill("Akuma@gmail.com");
  await page.getByLabel("CPF").fill("00000000000"); 
  await page.getByLabel("Tipo").selectOption("teacher");
  await page.getByLabel("Biografia").fill("Eu era um pródigio da arte de chutar idosas, com o tempo aperfeiçoei minha tecnica");
  await page.getByLabel("Especialidade").fill("Chutador de Idosas");
  await page.getByTestId("password").fill("@ShunGokusatsu712");
  await page.getByTestId("confirmPassword").fill("@ShunGokusatsu712");

  await page.getByRole("button", { name: "Cadastrar" }).click();

  const erroCPF = page.getByText("CPF inválido. Insira um CPF válido.");
  expect(erroCPF).toBeTruthy();
});

test("Gmail Invalido - Professor", async ({ page }) => {
  await page.goto("https://cursoartedaguerra.com.br");
  
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByText("Crie Sua Conta Aqui").click();

  await page.getByLabel("Nome").fill("Akuma da Silva");
  await page.getByLabel("Email").fill("Akumaasggmail.com");
  await page.getByLabel("CPF").fill("843.886.040-03"); 
  await page.getByLabel("Tipo").selectOption("teacher");
  await page.getByLabel("Biografia").fill("Eu era um pródigio da arte de chutar idosas, com o tempo aperfeiçoei minha tecnica");
  await page.getByLabel("Especialidade").fill("Chutador de Idosas");
  await page.getByTestId("password").fill("@ShunGokusatsu712");
  await page.getByTestId("confirmPassword").fill("@ShunGokusatsu712");

  await page.getByRole("button", { name: "Cadastrar" }).click();
});

test("Senha Fraca - Professor", async ({ page }) => {
  await page.goto("https://cursoartedaguerra.com.br");
  
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByText("Crie Sua Conta Aqui").click();

  await page.getByLabel("Nome").fill("Akuma da Silva");
  await page.getByLabel("Email").fill("Akuma@gmail.com");
  await page.getByLabel("CPF").fill("843.886.040-03"); 
  await page.getByLabel("Tipo").selectOption("teacher");
  await page.getByLabel("Biografia").fill("Eu era um pródigio da arte de chutar idosas, com o tempo aperfeiçoei minha tecnica");
  await page.getByLabel("Especialidade").fill("Chutador de Idosas");
  await page.getByTestId("password").fill("@712");
  await page.getByTestId("confirmPassword").fill("@712");

  await page.getByRole("button", { name: "Cadastrar" }).click();

  const erroSenhaFraca = page.getByText("A senha precisa ter ao menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.");
  expect(erroSenhaFraca).toBeTruthy();
});

test("Senhas Não Conferem - Professor", async ({ page }) => {
  await page.goto("https://cursoartedaguerra.com.br");
  
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByText("Crie Sua Conta Aqui").click();

  await page.getByLabel("Nome").fill("Akuma da Silva");
  await page.getByLabel("Email").fill("Akuma@gmail.com");
  await page.getByLabel("CPF").fill("843.886.040-03"); 
  await page.getByLabel("Tipo").selectOption("teacher");
  await page.getByLabel("Biografia").fill("Eu era um pródigio da arte de chutar idosas, com o tempo aperfeiçoei minha tecnica");
  await page.getByLabel("Especialidade").fill("Chutador de Idosas");
  await page.getByTestId("password").fill("@b712");
  await page.getByTestId("confirmPassword").fill("@s712");

  await page.getByRole("button", { name: "Cadastrar" }).click();

  const erroSenhaDiferente = page.getByText("As senhas não conferem.");
  expect(erroSenhaDiferente).toBeTruthy();
});

//CRIAÇÃO DE ALUNO
test("Criando Conta Aluno Sucesso", async ({ page }) => {
  await page.goto("https://cursoartedaguerra.com.br");
  
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByText("Crie Sua Conta Aqui").click();
  await page.getByLabel("Nome").fill("Carlos");
  await page.getByLabel("Email").fill("carlos@gmail.com");
  await page.getByLabel("CPF").fill("757.726.200-53"); 
  await page.getByLabel("Tipo").selectOption("student");
  await page.getByTestId("password").fill("@Paulo327");
  await page.getByTestId("confirmPassword").fill("@Paulo327");

  await page.getByRole("button", { name: "Cadastrar" }).click();

  const cadastroSucesso = page.getByText("Usuário cadastrado com sucesso!");
  expect(cadastroSucesso).toBeTruthy();

  await page.getByText("Faça Login aqui").click();

  await page.getByLabel("Email").fill("carlos@gmail.com");
  await page.getByLabel("Senha").fill("@Paulo327");

  await page.getByRole("button", { name: "Login" }).click();
})

test("CPF Invalido - Aluno", async ({ page }) => {
  await page.goto("https://cursoartedaguerra.com.br");
  
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByText("Crie Sua Conta Aqui").click();

  await page.getByLabel("Nome").fill("Carlos");
  await page.getByLabel("Email").fill("carlos@gmail.com");
  await page.getByLabel("CPF").fill("00000000000"); 
  await page.getByLabel("Tipo").selectOption("student");
  await page.getByTestId("password").fill("@Paulo327");
  await page.getByTestId("confirmPassword").fill("@Paulo327");

  await page.getByRole("button", { name: "Cadastrar" }).click();

  const erroCPF = page.getByText("CPF inválido. Insira um CPF válido.");
  expect(erroCPF).toBeTruthy();
});

test("Gmail Invalido - Aluno", async ({ page }) => {
  await page.goto("https://cursoartedaguerra.com.br");
  
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByText("Crie Sua Conta Aqui").click();

  await page.getByLabel("Nome").fill("Carlos");
  await page.getByLabel("Email").fill("carlosgregomail.com");
  await page.getByLabel("CPF").fill("757.726.200-53"); 
  await page.getByLabel("Tipo").selectOption("student");
  await page.getByTestId("password").fill("@Paulo327");
  await page.getByTestId("confirmPassword").fill("@Paulo327");

  await page.getByRole("button", { name: "Cadastrar" }).click();
});

test("Senha Fraca - Aluno", async ({ page }) => {
  await page.goto("https://cursoartedaguerra.com.br");
  
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByText("Crie Sua Conta Aqui").click();

  await page.getByLabel("Nome").fill("Carlos");
  await page.getByLabel("Email").fill("carlos@gmail.com");
  await page.getByLabel("CPF").fill("757.726.200-53"); 
  await page.getByLabel("Tipo").selectOption("student");
  await page.getByTestId("password").fill("@327");
  await page.getByTestId("confirmPassword").fill("@327");

  await page.getByRole("button", { name: "Cadastrar" }).click();

  const erroSenhaFraca = page.getByText("A senha precisa ter ao menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.");
  expect(erroSenhaFraca).toBeTruthy();
});

test("Senhas Não Conferem  - Aluno", async ({ page }) => {
  await page.goto("https://cursoartedaguerra.com.br");
  
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByText("Crie Sua Conta Aqui").click();

  await page.getByLabel("Nome").fill("Carlos");
  await page.getByLabel("Email").fill("carlos@gmail.com");
  await page.getByLabel("CPF").fill("757.726.200-53"); 
  await page.getByLabel("Tipo").selectOption("student");
  await page.getByTestId("password").fill("@d327");
  await page.getByTestId("confirmPassword").fill("@a327");

  await page.getByRole("button", { name: "Cadastrar" }).click();

  const erroSenhaDiferente = page.getByText("As senhas não conferem.");
  expect(erroSenhaDiferente).toBeTruthy();
});