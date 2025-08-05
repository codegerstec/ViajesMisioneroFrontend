import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  FaFileExcel,
  FaFilePdf,
  FaMoneyBill,
  FaMoneyBillWave,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { obtenerParticipantes } from "../api/ParticipanteAPI";
import { obtenerEventoPorId } from "../api/EventoAPI";
import { DateTime } from "luxon";

interface Participante {
  _id: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  metodoPago: "Efectivo" | "Yape" | "Transferencia";
  evento: string;
  fechaInscripcion: string;
  imagen: string;
}

const columnHelper = createColumnHelper<Participante>();

export default function PanelParticipantes() {
  const [data, setData] = useState<Participante[]>([]);
  const [eventos, setEventos] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [fecha, setFecha] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;


  const columns = [
    columnHelper.display({
      id: "numero",
      header: "ID",
      cell: ({ row }) => row.index + 1,
    }),
    columnHelper.accessor("nombres", { header: "Nombres" }),
    columnHelper.accessor("apellidos", { header: "Apellidos" }),
    columnHelper.accessor("telefono", { header: "Teléfono" }),
    columnHelper.accessor("email", { header: "Email" }),
    columnHelper.accessor("metodoPago", {
      header: "Tipo de Pago",
      cell: ({ getValue }) => {
        const valor = getValue();
        const color =
          valor === "Efectivo"
            ? "bg-yellow-400 text-black"
            : valor === "Yape"
            ? "bg-cyan-500 text-white"
            : valor === "Transferencia"
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-black";
        return (
          <span className={`px-2 py-1 rounded text-xs ${color}`}>{valor}</span>
        );
      },
    }),
    columnHelper.accessor("evento", {
      header: "Evento",
      cell: ({ getValue }) => eventos[getValue()] || getValue(),
    }),
    columnHelper.accessor("fechaInscripcion", {
      header: "Fecha de Inscripción",
      cell: ({ getValue }) =>
        DateTime.fromISO(getValue())
          .setLocale("es")
          .toFormat("dd 'de' LLLL 'de' yyyy"),
    }),
  ];

  useEffect(() => {
    obtenerParticipantes()
      .then(async (res) => {
        // Map the data to match the Participante interface
        const mappedData = res.map((item) => ({
          nombres: item.nombres,
          apellidos: item.apellidos,
          telefono: item.telefono,
          email: item.email,
          metodoPago: item.metodoPago as "Efectivo" | "Yape" | "Transferencia",
          evento: item.evento,
          fechaInscripcion: new Date().toISOString(), // Set current date if not present
        }));
        setData(mappedData as Participante[]);
        const eventosMap: Record<string, string> = {};
        await Promise.all(
          mappedData.map(async (p) => {
            if (!eventosMap[p.evento]) {
              try {
                const evento = await obtenerEventoPorId(p.evento);
                eventosMap[p.evento] = evento.titulo;
              } catch (e) {
                console.error("Error al obtener evento", e);
              }
            }
          })
        );
        setEventos(eventosMap);
      })
      .catch((err) => console.error("Error al obtener participantes", err));
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((p) => {
      const matchesSearch =
        p.nombres.toLowerCase().includes(search.toLowerCase()) ||
        p.apellidos.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.telefono.includes(search);

      const matchesFecha =
        !fecha ||
        DateTime.fromISO(p.fechaInscripcion).toFormat("yyyy-MM-dd") === fecha;

      const matchesMetodo =
        !metodoPago || p.metodoPago.toLowerCase() === metodoPago.toLowerCase();

      return matchesSearch && matchesFecha && matchesMetodo;
    });
  }, [data, search, fecha, metodoPago]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "ID",
          "Nombres",
          "Apellidos",
          "Teléfono",
          "Email",
          "Tipo de Pago",
          "Evento",
          "Fecha de Inscripción",
        ],
      ],
      body: data.map((row, idx) => [
        idx + 1,
        row.nombres,
        row.apellidos,
        row.telefono,
        row.email,
        row.metodoPago,
        eventos[row.evento] || row.evento,
        DateTime.fromISO(row.fechaInscripcion)
          .setLocale("es")
          .toFormat("dd 'de' LLLL 'de' yyyy"),
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 94, 184] },
      startY: 10,
      margin: { top: 10, left: 10, right: 10 },
    });
    doc.save("participantes.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((row, idx) => ({
        ID: idx + 1,
        Nombres: row.nombres,
        Apellidos: row.apellidos,
        Teléfono: row.telefono,
        Email: row.email,
        TipoPago: row.metodoPago,
        Evento: eventos[row.evento] || row.evento,
        FechaInscripcion: DateTime.fromISO(row.fechaInscripcion)
          .setLocale("es")
          .toFormat("dd 'de' LLLL 'de' yyyy"),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participantes");
    XLSX.writeFile(workbook, "participantes.xlsx");
  };

  const pageData = useMemo(() => {
    const start = pageIndex * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, pageIndex]);

  const table = useReactTable({
    data: pageData,
    columns,
    pageCount: Math.ceil(filteredData.length / pageSize),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h1 className="text-5xl font-black text-gray-900">Participantes</h1>
      <p className="text-2xl font-light text-gray-600 mt-3 mb-5">
        Maneja y administra tus participantes
      </p>

      {/* Panel de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
          <FaUsers className="text-blue-500 text-xl" />
          <div>
            <p className="text-gray-500 text-sm">
              Total Personas Participantes
            </p>
            <p className="text-xl font-bold">{filteredData.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
          <FaMoneyBillWave className="text-green-500 text-xl" />
          <div>
            <p className="text-gray-500 text-sm">Personas Pagas por Yape</p>
            <p className="text-xl font-bold">
              {filteredData.filter((p) => p.metodoPago === "Yape").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
          <FaUniversity className="text-purple-500 text-xl" />
          <div>
            <p className="text-gray-500 text-sm">
              Personas Pagas por Transferencias
            </p>
            <p className="text-xl font-bold">
              {
                filteredData.filter((p) => p.metodoPago === "Transferencia")
                  .length
              }
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
          <FaMoneyBill className="text-orange-500 text-xl" />
          <div>
            <p className="text-gray-500 text-sm">Personas Pagas por Efectivo</p>
            <p className="text-xl font-bold">
              {filteredData.filter((p) => p.metodoPago === "Efectivo").length}
            </p>
          </div>
        </div>
      </div>

      {/* Filtros y botones */}
      <div className="bg-white p-6 shadow">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-black placeholder:text-gray-500 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <select
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="">Elija un método de pago</option>
            <option value="efectivo">Efectivo</option>
            <option value="yape">Yape</option>
            <option value="transferencia">Transferencia</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setFecha("");
              setMetodoPago("");
            }}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded w-full md:w-auto flex-1 md:flex-none"
          >
            Limpiar filtros
          </button>

          <button
            onClick={exportToExcel}
            className="w-full md:w-auto flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all flex items-center justify-center md:justify-start"
          >
            <FaFileExcel className="mr-2" />
            Excel
          </button>
          <button
            onClick={exportToPDF}
            className="w-full md:w-auto flex-1 md:flex-none bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all flex items-center justify-center md:justify-start"
          >
            <FaFilePdf className="mr-2" />
            PDF
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-gray-600">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-sm text-gray-700">
            Página {pageIndex + 1} de{" "}
            {Math.max(1, Math.ceil(filteredData.length / pageSize))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={pageIndex === 0}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              {"<"}
            </button>
            {Array.from(
              { length: Math.ceil(filteredData.length / pageSize) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setPageIndex(i)}
                  className={`px-3 py-1 rounded ${
                    i === pageIndex ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              onClick={() =>
                setPageIndex((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredData.length / pageSize) - 1
                  )
                )
              }
              disabled={
                pageIndex >= Math.ceil(filteredData.length / pageSize) - 1
              }
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
