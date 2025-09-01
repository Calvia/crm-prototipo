// login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  const NAMESPACE = "http://192.168.0.135:65338/"; // <-- cámbialo según tu WSDL
    // Construir el envelope SOAP
    const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                     xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Login xmlns="${NAMESPACE}">
            <usuario>${usuario}</usuario>
            <clave>${clave}</clave>
          </Login>
        </soap:Body>
      </soap:Envelope>`;

    try {
      const response = await fetch(
        "http://192.168.0.135:65338/WsLogin.asmx", // <-- cámbialo según tu WSDL
        {
          method: "POST",
          headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: `"${NAMESPACE}Login"`, // OJO: con comillas
          },
          body: soapEnvelope,
        }
      );

      const textResponse = await response.text();

      // Parsear XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(textResponse, "text/xml");

      // Extraer el valor de LoginResult
      const result =
        xmlDoc.getElementsByTagName("LoginResult")[0]?.textContent;

      if (result === "true") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({ name: usuario, role: "Usuario" }));
        navigate("/dashboardlayout");
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 rounded-lg mb-6 font-bold text-xl">
          Cotzul CRM
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">Iniciar Sesión</h2>
        <p className="text-gray-500 text-center mb-6">
          Accede a tu sistema CRM
        </p>

        {/* Formulario */}
        <form onSubmit={handleLogin}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            type="text"
            placeholder="Ingresa tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        
      </div>
    </div>
  );
}
