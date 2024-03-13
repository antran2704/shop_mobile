import { useState, useEffect } from "react";

const useDebounce = (value, timer) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const hanlder = setTimeout(() => {
      setData(value);
    }, timer);

    return () => clearTimeout(hanlder);
  }, [value, timer]);

  return data;
};

export default useDebounce;
