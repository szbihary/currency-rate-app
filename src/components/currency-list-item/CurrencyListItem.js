import styles from "./currencyListItem.module.css";
import { BASE_CURRENCY } from "../../config";

function Flag({ countryCode }) {
  const onError = (i) => {
    i.target.style.display = "none";
  };

  if (countryCode) {
    const flagURL = `./flags/${countryCode.toLowerCase()}.png`;
    return (
      <img
        data-testid="flag"
        className={styles.flagImage}
        alt=""
        src={flagURL}
        onError={onError}
      />
    );
  }
  return "";
}

export default function CurrencyListItem(props) {
  const {
    countryCode,
    countryName,
    currencyCode,
    currencyName,
    exchangeRate,
  } = props;

  const countryString = countryName ? countryName : "-";
  return (
    <div className={styles.container} data-testid="list-item">
      <div className={styles.flag}>
        <Flag countryCode={countryCode} />
      </div>
      <div
        className={styles.currencyCode}
        title={currencyName ? currencyName : currencyCode}
      >
        {currencyCode}
      </div>
      <div className={styles.countryName} title={countryString}>
        {countryString}
      </div>
      <div className={styles.rate}>
        {exchangeRate ? exchangeRate.toFixed(4) : "-"}
      </div>
      <div className={styles.baseCurrency}>{BASE_CURRENCY}</div>
    </div>
  );
}
