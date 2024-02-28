import { useContext } from "react";
import { DeliveryContext } from "./DeliveryProvider";

export const useDeliveryOptions = () => {
  const context = useContext(DeliveryContext);

  if (!context)
    throw new Error("useDeliveryOptions must be used within DeliveryProvider");

  return context;
};
