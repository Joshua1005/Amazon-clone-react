import ProductsCard from "./ProductsCard";
import { useProducts } from "../../../context/ProductsContext/useProducts";
import { useSearch } from "@/context/SearchContext/useSearch";
import { Toaster } from "../../ui/toaster";
import Loader from "@/components/Loader";
import NotFound from "@/components/NotFound";

const Content = () => {
  const { products, isLoading, error } = useProducts();
  const { searchParams } = useSearch();

  const searchText = searchParams.get("search") || "";
  const filteredItems = products?.filter((product) => {
    const matchedName = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    if (matchedName) return true;
    const matchedKeyword = product.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchText.toLowerCase())
    );

    return matchedKeyword;
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <NotFound
        errorMessage={
          typeof error === "object" ? error.message : "Cannot load products!"
        }
      />
    );
  }

  if (filteredItems?.length === 0) {
    return <NotFound errorMessage={"Products not found!"} />;
  }

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-16">
      {filteredItems?.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
      <Toaster />
    </main>
  );
};

export default Content;
