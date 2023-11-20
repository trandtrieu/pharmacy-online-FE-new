// DataContext.js
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [orderData, setOrderData] = useState(null);
  console.log("OrderData in DataProvider:", orderData);
  return (
    <DataContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
