const ACTIONS = {
  GET_DATA: "GET_DATA",
  ADD_ITEM: "ADD_ITEM",
  UPDATE_ITEM: "UPDATE_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
};

export const { GET_DATA, ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } = ACTIONS;

export const cartReducer = (cart, { type, payload }) => {
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
