import OrderSummary from "./PaymentSummary/PaymentSummary";
import PaymentSummary from "./OrderSummary/OrderSummary";

const CheckoutContent = () => {
  return (
    <main className="mt-20 max-w-screen-xl mx-auto md:px-8 px-4">
      <h3 className="scroll-m-20 lg:text-2xl md:text-xl sm:text-lg font-semibold tracking-tight py-4">
        Review your order
      </h3>
      <div className="grid md:grid-cols-6 grid-cols-1 gap-5">
        <section className="md:col-span-4 col-span-1">
          <PaymentSummary />
        </section>
        <section className="col-span-1 md:col-span-2 w-full">
          <OrderSummary />
        </section>
      </div>
    </main>
  );
};

export default CheckoutContent;
