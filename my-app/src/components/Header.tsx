import { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

interface DecodedToken {
  user: {
    id: number;
    name: string;
    email: string;
    CPF: string;
    type: string;
  };
}

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [userType, setUserType] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decodedToken = jwt_decode<DecodedToken>(token);
        setUserType(decodedToken.user.type);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      setUserType(null);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="relative z-50 w-full bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-lg border-b border-gray-200 text-white">
      <nav className="container mx-auto flex items-center justify-between px-4 lg:px-8 py-2">
        {/* Logo */}
        <div className="flex items-center gap-x-8">
          <button onClick={() => navigate("/")} className="focus:outline-none">
            <span className="sr-only">Sua Empresa</span>
            <img
              alt="Logo"
              src="https://raw.githubusercontent.com/OnurbGo/Curso_Arte_Da_Guerra/refs/heads/main/my-app/src/assets/Yin_and_Yang_symbol.png"
              className="h-8 w-auto object-scale-down border border-white rounded-full shadow-md"
            />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:text-gray-300"
          >
            <span className="sr-only">Abrir menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {isAuthenticated ? (
            <Menu as="div" className="relative">
              <Menu.Button className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-700">
                Perfil
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-white"
                />
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-gray-800 ring-1 shadow-lg ring-black/5">
                <div className="py-1">
                  <Menu.Item>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      Meu Perfil
                    </a>
                  </Menu.Item>
                  {userType === "teacher" && (
                    <Menu.Item>
                      <a
                        href="/mycourses"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        Meus Cursos
                      </a>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <a
                      href="/myinscription"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      Minhas Inscrições
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-700 flex items-center gap-2"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      Deslogar
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          ) : (
            <button
              onClick={() => navigate("/loginaccount")}
              className="text-sm font-semibold text-white hover:text-gray-300"
            >
              Log in
            </button>
          )}
          <button
            onClick={() => navigate("/class")}
            className="text-sm font-semibold text-white hover:text-gray-300"
          >
            Classes
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-sm">
          <div className="space-y-1 px-4 pt-2 pb-3">
            {isAuthenticated ? (
              <>
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  Meu Perfil
                </a>
                {userType === "teacher" && (
                  <a
                    href="/mycourses"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Meus Cursos
                  </a>
                )}
                <a
                  href="/class"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  Classes
                </a>
                <a
                  href="/myinscription"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  Minhas Inscrições
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-700 flex items-center gap-2"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Deslogar
                </button>
              </>
            ) : (
              <a
                href="/loginaccount"
                className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Log in
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
