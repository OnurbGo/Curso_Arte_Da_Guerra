import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("Deslogando...");
    logout();
    navigate("/");
  };

  return (
    <div className="relative bg-white px-6 lg:px-8">
      <header className="bg-white">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <button onClick={() => navigate("/")} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="Yin and Yang"
                src="https://github.com/OnurbGo/Curso_Arte_Da_Guerra/blob/main/Front_End/FrontEnd/my-app/src/assets/Yin_and_Yang_symbol.png?raw=true"
                className="h-8 w-auto"
              />
            </button>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            {isAuthenticated ? (
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                  Perfil
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 flex-none text-gray-400"
                  />
                </PopoverButton>
                <PopoverPanel
                  transition
                  className="absolute top-full -left-8 z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition"
                >
                  <div className="p-4">
                    <button
                      onClick={handleLogout}
                      className="mt-4 text-red-600 hover:text-red-800"
                    >
                      Deslogar
                    </button>
                  </div>
                </PopoverPanel>
              </Popover>
            ) : (
              <button
                onClick={() => navigate("/loginaccount")}
                className="text-sm font-semibold text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            )}
            <button
              onClick={() => navigate("/class")}
              className="text-sm font-semibold text-gray-900"
            >
              Classes
            </button>
          </PopoverGroup>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-60 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button onClick={() => navigate("/")} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt="Yin and Yang"
                  src="https://github.com/OnurbGo/Curso_Arte_Da_Guerra/blob/main/Front_End/FrontEnd/my-app/src/assets/Yin_and_Yang_symbol.png?raw=true"
                  className="h-8 w-auto"
                />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <button
                    onClick={() => navigate("/class")}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Classes
                  </button>
                </div>
                <div className="py-6">
                  {!isAuthenticated && (
                    <button
                      onClick={() => navigate("/loginaccount")}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
};

export default Header;
