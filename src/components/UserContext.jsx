import React, { createContext, useState } from 'react';

// 1. Crea el contexto
export const UserContext = createContext(null);

// 2. Crea el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
