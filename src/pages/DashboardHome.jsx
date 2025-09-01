import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  Briefcase,
  Ticket,
  Package,
  List,
  Inbox,
  Phone,
  CheckSquare,
  BookOpen,
  MessageSquare,
  FileText,
  Calendar,
  TrendingUp,
  Brain,
  DollarSign,
} from "lucide-react";

const modules = [
  { name: "Contactos", icon: Users, path: "/dashboard/contacts", desc: "Gestión de contactos" },
  { name: "Empresas", icon: Building2, path: "/dashboard/companies", desc: "Administrar empresas" },
  { name: "Negocios", icon: Briefcase, path: "/dashboard/deals", desc: "Oportunidades de negocio" },
  { name: "Tickets", icon: Ticket, path: "/dashboard/tickets", desc: "Soporte y tickets" },
  { name: "Pedidos", icon: Package, path: "/dashboard/orders", desc: "Gestión de pedidos" },
  { name: "Listas", icon: List, path: "/dashboard/lists", desc: "Segmentación de listas" },
  { name: "Bandeja de entrada", icon: Inbox, path: "/dashboard/inbox", desc: "Comunicación centralizada" },
  { name: "Llamadas", icon: Phone, path: "/dashboard/calls", desc: "Registro de llamadas" },
  { name: "Tareas", icon: CheckSquare, path: "/dashboard/tasks", desc: "Gestión de tareas" },
  { name: "Guías", icon: BookOpen, path: "/dashboard/guides", desc: "Documentación y guías" },
  { name: "Mensajes", icon: MessageSquare, path: "/dashboard/messages", desc: "Plantillas de mensajes" },
  { name: "Fragmentos", icon: FileText, path: "/dashboard/snippets", desc: "Textos predefinidos" },
  { name: "Calendario", icon: Calendar, path: "/dashboard/calendar", desc: "Organiza tus actividades" },
  { name: "Reportes", icon: TrendingUp, path: "/dashboard/reports", desc: "Analiza tus métricas" },
  { name: "AI & ML", icon: Brain, path: "/dashboard/ai", desc: "Inteligencia Artificial" },
  { name: "Mercado", icon: DollarSign, path: "/dashboard/market", desc: "Oportunidades del mercado" },
];

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel Principal</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.name}
              onClick={() => navigate(mod.path)}
              className="cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-xl shadow-lg text-white hover:scale-105 transform transition duration-200"
            >
              <div className="flex items-center space-x-4">
                <Icon className="w-10 h-10" />
                <div>
                  <h2 className="text-xl font-semibold">{mod.name}</h2>
                  <p className="text-sm opacity-90">{mod.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHome;
