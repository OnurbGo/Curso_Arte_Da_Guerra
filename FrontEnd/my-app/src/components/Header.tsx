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
    <div className="relative bg-white px-6 lg:px-8">
      <header className="relative z-20">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <button onClick={() => navigate("/")} className="-m-1.5 p-1.5">
              <span className="sr-only">Sua Empresa</span>
              <img
                alt="Logo"
                src="https://raw.githubusercontent.com/OnurbGo/Curso_Arte_Da_Guerra/refs/heads/main/FrontEnd/my-app/src/assets/Yin_and_Yang_symbol.png"
                className="h-8 w-auto"
              />
            </button>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Abrir menu</span>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {isAuthenticated ? (
              <Menu as="div" className="relative">
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                  Perfil
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 h-5 w-5 text-gray-400"
                  />
                </Menu.Button>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5">
                  <div className="py-1">
                    <Menu.Item>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Meu Perfil
                      </a>
                    </Menu.Item>
                    {userType === "teacher" && (
                      <Menu.Item>
                        <a
                          href="/mycourses"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Meus Cursos
                        </a>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
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
                className="text-sm font-semibold text-gray-900"
              >
                Log in
              </button>
            )}
            <button
              onClick={() => navigate("/class")}
              className="text-sm font-semibold text-gray-900"
            >
              Classes
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-100 bg-opacity-80">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {isAuthenticated ? (
                <>
                  <a
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-700"
                  >
                    Meu Perfil
                  </a>
                  {userType === "teacher" && (
                    <a
                      href="/mycourses"
                      className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-700"
                    >
                      Meus Cursos
                    </a>
                  )}
                  <a
                    href="/class"
                    className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-700"
                  >
                    Classes
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    Deslogar
                  </button>
                </>
              ) : (
                <a
                  href="/loginaccount"
                  className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-700"
                >
                  Log in
                </a>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
