import desktopLogo from "../assets/images/amazon-logo-white.png";
import mobileLogo from "../assets/images/amazon-mobile-logo-white.png";
import searchIcon from "../assets/images/icons/search-icon.png";
import cartIcon from "../assets/images/icons/cart-icon.png";
import useCart from "../context/CartContext/useCart";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "@/context/SearchContext/useSearch";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center fixed inset-0 md:px-8 px-4 h-16 bg-slate-950 z-50">
      <section>
        <Link to="/">
          <img className="md:block hidden w-24" src={desktopLogo} />
          <img className="md:hidden block h-10" src={mobileLogo} />
        </Link>
      </section>
      <MiddleSection />
      <RightSection />
    </header>
  );
};

const MiddleSection = () => {
  const [query, setQuery] = useState("");
  const { setSearchParams } = useSearch();

  const searchProducts = (e: FormEvent) => {
    e.preventDefault();

    query.length !== 0 ? setSearchParams({ search: query }) : setSearchParams();
  };

  return (
    <form
      onSubmit={searchProducts}
      className="flex-1 flex px-4 md:px-8 justify-center"
    >
      <Input
        className="bg-white rounded-s-md rounded-e-none max-w-2xl"
        type="search"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        className="rounded-s-none rounded-e-md"
        type="submit"
        onClick={() => setSearchParams({ search: query })}
      >
        <img className="w-5" src={searchIcon} />
      </Button>
    </form>
  );
};

const RightSection = () => {
  const { getTotalItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="text-white md:flex justify-end w-40 hidden gap-2">
        <a className="flex flex-col" href="#">
          <span className="text-sm">Returns</span>
          <span className="font-semibold">& Orders</span>
        </a>
        <Link
          className="relative flex justify-center items-center gap-1"
          to="checkout"
        >
          <span className="absolute top-0 left-4 w-6 text-orange-500 font-bold text-center">
            {getTotalItem}
          </span>
          <img className="w-12" src={cartIcon} />
          <span className="font-semibold self-end">Cart</span>
        </Link>
      </section>
      <section className="md:hidden flex justify-center items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="px-2 py-1">
          <div className="bg-white w-5 h-[1px] my-1" />
          <div className="bg-white w-5 h-[1px] my-1" />
          <div className="bg-white w-5 h-[1px] my-1" />
        </button>
        <section
          aria-hidden={!isOpen}
          className="fixed top-16 h-16 bg-slate-950 right-0 left-0 aria-hidden:h-0 aria-hidden:invisible aria-hidden:opacity-0 opacity-100 transition-all text-white text-center text-sm"
        >
          <a
            className="block py-1 hover:backdrop-brightness-150 transition-all"
            href="#"
          >
            Returns & Orders
          </a>
          <Link
            className="block py-1 hover:backdrop-brightness-150 transition-all"
            to="checkout"
          >
            Cart (
            <span className="text-orange-500 font-semibold">
              {getTotalItem}
            </span>
            )
          </Link>
        </section>
      </section>
    </>
  );
};

export default Header;
