import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type Options = {
  url: string | (() => string);
  method?: AxiosRequestConfig['method'];
  auto?: boolean;
};

type Response<T> = [
  {
    loading: boolean;
    data: null | T;
    error: any;
  },
  (data?: { [key: string]: any } | any[]) => Promise<any>
];

export default function useApi<T>({
  url,
  method = 'get',
  auto = true,
}: Options): Response<T> {
  const [state, setState] = useState({
    error: null,
    loading: auto,
    data: null,
    initialLoad: true,
  });
  const request = (data?: { [key: string]: any } | any[]) => {
    setState({ ...state, loading: auto });

    return new Promise(async (resolve, reject) => {
      try {
        const resp = (
          await axios({
            url: `/api/proxy${typeof url === 'function' ? url() : url}`,
            method,
            data,
          })
        ).data;
        setState({ ...state, loading: false, data: resp, initialLoad: false });
        resolve(resp);
      } catch (error) {
        setState({ ...state, loading: false, error, initialLoad: false });
        reject(error);
      }
    });
  };

  if (auto) {
    useEffect(() => {
      if (state.initialLoad) {
        request();
      }
    }, []);
  }

  return [
    { data: state.data, loading: state.loading, error: state.error },
    request,
  ];
}
