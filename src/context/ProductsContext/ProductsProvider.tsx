import { createContext, useState, useEffect } from "react";
import axios from "axios";

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
  setProducts: (product: Product[]) => void;
};

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [productsState, setProducts] = useState<Product[]>([]);
  const url = "http://localhost:3000/products";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const data = await response.data;
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={{ products: productsState, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
