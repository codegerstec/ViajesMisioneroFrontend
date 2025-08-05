import axios from "axios";

// Crea una instancia de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default api;
