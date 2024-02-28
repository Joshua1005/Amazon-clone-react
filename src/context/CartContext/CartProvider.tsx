import { createContext, useEffect, useMemo, useReducer } from "react";
import {
  ADD_ITEM,
  GET_DATA,
  REMOVE_ITEM,
  UPDATE_ITEM,
  cartReducer,
} from "./cartReducer";
import axios from "axios";

const initialCartState = [];

const CartContext = createContext(initialCartState);

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const url = "http://localhost:3003/cart";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = await response.data;
        if (response.data) dispatch({ type: GET_DATA, payload: data });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const updateItem = async (payload) => {
    try {
      const response = await axios.put(`${url}/${payload.id}`, payload);
      if (response.data) dispatch({ type: UPDATE_ITEM, payload: payload });
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (payload) => {
    try {
      const response = await axios.post(url, payload);
      if (response.data) dispatch({ type: ADD_ITEM, payload });
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (payload) => {
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
