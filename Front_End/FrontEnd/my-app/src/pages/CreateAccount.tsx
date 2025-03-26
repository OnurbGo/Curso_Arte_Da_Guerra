import { useState } from "react";
import axios from "axios";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    CPF: "",
    password: "",
    type: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  // regex email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // regex cpf
  const validateCPF = (cpf: string) => {
    const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    return cpfRegex.test(cpf);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setErrorAlert(false);

    // Validações antes de enviar
    if (!validateEmail(formData.email)) {
      setError("Email inválido. Use um formato válido.");
      setErrorAlert(true);
      return;
    }

    if (!validateCPF(formData.CPF)) {
      setError(
        "CPF inválido. Use o formato XXX.XXX.XXX-XX ou números sem pontuação."
      );
      setErrorAlert(true);
      return;
    }

    try {
      await axios.post("http://localhost:3000/users", formData);
      setSuccess(true);
    } catch (error) {
      setErrorAlert(true);
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao registrar:",
          error.response?.data || error.message
        );
        setError(error.response?.data?.message);
      } else {
        console.error("Erro inesperado:", error);
        setError("Erro ao registrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Arte Da Guerra"
          src="https://github.com/OnurbGo/Curso_Arte_Da_Guerra/blob/main/Front_End/FrontEnd/my-app/src/assets/Yin_and_Yang_symbol.png?raw=true"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Cadastre Sua Conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Nome
            </label>
            <input
              name="name"
              type="text"
              required
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              CPF
            </label>
            <input
              name="CPF"
              type="text"
              required
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Senha
            </label>
            <input
              name="password"
              type="password"
              required
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Tipo
            </label>
            <select
              name="type"
              required
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
            >
              <option value="">Selecione</option>
              <option value="student">Estudante</option>
              <option value="teacher">Professor</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
            >
              Cadastrar
            </button>
          </div>
        </form>

        {success && (
          <div
            className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mt-4"
            role="alert"
          >
            <p className="font-bold">Usuário cadastrado com sucesso!</p>
          </div>
        )}

        {errorAlert && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
            role="alert"
          >
            <span className="block sm:inline">
              Erro ao registrar. Tente novamente.
            </span>
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Já tem cadastro?{" "}
          <a
            href="/loginaccount"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Faça login aqui
          </a>
        </p>
      </div>
    </div>
  );
}
