import { useState } from "react";
import axios from "axios";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

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
    <>
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
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Usuário cadastrado com sucesso!</p>
                </div>
              </div>
            </div>
          )}

          {/* Alerta de Erro */}
          {errorAlert && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
              role="alert"
            >
              <span className="block sm:inline">
                Erro ao registrar. Tente novamente.
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Fechar</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
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
    </>
  );
}
