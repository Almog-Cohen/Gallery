import { useState, useEffect } from "react";
import axios from "axios";

export default function useList(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        if (!response.status === 200) {
          throw Error("Could not load this page");
        }
        setData(response.data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        setIsPending(false);
        setError(error.message);
        console.log(error.message);
      });
  }, [url]);
  return { data, isPending, error };
}
