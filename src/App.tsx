import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext/CartProvider";
import { DeliveryProvider } from "./context/DeliveryContext/DeliveryProvider";
import { ProductsProvider } from "./context/ProductsContext/ProductsProvider";
import { SearchProvider } from "./context/SearchContext/SearchProvider";
import Header from "./components/Header";
import Content from "./components/Content";
import CheckoutHeader from "./components/CheckoutHeader";
import CheckoutContent from "./components/CheckoutContent";

const App = () => {
  return (
    <Router>
      <SearchProvider>
        <ProductsProvider>
          <CartProvider>
            <DeliveryProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Header />
                      <Content />
                    </>
                  }
                />
                <Route
                  path="checkout"
                  element={
                    <>
                      <CheckoutHeader />
                      <CheckoutContent />
                    </>
                  }
                />
              </Routes>
            </DeliveryProvider>
          </CartProvider>
        </ProductsProvider>
      </SearchProvider>
    </Router>
  );
};

export default App;
