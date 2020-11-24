import CurrencyList from "./components/currency-list/CurrencyList";
import SearchBar from "./components/search-bar/SearchBar";
import styles from "./App.module.css";

function App() {
  const appTitle = "George FE Test";
  return (
    <div className={styles.app}>
      <header className={styles.header}>{appTitle}</header>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <CurrencyList />
    </div>
  );
}

export default App;
