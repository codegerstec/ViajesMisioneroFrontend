import { Outlet } from "react-router-dom";
import Footer from "@/components/webPage/Footer";
import Header from "@/components/webPage/Header";
import Hero from "@/components/webPage/Hero";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WebLayout() {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <Header />

        <Hero />

        <section>
          <Outlet />
        </section>

        <Footer />

        <ToastContainer autoClose={5000} position="bottom-right" closeOnClick={false} />
      </div>
    </>
  );
}
