import React, { createContext, useState } from "react";

export const UserContext = createContext();

const Context = ({ children }) => {
  const [authorised, setAuthorised] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ authorised, setAuthorised, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default Context;
