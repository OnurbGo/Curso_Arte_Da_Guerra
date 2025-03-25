import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.data.token) {
        Cookies.set("authToken", response.data.token, { expires: 7 });
        setSuccess(true);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm">Login successful!</p>
            )}

            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
