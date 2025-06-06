import React from "react";

interface CourseFormProps {
  title: string;
  description: string;
  img: string;
  banner: string;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  submitLabel: string;
}

const CourseForm: React.FC<CourseFormProps> = ({
  title,
  description,
  img,
  banner,
  onChange,
  onSubmit,
  submitLabel,
}) => (
  <div className="max-w-10-1 mx-auto bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
      Detalhes do Curso
    </h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      {/* Título */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Título
        </label>
        <input
          id="title"
          type="text"
          placeholder="Título do Curso"
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
          className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Descrição */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Descrição
        </label>
        <textarea
          id="description"
          placeholder="Descrição do Curso"
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={4}
          className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Imagem */}
      <div>
        <label
          htmlFor="img"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          URL da Imagem
        </label>
        <input
          id="img"
          type="text"
          placeholder="URL da Imagem"
          value={img}
          onChange={(e) => onChange("img", e.target.value)}
          className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Banner */}
      <div>
        <label
          htmlFor="banner"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          URL do Banner
        </label>
        <input
          id="banner"
          type="text"
          placeholder="URL do Banner"
          value={banner}
          onChange={(e) => onChange("banner", e.target.value)}
          className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Botão de Submit */}
      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  </div>
);

export default CourseForm;
