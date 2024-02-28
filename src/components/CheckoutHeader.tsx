import { Link } from "react-router-dom";
import desktopLogo from "../assets/images/amazon-logo.png";
import mobileLogo from "../assets/images/amazon-mobile-logo.png";
import lockIcon from "../assets/images/icons/checkout-lock-icon.png";
import useCart from "../context/CartContext/useCart";

const CheckoutHeader = () => {
  const { getTotalItem } = useCart();
  return (
    <header className="flex justify-between items-center h-16 md:px-8 px-4 container mx-auto">
      <section>
        <Link to="/">
          <img className="md:block hidden w-24" src={desktopLogo} />
          <img className="md:hidden block h-10" src={mobileLogo} />
        </Link>
      </section>
      <section className="text-2xl font-semibold">
        <span>Checkout</span>(
        <Link to="/" className="text-sky-700">
          {getTotalItem}
          {getTotalItem === 1 ? " Item" : " Items"}
        </Link>
        )
      </section>
      <section>
        <img src={lockIcon} />
      </section>
    </header>
  );
};

export default CheckoutHeader;
