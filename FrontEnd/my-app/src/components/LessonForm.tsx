import React, { useState } from "react";

interface LessonFormProps {
  title: string;
  description: string;
  video: string;
  img: string;
  onChange: (field: string, value: string) => void;
  onSubmit: (data: Omit<Lesson, "id" | "class_id">) => void;
  submitLabel: string;
}

export interface Lesson {
  id: number;
  class_id: number;
  title: string;
  description: string;
  url_video: string;
  url_img: string;
}

const LessonForm: React.FC<LessonFormProps> = ({
  title,
  description,
  video,
  img,
  onChange,
  onSubmit,
  submitLabel,
}) => {
  // local state para inputss
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [localVideo, setLocalVideo] = useState(video);
  const [localImg, setLocalImg] = useState(img);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: localTitle,
      description: localDescription,
      url_video: localVideo,
      url_img: localImg,
    });
    // limpar campos
    setLocalTitle("");
    setLocalDescription("");
    setLocalVideo("");
    setLocalImg("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4 mt-4">
      <input
        type="text"
        placeholder="Título da Lição"
        value={localTitle}
        onChange={(e) => {
          setLocalTitle(e.target.value);
          onChange("title", e.target.value);
        }}
        className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        placeholder="Descrição da Lição"
        value={localDescription}
        onChange={(e) => {
          setLocalDescription(e.target.value);
          onChange("description", e.target.value);
        }}
        className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        placeholder="URL do Vídeo"
        value={localVideo}
        onChange={(e) => {
          setLocalVideo(e.target.value);
          onChange("video", e.target.value);
        }}
        className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        placeholder="URL da Imagem"
        value={localImg}
        onChange={(e) => {
          setLocalImg(e.target.value);
          onChange("img", e.target.value);
        }}
        className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default LessonForm;
