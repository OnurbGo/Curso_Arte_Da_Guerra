import { useState } from "react";
import axios from "axios";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    CPF: "",
    password: "",
    type: "",
    biography: "",
    expertise: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCPF = (cpf) => {
    const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    return cpfRegex.test(cpf);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });

    if (password.length < 6) {
      setPasswordStrength("Fraca");
    } else if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      setPasswordStrength("Forte");
    } else {
      setPasswordStrength("Média");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setErrorAlert(false);

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

    if (passwordStrength === "Fraca") {
      setError("A senha é fraca. Por favor, use uma senha mais forte.");
      setErrorAlert(true);
      return;
    }

    if (formData.type === "teacher") {
      if (!formData.biography.trim() || !formData.expertise.trim()) {
        setError(
          "Para professores, os campos Biografia e Especialidade são obrigatórios."
        );
        setErrorAlert(true);
        return;
      }
    }

    try {
      const userResponse = await axios.post(
        "http://localhost:3000/users",
        formData
      );
      setSuccess(true);

      if (formData.type === "teacher") {
        await axios.post("http://localhost:3000/teachers", {
          user_id: userResponse.data.id,
          biography: formData.biography,
          expertise: formData.expertise,
        });
      }
    } catch (error) {
      setErrorAlert(true);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Erro ao registrar. Tente novamente."
        );
      } else {
        setError("Erro inesperado. Tente novamente.");
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
              onChange={handlePasswordChange}
              id="hs-strong-password-base"
              className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
            <div
              data-hs-strong-password='{"target": "#hs-strong-password-base", "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1"}'
              className="flex mt-2 -mx-1"
            ></div>
            {passwordStrength && (
              <p
                className={`text-sm ${
                  passwordStrength === "Fraca"
                    ? "text-red-500"
                    : passwordStrength === "Média"
                    ? "text-yellow-500"
                    : "text-teal-500"
                }`}
              >
                Senha {passwordStrength}
              </p>
            )}
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

          {formData.type === "teacher" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Biografia
                </label>
                <textarea
                  name="biography"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Especialidade
                </label>
                <input
                  name="expertise"
                  type="text"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
                />
              </div>
            </>
          )}

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
