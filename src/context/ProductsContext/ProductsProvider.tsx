import { createContext, useState, useEffect, useMemo } from "react";
import useAxios, { AxiosState } from "@/hooks/useAxios";

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

type ProductsContextType = AxiosState & {
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

  const url = `http://localhost:3000/products`;
  const { data, error, isLoading } = useAxios({ url });

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(url);
    //     if (response.status === 200) {
    //       const data = await response.data;
    //       setProducts(data);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchData();

    if (data) setProducts(data);
  }, [data, error, isLoading]);

  return (
    <ProductsContext.Provider
      value={{
        products: productsState,
        setProducts,
        data,
        error,
        isLoading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
