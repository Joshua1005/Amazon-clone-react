import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { CartProvider } from "./context/CartContext/CartProvider";
import { DeliveryProvider } from "./context/DeliveryContext/DeliveryProvider";
import { ProductsProvider } from "./context/ProductsContext/ProductsProvider";
import { SearchProvider } from "./context/SearchContext/SearchProvider";
import Loader from "./components/Loader";

// Lazy-loaded components
const Header = lazy(() => import("./components/amazon/Header"));
const Content = lazy(() => import("./components/amazon/Content/Content"));
const CheckoutHeader = lazy(
  () => import("./components/checkout/CheckoutHeader")
);
const CheckoutContent = lazy(
  () => import("./components/checkout/CheckoutContent")
);
const FormHeader = lazy(() => import("./components/form/FormHeader"));
const SignupCard = lazy(() => import("./components/form/SignupCard"));
const FormFooter = lazy(() => import("./components/form/FormFooter"));
const SigninCard = lazy(() => import("./components/form/SigninCard"));

const App = () => {
  return (
    <Router>
      <ProductsProvider>
        <CartProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <SearchProvider>
                    <Header />
                    <Content />
                  </SearchProvider>
                </Suspense>
              }
            />
            <Route
              path="/checkout"
              element={
                <Suspense fallback={<Loader />}>
                  <DeliveryProvider>
                    <CheckoutHeader />
                    <CheckoutContent />
                  </DeliveryProvider>
                </Suspense>
              }
            />
            <Route
              path="/form/*"
              element={
                <Suspense fallback={<Loader />}>
                  <FormHeader />
                  <Routes>
                    <Route path="/" element={<SigninCard />} />
                    <Route path="/signup" element={<SignupCard />} />
                  </Routes>
                  <FormFooter />
                </Suspense>
              }
            />
          </Routes>
        </CartProvider>
      </ProductsProvider>
    </Router>
  );
};

export default App;
