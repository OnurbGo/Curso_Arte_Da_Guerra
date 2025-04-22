import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import LoadingSpinner from "../components/LoadingSpinner";
import MessageBanner from "../components/MessageBanner";
import CourseForm from "../components/CourseForm";
import CourseCard, { Class, Lesson } from "../components/CourseCard";
import Pagination from "../components/Pagination";
import { DecodedTokenAuth } from "../Interfaces/interfaces";

const MyCourses: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [lessonsByClass, setLessonsByClass] = useState<
    Record<number, Lesson[]>
  >({});
  const [totalLessonsByClass, setTotalLessonsByClass] = useState<
    Record<number, number>
  >({});
  const [lessonPage, setLessonPage] = useState<Record<number, number>>({});
  const [teacherId, setTeacherId] = useState<number | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const [newClassTitle, setNewClassTitle] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");
  const [newClassImg, setNewClassImg] = useState("");
  const [newClassBanner, setNewClassBanner] = useState("");

  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImg, setEditImg] = useState("");
  const [editBanner, setEditBanner] = useState("");

  const [selectedClassForLessons, setSelectedClassForLessons] = useState<
    number | null
  >(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      setLoading(false);
      return;
    }
    const decoded = jwt_decode<DecodedTokenAuth>(token);
    if (decoded.user.type !== "teacher") {
      setMessage("Apenas professores podem acessar esta página");
      setMessageType("error");
      setLoading(false);
      return;
    }
    axios
      .get<{ id: number }>(
        `http://localhost:3000/teachers/by-user/${decoded.user.id}`,
        { withCredentials: true }
      )
      .then((res) => {
        setTeacherId(res.data.id);
        return axios.get<{ data: Class[] } | Class[]>(
          `http://localhost:3000/class`,
          {
            withCredentials: true,
          }
        );
      })
      .then((res) => {
        const allClasses = Array.isArray(res.data) ? res.data : res.data.data;
        setClasses(
          allClasses.filter((c) => teacherId && c.master_id === teacherId)
        );
      })
      .catch(() => {
        setMessage("Erro ao carregar cursos");
        setMessageType("error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [teacherId]);

  const fetchLessons = (classId: number, page: number, limit: number) => {
    axios
      .get<{ data: Lesson[]; total: number }>(
        `http://localhost:3000/lessons?class_id=${classId}&page=${page}&limit=${limit}`,
        { withCredentials: true }
      )
      .then((res) => {
        setLessonsByClass((prev) => ({ ...prev, [classId]: res.data.data }));
        setTotalLessonsByClass((prev) => ({
          ...prev,
          [classId]: res.data.total,
        }));
        setLessonPage((prev) => ({ ...prev, [classId]: page }));
      })
      .catch(() => {
        setMessage("Erro ao carregar lições");
        setMessageType("error");
      });
  };

  const handleCreateClass = () => {
    if (!teacherId) return;
    const payload = {
      master_id: teacherId,
      title: newClassTitle,
      description: newClassDescription,
      url_img: newClassImg,
      url_img_banner: newClassBanner,
    };
    axios
      .post<Class>(`http://localhost:3000/class`, payload, {
        withCredentials: true,
      })
      .then((res) => {
        setClasses((prev) => [...prev, res.data]);
        setMessage("Curso criado com sucesso!");
        setMessageType("success");
        setNewClassTitle("");
        setNewClassDescription("");
        setNewClassImg("");
        setNewClassBanner("");
      })
      .catch(() => {
        setMessage("Erro ao criar curso");
        setMessageType("error");
      });
  };

  const handleStartEditCourse = (course: Class) => {
    setEditingCourseId(course.id);
    setEditTitle(course.title);
    setEditDescription(course.description);
    setEditImg(course.url_img);
    setEditBanner(course.url_img_banner);
  };

  const handleCancelEditCourse = () => {
    setEditingCourseId(null);
  };

  const handleSubmitEditCourse = (courseId: number) => {
    if (!teacherId) return;
    const payload = {
      master_id: teacherId,
      title: editTitle,
      description: editDescription,
      url_img: editImg,
      url_img_banner: editBanner,
    };
    axios
      .put<Class>(`http://localhost:3000/class/${courseId}`, payload, {
        withCredentials: true,
      })
      .then((res) => {
        setClasses((prev) =>
          prev.map((c) => (c.id === courseId ? res.data : c))
        );
        setMessage("Curso atualizado com sucesso!");
        setMessageType("success");
        setEditingCourseId(null);
      })
      .catch(() => {
        setMessage("Erro ao atualizar curso");
        setMessageType("error");
      });
  };

  const handleDeleteCourse = (courseId: number) => {
    axios
      .delete(`http://localhost:3000/class/${courseId}`, {
        withCredentials: true,
      })
      .then(() => {
        setClasses((prev) => prev.filter((c) => c.id !== courseId));
        setMessage("Curso deletado com sucesso!");
        setMessageType("success");
      })
      .catch(() => {
        setMessage("Erro ao deletar curso");
        setMessageType("error");
      });
  };

  const handleViewLessons = (classId: number) => {
    if (selectedClassForLessons === classId) {
      setSelectedClassForLessons(null);
      return;
    }
    setSelectedClassForLessons(classId);
    fetchLessons(classId, 1, 5);
  };

  const handleCreateLesson = (
    classId: number,
    data: Omit<Lesson, "id" | "class_id">
  ) => {
    axios
      .post<Lesson>(
        `http://localhost:3000/class/${classId}/lessons`,
        { ...data, class_id: classId },
        { withCredentials: true }
      )
      .then(() => {
        setMessage("Lição criada com sucesso!");
        setMessageType("success");
        const currentPageForClass = lessonPage[classId] || 1;
        fetchLessons(classId, currentPageForClass, 5);
      })
      .catch(() => {
        setMessage("Erro ao criar lição");
        setMessageType("error");
      });
  };

  const handleEditLesson = (updatedLesson: Lesson) => {
    axios
      .put<Lesson>(
        `http://localhost:3000/lessons/${updatedLesson.id}`,
        updatedLesson,
        { withCredentials: true }
      )
      .then((res) => {
        setMessage("Lição atualizada com sucesso!");
        setMessageType("success");
        setLessonsByClass((prev) => {
          const lessons = prev[updatedLesson.class_id] || [];
          return {
            ...prev,
            [updatedLesson.class_id]: lessons.map((l) =>
              l.id === updatedLesson.id ? res.data : l
            ),
          };
        });
      })
      .catch(() => {
        setMessage("Erro ao atualizar lição");
        setMessageType("error");
      });
  };

  const handleDeleteLesson = (lessonId: number, classId: number) => {
    axios
      .delete(`http://localhost:3000/lessons/${lessonId}`, {
        withCredentials: true,
      })
      .then(() => {
        setMessage("Lição excluída com sucesso!");
        setMessageType("success");
        setLessonsByClass((prev) => ({
          ...prev,
          [classId]: prev[classId].filter((l) => l.id !== lessonId),
        }));
      })
      .catch(() => {
        setMessage("Erro ao excluir lição");
        setMessageType("error");
      });
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCourses = classes.slice(indexOfFirst, indexOfLast);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Meus Cursos
      </h1>
      {message && <MessageBanner type={messageType}>{message}</MessageBanner>}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Criar Novo Curso
        </h2>
        <CourseForm
          title={newClassTitle}
          description={newClassDescription}
          img={newClassImg}
          banner={newClassBanner}
          onChange={(field, val) => {
            switch (field) {
              case "title":
                setNewClassTitle(val);
                break;
              case "description":
                setNewClassDescription(val);
                break;
              case "img":
                setNewClassImg(val);
                break;
              case "banner":
                setNewClassBanner(val);
                break;
            }
          }}
          onSubmit={handleCreateClass}
          submitLabel="Criar Curso"
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Cursos Criados
        </h2>
        {currentCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            lessons={lessonsByClass[course.id] || []}
            totalLessons={totalLessonsByClass[course.id] || 0}
            lessonPage={lessonPage[course.id] || 1}
            itemsPerLessonPage={5}
            selectedForLessons={selectedClassForLessons === course.id}
            onViewLessons={handleViewLessons}
            onCreateLesson={handleCreateLesson}
            onEditCourse={
              editingCourseId === course.id ? undefined : handleStartEditCourse
            }
            onCancelEditCourse={handleCancelEditCourse}
            onSubmitEditCourse={handleSubmitEditCourse}
            editingCourseId={editingCourseId}
            editTitle={editTitle}
            editDescription={editDescription}
            editImg={editImg}
            editBanner={editBanner}
            onChangeEditField={(field, value) => {
              if (field === "title") setEditTitle(value);
              if (field === "description") setEditDescription(value);
              if (field === "img") setEditImg(value);
              if (field === "banner") setEditBanner(value);
            }}
            onDeleteCourse={handleDeleteCourse}
            onEditLesson={handleEditLesson}
            onDeleteLesson={(lessonId: number) =>
              handleDeleteLesson(lessonId, course.id)
            }
            onLessonPageChange={(newPage: number) =>
              fetchLessons(course.id, newPage, 5)
            }
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalItems={classes.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>
  );
};

export default MyCourses;
