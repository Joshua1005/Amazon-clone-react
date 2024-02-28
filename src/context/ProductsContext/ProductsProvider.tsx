import { createContext, useState, useEffect } from "react";
import { useAxios } from "@/hooks/useAxios";

type Rating = {
  stars: number;
  count: number;
};

export type Product = {
  id: string;
  image: string;
  name: string;
  rating: Rating;
  priceCents: number;
  keywords: string[];
  sizeChartLink?: string;
};

type ProductsContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isError: boolean;
  isLoading: boolean;
};

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [productsState, setProducts] = useState<Product[]>([]);
  const { data, isError, isLoading } = useAxios({
    url: "http://localhost:3000/products",
  });

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <ProductsContext.Provider
      value={{ products: productsState, setProducts, isError, isLoading }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
