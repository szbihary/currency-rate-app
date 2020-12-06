import { render } from "@testing-library/react";
import CurrencyList, {
  enhanceCountries,
  filterCountries,
} from "./CurrencyList";
import mockFxResult from "../../mock/fx.json";

const fxRates = mockFxResult.fx;

describe("CurrencyList component tests", () => {
  it("creates lists items for each fx rate which has exchangeRate property specified", () => {
    const filterText = "";
    const expectedNumberOfListItems = fxRates.filter((fx) => fx.exchangeRate)
      .length;

    const { getAllByTestId } = render(
      <CurrencyList filterText={filterText} fxRates={fxRates} />
    );

    expect(getAllByTestId("list-item").length).toBeLessThanOrEqual(
      fxRates.length
    );
    expect(getAllByTestId("list-item")).toHaveLength(expectedNumberOfListItems);
  });

  it("filters fx rates which contains the provided filterText", () => {
    const filterText = "H";
    const expectedNumberOfListItems = fxRates.filter(
      (fx) => fx.exchangeRate && fx.currency.includes(filterText)
    ).length;

    const { getAllByTestId } = render(
      <CurrencyList filterText={filterText} fxRates={fxRates} />
    );

    expect(getAllByTestId("list-item")).toHaveLength(expectedNumberOfListItems);
  });

  it("enhances fx rate with country name", () => {
    const countryData = {
      countryCode: "HU",
      countryName: "Hungary",
      currencyCode: "HUF",
    };

    const { getByText, getAllByTestId } = render(
      <CurrencyList filterText={countryData.currencyCode} fxRates={fxRates} />
    );

    expect(getAllByTestId("list-item")).toHaveLength(1);

    expect(getByText(countryData.countryName)).toBeInTheDocument();
  });

  describe("enhanceCountiesData test", () => {
    it("should return country enhanced with currency data", () => {
      const testCountry = [
        {
          countryCode: "HU",
          countryName: "Hungary",
          currencyCode: "HUF",
        },
      ];
      const testFxRate = [
        {
          currency: "HUF",
          exchangeRate: {
            middle: 321.45,
          },
        },
      ];

      const result = enhanceCountries(testCountry, testFxRate);

      expect(result).toEqual([
        {
          currencyCode: "HUF",
          exchangeRate: 321.45,
          countryName: "Hungary",
          countryCode: "HU",
        },
      ]);
    });

    it("should return country without exchange rate when no fxRate found", () => {
      const testCountry = [
        {
          countryCode: "HU",
          countryName: "Hungary",
          currencyCode: "HUF",
        },
      ];
      const testFxRate = [];

      const result = enhanceCountries(testCountry, testFxRate);

      expect(result).toEqual([
        {
          currencyCode: "HUF",
          countryName: "Hungary",
          countryCode: "HU",
          exchangeRate: undefined,
        },
      ]);
    });

    it("should return the same exchange rate when multiple countries have the same currency", () => {
      const testCountry = [
        {
          countryCode: "HU",
          countryName: "Hungary",
          currencyCode: "EUR",
        },
        {
          countryCode: "AT",
          countryName: "Austria",
          currencyCode: "EUR",
        },
      ];
      const testFxRate = [
        {
          currency: "EUR",
          exchangeRate: {
            middle: 321.45,
          },
        },
      ];

      const result = enhanceCountries(testCountry, testFxRate);

      expect(result).toEqual([
        {
          currencyCode: "EUR",
          countryName: "Hungary",
          countryCode: "HU",
          exchangeRate: 321.45,
        },
        {
          currencyCode: "EUR",
          countryName: "Austria",
          countryCode: "AT",
          exchangeRate: 321.45,
        },
      ]);
    });
  });
});
describe.only("filterCountries test", () => {
  it("should list countries only which has currencyCode contains the filterString", () => {
    const countryList = [
      {
        currencyCode: "EUR",
        countryName: "Hungary",
        countryCode: "HU",
        exchangeRate: 321.45,
      },
      {
        currencyCode: "EUR",
        countryName: "Austria",
        countryCode: "AT",
        exchangeRate: 321.45,
      },
    ];
    const result = filterCountries(countryList, "EU");

    expect(result).toEqual(countryList);
  });

  it("should list all countries when the filterString is empty", () => {
    const countryList = [
      {
        currencyCode: "HUF",
        countryName: "Hungary",
        countryCode: "HU",
        exchangeRate: 321.45,
      },
      {
        currencyCode: "EUR",
        countryName: "Austria",
        countryCode: "AT",
        exchangeRate: 1.0,
      },
    ];
    const result = filterCountries(countryList, "");

    expect(result).toEqual(countryList);
  });

  it("should list all countries which has countryName contains the filterString", () => {
    const countryList = [
      {
        currencyCode: "HUF",
        countryName: "Hungary",
        countryCode: "HU",
        exchangeRate: 321.45,
      },
      {
        currencyCode: "EUR",
        countryName: "Austria",
        countryCode: "AT",
        exchangeRate: 1.0,
      },
    ];
    const result = filterCountries(countryList, "gary");

    expect(result).toEqual([
      {
        currencyCode: "HUF",
        countryName: "Hungary",
        countryCode: "HU",
        exchangeRate: 321.45,
      },
    ]);
  });
});
