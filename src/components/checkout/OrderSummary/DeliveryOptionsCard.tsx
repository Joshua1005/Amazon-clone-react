import { useCart } from "../../../context/CartContext/useCart";
import dayjs from "dayjs";
import formatCurrency from "../../../utilities/formatCurrency";
import { DeliveryOptions } from "@/context/DeliveryContext/DeliveryProvider";
import { CartItem } from "@/context/CartContext/CartProvider";
import { RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";

type DeliveryOptionsCardProps = {
  deliveryOption: DeliveryOptions;
  cartItem: CartItem;
};

const DeliveryOptionsCard = ({
  deliveryOption,
  cartItem,
}: DeliveryOptionsCardProps) => {
  const { productId, deliveryOptionId } = cartItem;
  const { updateItem } = useCart();

  const { id, deliveryDay, costCents } = deliveryOption;

  const today = dayjs();
  const deliveryDate = today.add(deliveryDay, "days").format("dddd, MMMM D");
  const radioId = `radio_${productId}_${id}`;
  const isChecked = id === deliveryOptionId ? true : false;

  return (
    <div
      onClick={() => {
        updateItem({
          ...cartItem,
          deliveryOptionId: id,
        });
      }}
      className="flex gap-2 cursor-pointer items-center"
    >
      <RadioGroupItem
        className="text-foreground"
        checked={isChecked}
        id={radioId}
        value={productId}
        onChange={() =>
          updateItem({
            ...cartItem,
            deliveryOptionId: id,
          })
        }
      />
      <Label htmlFor={radioId} className="leading-5">
        <div className="font-semibold text-green-700">{deliveryDate}</div>
        <div className="opacity-60">
          {costCents === 0 ? "FREE" : `$${formatCurrency(costCents)} - `}{" "}
          Shipping
        </div>
      </Label>
    </div>
  );
};

export default DeliveryOptionsCard;
