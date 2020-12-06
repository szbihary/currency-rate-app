import CurrencyListItem from "../currency-list-item/CurrencyListItem";
import styles from "./currencyList.module.css";
import countries from "../../mock/countries.json";

const { country: countryList } = countries.countries;

export function filterCountries(countryList, filterString) {
  return countryList.filter(
    (country) =>
      country.currencyCode.includes(filterString) ||
      country.countryName.toLowerCase().includes(filterString.toLowerCase())
  );
}

export function enhanceCountries(countries, fxRates) {
  return countries.map((country) => {
    const fxRate = fxRates.find(
      (rate) => rate.currency === country.currencyCode
    );
    return {
      countryName: country.countryName,
      countryCode: country.countryCode,
      currencyCode: country.currencyCode,
      exchangeRate: fxRate?.exchangeRate?.middle,
    };
  });
}

export default function CurrencyList({ filterText, fxRates }) {
  const filterString = filterText ? filterText.toUpperCase() : "";

  const enhancedCountryList = enhanceCountries(countryList, fxRates);
  const filteredCountries = filterCountries(enhancedCountryList, filterString);

  if (filteredCountries.length === 0) {
    const noResultText = `No currency found: "${filterText}"`;
    return <div className={styles.emptyText}>{noResultText}</div>;
  }

  return filteredCountries.map((enhancedFxRate) => (
    <CurrencyListItem {...enhancedFxRate} key={enhancedFxRate.countryCode} />
  ));
}
