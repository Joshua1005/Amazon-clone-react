import { useContext } from "react";
import { CartContext } from "./CartProvider";

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) throw new Error("useCart must be used within Cart Provider");

  return context;
};

export { useCart };
