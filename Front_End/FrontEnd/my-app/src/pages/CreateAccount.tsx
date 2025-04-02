import { useState } from "react";
import axios from "axios";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    CPF: "",
    password: "",
    confirmPassword: "",
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

  const validateCPF = (cpfValue) => {
    return cpfValidator.isValid(cpfValue);
  };

  // Formata o CPF para o formato 000.000.000-00
  const formatCPF = (cpf) => {
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11) return cpf;
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
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
      setError("CPF inválido. Por favor, insira um CPF válido.");
      setErrorAlert(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(
        "As senhas não correspondem. Por favor, confirme a senha corretamente."
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
      // Formata o CPF antes de enviar
      const userPayload = {
        name: formData.name,
        email: formData.email,
        CPF: formatCPF(formData.CPF),
        password: formData.password,
        type: formData.type,
      };

      const userResponse = await axios.post(
        "http://localhost:3000/users",
        userPayload
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
              className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
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
              Confirmar Senha
            </label>
            <input
              name="confirmPassword"
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
              {error || "Erro ao registrar. Tente novamente."}
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
