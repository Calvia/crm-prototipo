import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userPermissions, setUserPermissions] = useState([]); // 🟢 Nuevo: Estado para los permisos

  return (
    <UserContext.Provider value={{
      userName,
      setUserName,
      userRole,
      setUserRole,
      userPermissions, // 🟢 Nuevo: Agregado al valor del contexto
      setUserPermissions // 🟢 Nuevo: Agregado al valor del contexto
    }}>
      {children}
    </UserContext.Provider>
  );
};