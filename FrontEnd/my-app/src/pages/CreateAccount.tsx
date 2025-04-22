import { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { FormData } from "../Interfaces/interfaces";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterUser() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    CPF: "",
    password: "",
    confirmPassword: "",
    type: "",
    biography: "",
    expertise: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCPF = (cpfValue: string): boolean =>
    cpfValidator.isValid(cpfValue);

  const formatCPF = (cpf: string): string => {
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11) return cpf;
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      hasUppercase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const evaluatePasswordStrength = (password: string): string =>
    validatePassword(password) ? "Forte" : "Fraca";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setFormData({ ...formData, password: pwd });
    setPasswordStrength(evaluatePasswordStrength(pwd));
  };

  const handleSubmit = async (e: FormEvent) => {
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
      setError("CPF inválido. Insira um CPF válido.");
      setErrorAlert(true);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não conferem.");
      setErrorAlert(true);
      return;
    }
    if (!validatePassword(formData.password)) {
      setError(
        "A senha precisa ter ao menos 8 caracteres, uma letra maiúscula, um número e um caractere especial."
      );
      setErrorAlert(true);
      return;
    }
    if (
      formData.type === "teacher" &&
      (!formData.biography.trim() || !formData.expertise.trim())
    ) {
      setError("Para professores, Biografia e Especialidade são obrigatórios.");
      setErrorAlert(true);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        CPF: formatCPF(formData.CPF),
        password: formData.password,
        type: formData.type,
      };
      const res = await axios.post("http://localhost:3000/users", payload);
      setSuccess(true);

      if (formData.type === "teacher") {
        await axios.post("http://localhost:3000/teachers", {
          user_id: res.data.id,
          biography: formData.biography,
          expertise: formData.expertise,
        });
      }
    } catch (err: unknown) {
      setErrorAlert(true);
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message: string }>;
        setError(axiosErr.response?.data.message || "Erro ao registrar.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <img
          src="https://raw.githubusercontent.com/OnurbGo/Curso_Arte_Da_Guerra/main/FrontEnd/my-app/src/assets/Yin_and_Yang_symbol.png"
          alt="Arte da Guerra"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          Cadastre Sua Conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded shadow"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              name="name"
              type="text"
              required
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              CPF
            </label>
            <input
              name="CPF"
              type="text"
              required
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <div className="relative mt-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                onChange={handlePasswordChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordStrength && (
              <p
                className={`mt-1 text-sm ${
                  passwordStrength === "Fraca"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                Senha {passwordStrength}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirmar Senha
            </label>
            <div className="relative mt-1">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <select
              name="type"
              required
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Selecione</option>
              <option value="student">Estudante</option>
              <option value="teacher">Professor</option>
            </select>
          </div>

          {formData.type === "teacher" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Biografia
                </label>
                <textarea
                  name="biography"
                  required
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Especialidade
                </label>
                <input
                  name="expertise"
                  type="text"
                  required
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Cadastrar
          </button>
        </form>

        {success && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Usuário cadastrado com sucesso!
          </div>
        )}
        {errorAlert && !success && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error || "Erro ao registrar. Tente novamente."}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Já tem cadastro?{" "}
          <a href="/loginaccount" className="text-indigo-600 hover:underline">
            Faça login aqui
          </a>
        </p>
      </div>
    </div>
  );
}
