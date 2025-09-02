import React, { useContext } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../components/UserContext";

// Función para generar breadcrumbs dinámicos
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm text-gray-600">
      <ol className="flex space-x-2">
        <li>
          <Link to="/dashboardlayout" className="hover:underline text-yellow-600">
            Dashboard
          </Link>
        </li>
        {pathnames.slice(1).map((value, index) => {
          const to = `/${pathnames.slice(0, index + 2).join("/")}`;
          const isLast = index === pathnames.slice(1).length - 1;
          return (
            <li key={to} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="font-semibold capitalize text-gray-800">
                  {value}
                </span>
              ) : (
                <Link
                  to={to}
                  className="hover:underline capitalize text-yellow-600"
                >
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const DashboardLayout = () => {
  const { userName, setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar sesión: limpia el nombre de usuario y navega a la página de inicio
    setUserName('');
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar user={{ name: userName }} onLogout={handleLogout} />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Bienvenido, {userName}</h1>
            <Breadcrumbs />
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </header>

        {/* Contenido dinámico */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
