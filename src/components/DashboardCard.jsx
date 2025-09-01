// src/pages/DashboardHome.jsx
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
  { name: "Contactos", icon: Users, path: "/dashboarlayout/contacts", desc: "Gestión de contactos" },
  { name: "Empresas", icon: Building2, path: "/dashboarlayout/companies", desc: "Administrar empresas" },
  { name: "Negocios", icon: Briefcase, path: "/dashboardlayout/deals", desc: "Oportunidades de negocio" },
  { name: "Tickets", icon: Ticket, path: "/dashboardlayout/tickets", desc: "Soporte y tickets" },
  { name: "Pedidos", icon: Package, path: "/dashboardlayout/orders", desc: "Gestión de pedidos" },
  { name: "Listas", icon: List, path: "/dashboardlayout/lists", desc: "Segmentación de listas" },
  { name: "Bandeja de entrada", icon: Inbox, path: "/dashboardlayout/inbox", desc: "Comunicación centralizada" },
  { name: "Llamadas", icon: Phone, path: "/dashboardlayout/calls", desc: "Registro de llamadas" },
  { name: "Tareas", icon: CheckSquare, path: "/dashboardlayout/tasks", desc: "Gestión de tareas" },
  { name: "Guías", icon: BookOpen, path: "/dashboardlayout/guides", desc: "Documentación y guías" },
  { name: "Mensajes", icon: Messa

