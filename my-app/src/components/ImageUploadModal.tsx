import React, { useState } from "react";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (url: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onSend,
}) => {
  const [urlInput, setUrlInput] = useState("");

  const handleSend = () => {
    if (!urlInput.trim()) return;
    onSend(urlInput.trim());
    setUrlInput("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Atualizar Avatar
        </h3>
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Cole a URL da imagem"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
