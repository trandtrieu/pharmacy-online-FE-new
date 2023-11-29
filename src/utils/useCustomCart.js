// Trong một file mới, ví dụ CustomCartHook.js
import { useContext } from "react";
import CartContext from "../CartProvider";

const useCustomCart = () => {
  return useContext(CartContext);
};

export default useCustomCart;
