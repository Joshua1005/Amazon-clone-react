import { useProducts } from "../context/ProductsContext/useProducts";
import useCart from "../context/CartContext/useCart";
import formatCurrency from "../utilities/formatCurrency";
import dayjs from "dayjs";
import DeliveryOptionsCard from "./DeliveryOptionsCard";
import QuantityControl from "./QuantityControl";
import { useDeliveryOptions } from "../context/DeliveryContext/useDeliveryOptions";

const PaymentSummary = () => {
  const { products } = useProducts();
  const { cart } = useCart();
  const { deliveryOptions } = useDeliveryOptions();

  return (
    <article className="flex flex-col gap-5">
      {cart.map((cartItem) => {
        const { productId, deliveryOptionId } = cartItem;

        const matchedProducts = products.find(
          (product) => product.id === productId
        );

        const matchedOptions = deliveryOptions.find(
          (deliveryOption) => deliveryOption.id === deliveryOptionId
        );

        if (matchedProducts && matchedOptions) {
          const { id, image, name, priceCents } = matchedProducts;
          const { deliveryDay } = matchedOptions;
          const today = dayjs();
          const deliveryDate = today
            .add(deliveryDay, "days")
            .format("dddd, MMMM D");

          return (
            <section key={id} className="border p-5">
              <h4 className="scroll-m-20 text-lg font-bold tracking-tight text-green-700">
                Delivery Date: {deliveryDate}
              </h4>
              <section className="p-5 flex gap-5 justify-between">
                <article className="w-24">
                  <img className="max-w-full max-h-full" src={image} />
                </article>
                <article className="flex-1">
                  <h4 className="scroll-m-20 text-lg font-semibold tracking-tight line-clamp-2 h-10">
                    {name}
                  </h4>
                  <p className="font-bold text-red-800">
                    ${formatCurrency(priceCents)}
                  </p>
                  <section className="flex gap-2 flex-wrap">
                    <span>Quantity:</span>
                    <QuantityControl cartItem={cartItem} />
                  </section>
                </article>
                <section className="flex flex-col gap-2">
                  <p className="scroll-m-20 text-lg font-semibold tracking-tight">
                    Choose a delivery option:
                  </p>
                  {deliveryOptions.map((deliveryOption) => (
                    <DeliveryOptionsCard
                      key={`${productId}_${deliveryOption.id}`}
                      deliveryOption={deliveryOption}
                      cartItem={cartItem}
                    />
                  ))}
                </section>
              </section>
            </section>
          );
        }
      })}
    </article>
  );
};

export default PaymentSummary;
