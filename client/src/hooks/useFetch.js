import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
  // states
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (data) => {
    console.log("inside postData");
    setOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
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
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        console.log(data);
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

    if (options && options.method === "POST") {
      fetchData(options);
    }
    return () => controller.abort();
  }, [url, options, method]);

  return { data, isPending, error, postData };
};