
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
            <div className="font-semibold text-purple-400">– María Sánchez</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="italic mb-4">
              “Un tiempo de adoración profundo. La prédica me habló directo al
              corazón.”
            </p>
            <div className="font-semibold text-purple-400">– Juan Pérez</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="italic mb-4">
              “No iba a asistir, pero Dios me sorprendió. ¡Volví renovado!”
            </p>
            <div className="font-semibold text-purple-400">– Carla Mendoza</div>
          </div>
        </div>
      </div>
    </section>
  );
}
