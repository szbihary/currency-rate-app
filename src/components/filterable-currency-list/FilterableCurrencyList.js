import { useState } from "react";
import CurrencyList from "../currency-list/CurrencyList";
import SearchBar from "../search-bar/SearchBar";

function FilterableCurrencyList() {
  const [filterText, setFilterText] = useState("");

  return (
    <>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={(value) => setFilterText(value)}
      />
      <CurrencyList filterText={filterText} />
    </>
  );
}

export default FilterableCurrencyList;
