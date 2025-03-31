import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

interface DecodedToken {
  user: {
    id: number;
    type: string;
  };
}

interface Class {
  id: number;
  master_id: number;
  title: string;
  description: string;
  url_img: string;
  url_img_banner: string;
}

interface Lesson {
  id: number;
  class_id: number;
  title: string;
  description: string;
  url_video: string;
  url_img: string;
}

const MyCourses: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const [newClassTitle, setNewClassTitle] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");
  const [newClassImg, setNewClassImg] = useState("");
  const [newClassBanner, setNewClassBanner] = useState("");

  const [selectedClassForLessons, setSelectedClassForLessons] = useState<
    number | null
  >(null);
  const [selectedClassForLessonCreation, setSelectedClassForLessonCreation] =
    useState<number | null>(null);

  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDescription, setNewLessonDescription] = useState("");
  const [newLessonUrlVideo, setNewLessonUrlVideo] = useState("");
  const [newLessonUrlImg, setNewLessonUrlImg] = useState("");

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decoded = jwt_decode<DecodedToken>(token);
        if (decoded.user.type !== "teacher") {
          setMessage("Apenas professores podem acessar esta página.");
          return;
        }
        setTeacherId(decoded.user.id);

        axios
          .get("http://localhost:3000/class", { withCredentials: true })
          .then((res) => {
            const allClasses: Class[] = res.data;
            const teacherClasses = allClasses.filter(
              (course) => course.master_id === decoded.user.id
            );
            setClasses(teacherClasses);
          })
          .catch((err) => console.error("Erro ao buscar cursos:", err));
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

  const handleCreateClass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teacherId) return;

    const newClass = {
      master_id: teacherId,
      title: newClassTitle,
      description: newClassDescription,
      url_img: newClassImg,
      url_img_banner: newClassBanner,
    };

    try {
      const res = await axios.post("http://localhost:3000/class", newClass, {
        withCredentials: true,
      });
      setClasses([...classes, res.data]);
      setNewClassTitle("");
      setNewClassDescription("");
      setNewClassImg("");
      setNewClassBanner("");
      setMessage("Curso criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      setMessage("Erro ao criar curso.");
    }
  };

  const handleViewLessons = async (classId: number) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/lessons?class_id=${classId}`,
        { withCredentials: true }
      );
      setLessons(res.data);
      setSelectedClassForLessons(classId);
      setSelectedClassForLessonCreation(null);
      setMessage("");
    } catch (error) {
      console.error("Erro ao buscar lições:", error);
      setMessage("Erro ao buscar lições.");
    }
  };

  const handleCreateLesson = async (
    e: React.FormEvent<HTMLFormElement>,
    classId: number
  ) => {
    e.preventDefault();
    if (
      !newLessonTitle ||
      !newLessonDescription ||
      !newLessonUrlVideo ||
      !newLessonUrlImg
    )
      return;

    const newLesson = {
      class_id: classId,
      title: newLessonTitle,
      description: newLessonDescription,
      url_video: newLessonUrlVideo,
      url_img: newLessonUrlImg,
    };

    try {
      const res = await axios.post(
        `http://localhost:3000/class/${classId}/lessons`,
        newLesson,
        { withCredentials: true }
      );
      setMessage("Lição criada com sucesso!");
      if (selectedClassForLessons === classId) {
        setLessons([...lessons, res.data]);
      }
      setNewLessonTitle("");
      setNewLessonDescription("");
      setNewLessonUrlVideo("");
      setNewLessonUrlImg("");
    } catch (error) {
      console.error("Erro ao criar lição:", error);
      setMessage("Erro ao criar lição.");
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    try {
      await axios.delete(`http://localhost:3000/lessons/${lessonId}`, {
        withCredentials: true,
      });
      setLessons(lessons.filter((l) => l.id !== lessonId));
      setMessage("Lição deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar lição:", error);
      setMessage("Erro ao deletar lição.");
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    try {
      await axios.delete(`http://localhost:3000/class/${courseId}`, {
        withCredentials: true,
      });
      setClasses(classes.filter((c) => c.id !== courseId));
      setMessage("Curso deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
      setMessage("Erro ao deletar curso.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Meus Cursos
      </h1>
      {message && <p className="text-center text-red-600 mb-4">{message}</p>}

      {/* Formulário para criação de novo curso */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Criar Novo Curso
        </h2>
        <form onSubmit={handleCreateClass} className="space-y-4">
          <input
            type="text"
            placeholder="Título do Curso"
            value={newClassTitle}
            onChange={(e) => setNewClassTitle(e.target.value)}
            className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <textarea
            placeholder="Descrição do Curso"
            value={newClassDescription}
            onChange={(e) => setNewClassDescription(e.target.value)}
            className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          ></textarea>
          <input
            type="text"
            placeholder="URL da Imagem"
            value={newClassImg}
            onChange={(e) => setNewClassImg(e.target.value)}
            className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="URL do Banner"
            value={newClassBanner}
            onChange={(e) => setNewClassBanner(e.target.value)}
            className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Criar Curso
          </button>
        </form>
      </section>

      {/* Listagem de cursos criados */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
          Cursos Criados
        </h2>
        {classes.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum curso criado.</p>
        ) : (
          classes.map((course) => (
            <div
              key={course.id}
              className="border-2 p-6 mb-6 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  {course.title}
                </h3>
                <img
                  src={course.url_img}
                  alt={course.title}
                  className="w-1/3 h-auto rounded-lg my-4 object-cover"
                />
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleViewLessons(course.id)}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Ver Lições
                </button>
                <button
                  onClick={() =>
                    setSelectedClassForLessonCreation(
                      selectedClassForLessonCreation === course.id
                        ? null
                        : course.id
                    )
                  }
                  className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                  Criar Lição
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Excluir Curso
                </button>
              </div>

              {/* Exibe as lições do curso (quando selecionado pelo botao "Ver Lições") */}
              {selectedClassForLessons === course.id && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    Lições
                  </h3>
                  {lessons.length === 0 ? (
                    <p className="text-center text-gray-500">
                      Curso sem lições até o momento.
                    </p>
                  ) : (
                    lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="border p-4 mb-3 rounded-lg shadow-sm"
                      >
                        <div className="flex justify-between items-center ">
                          <div>
                            <h4 className="text-lg font-bold text-gray-800">
                              {lesson.title}
                            </h4>
                            <p className="text-gray-600">
                              {lesson.description}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                          >
                            Excluir
                          </button>
                        </div>
                        <a
                          href={lesson.url_video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline mt-2 inline-block"
                        >
                          Assistir Vídeo
                        </a>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* exibe o formulario de criação de lição logo abaixo do curso, quando selecionado */}
              {selectedClassForLessonCreation === course.id && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    Criar Nova Lição
                  </h3>
                  <form
                    onSubmit={(e) => handleCreateLesson(e, course.id)}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Título da Lição"
                      value={newLessonTitle}
                      onChange={(e) => setNewLessonTitle(e.target.value)}
                      className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <textarea
                      placeholder="Descrição da Lição"
                      value={newLessonDescription}
                      onChange={(e) => setNewLessonDescription(e.target.value)}
                      className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                    <input
                      type="text"
                      placeholder="URL do Vídeo"
                      value={newLessonUrlVideo}
                      onChange={(e) => setNewLessonUrlVideo(e.target.value)}
                      className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="URL da Imagem"
                      value={newLessonUrlImg}
                      onChange={(e) => setNewLessonUrlImg(e.target.value)}
                      className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      Criar Lição
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default MyCourses;
