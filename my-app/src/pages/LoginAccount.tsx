import { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function LoginAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Função para obter a URL da API
  const getApiUrl = () => {
    return import.meta.env.VITE_API_URL || "/api/";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {

      const { data } = await axios.post(
        `${getApiUrl()}login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Verificar se o token existe e não é undefined
      if (data && data.token && data.token !== "undefined") {
        login(data.token);
        setSuccess(true);
        navigate("/");
      } else {
        throw new Error("Token inválido recebido do servidor");
      }
    } catch (err: unknown) {

      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message: string }>;
        setError(axiosErr.response?.data?.message || "Erro ao fazer login.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado. Verifique suas credenciais.");
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
          Logar em sua conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded shadow"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm">
              Login realizado com sucesso!
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-small text-gray-600">
          Não tem uma conta?{" "}
          <a href="/createaccount" className="text-indigo-600 hover:underline">
            Crie sua conta aqui
          </a>
        </p>
      </div>
    </div>
  );
}
