const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-6 text-center border-t border-gray-700 mt-6">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12">
          &copy; 2025 Cybertech Evolution
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li className="hover:text-blue-500">
              <a href="">About Us</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
