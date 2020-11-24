import FilterableCurrencyList from "./components/filterable-currency-list/FilterableCurrencyList";
import styles from "./App.module.css";

const appTitle = "George FE Test";

function App() {
  return (
    <>
      <header className={styles.appTitle}>{appTitle}</header>
      <FilterableCurrencyList />
    </>
  );
}

export default App;
