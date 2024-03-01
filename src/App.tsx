import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext/CartProvider";
import { DeliveryProvider } from "./context/DeliveryContext/DeliveryProvider";
import { ProductsProvider } from "./context/ProductsContext/ProductsProvider";
import { SearchProvider } from "./context/SearchContext/SearchProvider";
import Header from "./components/amazon/Header";
import Content from "./components/amazon/Content";
import CheckoutHeader from "./components/checkout/CheckoutHeader";
import CheckoutContent from "./components/checkout/CheckoutContent";
import FormHeader from "./components/form/FormHeader";
import SignupCard from "./components/form/SignupCard";
import FormFooter from "./components/form/FormFooter";
import SigninCard from "./components/form/SigninCard";

const App = () => {
  return (
    <Router>
      <ProductsProvider>
        <CartProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchProvider>
                    <Header />
                    <Content />
                  </SearchProvider>
                </>
              }
            />
            <Route
              path="checkout"
              element={
                <>
                  <DeliveryProvider>
                    <CheckoutHeader />
                    <CheckoutContent />
                  </DeliveryProvider>
                </>
              }
            />
            <Route
              path="form/*"
              element={
                <>
                  <FormHeader />
                  <Routes>
                    <Route path="/" element={<SigninCard />} />
                    <Route path="/signup" element={<SignupCard />} />
                  </Routes>
                  <FormFooter />
                </>
              }
            />
          </Routes>
        </CartProvider>
      </ProductsProvider>
    </Router>
  );
};

export default App;
