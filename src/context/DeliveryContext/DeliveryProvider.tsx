import useAxios from "@/hooks/useAxios";
import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

export type DeliveryOptions = {
  id: string;
  deliveryDay: number;
  costCents: number;
};

type DeliveryType = {
  deliveryOptions: DeliveryOptions[];
  setDeliveryOption: (options: DeliveryOptions[]) => void;
};

type DeliveryProps = {
  children: ReactNode;
};

const initialState: [] = [];

export const DeliveryContext = createContext<DeliveryType | null>(null);

export const DeliveryProvider = ({ children }: DeliveryProps) => {
  const [deliveryOptionsState, setDeliveryOption] =
    useState<DeliveryOptions[]>(initialState);
  const url = "http://localhost:3001/deliveryOptions";
  const { data, error, isLoading } = useAxios({ url });

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(url);
    //     const data = await response.data;
    //     if (response.data) setDeliveryOption(data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchData();
    if (data) setDeliveryOption(data);
  }, [data, error, isLoading]);

  return (
    <DeliveryContext.Provider
      value={{ deliveryOptions: deliveryOptionsState, setDeliveryOption }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};
