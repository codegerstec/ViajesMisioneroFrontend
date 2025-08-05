/* Formatear fecha */
export function formatearFecha(fecha: string) {
  const [año, mes, dia] = fecha.split("T")[0].split("-").map(Number);

  const fechaLocal = new Date(año, mes - 1, dia); // mes empieza desde 0
  return fechaLocal.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatearHora(hora: string) {
  const [horaStr, minutoStr] = hora.split(":");
  let horas = parseInt(horaStr, 10);
  const minutos = parseInt(minutoStr, 10);

  const ampm = horas < 12 ? "AM" : "PM";

  // Convertir a formato 12 horas
  horas = horas % 12;
  if (horas === 0) horas = 12;

  // Formatear con ceros si es necesario
  const horasFormateadas = horas.toString();
  const minutosFormateados = minutos.toString().padStart(2, "0");

  return `${horasFormateadas}:${minutosFormateados} ${ampm}`;
}

/* Formatear dinero en soles peruanos */
export function formatearDinero(dinero: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(dinero);
}
