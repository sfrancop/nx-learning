import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import IndexPage from "../pages";

it("should have Weather Search: text", () => {
  render(<IndexPage />);
  const myElement = screen.getByText("Weather Search:");
  expect(myElement).toBeInTheDocument();
});

it("should render the input correctly", () => {
  render(<IndexPage />);
  const inputElement = screen.getByPlaceholderText("Write a city or country");
  expect(inputElement).toBeInTheDocument();
});

it("should render the button correctly", () => {
  render(<IndexPage />);
  const buttonElement = screen.getByText("SUBMIT");
  expect(buttonElement).toBeInTheDocument();
});
