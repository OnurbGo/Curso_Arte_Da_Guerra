import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Lesson = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLesson = async () => {
    try {
      const response = await fetch(`http://localhost:3000/lessons/${id}`);
      const data = await response.json();
      setLesson(data);
    } catch (error) {
      console.error("Erro ao buscar a lição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Carregando...
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Lição não encontrada
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          {lesson.title}
        </h1>
        <p className="text-gray-600 mb-6">{lesson.description}</p>
        <div className="max-w-md mx-auto">
          <video className="w-full rounded-lg" controls>
            <source src={lesson.url_video} type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Lesson;
