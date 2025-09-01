
// src/pages/DashboardHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Users, Package, Truck, Calendar, UserCheck, TrendingUp, Brain, DollarSign } from "lucide-react";
import DashboardCard from "../components/DashboardCard";

const DashboardHome = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    { icon: Settings, title: "Configuración", page: "config" },
    { icon: Users, title: "Gestión de Contactos", page: "contacts" },
    { icon: Package, title: "Gestión de Pedidos", page: "orders" },
    { icon: Truck, title: "Manejo de Pedidos", page: "delivery" },
    { icon: Calendar, title: "Gestión de Calendario", page: "calendar" },
    { icon: UserCheck, title: "Módulo de Afiliados", page: "affiliates" },
    { icon: TrendingUp, title: "Análisis y Reporte", page: "reports" },
    { icon: Brain, title: "AI y Machine Learning", page: "ai" },
    { icon: DollarSign, title: "Estudio de mercado", page: "market" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard CRM</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/dashboardlayout/${item.page}`)}
            className="cursor-pointer"
          >
            <DashboardCard icon={item.icon} title={item.title} color="blue" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
