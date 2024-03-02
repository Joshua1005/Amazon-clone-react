import axios, { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";

type AxiosProps = {
  url: string;
  method?: string;
};

export type AxiosState = {
  data: [] | null;
  error: AxiosError | boolean;
  isLoading: boolean;
};

const useAxios = ({ url, method }: AxiosProps) => {
  const [state, setState] = useState<AxiosState>({
    data: [],
    error: false,
    isLoading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));

        const response = await axios.request({
          url,
          method: method || "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const data = await response.data;
          setState((prevState) => ({
            ...prevState,
            data,
          }));
        } else {
          throw new Error(
            `Error fetching data: ${response.status} - ${response.statusText}`
          );
        }
      } catch (Error: any) {
        isAxiosError(setState((prevState) => ({ ...prevState, error: Error })));
        console.error(Error);
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    fetchData();
  }, [url, method]);

  const { data, error, isLoading } = state;

  return { data, error, isLoading };
};

export default useAxios;
