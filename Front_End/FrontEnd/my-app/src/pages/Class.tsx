import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

interface ClassItem {
  id: number;
  title: string;
  description: string;
  url_img: string;
  url_img_banner: string;
  teacherName?: string;
  teacherSpecialization?: string;
}

const Class: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [totalClasses, setTotalClasses] = useState<number>(0);
  const [currentPageGrid, setCurrentPageGrid] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("Nome do curso");
  const navigate = useNavigate();
  const classesPerPage = 12;

  const fetchClasses = async (
    page: number,
    limit: number,
    query = "",
    field = "Nome do curso"
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/class?page=${page}&limit=${limit}&q=${encodeURIComponent(
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
  };

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
  }, [currentPageGrid, searchQuery, searchField]);

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
    <div>
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-128 overflow-hidden rounded-lg">
          {classes.map((product, index) => (
            <div
              key={index}
              className={`duration-700 ease-in-out ${
                index === currentSlide ? "block" : "hidden"
              }`}
              data-carousel-item
            >
              <img
                src={product.url_img_banner}
                alt={product.title}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-none object-top"
              />
            </div>
          ))}
        </div>
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
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
          className="absolute top-1/2 left-5 z-30 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? classes.length - 1 : prev - 1
            )
          }
        >
          Anterior
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-5 z-30 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === classes.length - 1 ? 0 : prev + 1
            )
          }
        >
          Próximo
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <SearchBar options={searchOptions} onSearch={handleSearch} />
      </div>

      <div className="bg-white mt-8">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Classes</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {classes.map((classItem) => (
              <a
                key={classItem.id}
                className="group cursor-pointer"
                onClick={() => handleClassClick(classItem.id)}
                data-aos="fade-up"
              >
                <img
                  alt={classItem.title}
                  src={classItem.url_img}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
                <h3 className="mt-1 text-lg font-medium text-gray-900 text-center truncate w-full block">
                  {classItem.title}
                </h3>
                <p className="mt-4 text-sm text-gray-900 text-center">
                  {classItem.description}
                </p>
              </a>
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
