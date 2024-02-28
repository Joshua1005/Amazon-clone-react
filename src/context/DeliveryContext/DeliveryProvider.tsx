import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DeliveryContext = createContext(null);

export const DeliveryProvider = ({ children }) => {
  const [deliveryOptionsState, setDeliveryOption] = useState([]);
  const url = "http://localhost:3001/deliveryOptions";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = await response.data;
        if (response.data) setDeliveryOption(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <DeliveryContext.Provider
      value={{ deliveryOptions: deliveryOptionsState, setDeliveryOption }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};
