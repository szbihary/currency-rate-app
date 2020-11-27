import { render } from "@testing-library/react";
import CurrencyList from "./CurrencyList";
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
});
