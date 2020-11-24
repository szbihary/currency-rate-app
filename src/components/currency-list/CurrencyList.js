import CurrencyListItem from "../currency-list-item/CurrencyListItem";

import countries from "../../mock/countries.json";
import fxResult from "../../mock/fx.json";

export default function CurrencyList({ filterText }) {
  const filterString = filterText.toUpperCase();
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
      exchangeRate: currency.exchangeRate
        ? 1 / currency.exchangeRate.middle
        : null,
      countryCode: country ? country.countryCode : null,
      countryName: country ? country.countryName : null,
    };
  });

  return enhancedFxRates.map((country) => (
    <CurrencyListItem
      {...country}
      key={country.currencyCode}
      baseCurrency={baseCurrency}
    />
  ));
}
