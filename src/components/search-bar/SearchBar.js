import styles from "./searchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputHeader}>Search</div>
      <input type="text" className={styles.input} />
    </div>
  );
}
