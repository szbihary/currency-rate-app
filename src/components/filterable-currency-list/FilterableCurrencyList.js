import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import CurrencyList from "../currency-list/CurrencyList";
import SearchBar from "../search-bar/SearchBar";

function FilterableCurrencyList() {
  const { param1 } = useParams();
  const [filterText, setFilterText] = useState(param1);

  useEffect(() => setFilterText(param1), [param1]);

  const history = useHistory();

  return (
    <>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={(value) => {
          history.replace("/" + value);
        }}
      />
      <CurrencyList filterText={filterText} />
    </>
  );
}

export default function RoutedCurrencyList() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}:param1?`} component={FilterableCurrencyList} />
    </Switch>
  );
}
