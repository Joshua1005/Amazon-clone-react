import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

type useAxiosState = {
  data: [];
  isError: any;
  isLoading: boolean;
};

type useAxiosProps = {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  data?: any;
};

const useAxios = ({ url, method, headers, data }: useAxiosProps) => {
  const [state, setState] = useState<useAxiosState>({
    data: [],
    isError: false,
    isLoading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        const axiosConfig: AxiosRequestConfig = {
          url,
          method: method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          data,
        };
        const response = await axios.request(axiosConfig);
        if (response.status === 200) {
          const data = await response.data;
          setState((prevState) => ({ ...prevState, data }));
        }
      } catch (error) {
        console.error(error);
        setState((prevState) => ({ ...prevState, isError: error }));
      }
    };

    fetchData();
  }, [url, method, headers, data]);

  return state;
};

export { useAxios };
