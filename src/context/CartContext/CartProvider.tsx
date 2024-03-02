import {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  ADD_ITEM,
  GET_DATA,
  REMOVE_ITEM,
  UPDATE_ITEM,
  cartReducer,
} from "./cartReducer";
import axios from "axios";
import useAxios from "@/hooks/useAxios";

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  deliveryOptionId: string;
};

export type Payload = {
  id: string;
  productId: string;
  quantity: number;
  deliveryOptionId: string;
};

type CartType = {
  cart: CartItem[];
  addItem: (payload: Payload) => void;
  updateItem: (payload: Payload) => void;
  removeItem: (payload: Payload) => void;
  getTotalItem: number;
};

type CartProps = {
  children: ReactNode;
};

const initialState: [] | CartItem[] = [];

const CartContext = createContext<CartType | null>(null);

const CartProvider = ({ children }: CartProps) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const url = "http://localhost:3003/cart";
  const { data, error, isLoading } = useAxios({ url });

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(url);
    //     const data = await response.data;
    //     if (response.data) dispatch({ type: GET_DATA, payload: data });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchData();
    if (data) dispatch({ type: GET_DATA, payload: data });
  }, [data, error, isLoading]);

  const updateItem = async (payload: Payload) => {
    try {
      const response = await axios.patch(`${url}/${payload.id}`, payload);
      if (response.data) dispatch({ type: UPDATE_ITEM, payload });
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (payload: Payload) => {
    try {
      const response = await axios.post(url, payload);
      if (response.data) dispatch({ type: ADD_ITEM, payload });
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (payload: Payload) => {
    try {
      const response = await axios.delete(`${url}/${payload.id}`);
      if (response.data) dispatch({ type: REMOVE_ITEM, payload });
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalItem = useMemo(() => {
    const total = cart.reduce((currentTotal, cartItem) => {
      return (currentTotal += cartItem.quantity);
    }, 0);
    return total;
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addItem, updateItem, removeItem, getTotalItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
