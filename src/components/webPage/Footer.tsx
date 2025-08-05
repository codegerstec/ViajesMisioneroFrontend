export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 text-center border-t border-gray-800">
      <img
        src="logo.png"
        alt="Logo"
        className="mx-auto w-20 mb-6"
      />

      <div className="mt-6 text-xs text-gray-400">
        <p className="mb-1">Organiza: La Iglesia Cristiana Pentecostés del Movimiento Misionero Mundial</p>
        <p>Zona: 119 - San Luis Huánuco - Perú</p>
      </div>

      <p className="text-gray-500 text-xs mt-6">
        © {new Date().getFullYear()} Todos los derechos reservados
      </p>
    </footer>
  );
}
