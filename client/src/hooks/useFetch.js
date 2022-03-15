import { useState, useEffect } from "react";

export const useFetch = (url, method) => {
  // states
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (data) => {
    setOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  const useGetData = () => {
    const getData = () => {
      const { token } = JSON.parse(localStorage.getItem("userData"));
      setOptions({
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
    };
    useEffect(() => {
      getData();
    }, []);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);
      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg);
        }

        setIsPending(false);
        setData(data);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          setIsPending(false);
          console.log("fetch was aborted");
        } else {
          setIsPending(false);
          setError(error.message);
        }
      }
    };

    if (options) {
      fetchData(options);
    }
    return () => controller.abort();
  }, [url, options]);

  return { data, isPending, error, postData, useGetData };
};
