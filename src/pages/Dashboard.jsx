
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react"; 
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import Contacts from "./Contacts";
import Orders from "./Orders";


 


const Dashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")) || { name: "Invitado", role: "N/A" };
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/");
  };
 /* const dashboardItems = [
    { icon: Settings, title: 'Configuración', color: 'blue', page: 'config' },
    { icon: Users, title: 'Gestión de Contactos', color: 'blue', page: 'contacts' },
    { icon: Package, title: 'Gestión de Pedidos', color: 'blue', page: 'orders' },
    { icon: Truck, title: 'Manejo de Pedidos', color: 'blue', page: 'delivery' },
    { icon: Calendar, title: 'Gestión de Calendario', color: 'blue', page: 'calendar' },
    { icon: UserCheck, title: 'Módulo de Afiliados', color: 'blue', page: 'affiliates' },
    { icon: TrendingUp, title: 'Análisis y Reporte', color: 'blue', page: 'reports' },
    { icon: Brain, title: 'AI y Machine Learning', color: 'blue', page: 'ai' },
    { icon: DollarSign, title: 'Estudio de mercado', color: 'blue', page: 'market' }
  ];*/
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        user={storedUser}
        onLogout={handleLogout}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Bienvenido {storedUser.name}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
        {/* Aquí renderizas el contenido */}
      </div>
    </div>
  );
};

export default Dashboard;
