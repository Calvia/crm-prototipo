import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";

// Dashboard (home con cards)
import DashboardHome from "./pages/DashboardHome";

// CRM
import Contacts from "./pages/Contacts";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import Tickets from "./pages/Tickets";
import Orders from "./pages/Orders";

// Marketing
import Lists from "./pages/Lists";
import Inbox from "./pages/Inbox";
import Calls from "./pages/Calls";
import Tasks from "./pages/Tasks";
import Guides from "./pages/Guides";
import Messages from "./pages/Messages";
import Snippets from "./pages/Snippets";

// Otros módulos
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import AI from "./pages/AI";
import Market from "./pages/Market";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard protegido */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* Home */}
          <Route index element={<DashboardHome />} />

          {/* CRM */}
          <Route path="contacts" element={<Contacts />} />
          <Route path="companies" element={<Companies />} />
          <Route path="deals" element={<Deals />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="orders" element={<Orders />} />

          {/* Marketing */}
          <Route path="lists" element={<Lists />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="calls" element={<Calls />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="guides" element={<Guides />} />
          <Route path="messages" element={<Messages />} />
          <Route path="snippets" element={<Snippets />} />

          {/* Otros */}
          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<Reports />} />
          <Route path="ai" element={<AI />} />
          <Route path="market" element={<Market />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
