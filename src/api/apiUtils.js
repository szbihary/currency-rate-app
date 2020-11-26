import { useState, useEffect } from "react";

async function handleResponse(response) {
  if (!response.ok) {
    throw Error(`Response status code: ${response.status}`);
  }
  return await response.json();
}

function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}

export const useRequest = (initUrl) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(initUrl)
          .then(handleResponse)
          .catch(handleError);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [initUrl]);

  return { data, loading, error };
};
