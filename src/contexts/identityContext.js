import React, { createContext, useEffect, useState } from "react";

const IdentityContext = createContext();

const IdentityProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    if (localStorage.getItem("user") !== undefined) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <IdentityContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </IdentityContext.Provider>
  );
};

export { IdentityContext, IdentityProvider };
