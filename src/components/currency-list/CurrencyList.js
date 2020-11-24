import CurrencyListItem from "../currency-list-item/CurrencyListItem";
import countries from "../../mock/countries.json";
import fxResult from "../../mock/fx.json";

const { fx: fxRates, baseCurrency } = fxResult;
const { country: countryList } = countries.countries;

const enhancedFxRates = fxRates
  .filter((fx) => fx.exchangeRate)
  .map((currency) => {
    const country = countryList.find(
      (country) => country.currencyCode === currency.currency
    );
    return {
      currencyCode: currency.currency,
      exchangeRate: currency.exchangeRate ? currency.exchangeRate.middle : null,
      countryCode: country ? country.countryCode : null,
      countryName: country ? country.countryName : null,
    };
  });
// .filter(fxRateItem) => fxRateItem.);

export default function CurrencyList(props) {
  return enhancedFxRates.map((country) => (
    <CurrencyListItem
      {...country}
      key={country.currencyCode}
      baseCurrency={baseCurrency}
    />
  ));
}
