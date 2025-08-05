import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthLayout() {
  return (
    <>
      <Outlet />
      <ToastContainer autoClose={false} position="bottom-right" closeOnClick={false} />
    </>
  );
}
