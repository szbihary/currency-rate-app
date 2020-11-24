import CurrencyListItem from "../currency-list-item/CurrencyListItem";
import countries from "../../mock/countries.json";
import fxResult from "../../mock/fx.json";

const { fx, baseCurrency } = fxResult;
const { country: countryList } = countries.countries;

// const data = [
//   {
//     countryCode: "AD",
//     countryName: "Andorra",
//     currencyCode: "EUR",
//     exchangeRate: "1.0",
//   },
//   {
//     countryCode: "US",
//     countryName: "United States",
//     currencyCode: "USD",
//     exchangeRate: "1.05",
//   },
// ];

const items = fx.map((currency) => {
  const country = countryList.find(
    (country) => country.currencyCode === currency.currency
  );
  return {
    currencyCode: currency.currency,
    exchangeRate: currency.exchangeRate ? currency.exchangeRate.middle : "N/A",
    countryCode: country ? country.countryCode : "N/A",
    countryName: country ? country.countryName : "N/A",
  };
});

export default function CurrencyList(props) {
  return items.map((country) => (
    <CurrencyListItem
      {...country}
      key={country.currencyCode}
      baseCurrency={baseCurrency}
    />
  ));
}
