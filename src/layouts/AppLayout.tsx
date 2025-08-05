import { Link, Outlet } from "react-router-dom";
import NavMenu from "@/components/NavMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center container mx-auto p-3 md:p-0">
          <Link to="/dashboard">
            <img src="/logo.png" alt="Logo" className="w-16 h-auto" />
          </Link>

          <nav className="flex flex-col text-center mt-10 md:mt-0 md:flex-row gap-5 ">
            <Link
              to="/dashboard"
              className="text-white hover:text-amber-200 transition-colors hover:cursor-pointer"
            >
              Eventos
            </Link>
            <Link
              to="/participantes"
              className="text-white hover:text-amber-200 transition-colors hover:cursor-pointer"
            >
              Participantes
            </Link>
          </nav>

          <NavMenu />
        </div>
      </header>
      <section className="container mx-auto mt-10 p-3 md:p-0">
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
