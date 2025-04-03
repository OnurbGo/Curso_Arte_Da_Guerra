import React from "react";

/*bg-gray-900*/

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black text-center">
      <img
        src="https://raw.githubusercontent.com/OnurbGo/Store/refs/heads/main/Site/Imagens/Stun.webp"
        alt="Imagem 404"
        className="w-1/4 md:w-1/6 mb-8"
      />
      <h1 className="text-5xl font-bold mb-4">404 - Página não encontrada</h1>
      <p className="text-xl mb-8 ">
        Desculpe, a página que você está procurando não existe.
      </p>
      <a
        href="/"
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded transition duration-300"
      >
        Voltar para a página inicial
      </a>
    </div>
  );
};

export default NotFound;
