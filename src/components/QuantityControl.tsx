import { CartItem } from "@/context/CartContext/CartProvider";
import useCart from "../context/CartContext/useCart";
import { useState } from "react";

type QuantityControlProps = {
  cartItem: CartItem;
};

const QuantityControl = ({ cartItem }: QuantityControlProps) => {
  const { quantity } = cartItem;
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const { updateItem, removeItem } = useCart();

  return (
    <>
      {isUpdating ? (
        <input
          className="w-14 border-2 rounded-md"
          min="1"
          max="999"
          defaultValue={quantity}
          onChange={(e) => setUpdatedQuantity(parseInt(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsUpdating(false);
              isUpdating && updatedQuantity !== 0
                ? updateItem({
                    ...cartItem,
                    quantity: updatedQuantity,
                  })
                : setUpdatedQuantity(0);
            }
          }}
          type="number"
        />
      ) : (
        <span>{quantity}</span>
      )}
      <button
        onClick={() => {
          setIsUpdating(!isUpdating);
          isUpdating && updatedQuantity !== 0
            ? updateItem({
                ...cartItem,
                quantity: updatedQuantity,
              })
            : setUpdatedQuantity(0);
        }}
        className="text-sky-700 hover:text-orange-600 transition-all"
      >
        {isUpdating ? "Save" : "Update"}
      </button>
      <button
        onClick={() => removeItem({ ...cartItem })}
        className="text-sky-700 hover:text-orange-600 transition-all"
      >
        Delete
      </button>
    </>
  );
};

export default QuantityControl;
