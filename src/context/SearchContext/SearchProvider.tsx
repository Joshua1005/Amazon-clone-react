import { SetURLSearchParams, useSearchParams } from "react-router-dom";
import { ReactNode, createContext } from "react";

type SearchContextType = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
};
