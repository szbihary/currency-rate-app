import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component tests", () => {
  it("renders header title", () => {
    render(<App />);
    const titleElement = screen.getByText(/George FE Test/i);
    expect(titleElement).toBeInTheDocument();
  });
});
