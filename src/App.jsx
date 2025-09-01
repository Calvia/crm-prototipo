// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";

// Páginas del dashboard
import DashboardHome from "./pages/DashboardHome";
import Contacts from "./pages/Contacts";
import Orders from "./pages/Orders";
import Config from "./pages/Config";
import Delivery from "./pages/Delivery";
import Calendar from "./pages/Calendar";
import Affiliates from "./pages/Affiliates";
import Reports from "./pages/Reports";
import AI from "./pages/AI";
import Market from "./pages/Market";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página de login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard con subrutas protegidas */}
        <Route
          path="/dashboardlayout"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="config" element={<Config />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="affiliates" element={<Affiliates />} />
          <Route path="reports" element={<Reports />} />
          <Route path="ai" element={<AI />} />
          <Route path="market" element={<Market />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;