import { CartItem, Payload } from "./CartProvider";

enum ACTIONS {
  GET_DATA = "GET_DATA",
  ADD_ITEM = "ADD_ITEM",
  UPDATE_ITEM = "UPDATE_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
}

type Actions =
  | { type: ACTIONS.GET_DATA; payload: CartItem[] }
  | { type: ACTIONS.ADD_ITEM; payload: Payload }
  | { type: ACTIONS.UPDATE_ITEM; payload: Payload }
  | { type: ACTIONS.REMOVE_ITEM; payload: Payload };

export const { GET_DATA, ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } = ACTIONS;

export const cartReducer = (cart: CartItem[], { type, payload }: Actions) => {
  switch (type) {
    case GET_DATA:
      return [...payload];

    case ADD_ITEM:
      return [...cart, payload];

    case UPDATE_ITEM:
      return [...cart].map((cartItem) => {
        if (cartItem.id === payload.id) {
          if (payload.quantity !== cartItem.quantity) {
            return { ...cartItem, quantity: payload.quantity };
          }
          if (payload.deliveryOptionId) {
            return { ...cartItem, deliveryOptionId: payload.deliveryOptionId };
          }
        }
        return cartItem;
      });

    case REMOVE_ITEM:
      return [...cart].filter((cartItem) => cartItem.id !== payload.id);

    default:
      throw new Error("Unrecognized actions");
  }
};
