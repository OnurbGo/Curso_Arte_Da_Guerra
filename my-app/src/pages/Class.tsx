import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ClassItem } from "../Interfaces/interfaces";


const truncateText = (text: string, maxChars: number): string => {
  if (text.length <= maxChars) return text;
  return text.substring(0, maxChars) + "…";
};

interface GridCardProps {
  classItem: ClassItem;
  onClick: (id: number) => void;
}

const GridCard: React.FC<GridCardProps> = ({ classItem, onClick }) => (
  <button
    key={classItem.id}
    className="group cursor-pointer focus:outline-none"
    onClick={() => onClick(classItem.id)}
    data-aos="fade-up"
  >
    <img
      alt={classItem.title}
      src={classItem.url_img}
      className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 transition"
    />
    <h3 className="mt-1 text-lg font-medium text-gray-900 text-center truncate w-full">
      {classItem.title}
    </h3>
    <p className="mt-4 text-sm text-gray-900 text-justify px-2">
      {truncateText(classItem.description, 100)}
    </p>
  </button>
);

const Class: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [totalClasses, setTotalClasses] = useState<number>(0);
  const [currentPageGrid, setCurrentPageGrid] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("Nome do curso");
  const navigate = useNavigate();
  const classesPerPage = 12;

  const fetchClasses = useCallback(
    async (
      page: number,
      limit: number,
      query = "",
      field = "Nome do curso"
    ) => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL+`class?page=${page}&limit=${limit}&q=${encodeURIComponent(
            query
          )}&field=${encodeURIComponent(field)}`,
          { credentials: "include" }
        );
        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          setClasses(result.data);
          setTotalClasses(result.total);
        } else if (Array.isArray(result)) {
          setClasses(result);
          setTotalClasses(result.length);
        } else {
          setClasses([]);
          setTotalClasses(0);
        }
      } catch (error) {
        console.error("Erro ao buscar as classes:", error);
      }
    },
    [navigate]
  );

  useEffect(() => {
    setCurrentSlide(0);
    fetchClasses(currentPageGrid, classesPerPage, searchQuery, searchField);
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
    return () => {
      AOS.refresh();
    };
  }, [currentPageGrid, searchQuery, searchField, fetchClasses]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === classes.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [classes]);

  const handleClassClick = (id: number) => {
    navigate(`/course/${id}`);
  };

  const handleSearch = (query: string, field: string) => {
    setSearchQuery(query);
    setSearchField(field);
    setCurrentPageGrid(1);
  };

  const searchOptions = ["Nome do curso", "Descrição do curso"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[32rem] overflow-hidden">
          {classes.map((product, index) => (
            <div
              key={product.id}
              className={`duration-700 ease-in-out transition-all absolute inset-0 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              data-carousel-item
            >
              <button
                onClick={() => handleClassClick(product.id)}
                className="w-full h-full"
              >
                <img
                  src={product.url_img_banner}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          ))}
        </div>

        <div className="absolute z-30 flex justify-center w-full bottom-5 space-x-3">
          {classes.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-current={index === currentSlide ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>

        <button
          type="button"
          className="absolute top-1/2 left-5 z-30 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-800 transition"
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? classes.length - 1 : prev - 1
            )
          }
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-5 z-30 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full hover:bg-gray-800 transition"
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === classes.length - 1 ? 0 : prev + 1
            )
          }
        >
          <FaArrowRight size={20} />
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <SearchBar options={searchOptions} onSearch={handleSearch} />
      </div>

      <div className="bg-white mt-8">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="text-3xl font-bold text-center mb-8">
            Todos os Cursos
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {classes.map((classItem) => (
              <GridCard
                key={classItem.id}
                classItem={classItem}
                onClick={handleClassClick}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPageGrid}
            totalItems={totalClasses}
            itemsPerPage={classesPerPage}
            onPageChange={setCurrentPageGrid}
          />
        </div>
      </div>
    </div>
  );
};

export default Class;
