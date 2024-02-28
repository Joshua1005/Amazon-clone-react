import { useState } from "react";
import useCart from "../context/CartContext/useCart";
import { useDeliveryOptions } from "../context/DeliveryContext/useDeliveryOptions";
import { useProducts } from "../context/ProductsContext/useProducts";
import formatCurrency from "../utilities/formatCurrency";

const OrderSummary = () => {
  const { getTotalItem, cart } = useCart();
  const { deliveryOptions } = useDeliveryOptions();
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);

  const totalPriceCents = cart.reduce((total, cartItem): any => {
    const matchedProducts = products.find(
      (product) => product.id === cartItem.productId
    );
    if (matchedProducts)
      return (total += cartItem.quantity * matchedProducts.priceCents);
  }, 0);

  const totalCostCents = cart.reduce((total, cartItem): any => {
    const matchedOptions = deliveryOptions.find(
      (deliveryOption) => deliveryOption.id === cartItem.deliveryOptionId
    );
    if (matchedOptions) return (total += matchedOptions.costCents);
  }, 0);

  const taxPercentage = 0.1;
  const totalCentsBeforeTax = totalPriceCents + totalCostCents;
  const taxCents = totalCentsBeforeTax * taxPercentage;
  const totalCents = totalCentsBeforeTax + taxCents;

  return (
    <article className="border p-5">
      <h4 className="scroll-m-20 text-lg font-semibold tracking-tight line-clamp-2 h-10">
        Order Summary
      </h4>
      <section className="flex justify-between items-center">
        <span>
          {getTotalItem > 1 ? "Items" : "Item"} ({getTotalItem}):
        </span>
        <span>${formatCurrency(totalPriceCents)}</span>
      </section>
      <section className="flex justify-between items-center">
        <span>Shipping & Handling:</span>
        <span>${formatCurrency(totalCostCents)}</span>
      </section>
      <section className="flex justify-between items-center">
        <span>Total before tax:</span>
        <span className="border-t pt-2">
          ${formatCurrency(totalCentsBeforeTax)}
        </span>
      </section>
      <section className="flex justify-between items-center pb-2">
        <span>Estimated tax (10%):</span>
        <span>${formatCurrency(taxCents)}</span>
      </section>
      <section className="flex justify-between items-center border-t py-2 font-bold text-lg text-red-800">
        <span>Order total:</span>
        <span>${formatCurrency(totalCents)}</span>
      </section>
      <section className="flex gap-2 font-semibold text-lg">
        <label htmlFor="usePaypal">Use Paypal</label>
        <input
          onChange={() => setIsOpen(!isOpen)}
          checked={isOpen}
          id="usePaypal"
          type="checkbox"
        />
      </section>
      <button className="w-full py-3 text-center bg-yellow-400 my-2 rounded-md text-sm">
        Place your order
      </button>
    </article>
  );
};

export default OrderSummary;
