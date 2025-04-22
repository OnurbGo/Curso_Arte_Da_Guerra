import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import CircularProgressBar from "../components/CircularProgressBar";
import jwt_decode from "jwt-decode";
import { useAuth } from "../utils/AuthContext";
import { getAuthToken } from "../utils/authUtils";
import {
  CourseDetails,
  Teacher,
  Lesson,
  DecodedTokenAuth,
  User,
} from "../Interfaces/interfaces";

const Course: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const classId = Number(id);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const token = getAuthToken();
  const userId = token ? jwt_decode<DecodedTokenAuth>(token).user.id : null;

  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [teacherAvatar, setTeacherAvatar] = useState<string>("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [totalLessons, setTotalLessons] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 8;

  const loadLessonsAndProgress = useCallback(async () => {
    try {
      const resL = await fetch(
        `http://localhost:3000/lessons?class_id=${classId}&page=${currentPage}&limit=${lessonsPerPage}`,
        { credentials: "include" }
      );
      if (!resL.ok) throw new Error("Falha ao buscar lições");
      const dataL = await resL.json();
      setLessons(dataL.data ?? dataL);
      setTotalLessons(dataL.total ?? (dataL.data ?? dataL).length);

      const resP = await fetch(
        `http://localhost:3000/lesson-progress?class_id=${classId}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (!resP.ok) throw new Error("Falha ao buscar progresso");
      const prog: { lesson_id: number; status: string }[] = await resP.json();
      setCompletedLessons(
        prog.filter((p) => p.status === "done").map((p) => p.lesson_id)
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
  }, [classId, currentPage, token]);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const resC = await fetch(`http://localhost:3000/class/${classId}`, {
          credentials: "include",
        });
        if (!resC.ok) throw new Error("Falha ao buscar detalhes do curso");
        const dataC: CourseDetails & { url_img_banner?: string } =
          await resC.json();
        setCourseDetails(dataC);

        const resT = await fetch(
          `http://localhost:3000/teachers/${dataC.master_id}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );
        if (!resT.ok) throw new Error("Falha ao buscar o professor");
        const t: Teacher = await resT.json();
        setTeacher(t);

        const resU = await fetch(`http://localhost:3000/users/${t.user_id}`, {
          credentials: "include",
        });
        if (resU.ok) {
          const user: User = await resU.json();
          setTeacherAvatar(user.url_img || "");
        }

        if (isAuthenticated && userId) {
          const resI = await fetch(
            `http://localhost:3000/inscription?user_id=${userId}&class_id=${classId}`,
            {
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!resI.ok) throw new Error("Falha ao verificar inscrição");
          const ins = await resI.json();
          setEnrolled(Array.isArray(ins) && ins.length > 0);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
        AOS.init({ duration: 800 });
      }
    };

    fetchInitial();
  }, [classId, isAuthenticated, token, userId]);

  useEffect(() => {
    if (enrolled) loadLessonsAndProgress();
  }, [enrolled, loadLessonsAndProgress]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/inscription`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ user_id: userId, class_id: classId }),
      });
      if (!res.ok) throw new Error("Erro ao inscrever-se");
      setEnrolled(true);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Erro desconhecido");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }
  if (!courseDetails || !teacher) {
    return (
      <div className="text-gray-700 text-center mt-8">
        Dados não encontrados.
      </div>
    );
  }

  const progress = totalLessons
    ? (completedLessons.length / totalLessons) * 100
    : 0;

  const teacherName = teacher.UserModel?.name ?? teacher.name ?? "";

  const Banner: React.FC = () => (
    <div className="w-full overflow-hidden rounded-lg mb-6">
      {courseDetails.url_img_banner && (
        <img
          src={courseDetails.url_img_banner}
          alt="Banner do curso"
          className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg shadow-md"
        />
      )}
    </div>
  );

  if (!enrolled) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-gray-100 p-8 rounded shadow mb-6" data-aos="fade-up">
          <h1 className="text-4xl font-bold mb-4 text-center">
            {courseDetails.title}
          </h1>
          <img
            src={courseDetails.url_img}
            alt={courseDetails.title}
            className="w-full sm:w-1/2 h-auto object-cover rounded mb-4 mx-auto"
          />
          <p className="text-justify">{courseDetails.description}</p>
        </div>
        <div className="text-center">
          <button
            onClick={handleEnroll}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Inscrever-se
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Banner />

      <div className="bg-gray-100 p-8 rounded shadow mb-6" data-aos="fade-up">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {courseDetails.title}
        </h1>
        <p className="text-justify">{courseDetails.description}</p>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6" data-aos="fade-up">
        <h2 className="text-2xl font-semibold mb-6 text-center">Professor</h2>
        <div className="flex flex-col md:flex-row items-start">
          <div className="flex flex-col items-center md:w-1/3">
            <div className="h-24 w-24 rounded-full bg-indigo-800 flex items-center justify-center text-2xl font-bold text-white overflow-hidden mb-4">
              {teacherAvatar ? (
                <img
                  src={teacherAvatar}
                  alt="Avatar do professor"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{teacherName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <p className="text-lg font-medium">{teacherName}</p>
            <p className="text-sm text-gray-500 mt-1">
              {teacher.expertise || "-"}
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:pl-8 md:w-2/3">
            <h3 className="text-lg font-semibold mb-2">Biografia</h3>
            <p className="text-justify">{teacher.biography || "-"}</p>
          </div>
        </div>
      </div>

      <div className="w-32 mx-auto mb-6" data-aos="fade-up">
        <CircularProgressBar progress={progress} />
        <p className="text-center">
          {completedLessons.length} de {totalLessons} lições
        </p>
      </div>

      <h2
        className="text-2xl font-semibold mb-4 text-center"
        data-aos="fade-up"
      >
        Lições
      </h2>
      {lessons.length === 0 ? (
        <p className="text-center">Nenhuma lição disponível.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lessons.map((lesson) => {
            const done = completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className="border rounded overflow-hidden shadow flex flex-col"
                data-aos="fade-up"
              >
                {lesson.url_img && (
                  <img
                    src={lesson.url_img}
                    alt={lesson.title}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col flex-grow text-center">
                  <h3 className="font-semibold mb-2">{lesson.title}</h3>
                  <p className={done ? "text-green-600" : "text-red-600"}>
                    {done ? "Concluído" : "Não concluído"}
                  </p>
                  <button
                    onClick={() => navigate(`/lesson/${lesson.id}`)}
                    className="mt-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Ver Lição
                  </button>
                </div>
              </div>
            );
          })}
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
