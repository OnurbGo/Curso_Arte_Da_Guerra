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
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );
  const [messageTab, setMessageTab] = useState<"course" | "lesson" | null>(
    null
  );

  // Estados para criação de curso e lição
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

  // Estados para edição de curso
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [editCourseTitle, setEditCourseTitle] = useState("");
  const [editCourseDescription, setEditCourseDescription] = useState("");
  const [editCourseImg, setEditCourseImg] = useState("");
  const [editCourseBanner, setEditCourseBanner] = useState("");

  // Estados para edição de lição
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState("");
  const [editLessonDescription, setEditLessonDescription] = useState("");
  const [editLessonUrlVideo, setEditLessonUrlVideo] = useState("");
  const [editLessonUrlImg, setEditLessonUrlImg] = useState("");

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decoded = jwt_decode<DecodedToken>(token);
        if (decoded.user.type !== "teacher") {
          setMessage("Apenas professores podem acessar esta página");
          setMessageType("error");
          setMessageTab("course");
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
      setMessageType("success");
      setMessageTab("course");
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      setMessage("Erro ao criar curso");
      setMessageType("error");
      setMessageTab("course");
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
      setMessage(null);
    } catch (error) {
      console.error("Erro ao buscar lições:", error);
      setMessage("Erro ao buscar lições");
      setMessageType("error");
      setMessageTab("lesson");
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
      setMessageType("success");
      setMessageTab("lesson");
      if (selectedClassForLessons === classId) {
        setLessons([...lessons, res.data]);
      }
      setNewLessonTitle("");
      setNewLessonDescription("");
      setNewLessonUrlVideo("");
      setNewLessonUrlImg("");
    } catch (error) {
      console.error("Erro ao criar lição:", error);
      setMessage("Erro ao criar lição");
      setMessageType("error");
      setMessageTab("lesson");
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    try {
      await axios.delete(`http://localhost:3000/lessons/${lessonId}`, {
        withCredentials: true,
      });
      setLessons(lessons.filter((l) => l.id !== lessonId));
      setMessage("Lição deletada com sucesso!");
      setMessageType("success");
      setMessageTab("lesson");
    } catch (error) {
      console.error("Erro ao deletar lição:", error);
      setMessage("Erro ao deletar lição");
      setMessageType("error");
      setMessageTab("lesson");
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    try {
      await axios.delete(`http://localhost:3000/class/${courseId}`, {
        withCredentials: true,
      });
      setClasses(classes.filter((c) => c.id !== courseId));
      setMessage("Curso deletado com sucesso!");
      setMessageType("success");
      setMessageTab("course");
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
      setMessage("Erro ao deletar curso");
      setMessageType("error");
      setMessageTab("course");
    }
  };

  // FUNÇÕES PARA EDITAR CURSO
  const handleStartEditCourse = (course: Class) => {
    setEditingCourseId(course.id);
    setEditCourseTitle(course.title);
    setEditCourseDescription(course.description);
    setEditCourseImg(course.url_img);
    setEditCourseBanner(course.url_img_banner);
  };

  const handleCancelEditCourse = () => {
    setEditingCourseId(null);
    setEditCourseTitle("");
    setEditCourseDescription("");
    setEditCourseImg("");
    setEditCourseBanner("");
  };

  const handleSubmitEditCourse = async (
    e: React.FormEvent<HTMLFormElement>,
    courseId: number
  ) => {
    e.preventDefault();
    try {
      const updatedCourse = {
        master_id: teacherId,
        title: editCourseTitle,
        description: editCourseDescription,
        url_img: editCourseImg,
        url_img_banner: editCourseBanner,
      };
      const res = await axios.put(
        `http://localhost:3000/class/${courseId}`,
        updatedCourse,
        {
          withCredentials: true,
        }
      );
      setClasses(
        classes.map((course) => (course.id === courseId ? res.data : course))
      );
      setMessage("Curso atualizado com sucesso!");
      setMessageType("success");
      setMessageTab("course");
      handleCancelEditCourse();
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      setMessage("Erro ao atualizar curso");
      setMessageType("error");
      setMessageTab("course");
    }
  };

  // FUNÇÕES PARA EDITAR LIÇÃO
  const handleStartEditLesson = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setEditLessonTitle(lesson.title);
    setEditLessonDescription(lesson.description);
    setEditLessonUrlVideo(lesson.url_video);
    setEditLessonUrlImg(lesson.url_img);
  };

  const handleCancelEditLesson = () => {
    setEditingLessonId(null);
    setEditLessonTitle("");
    setEditLessonDescription("");
    setEditLessonUrlVideo("");
    setEditLessonUrlImg("");
  };

  const handleSubmitEditLesson = async (
    e: React.FormEvent<HTMLFormElement>,
    lessonId: number
  ) => {
    e.preventDefault();
    try {
      const updatedLesson = {
        class_id: selectedClassForLessons, // mantém o valor atual
        title: editLessonTitle,
        description: editLessonDescription,
        url_video: editLessonUrlVideo,
        url_img: editLessonUrlImg,
      };
      const res = await axios.put(
        `http://localhost:3000/lessons/${lessonId}`,
        updatedLesson,
        {
          withCredentials: true,
        }
      );
      setLessons(
        lessons.map((lesson) => (lesson.id === lessonId ? res.data : lesson))
      );
      setMessage("Lição atualizada com sucesso!");
      setMessageType("success");
      setMessageTab("lesson");
      handleCancelEditLesson();
    } catch (error) {
      console.error("Erro ao atualizar lição:", error);
      setMessage("Erro ao atualizar lição");
      setMessageType("error");
      setMessageTab("lesson");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Meus Cursos
      </h1>

      {message && messageTab === "course" && (
        <p
          className={`text-center ${
            messageType === "error" ? "text-red-600" : "text-green-600"
          } mb-4`}
        >
          {message}
        </p>
      )}
      {message && messageTab === "lesson" && (
        <p
          className={`text-center ${
            messageType === "error" ? "text-red-600" : "text-green-600"
          } mb-4`}
        >
          {message}
        </p>
      )}

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
                {/* Alteramos o src para usar url_img_banner */}
                <img
                  src={course.url_img_banner}
                  alt={course.title}
                  className="w-1/3 h-auto rounded-lg my-4 object-cover"
                />
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex flex-wrap justify-center space-x-4 mb-4">
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
                <button
                  onClick={() => handleStartEditCourse(course)}
                  className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Editar Curso
                </button>
              </div>

              {editingCourseId === course.id && (
                <form
                  onSubmit={(e) => handleSubmitEditCourse(e, course.id)}
                  className="mb-4 border-t pt-4"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    Editar Curso
                  </h3>
                  <input
                    type="text"
                    placeholder="Título do Curso"
                    value={editCourseTitle}
                    onChange={(e) => setEditCourseTitle(e.target.value)}
                    className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <textarea
                    placeholder="Descrição do Curso"
                    value={editCourseDescription}
                    onChange={(e) => setEditCourseDescription(e.target.value)}
                    className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  ></textarea>
                  <input
                    type="text"
                    placeholder="URL da Imagem"
                    value={editCourseImg}
                    onChange={(e) => setEditCourseImg(e.target.value)}
                    className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="URL do Banner"
                    value={editCourseBanner}
                    onChange={(e) => setEditCourseBanner(e.target.value)}
                    className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <div className="flex justify-center space-x-4 mt-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                      Salvar Alterações
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEditCourse}
                      className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}

              {/* Exibe as lições do curso */}
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
                        {editingLessonId === lesson.id ? (
                          <form
                            onSubmit={(e) =>
                              handleSubmitEditLesson(e, lesson.id)
                            }
                          >
                            <input
                              type="text"
                              placeholder="Título da Lição"
                              value={editLessonTitle}
                              onChange={(e) =>
                                setEditLessonTitle(e.target.value)
                              }
                              className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            <textarea
                              placeholder="Descrição da Lição"
                              value={editLessonDescription}
                              onChange={(e) =>
                                setEditLessonDescription(e.target.value)
                              }
                              className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            ></textarea>
                            <input
                              type="text"
                              placeholder="URL do Vídeo"
                              value={editLessonUrlVideo}
                              onChange={(e) =>
                                setEditLessonUrlVideo(e.target.value)
                              }
                              className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            <input
                              type="text"
                              placeholder="URL da Imagem"
                              value={editLessonUrlImg}
                              onChange={(e) =>
                                setEditLessonUrlImg(e.target.value)
                              }
                              className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                            <div className="flex justify-center space-x-4 mt-2">
                              <button
                                type="submit"
                                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                              >
                                Salvar Alterações
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelEditLesson}
                                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                              >
                                Cancelar
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="flex justify-between items-center">
                            {/* Container do título e descrição com flex-1 e truncamento para não quebrar o layout */}
                            <div className="flex-1 overflow-hidden">
                              <h4 className="text-lg font-bold text-gray-800">
                                {lesson.title}
                              </h4>
                              <p
                                className="text-gray-600 truncate"
                                title={lesson.description}
                              >
                                {lesson.description}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleStartEditLesson(lesson)}
                                className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-300"
                              >
                                Editar Lição
                              </button>
                              <button
                                onClick={() => handleDeleteLesson(lesson.id)}
                                className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        )}
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

              {/* Formulário de criação de nova lição */}
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
