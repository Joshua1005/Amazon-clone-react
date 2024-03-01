import { useProducts } from "../../../context/ProductsContext/useProducts";
import { useCart } from "../../../context/CartContext/useCart";
import formatCurrency from "../../../utilities/formatCurrency";
import dayjs from "dayjs";
import DeliveryOptionsCard from "./DeliveryOptionsCard";
import QuantityControl from "./QuantityControl";
import { useDeliveryOptions } from "../../../context/DeliveryContext/useDeliveryOptions";
import { RadioGroup } from "../../ui/radio-group";

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
              <h4 className="scroll-m-20 text-base md:text-lg font-bold tracking-tight text-green-700">
                Delivery Date: {deliveryDate}
              </h4>
              <section className="p-5 flex lg:gap-5 gap-3 lg:justify-between flex-wrap">
                <article className="w-24 mb-5">
                  <img className="max-w-full max-h-full" src={image} />
                </article>
                <article className="flex-1">
                  <h4 className="scroll-m-20 lg:text-base lg:leading-none md:text-base text-sm font-semibold tracking-tight line-clamp-2 h-12 leading-none">
                    {name}
                  </h4>
                  <p className="font-bold text-red-800">
                    ${formatCurrency(priceCents)}
                  </p>
                  <section className="flex lg:gap-2 gap-1 flex-wrap text-sm lg:text-base">
                    <span>Quantity:</span>
                    <QuantityControl cartItem={cartItem} />
                  </section>
                </article>
                <section className="flex flex-col gap-2">
                  <p className="scroll-m-20 lg:text-lg text-base font-semibold tracking-tight">
                    Choose a delivery option:
                  </p>
                  <RadioGroup>
                    {deliveryOptions.map((deliveryOption) => (
                      <DeliveryOptionsCard
                        key={`${productId}_${deliveryOption.id}`}
                        deliveryOption={deliveryOption}
                        cartItem={cartItem}
                      />
                    ))}
                  </RadioGroup>
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
