import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRotateLeft } from "react-icons/fa6";
import { getAuthToken } from "../utils/authUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import { LessonData } from "../Interfaces/interfaces";

const Lesson: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [allLessons, setAllLessons] = useState<LessonData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [completed, setCompleted] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`http://localhost:3000/lessons/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao buscar a lição");
        const data: LessonData = await res.json();
        setLesson(data);

        const lessonsRes = await fetch(
          `http://localhost:3000/lessons?class_id=${data.class_id}&limit=100`,
          { credentials: "include" }
        );
        if (lessonsRes.ok) {
          const lessonsData = await lessonsRes.json();
          const lessonsArray = Array.isArray(lessonsData)
            ? lessonsData
            : Array.isArray(lessonsData.data)
            ? lessonsData.data
            : [];
          setAllLessons(lessonsArray);
        }

        const token = getAuthToken();
        const progressRes = await fetch(
          `http://localhost:3000/lesson-progress?class_id=${data.class_id}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );
        if (progressRes.ok) {
          const progressData = await progressRes.json();
          const isCompleted = progressData.some(
            (p: { lesson_id: number; status: string }) =>
              p.lesson_id === data.id && p.status === "done"
          );
          setCompleted(isCompleted);
        }
      } catch (error) {
        console.error(error);
        setLesson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const markAsCompleted = async () => {
    if (!lesson) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`http://localhost:3000/lesson-progress/done`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ lesson_id: lesson.id }),
      });
      if (res.ok) setCompleted(true);
    } catch (error) {
      console.error("Erro ao marcar a lição como concluída", error);
    }
  };

  const unmarkAsCompleted = async () => {
    if (!lesson) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`http://localhost:3000/lesson-progress/undone`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ lesson_id: lesson.id }),
      });
      if (res.ok) setCompleted(false);
    } catch (error) {
      console.error("Erro ao desmarcar a lição", error);
    }
  };

  const handleMark = () => {
    setAnimating(true);
    markAsCompleted().finally(() => setTimeout(() => setAnimating(false), 500));
  };

  const handleUnmark = () => {
    setAnimating(true);
    unmarkAsCompleted().finally(() =>
      setTimeout(() => setAnimating(false), 500)
    );
  };

  const currentIndex = lesson
    ? allLessons.findIndex((l) => l.id === lesson.id)
    : -1;

  const handleNextLesson = () => {
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      navigate(`/lesson/${allLessons[currentIndex + 1].id}`);
    }
  };

  const handlePreviousLesson = () => {
    if (currentIndex > 0) {
      navigate(`/lesson/${allLessons[currentIndex - 1].id}`);
    }
  };

  const handleBackToCourse = () => {
    if (lesson) {
      navigate(`/course/${lesson.class_id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-700">
        <LoadingSpinner />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-red-500">
        Lição não encontrada
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4">
      <div className="max-w-3xl mx-auto mb-6">
        <button
          onClick={handleBackToCourse}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-medium py-2 px-4 rounded-lg shadow"
        >
          <FaRotateLeft />
          Voltar para o Curso
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1
            className="text-4xl font-extrabold mb-6 text-center"
            style={{ color: "#2c3e50" }}
          >
            {lesson.title}
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {lesson.description}
          </p>
          <div className="flex justify-center mb-8">
            <video
              key={`video-${lesson.id}`}
              className="w-full max-w-xl rounded-md shadow-lg"
              controls
            >
              <source src={lesson.url_video} type="video/mp4" />
              Seu navegador não suporta vídeo.
            </video>
          </div>

          <div className="flex justify-center mb-10">
            {!completed ? (
              <button
                onClick={handleMark}
                className={`bg-green-500 hover:bg-green-600 transition-colors text-white font-semibold py-2 px-8 rounded-full shadow-md ${
                  animating ? "animate-blend" : ""
                }`}
              >
                Marcar como Concluída
              </button>
            ) : (
              <button
                onClick={handleUnmark}
                className={`bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold py-2 px-8 rounded-full shadow-md ${
                  animating ? "animate-blend" : ""
                }`}
              >
                Desmarcar como Concluída
              </button>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePreviousLesson}
              disabled={currentIndex <= 0}
              className={`bg-blue-500 hover:bg-blue-600 transition-colors text-white font-medium py-2 px-6 rounded-lg shadow ${
                currentIndex <= 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Lição Anterior
            </button>
            <button
              onClick={handleNextLesson}
              disabled={
                currentIndex < 0 || currentIndex === allLessons.length - 1
              }
              className={`bg-blue-500 hover:bg-blue-600 transition-colors text-white font-medium py-2 px-6 rounded-lg shadow ${
                currentIndex < 0 || currentIndex === allLessons.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Próxima Lição
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blendAnimation {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-blend {
          animation: blendAnimation 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default Lesson;
