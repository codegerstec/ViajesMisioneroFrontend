import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function NavMenu() {
  const navigate = useNavigate();
  return (
    <>
      <Popover className="relative z-50 mt-10 md:mt-0">
        <Popover.Button className="inline-flex items-center p-2 rounded-md bg-purple-800 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">
          <Bars3Icon className="w-6 h-6 text-white" />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute right-0 mt-3 w-48 sm:w-56 rounded-xl bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none">
            <div className="p-4 space-y-1 text-sm font-medium text-gray-800">
              <p className="text-center text-gray-700 font-semibold">
                Hola: Administrador
              </p>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="block w-full text-left px-2 py-1 rounded hover:bg-purple-100 hover:text-purple-900 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}
