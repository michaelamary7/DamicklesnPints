import React, { createContext, useState } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState([]);
  return (
    <MenuContext.Provider value={{ menuData, setMenuData }}>
      {children}
    </MenuContext.Provider>
  );
};

export { MenuContext, MenuProvider };
