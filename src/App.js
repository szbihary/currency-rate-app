import FilterableCurrencyList from "./components/filterable-currency-list/FilterableCurrencyList";
import styles from "./App.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const appTitle = "George FE Test";

function App() {
  return (
    <>
      <header className={styles.appTitle}>{appTitle}</header>
      <Router>
        <Switch>
          <Route path="/" component={FilterableCurrencyList} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
