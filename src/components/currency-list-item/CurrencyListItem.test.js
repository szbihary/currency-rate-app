import { render } from "@testing-library/react";
import CurrencyListItem from "./CurrencyListItem";
import { BASE_CURRENCY } from "../../config";

describe("CurrencyListItem component tests", () => {
  const testData = {
    currencyCode: "NOK",
    currencyName: "Norwegian Krone",
    exchangeRate: 0.095,
    countryName: "Norway",
  };

  it("shows currencyCode, country name, exchange rate, base currency", () => {
    const { getByText, getByTitle } = render(
      <CurrencyListItem {...testData} />
    );

    expect(getByText(testData.currencyCode)).toBeInTheDocument();
    expect(getByTitle(testData.currencyName)).toBeInTheDocument();
    expect(getByText(testData.countryName)).toBeInTheDocument();
    expect(getByText(testData.exchangeRate.toFixed(4))).toBeInTheDocument();
    expect(getByText(BASE_CURRENCY)).toBeInTheDocument();
  });

  it("shows flag image when countryCode is provided", () => {
    const { getByTestId } = render(
      <CurrencyListItem {...testData} countryCode="NO" />
    );

    expect(getByTestId("flag")).toBeInTheDocument();
  });

  it("does not show flag image when countryCode is not provided", () => {
    const { queryByTestId } = render(<CurrencyListItem {...testData} />);

    expect(queryByTestId("flag")).toBeNull();
  });
});
