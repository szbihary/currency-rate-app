import styles from "./searchBar.module.css";

const searchLabel = "Search";
const placeholder = "Search by currency";

export default function SearchBar(props) {
  const handleFilterTextChange = (e) => {
    props.onFilterTextChange(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputHeader}>{searchLabel}</div>
      <input
        type="text"
        className={styles.input}
        value={props.filterText}
        onChange={handleFilterTextChange}
        placeholder={placeholder}
      />
    </div>
  );
}
