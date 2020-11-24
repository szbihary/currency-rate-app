import styles from "./currencyListItem.module.css";

export default function CurrencyListItem(props) {
  const {
    countryCode,
    countryName,
    currencyCode,
    exchangeRate,
    baseCurrency,
  } = props;
  const flagURL = `./flags/${countryCode.toLowerCase()}.png`;
  return (
    <div className={styles.container}>
      <img alt={countryCode} src={flagURL} />
      <div>{currencyCode}</div>
      <div>{countryName}</div>
      <div>{`${exchangeRate} ${baseCurrency}`}</div>
    </div>
  );
}
