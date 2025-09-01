import React from 'react';
import { Settings, Users, Package, Truck, Calendar, UserCheck, TrendingUp, Brain, DollarSign, BookOpen, LogOut, User } from 'lucide-react';

const Sidebar = ({ user, onLogout, currentPage, setCurrentPage }) => {
  const menuItems = [
    { icon: Settings, label: 'Configuración', page: 'config' },
    { icon: Users, label: 'Gestión de Contactos', page: 'contacts' },
    { icon: Package, label: 'Gestión de Pedidos', page: 'orders' },
    { icon: Truck, label: 'Manejo de Pedidos', page: 'delivery' },
    { icon: Calendar, label: 'Gestión de Calendarios', page: 'calendar' },
    { icon: UserCheck, label: 'Módulo Afiliados', page: 'affiliates' },
    { icon: TrendingUp, label: 'Análisis y Reportes', page: 'reports' },
    { icon: Brain, label: 'AI y Machine Learning', page: 'ai' },
    { icon: DollarSign, label: 'Estudio del mercado', page: 'market' },
    { icon: BookOpen, label: 'Manual de usuario', page: 'manual' },
  ];

  return (
    <div className="sidebar-gradient w-64 min-h-screen p-4">
      {/* Logo */}
      <div className="flex items-center mb-8 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
        <div className="bg-white p-2 rounded shadow">
          <div className="text-blue-600 font-bold text-lg">Cotzul</div>
        </div>
        <div className="ml-2 text-white text-sm">.COM</div>
      </div>

      {/* User info */}
      <div className="text-white mb-6">
        <div className="text-xs uppercase tracking-wide mb-1 opacity-75">SUPERUSUARIO</div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{user.name}</span>
          <User className="w-4 h-4" />
        </div>
        <div className="text-xs opacity-75">{user.role}</div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(item.page)}
            className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors duration-150 text-sm ${
              currentPage === item.page
                ? 'bg-yellow-600 text-white shadow'
                : 'text-white hover:bg-yellow-600 hover:bg-opacity-50'
            }`}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full flex items-center px-3 py-2 text-left text-white hover:bg-red-500 hover:bg-opacity-20 rounded-md transition-colors duration-150 text-sm mt-8"
      >
        <LogOut className="w-4 h-4 mr-3" />
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Sidebar;
