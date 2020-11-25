import styles from "./searchBar.module.css";
import { DebounceInput } from "react-debounce-input";

const searchLabel = "Search";
const placeholder = "Search by currency";
const DEBOUNCE_TIMEOUT = 150; // ms

export default function SearchBar(props) {
  const handleFilterTextChange = (event) => {
    props.onFilterTextChange(event.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputHeader}>{searchLabel}</div>
      <DebounceInput
        debounceTimeout={DEBOUNCE_TIMEOUT}
        className={styles.input}
        value={props.filterText}
        onChange={handleFilterTextChange}
        placeholder={placeholder}
      />
    </div>
  );
}
