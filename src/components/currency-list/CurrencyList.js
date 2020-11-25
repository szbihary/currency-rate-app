import CurrencyListItem from "../currency-list-item/CurrencyListItem";
import styles from "./currencyList.module.css";
import countries from "../../mock/countries.json";

const { country: countryList } = countries.countries;

function filterFxRates(fxRates, filterString) {
  return fxRates.filter((fx) => {
    return (
      !!fx.exchangeRate &&
      (filterString ? fx.currency.includes(filterString) : true)
    );
  });
}

function enhanceFxRates(fxRates) {
  return fxRates.map((currency) => {
    const country = countryList.find(
      (country) => country.currencyCode === currency.currency
    );
    return {
      currencyCode: currency.currency,
      currencyName: currency.nameI18N,
      exchangeRate: currency.exchangeRate
        ? 1 / currency.exchangeRate.middle // middle rate is used
        : null,
      countryCode: country ? country.countryCode : null,
      countryName: country ? country.countryName : null,
    };
  });
}

export default function CurrencyList({ filterText, fxRates }) {
  const filterString = filterText ? filterText.toUpperCase() : "";

  const filteredFxRates = filterFxRates(fxRates, filterString);
  const enhancedFxRates = enhanceFxRates(filteredFxRates);

  if (enhancedFxRates.length === 0) {
    const noResultText = `No currency found: "${filterText}"`;
    return <div className={styles.emptyText}>{noResultText}</div>;
  }

  return enhancedFxRates.map((enhancedFxRate) => (
    <CurrencyListItem {...enhancedFxRate} key={enhancedFxRate.currencyCode} />
  ));
}
