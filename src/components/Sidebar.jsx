// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-yellow-400 to-orange-500 text-white flex flex-col">
      {/* Encabezado */}
      <div className="p-4 text-center font-bold text-xl border-b border-orange-600">
        Cotzul CRM
      </div>

      {/* Opciones */}
      <nav className="flex-1 overflow-y-auto p-2">
        {/* CRM */}
        <div>
          <button
            onClick={() => toggleMenu("crm")}
            className="flex justify-between items-center w-full px-3 py-2 rounded hover:bg-orange-600"
          >
            <span className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>CRM</span>
            </span>
            {openMenu === "crm" ? <ChevronDown /> : <ChevronRight />}
          </button>
          {openMenu === "crm" && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                to="/dashboardlayout/contacts"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("contacts")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Contactos
              </Link>
              <Link
                to="/dashboardlayout/companies"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("companies")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Empresas
              </Link>
              <Link
                to="/dashboardlayout/deals"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("deals")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Negocios
              </Link>
              <Link
                to="/dashboardlayout/tickets"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("tickets")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Tickets
              </Link>
              <Link
                to="/dashboardlayout/orders"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("orders")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Pedidos
              </Link>
            </div>
          )}
        </div>

        {/* Marketing */}
        <div>
          <button
            onClick={() => toggleMenu("marketing")}
            className="flex justify-between items-center w-full px-3 py-2 rounded hover:bg-orange-600 mt-2"
          >
            <span className="flex items-center space-x-2">
              <List className="w-5 h-5" />
              <span>Marketing</span>
            </span>
            {openMenu === "marketing" ? <ChevronDown /> : <ChevronRight />}
          </button>
          {openMenu === "marketing" && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                to="/dashboardlayout/lists"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("lists")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Listas
              </Link>
              <Link
                to="/dashboardlayout/inbox"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("inbox")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Bandeja de entrada
              </Link>
              <Link
                to="/dashboardlayout/calls"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("calls")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Llamadas
              </Link>
              <Link
                to="/dashboardlayout/tasks"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("tasks")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Tareas
              </Link>
              <Link
                to="/dashboardlayout/guides"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("guides")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Guías prácticas
              </Link>
              <Link
                to="/dashboardlayout/messages"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("messages")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Plantillas de mensajes
              </Link>
              <Link
                to="/dashboardlayout/snippets"
                className={`block px-3 py-1 rounded ${
                  location.pathname.includes("snippets")
                    ? "bg-orange-700"
                    : "hover:bg-orange-600"
                }`}
              >
                Fragmentos
              </Link>
            </div>
          )}
        </div>

        {/* Otros módulos directos */}
        <Link
          to="/dashboardlayout/calendar"
          className={`flex items-center space-x-2 px-3 py-2 rounded mt-2 ${
            location.pathname.includes("calendar")
              ? "bg-orange-700"
              : "hover:bg-orange-600"
          }`}
        >
          <Calendar className="w-5 h-5" /> <span>Calendario</span>
        </Link>
        <Link
          to="/dashboardlayout/reports"
          className={`flex items-center space-x-2 px-3 py-2 rounded ${
            location.pathname.includes("reports")
              ? "bg-orange-700"
              : "hover:bg-orange-600"
          }`}
        >
          <TrendingUp className="w-5 h-5" /> <span>Reportes</span>
        </Link>
        <Link
          to="/dashboardlayout/ai"
          className={`flex items-center space-x-2 px-3 py-2 rounded ${
            location.pathname.includes("ai")
              ? "bg-orange-700"
              : "hover:bg-orange-600"
          }`}
        >
          <Brain className="w-5 h-5" /> <span>AI & ML</span>
        </Link>
        <Link
          to="/dashboardlayout/market"
          className={`flex items-center space-x-2 px-3 py-2 rounded ${
            location.pathname.includes("market")
              ? "bg-orange-700"
              : "hover:bg-orange-600"
          }`}
        >
          <DollarSign className="w-5 h-5" /> <span>Mercado</span>
        </Link>
      </nav>

      {/* Footer del sidebar */}
      <div className="p-4 border-t border-orange-600 text-center text-sm">
        <p>{user?.name}</p>
        <button
          onClick={onLogout}
          className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

