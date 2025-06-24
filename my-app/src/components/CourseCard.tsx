import React, { useState } from "react";
import Card from "./Card";
import LessonForm from "./LessonForm";
import Pagination from "./Pagination";
import { FaEye, FaEyeSlash, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export interface Class {
  id: number;
  master_id: number;
  title: string;
  description: string;
  url_img: string;
  url_img_banner: string;
}

export interface Lesson {
  id: number;
  class_id: number;
  title: string;
  description: string;
  url_video: string;
  url_img: string;
}

interface CourseCardProps {
  course: Class;
  lessons: Lesson[];
  totalLessons: number;
  lessonPage: number;
  itemsPerLessonPage: number;
  selectedForLessons: boolean;
  onViewLessons: (id: number) => void;
  onCreateLesson: (
    classId: number,
    data: Omit<Lesson, "id" | "class_id">
  ) => void;
  onEditCourse: ((course: Class) => void) | undefined;
  onCancelEditCourse: () => void;
  onDeleteCourse: (id: number) => void;
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (lessonId: number) => void;
  editingCourseId: number | null;
  onSubmitEditCourse: (courseId: number) => void;
  editTitle: string;
  editDescription: string;
  editImg: string;
  editBanner: string;
  onChangeEditField: (field: string, value: string) => void;
  onLessonPageChange: (newPage: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  lessons,
  totalLessons,
  lessonPage,
  itemsPerLessonPage,
  selectedForLessons,
  onViewLessons,
  onCreateLesson,
  onEditCourse,
  onCancelEditCourse,
  onDeleteCourse,
  onEditLesson,
  onDeleteLesson,
  editingCourseId,
  onSubmitEditCourse,
  editTitle,
  editDescription,
  editImg,
  editBanner,
  onChangeEditField,
  onLessonPageChange,
}) => {
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);
  const [editLessonData, setEditLessonData] = useState<
    Omit<Lesson, "id" | "class_id">
  >({
    title: "",
    description: "",
    url_video: "",
    url_img: "",
  });

  const handleCreateLesson = (data: Omit<Lesson, "id" | "class_id">) => {
    onCreateLesson(course.id, data);
    setShowLessonForm(false);
  };

  const handleStartEditLesson = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setEditLessonData({
      title: lesson.title,
      description: lesson.description,
      url_video: lesson.url_video,
      url_img: lesson.url_img,
    });
  };

  const handleCancelEditLesson = () => {
    setEditingLessonId(null);
    setEditLessonData({
      title: "",
      description: "",
      url_video: "",
      url_img: "",
    });
  };

  const handleSubmitEditLesson = (lessonId: number) => {
    const updatedLesson: Lesson = {
      id: lessonId,
      class_id: course.id,
      ...editLessonData,
    };
    onEditLesson(updatedLesson);
    setEditingLessonId(null);
  };

  const isEditingThisCourse = editingCourseId === course.id;

  return (
    <Card>
      {isEditingThisCourse ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitEditCourse(course.id);
          }}
          className="space-y-4 mb-6 w-full max-w-lg mx-auto"
        >
          <input
            id="title_curse"
            type="text"
            value={editTitle}
            onChange={(e) => onChangeEditField("title", e.target.value)}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Título do curso"
            required
          />
          <textarea
            id="description_curse"
            value={editDescription}
            onChange={(e) => onChangeEditField("description", e.target.value)}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Descrição do curso"
            required
          />
          <input
            id="url_img"
            type="text"
            value={editImg}
            onChange={(e) => onChangeEditField("img", e.target.value)}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="URL da Imagem"
            required
          />
          <input
            id="url_banner"
            type="text"
            value={editBanner}
            onChange={(e) => onChangeEditField("banner", e.target.value)}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="URL do Banner"
            required
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="flex-1 px-2 py-1 sm:px-4 sm:py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center justify-center"
            >
              <FaEdit /> Salvar
            </button>
            <button
              type="button"
              onClick={onCancelEditCourse}
              className="flex-1 px-2 py-1 sm:px-4 sm:py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition flex items-center justify-center"
            >
              <FaTrash /> Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {course.title}
          </h3>
          <img
            src={course.url_img}
            alt={course.title}
            className="w-full sm:max-w-md object-contain mt-2 rounded"
          />
          <p className="text-gray-600 mt-4 text-justify px-4">
            {course.description}
          </p>
          <div className="grid grid-cols-2 gap-2 mt-4 sm:flex sm:justify-center sm:gap-2">
            <button
              onClick={() => onViewLessons(course.id)}
              className="w-full sm:w-auto px-2 py-1 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition flex items-center justify-center"
            >
              {selectedForLessons ? (
                <>
                  <FaEyeSlash /> Ocultar Lições
                </>
              ) : (
                <>
                  <FaEye /> Ver Lições
                </>
              )}
            </button>
            <button
              onClick={() => setShowLessonForm((prev) => !prev)}
              className="w-full sm:w-auto px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center justify-center"
            >
              {showLessonForm ? (
                <>
                  <FaEyeSlash /> Ocultar Lição
                </>
              ) : (
                <>
                  <FaPlus /> Criar Lição
                </>
              )}
            </button>
            {onEditCourse && (
              <button
                onClick={() =>
                  isEditingThisCourse
                    ? onCancelEditCourse()
                    : onEditCourse(course)
                }
                className="w-full sm:w-auto px-2 py-1 sm:px-4 sm:py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition flex items-center justify-center"
              >
                <FaEdit />
                {isEditingThisCourse ? "Cancelar Edição" : "Editar Curso"}
              </button>
            )}
            <button
              onClick={() => onDeleteCourse(course.id)}
              className="w-full sm:w-auto px-2 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center justify-center"
            >
              <FaTrash /> Excluir Curso
            </button>
          </div>
        </div>
      )}

      {/* Área de lições */}
      {selectedForLessons && (
        <div className="mt-6">
          {lessons.length > 0 ? (
            lessons.map((lesson) =>
              editingLessonId === lesson.id ? (
                <form
                  key={lesson.id}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitEditLesson(lesson.id);
                  }}
                  className="border p-4 mb-3 rounded shadow flex flex-col gap-2"
                >
                  <input
                    type="text"
                    value={editLessonData.title}
                    onChange={(e) =>
                      setEditLessonData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Título da lição"
                    required
                  />
                  <textarea
                    value={editLessonData.description}
                    onChange={(e) =>
                      setEditLessonData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded text-justify"
                    placeholder="Descrição da lição"
                    required
                  />
                  <input
                    id="url_video"
                    type="text"
                    value={editLessonData.url_video}
                    onChange={(e) =>
                      setEditLessonData((prev) => ({
                        ...prev,
                        url_video: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded"
                    placeholder="URL do Vídeo"
                    required
                  />
                  <input
                    id="url_img"
                    type="text"
                    value={editLessonData.url_img}
                    onChange={(e) =>
                      setEditLessonData((prev) => ({
                        ...prev,
                        url_img: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded"
                    placeholder="URL da Imagem da lição"
                    required
                  />
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="submit"
                      className="flex-1 px-2 py-1 sm:px-4 sm:py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center justify-center"
                    >
                      <FaEdit /> Salvar
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEditLesson}
                      className="flex-1 px-2 py-1 sm:px-4 sm:py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition flex items-center justify-center"
                    >
                      <FaTrash /> Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  key={lesson.id}
                  className="border p-4 mb-3 rounded shadow flex flex-col gap-2"
                >
                  <h4 className="text-lg font-bold text-gray-800 text-center">
                    {lesson.title}
                  </h4>
                  <img
                    src={lesson.url_img}
                    alt={lesson.title}
                    className="w-full sm:max-w-md object-contain mt-2 rounded mx-auto"
                  />
                  <p className="text-gray-600 mt-2 text-justify px-4">
                    {lesson.description}
                  </p>
                  <a
                    href={lesson.url_video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-2 text-center block"
                  >
                    Assistir Vídeo
                  </a>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <button
                      id="edit_lesson"
                      onClick={() =>
                        editingLessonId === lesson.id
                          ? handleCancelEditLesson()
                          : handleStartEditLesson(lesson)
                      }
                      className="px-2 py-1 sm:px-4 sm:py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition flex items-center justify-center"
                    >
                      <FaEdit />
                      {editingLessonId === lesson.id
                        ? "Cancelar Edição"
                        : "Editar"}
                    </button>
                    <button
                      id="delete_lesson"
                      onClick={() => onDeleteLesson(lesson.id)}
                      className="px-2 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center justify-center"
                    >
                      <FaTrash /> Excluir
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-gray-500 text-center">
              Nenhuma lição cadastrada.
            </p>
          )}
          {totalLessons > itemsPerLessonPage && (
            <div className="mt-4">
              <Pagination
                currentPage={lessonPage}
                totalItems={totalLessons}
                itemsPerPage={itemsPerLessonPage}
                onPageChange={onLessonPageChange}
              />
            </div>
          )}
        </div>
      )}

      {showLessonForm && (
        <div className="mt-6">
          <LessonForm
            title=""
            description=""
            video=""
            img=""
            onChange={() => {}}
            onSubmit={handleCreateLesson}
            submitLabel="Salvar Lição"
          />
        </div>
      )}
    </Card>
  );
};

export default CourseCard;
