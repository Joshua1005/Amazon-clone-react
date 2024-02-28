import { useEffect, useState } from "react";

type useFetchProps = {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
};

type useFetchState = {
  data: [];
  isError: any;
  isLoading: boolean;
};

export const useFetch = ({ url, method, headers, body }: useFetchProps) => {
  const [state, setState] = useState<useFetchState>({
    data: [],
    isError: false,
    isLoading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        const response = await fetch(url, {
          method: method || "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });
        if (!response.ok)
          throw new Error(
            `Error fetching data: ${response.status} - ${response.statusText}`
          );
        const data = await response.json();
        setState((prevState) => ({ ...prevState, data: data }));
      } catch (error) {
        console.error(error);
        setState((prevState) => ({ ...prevState, isError: true }));
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    fetchData();
  }, [url, method, headers, body]);

  return state;
};
