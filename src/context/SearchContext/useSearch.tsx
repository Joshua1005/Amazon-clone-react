import { useContext } from "react";
import { SearchContext } from "./SearchProvider";

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) throw new Error("useSearch must be used within Cart Provider");

  return context;
};
