import React, { createContext, useState } from "react";

export const SessionContext = createContext<any>(null);

interface Props {
  children: React.ReactNode;
}

const SessionContextProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated, setIsAuthenticated
      }}
    >
      {children}
    </SessionContext.Provider>);
};

export default SessionContextProvider;
