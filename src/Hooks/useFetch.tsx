import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = <T,>(
  url: string,
  initialState: T
): [T, boolean, boolean, React.Dispatch<React.SetStateAction<T>>] => {
  const [data, setData] = useState<T>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, loading, error, setData];
};

export default useFetch;
