import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { getAuthToken } from "../utils/authUtils";
import {
  Inscription,
  CourseDetails,
  CourseWithProgress,
} from "../Interfaces/interfaces";

const MyInscription: React.FC = () => {
  const [coursesWithProgress, setCoursesWithProgress] = useState<
    CourseWithProgress[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = getAuthToken();

  const fetchProgressForCourse = useCallback(
    async (course: CourseDetails): Promise<CourseWithProgress> => {
      const lessonsRes = await fetch(
        `http://localhost:3000/lessons?class_id=${course.id}&limit=100`,
        { credentials: "include" }
      );
      let totalLessons = 0;
      if (lessonsRes.ok) {
        const lessonsData = await lessonsRes.json();
        const lessonsArray = Array.isArray(lessonsData)
          ? lessonsData
          : lessonsData.data;
        totalLessons = Array.isArray(lessonsArray) ? lessonsArray.length : 0;
      }

      const progressRes = await fetch(
        `http://localhost:3000/lesson-progress?class_id=${course.id}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      let completedLessons = 0;
      if (progressRes.ok) {
        const progressData: { lesson_id: number; status: string }[] =
          await progressRes.json();
        completedLessons = progressData.filter(
          (p) => p.status === "done"
        ).length;
      }

      const progressPercentage =
        totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

      return { ...course, progress: progressPercentage };
    },
    [token]
  );

  useEffect(() => {
    setCoursesWithProgress([]);
    setLoading(true);
    setError(null);

    const fetchCourses = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const inscriptionsRes = await fetch(
          `http://localhost:3000/inscription`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (!inscriptionsRes.ok) {
          throw new Error("Falha ao buscar inscrições");
        }

        const inscriptions: Inscription[] = await inscriptionsRes.json();
        if (inscriptions.length === 0) {
          setCoursesWithProgress([]);
          return;
        }

        const coursePromises = inscriptions.map((inscription) =>
          fetch(`http://localhost:3000/class/${inscription.class_id}`, {
            credentials: "include",
          })
        );
        const courseResults = await Promise.allSettled(coursePromises);
        const coursesData: CourseDetails[] = [];

        for (const result of courseResults) {
          if (result.status === "fulfilled") {
            const res = result.value;
            if (res.ok) {
              const course: CourseDetails = await res.json();
              coursesData.push(course);
            } else {
              console.error(
                "Erro ao buscar detalhes do curso:",
                res.statusText
              );
            }
          } else {
            console.error("Erro na requisição do curso:", result.reason);
          }
        }

        const coursesProgressPromises = coursesData.map((course) =>
          fetchProgressForCourse(course)
        );
        const coursesWithProgressResult = await Promise.all(
          coursesProgressPromises
        );
        setCoursesWithProgress(coursesWithProgressResult);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Erro desconhecido";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token, fetchProgressForCourse]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 ">Minhas Inscrições</h1>
        <p className="text-red-500">Erro: {error}</p>
      </div>
    );
  }

  if (coursesWithProgress.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Minhas Inscrições</h1>
        <p>Você não possui inscrições.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Minhas Inscrições</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coursesWithProgress.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow p-6 flex flex-col h-full"
          >
            <img
              src={course.url_img}
              alt={course.title}
              className="w-full h-40 sm:h-60 md:h-80 object-cover mb-4 rounded"
            />
            <h2 className="text-2xl font-semibold mb-2 text-center">
              {course.title}
            </h2>
            <p className="text-gray-700 mb-2 text-justify">
              {course.description}
            </p>

            <div className="mt-auto flex flex-col items-start">
              {course.progress === 100 ? (
                <p className="mb-2 font-medium text-green-600">Concluído</p>
              ) : (
                <p className="mb-2 font-medium">Em andamento</p>
              )}
              <button
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Acessar Curso
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyInscription;
