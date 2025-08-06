import { Link, Outlet } from "react-router-dom";
import NavMenu from "@/components/NavMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-4">
        <div className="flex md:flex-row justify-between items-center lg:max-w-7xl mx-auto px-6">
          <Link to="/dashboard">
            <img src="/logoSanLuis.jpg" alt="Logo" className="w-16 h-auto rounded-full" />
          </Link>
          <NavMenu />
        </div>
      </header>
      <section className="md:max-w-7xl mx-auto mt-10 p-3">
        <Outlet />
      </section>
      <footer className="bg-gray-800 py-5 mt-10">
        <p className="text-center text-white">
          Todos los derechos reservados &copy; {new Date().getFullYear()} Viajes
          Misioneros
        </p>
      </footer>
      <ToastContainer autoClose={5000} position="bottom-right" />
    </>
  );
}
