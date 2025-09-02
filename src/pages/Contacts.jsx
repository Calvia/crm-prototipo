// src/pages/Contacts.jsx
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

// 🔹 El NAMESPACE debe coincidir con la URL del servicio web
const NAMESPACE = "http://192.168.0.135:65338/";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    numerocedula: "",
    nombres: "",
    apellidos: "",
    email: "",
    celular: "", // Corregido el nombre del campo a "celular"
    estado: "",
  });

  // 🔹 Helper para consumir servicios web SOAP
  const callSoap = async (method, body, soapAction) => {
    const response = await fetch(`${NAMESPACE}WsCliente.asmx`, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: `${NAMESPACE}${soapAction}`,
      },
      body: `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                       xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                       xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            ${body}
          </soap:Body>
        </soap:Envelope>`,
    });
    const text = await response.text();
    return text;
  };

  // 🔹 Parsear XML para extraer los datos
  const parseXml = (xmlStr) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlStr, "text/xml");
    return xml;
  };

  // 🔹 Listar todos los clientes
  const fetchContacts = async () => {
    try {
      const xml = await callSoap(
        "ListarClientes",
        `<ListarClientes xmlns="${NAMESPACE}" />`,
        "ListarClientes"
      );
      const parsed = parseXml(xml);

      // ⚠️ Corregido: mapear los datos buscando la etiqueta <Clientes>
      const clientes = Array.from(parsed.getElementsByTagName("Clientes")).map((c) => ({
        id: c.getElementsByTagName("id")[0]?.textContent,
        numerocedula: c.getElementsByTagName("numeroCedula")[0]?.textContent,
        nombres: c.getElementsByTagName("nombres")[0]?.textContent,
        apellidos: c.getElementsByTagName("apellidos")[0]?.textContent,
        email: c.getElementsByTagName("email")[0]?.textContent,
        celular: c.getElementsByTagName("celular")[0]?.textContent,
        estado: c.getElementsByTagName("estado")[0]?.textContent,
      }));

      setContacts(clientes);
    } catch (err) {
      console.error("Error listando contactos:", err);
    }
  };

  // 🔹 Insertar o actualizar un cliente
  const handleSave = async () => {
    try {
      if (editingContact) {
        // ⚠️ Corregido el cuerpo para ActualizarCliente
        await callSoap(
          "ActualizarCliente",
          `<ActualizarCliente xmlns="${NAMESPACE}">
             <id>${editingContact.id}</id>
             <numeroCedula>${formData.numerocedula}</numeroCedula>
             <nombres>${formData.nombres}</nombres>
             <apellidos>${formData.apellidos}</apellidos>
             <email>${formData.email}</email>
             <celular>${formData.celular}</celular>
           </ActualizarCliente>`,
          "ActualizarCliente"
        );
      } else {
        // ⚠️ Corregido el cuerpo para InsertarCliente y se añadió el campo <estado>
        await callSoap(
          "InsertarCliente",
          `<InsertarCliente xmlns="${NAMESPACE}">
             <numeroCedula>${formData.numerocedula}</numeroCedula>
             <nombres>${formData.nombres}</nombres>
             <apellidos>${formData.apellidos}</apellidos>
             <email>${formData.email}</email>
             <celular>${formData.celular}</celular>
             <estado>A</estado>
           </InsertarCliente>`,
          "InsertarCliente"
        );
      }
      setShowForm(false);
      fetchContacts();
    } catch (err) {
      console.error("Error guardando contacto:", err);
    }
  };

  // 🔹 Eliminar un cliente
  const handleDelete = async (id) => {
    try {
      await callSoap(
        "EliminarCliente",
        `<EliminarCliente xmlns="${NAMESPACE}">
           <id>${id}</id>
         </EliminarCliente>`,
        "EliminarCliente"
      );
      fetchContacts();
    } catch (err) {
      console.error("Error eliminando contacto:", err);
    }
  };

  // 🔹 Cargar los clientes al iniciar la página
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        <button
          onClick={() => {
            setEditingContact(null);
            setFormData({ numerocedula: "", nombres: "", apellidos: "", email: "", celular: "" });
            setShowForm(true);
          }}
          className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transform transition"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Cliente
        </button>
      </div>

      {/* Tabla de clientes */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-yellow-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Cédula</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombres</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Apellidos</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Celular</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{c.numerocedula}</td>
                <td className="px-4 py-2 text-sm">{c.nombres}</td>
                <td className="px-4 py-2 text-sm">{c.apellidos}</td>
                <td className="px-4 py-2 text-sm">{c.email}</td>
                <td className="px-4 py-2 text-sm">{c.celular}</td>
                <td className="px-4 py-2 text-sm">{c.estado}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingContact(c);
                      setFormData(c);
                      setShowForm(true);
                    }}
                    disabled={c.estado === 'E'} // Deshabilita el botón si el estado es 'E'
                    className={`p-2 bg-blue-500 text-white rounded-full shadow-md transition ${c.estado === 'E' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    disabled={c.estado === 'E'} // Deshabilita el botón si el estado es 'E'
                    className={`p-2 bg-red-500 text-white rounded-full shadow-md transition ${c.estado === 'E' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal formulario */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              {editingContact ? "Editar Cliente" : "Nuevo Cliente"}
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <input
                type="text"
                placeholder="Cédula"
                className="w-full border px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={formData.numerocedula}
                onChange={(e) => setFormData({ ...formData, numerocedula: e.target.value })}
              />
              <input
                type="text"
                placeholder="Nombres"
                className="w-full border px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
              />
              <input
                type="text"
                placeholder="Apellidos"
                className="w-full border px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Celular"
                className="w-full border px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:scale-105 transform transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;

