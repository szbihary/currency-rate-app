import styles from "./searchBar.module.css";
import { DebounceInput } from "react-debounce-input";

const searchLabel = "Search";
const placeholder = "Search by currency";

export default function SearchBar({
  filterText,
  onFilterTextChange,
  delayedTime,
}) {
  const handleFilterTextChange = (event) => {
    onFilterTextChange(event.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputHeader}>{searchLabel}</div>
      <DebounceInput
        debounceTimeout={delayedTime}
        className={styles.input}
        value={filterText}
        onChange={handleFilterTextChange}
        placeholder={placeholder}
      />
    </div>
  );
}
