import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface SearchBarProps {
  options: string[];
  onSearch: (query: string, field: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ options, onSearch }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0] || "");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      !target.closest("#dropdownButton") &&
      !target.closest("#dropdownMenu")
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    onSearch(searchTerm, selectedOption);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("", selectedOption);
  };

  return (
    <div
      className="w-full max-w-lg"
      data-aos="fade-right"
      data-aos-duration="500"
    >
      {/* Barra de pesquisa */}
      <div className="flex flex-col sm:flex-row items-center sm:space-x-2 w-full">
        {/* Dropdown */}
        <div className="relative w-full sm:w-auto flex justify-center sm:justify-start mb-6 sm:mb-0">
          <button
            id="dropdownButton"
            className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
            onClick={toggleDropdown}
          >
            {selectedOption}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {isDropdownVisible && (
            <div
              id="dropdownMenu"
              className="absolute left-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10 whitespace-nowrap"
            >
              <ul>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Input de pesquisa */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          placeholder="Pesquisar..."
        />
        {/* Botão Limpar */}
        <button
          onClick={handleClearSearch}
          className="px-3 py-2 border border-gray-300 rounded-md bg-gray-200 text-sm text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:w-auto w-full mt-2 sm:mt-0 whitespace-nowrap"
        >
          Limpar pesquisa
        </button>
        {/* Botão Buscar */}
        <button
          onClick={handleSearchClick}
          className="px-3 py-2 border border-blue-500 rounded-md bg-blue-500 text-sm text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto w-full mt-2 sm:mt-0"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
