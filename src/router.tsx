import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from '@/layouts/AppLayout';
import DashboardView from "@/views/DashboardView";
import CreateEventoView from "@/views/eventos/CreateEventoView";
import EditEventoView from "@/views/eventos/EditEventoView";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/views/auth/LoginPage";
import RegisterPage from "@/views/auth/RegisterPage";
import WebLayout from "./layouts/WebLayout";
import WebPage from "@/views/webPage/WebPage";
import ForgotPassword from "@/views/auth/ForgotPassword";
import NewPassword from "@/views/auth/NewPassword";
import VerificarTokenPage from "@/views/auth/VerificarToken";
import RequestNewToken from "./views/auth/RequestNewToken";
import Participantes from "./views/ParticipantesView";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} >
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/eventos/create" element={<CreateEventoView />} />
          <Route path="/eventos/:id" element={<EditEventoView />} />
          <Route path="/participantes" element={<Participantes />} />
        </Route>
        <Route element={<AuthLayout />} >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verificar-token" element={<VerificarTokenPage />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/nuevo-token" element={<RequestNewToken />} />
        </Route>
        <Route element={<WebLayout />} >
          <Route path="/" element={<WebPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}