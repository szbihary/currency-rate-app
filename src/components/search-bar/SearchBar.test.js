import { render, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

it("shows input field with given values", () => {
  const mockChangeValue = jest.fn();
  const searchValue = "HUF";

  const { getByPlaceholderText } = render(
    <SearchBar filterText={searchValue} onFilterTextChange={mockChangeValue} />
  );
  const inputNode = getByPlaceholderText("Search by currency");

  expect(inputNode.value).toBe(searchValue);
});

it("triggers event handler on input change of value", async () => {
  const searchValue = "HUF";
  const onChange = jest.fn();

  const { getByPlaceholderText } = render(
    <SearchBar filterText="" onFilterTextChange={onChange} delayedTime={0} />
  );

  const inputNode = getByPlaceholderText("Search by currency");
  fireEvent.change(inputNode, {
    target: { value: searchValue },
  });

  expect(inputNode.value).toBe(searchValue);
  expect(onChange).toBeCalled();
});
