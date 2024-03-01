import { useState } from "react";
import { useCart } from "../../../context/CartContext/useCart";
import { useDeliveryOptions } from "../../../context/DeliveryContext/useDeliveryOptions";
import { useProducts } from "../../../context/ProductsContext/useProducts";
import formatCurrency from "../../../utilities/formatCurrency";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import PaymentMethod from "./PaymentMethod";

const OrderSummary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItem, cart } = useCart();
  const { deliveryOptions } = useDeliveryOptions();
  const { products } = useProducts();

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
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="lg:text-base text-sm">
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
          <section className="flex justify-between items-center border-t py-2 font-bold lg:text-lg text-base text-red-800">
            <span>Order total:</span>
            <span>${formatCurrency(totalCents)}</span>
          </section>
        </CardContent>
        {!isOpen && totalCents !== 0 ? (
          <CardFooter>
            <Button
              disabled={totalCents === 0 ? true : false}
              onClick={() => setIsOpen(true)}
              className="w-full"
            >
              Place your order
            </Button>
          </CardFooter>
        ) : null}
      </Card>
      {isOpen && totalCents !== 0 ? (
        <PaymentMethod isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : null}
    </div>
  );
};

export default OrderSummary;
