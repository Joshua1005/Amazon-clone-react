import { useContext } from "react";
import { ProductsContext } from "./ProductsProvider";

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === null)
    throw new Error("useProducts must be used within Products Provider");

  return context;
};
