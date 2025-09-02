import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const NAMESPACE = "http://192.168.0.135:65338/";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // 🟢 CORRECCIÓN CLAVE: Se desestructura setUserPermissions del contexto
  const { setUserName, setUserRole, setUserPermissions } = useContext(UserContext);

  const callSoap = async (method, body, soapAction) => {
    const response = await fetch(`${NAMESPACE}WsLogin.asmx`, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": `${NAMESPACE}${soapAction}`,
      },
      body: `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                       xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                       xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <${method} xmlns="${NAMESPACE}">
              ${body}
            </${method}>
          </soap:Body>
        </soap:Envelope>`,
    });
    return response;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const loginBody = `<usuario>${usuario}</usuario><clave>${clave}</clave>`;
    const permissionsBody = `<usuario>${usuario}</usuario>`;

    try {
      // 1. Llamada para validar credenciales (método Login)
      const loginResponse = await callSoap("Login", loginBody, "Login");
      
      if (!loginResponse.ok) {
        setError("Error de red o CORS al conectar con el servidor.");
        setLoading(false);
        return;
      }
      
      const loginText = await loginResponse.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(loginText, "text/xml");
      
      const loginResultNode = xmlDoc.querySelector("LoginResult");
      
      if (!loginResultNode) {
        setError("Error: El servidor no devolvió una respuesta de login válida.");
        setLoading(false);
        return;
      }
      
      const exitoso = loginResultNode.querySelector("exitoso")?.textContent === "true";
      const nombreUsuario = loginResultNode.querySelector("nombreUsuario")?.textContent;
      
      if (exitoso) {
        // 2. Si el login es exitoso, OBTENER LOS ROLES Y MENÚS
        const permissionsResponse = await callSoap("Roles", permissionsBody, "Roles");
        
        if (!permissionsResponse.ok) {
          setError("Error de red o CORS al obtener permisos.");
          setLoading(false);
          return;
        }
        
        const permissionsText = await permissionsResponse.text();
        const permissionsXml = parser.parseFromString(permissionsText, "text/xml");
        
        const permissionsResultNode = permissionsXml.querySelector("RolesResult");

        if (!permissionsResultNode) {
          setError("Error: No se pudo obtener la información de permisos del servidor.");
          setLoading(false);
          return;
        }

        const nombreRol = permissionsResultNode.querySelector("nombreRol")?.textContent;
        const menusPermitidosNodes = permissionsResultNode.querySelectorAll("menusPermitidos string");
        
        const menusPermitidos = Array.from(menusPermitidosNodes).map(node => node.textContent.trim());

        // 3. Actualizar el contexto del usuario
        setUserName(nombreUsuario);
        setUserRole(nombreRol);
        setUserPermissions(menusPermitidos); // 🟢 Ahora esta línea funcionará
        localStorage.setItem("isAuthenticated", "true");
        
        // Navegar al dashboard
        navigate("/dashboardlayout", { replace: true });

      } else {
        setError("Usuario o contraseña incorrectos.");
      }

    } catch (err) {
      console.error("Error en la petición:", err);
      setError("Error al conectar con el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
            Usuario
          </label>
          <input
            type="text"
            placeholder="Ingresa tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;