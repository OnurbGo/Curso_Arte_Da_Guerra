const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-900 text-white border-t border-gray-700 mt-6">
      <svg
        className="absolute -bottom-20 left-1/2 w-[1900px] transform -translate-x-1/2"
        width="2745"
        height="488"
        viewBox="0 0 2745 488"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 330.864C232.505 403.801 853.749 527.683 1482.69 439.719C2111.63 351.756 2585.54 434.588 2743.87 487"
          className="stroke-gray-700/50"
          stroke="currentColor"
        />
        <path
          d="M0.5 308.873C232.505 381.81 853.749 505.692 1482.69 417.728C2111.63 329.765 2585.54 412.597 2743.87 465.009"
          className="stroke-gray-700/50"
          stroke="currentColor"
        />
      </svg>

      <div className="relative z-10 py-10 lg:pt-16">
        <div className="max-w-5xl mx-auto px-4 xl:px-0 flex flex-col lg:flex-row items-center justify-between gap-y-6">
          <div className="flex items-center gap-4">
            <svg className="w-24 h-auto" viewBox="0 0 116 32" fill="none"></svg>
            <p className="text-sm text-gray-400">© 2025 Cybertech Evolution</p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
            <li className="hover:text-red-500">
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
