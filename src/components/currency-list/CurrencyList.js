import CurrencyListItem from "../currency-list-item/CurrencyListItem";
import styles from "./currencyList.module.css";

import countries from "../../mock/countries.json";
import fxResult from "../../mock/fx.json";

export default function CurrencyList({ filterText }) {
  const filterString = filterText ? filterText.toUpperCase() : "";
  const { fx: fxRates, baseCurrency } = fxResult;
  const { country: countryList } = countries.countries;

  let filteredFxRates = fxRates.filter((fx) => {
    return (
      !!fx.exchangeRate &&
      (filterString ? fx.currency.includes(filterString) : true)
    );
  });

  const enhancedFxRates = filteredFxRates.map((currency) => {
    const country = countryList.find(
      (country) => country.currencyCode === currency.currency
    );
    return {
      currencyCode: currency.currency,
      currencyName: currency.nameI18N,
      exchangeRate: currency.exchangeRate
        ? 1 / currency.exchangeRate.middle
        : null,
      countryCode: country ? country.countryCode : null,
      countryName: country ? country.countryName : null,
    };
  });

  if (enhancedFxRates.length === 0) {
    const noResultText = `No currency found with "${filterText}".`;
    return <div className={styles.emptyText}>{noResultText}</div>;
  }

  return enhancedFxRates.map((country) => (
    <CurrencyListItem
      {...country}
      key={country.currencyCode}
      baseCurrency={baseCurrency}
    />
  ));
}
