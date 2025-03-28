const Footer = () => {
  return (
    <div>
      <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
        &copy; 2025 Cybertech Evolution
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li className="hover:text-blue-500">
            <a href="">About Us</a>
          </li>
          <li className="hover:text-blue-500">
            <a href="">License</a>
          </li>
          <li className="hover:text-blue-500">
            <a href="">Contribute</a>
          </li>
          <li className="hover:text-blue-500">
            <a href="">Contact Us</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
