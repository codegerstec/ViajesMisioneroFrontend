import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
export default function Header() {
  return (
    <header className="bg-black border-b border-gray-800 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="/">
            <img
              src="logo.png"
              alt="Logo"
              className="w-16 h-auto"
            />
          </a>
        </div>
        <div className="flex items-center space-x-6">
          {/*enlaces a redes sociales */}
          <a href="https://www.facebook.com/SanLuismmm" target="_blank" className="hover:text-yellow-400 transition">
            <FaFacebook size={24}/>
          </a>
          <a href="https://www.instagram.com/mmmsanluis" target="_blank" className="hover:text-yellow-400 transition">
            <FaInstagram size={24}/>
          </a>
          <a href="https://www.tiktok.com/@mmmsanluis" target="_blank" className="hover:text-yellow-400 transition">
            <FaTiktok size={24}/>
          </a>
        </div>
      </div>
    </header>
  );
}
