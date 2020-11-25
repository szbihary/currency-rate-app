import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import CurrencyList from "../currency-list/CurrencyList";
import SearchBar from "../search-bar/SearchBar";

const QUERY_PATH = "search";
const QUERY_PARAM_KEY = "currency";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FilterableCurrencyList() {
  const query = useQuery();
  const paramValue = query.get(QUERY_PARAM_KEY) || "";

  const [filterText, setFilterText] = useState(paramValue);

  useEffect(() => setFilterText(paramValue), [paramValue]);

  const history = useHistory();

  return (
    <>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={(value) => {
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
        }}
      />
      <CurrencyList filterText={filterText} />
    </>
  );
}
