import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

const Course: React.FC = () => {
  const { id } = useParams();
  const [lessons, setLessons] = useState<any[]>([]);
  const [totalLessons, setTotalLessons] = useState<number>(0);
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 8;
  const navigate = useNavigate();

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/class/${id}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Falha ao buscar os detalhes do curso");
      const data = await response.json();
      setCourseDetails(data);
      fetchTeacher(data.master_id);
    } catch (err) {
      setError("Erro ao carregar os detalhes do curso");
    }
  };

  const fetchTeacher = async (teacherId: string | number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/teachers/${teacherId}`,
        {
          credentials: "include",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (!response.ok) throw new Error("Falha ao buscar o professor");
      const data = await response.json();
      setTeacher(data);
    } catch (err) {
      setError("Erro ao carregar os dados do professor");
    }
  };

  const fetchLessons = async (page: number, limit: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/lessons?class_id=${id}&page=${page}&limit=${limit}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Falha ao buscar as lições");
      const data = await response.json();
      if (data.data && data.total !== undefined) {
        setLessons(data.data);
        setTotalLessons(data.total);
      } else if (Array.isArray(data)) {
        setLessons(data);
        setTotalLessons(data.length);
      } else {
        setLessons([]);
        setTotalLessons(0);
      }
    } catch (err) {
      setError("Erro ao carregar as lições");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchCourseDetails();
    fetchLessons(currentPage, lessonsPerPage);
    AOS.init({ duration: 1000 });
    return () => {
      AOS.refresh();
    };
  }, [id, currentPage]);

  if (loading || !courseDetails || !teacher) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-500">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div
        className="bg-gray-100 p-8 rounded-lg shadow-md mb-12"
        data-aos="fade-up"
      >
        <h1 className="text-4xl font-bold text-gray-800 break-words whitespace-normal">
          {courseDetails.title}
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          {courseDetails.description}
        </p>
      </div>
      <div
        className="bg-white p-8 rounded-lg shadow-md mb-12"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Informações do Professor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-bold text-gray-700">Nome do Professor:</p>
            <p className="text-gray-600">
              {teacher.UserModel?.name || teacher.name || "Nome não disponível"}
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-700">Biografia do Professor:</p>
            <p className="text-gray-600">
              {teacher.biography || "Biografia não disponível"}
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-700">
              Especialidade do Professor:
            </p>
            <p className="text-gray-600">
              {teacher.expertise || "Especialidade não disponível"}
            </p>
          </div>
        </div>
      </div>
      <h2
        className="text-3xl font-semibold text-gray-800 mb-6 text-center"
        data-aos="fade-up"
      >
        Lições do Curso
      </h2>
      {lessons.length === 0 ? (
        <p className="text-center text-gray-600">
          Não há lições disponíveis para este curso.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-lg transform hover:scale-105 transition-all duration-300"
              data-aos="fade-up"
            >
              <img
                src={lesson.url_img}
                alt={lesson.title}
                className="w-full h-full object-cover mb-4 rounded-lg"
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
      <Pagination
        currentPage={currentPage}
        totalItems={totalLessons}
        itemsPerPage={lessonsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Course;
