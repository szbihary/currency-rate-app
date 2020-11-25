import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import CurrencyList from "../currency-list/CurrencyList";
import SearchBar from "../search-bar/SearchBar";
import { fetchFxRates } from "../../api/ratesApi";

const QUERY_PATH = "search";
const QUERY_PARAM_KEY = "currency";

const useQuery = () => new URLSearchParams(useLocation().search);

export default function FilterableCurrencyList() {
  const query = useQuery();
  const history = useHistory();

  const paramValue = query.get(QUERY_PARAM_KEY) || "";

  const [filterText, setFilterText] = useState(paramValue);
  useEffect(() => setFilterText(paramValue), [paramValue]);

  const [fxRates, setFxRates] = useState([]);
  useEffect(() => fetchFxRates().then((data) => setFxRates(data.fx)), []);

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

  return (
    <>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={handleFilterTextChange}
      />
      <CurrencyList filterText={filterText} fxRates={fxRates} />
    </>
  );
}
