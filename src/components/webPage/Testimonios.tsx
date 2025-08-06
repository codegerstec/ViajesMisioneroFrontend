export default function Testimonios() {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Testimonios de Campañas Anteriores
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="italic mb-4">
              “Sentí la presencia de Dios como nunca antes. Esta campaña
              transformó mi vida.”
            </p>
            <div>
              <p className="text-purple-500 font-semibold">María Sánchez</p>
              <p className="text-gray-400 text-sm italic">MMM - San Luis</p>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="italic mb-4">
              “Un tiempo de adoración profundo. La prédica me habló directo al
              corazón.”
            </p>
            <div>
              <p className="text-purple-500 font-semibold">Juan Pérez</p>
              <p className="text-gray-400 text-sm italic">MMM - La Esperanza</p>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="italic mb-4">
              “No iba a asistir, pero Dios me sorprendió. ¡Volví renovado!”
            </p>
            <div>
              <p className="text-purple-500 font-semibold">Carla Mendoza</p>
              <p className="text-gray-400 text-sm italic">MMM - Ingenio Bajo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
