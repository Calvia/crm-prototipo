import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const NAMESPACE = "http://192.168.0.135:65338/";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserName } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
        "http://192.168.0.135:65338/WsLogin.asmx",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: `${NAMESPACE}Login`,
          },
          body: soapEnvelope,
        }
      );

      const responseText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseText, "text/xml");
      
      const exitoso = xmlDoc.getElementsByTagName("exitoso")[0]?.textContent;
      
      if (exitoso === "true") {
        const nombreUsuario = xmlDoc.getElementsByTagName("nombreUsuario")[0]?.textContent;
        setUserName(nombreUsuario);
        navigate("/dashboardlayout");
      } else {
        setError("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Ocurrió un error al intentar iniciar sesión. Por favor, revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50">
      <div className="flex flex-col rounded-xl shadow-lg w-full max-w-sm overflow-hidden">
        {/* Header de la tarjeta */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-t-xl flex justify-center items-center">
          <img
            src="https://placehold.co/150x150/ffffff/000000?text=Logo"
            alt="Logo CRM"
            className="w-24 h-24 rounded-full shadow-lg"
          />
        </div>
        
        {/* Contenido del formulario */}
        <div className="bg-white p-8">
          <h2 className="text-2xl font-bold uppercase text-center mb-2">INICIAR SESIÓN</h2>
          <p className="text-gray-600 text-center mb-8">
            Accede a tu cuenta
          </p>

          <form onSubmit={handleLogin}>
            <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 rounded-full shadow-lg hover:from-yellow-500 hover:to-orange-600 transition"
              disabled={loading}
            >
              {loading ? "Iniciando..." : "INICIAR SESIÓN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}