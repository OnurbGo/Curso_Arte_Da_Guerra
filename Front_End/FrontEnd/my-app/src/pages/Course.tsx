import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Course = () => {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchLessons = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/lessons?class_id=${id}`
      );
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.error("Erro ao buscar as lições:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-500">
        Carregando...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Lições do Curso
      </h1>
      {lessons.length === 0 ? (
        <p className="text-center text-gray-600">
          Não há lições disponíveis para esta classe.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={lesson.url_img}
                alt={lesson.title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {lesson.title}
              </h2>
              <button
                onClick={() => navigate(`/lesson/${lesson.id}`)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg mt-2 transition duration-200 hover:bg-red-700"
              >
                Veja a lição
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Course;
