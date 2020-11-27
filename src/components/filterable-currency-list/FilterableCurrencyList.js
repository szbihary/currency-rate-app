import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import CurrencyList from "../currency-list/CurrencyList";
import SearchBar from "../search-bar/SearchBar";
import styles from "./filterableCurrencyList.module.css";
import mockFxResult from "../../mock/fx.json";
// import { useFetch } from "../../api/apiUtils";
// import { RATES_API_BASE_URL } from "../../config";

const QUERY_PATH = "search";
const QUERY_PARAM_KEY = "currency";

const useQuery = () => new URLSearchParams(useLocation().search);

export default function FilterableCurrencyList() {
  const query = useQuery();
  const history = useHistory();

  const paramValue = query.get(QUERY_PARAM_KEY) || "";

  const [filterText, setFilterText] = useState(paramValue);
  useEffect(() => setFilterText(paramValue), [paramValue]);

  // const { data, loading, error } = useFetch(RATES_API_BASE_URL);
  // use mock data
  const { data, loading, error } = {
    data: mockFxResult,
    loading: false,
    error: {},
  };
  const fxRates = data.fx || [];

  const handleFilterTextChange = (value) => {
    let newURL;
    if (value === "") {
      newURL = "/";
    } else {
      newURL = qs.stringifyUrl({
        url: `/${QUERY_PATH}`,
        query: { [QUERY_PARAM_KEY]: value },
      });
    }
    history.replace(newURL);
  };

  if (loading) {
    return <div className={styles.info}>Loading...</div>;
  }
  if (error.message) {
    const errorMessage = `ERROR: Fetching data failed with error: "${error.message}"`;
    return (
      <div className={`${styles.info} ${styles.error}`}>{errorMessage}</div>
    );
  }
  return (
    <>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={handleFilterTextChange}
        delayedTime={150}
      />
      <CurrencyList filterText={filterText} fxRates={fxRates} />
    </>
  );
}
