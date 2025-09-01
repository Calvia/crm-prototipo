// src/pages/DashboardLayout.jsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const storedUser =
    JSON.parse(localStorage.getItem("user")) || { name: "Invitado", role: "N/A" };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={storedUser} onLogout={handleLogout} />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Bienvenido {storedUser.name}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Aquí se cargan las páginas internas */}
        <Outlet />

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          © Cotzul 2019
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
