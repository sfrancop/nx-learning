import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CityWeather from "../components/city-weather-refactor";
import CityWeatherError from "./city-weather-refactor-error";

describe("CityWeather", () => {
  test("renders Loading... text", async () => {
    render(<CityWeather city="london" />);
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  test("renders weather information", async () => {
    render(<CityWeather city="london" />);
    await waitFor(() => {
      expect(screen.getByText("LONDON")).toBeInTheDocument();
      expect(screen.getByText("Temperature:")).toBeInTheDocument();
      expect(screen.getByText(/°F/i)).toBeInTheDocument();
    });
  });

  test("render 400 error message", async () => {
    render(<CityWeather city="ckmnsdkcmnw??" />);
    await waitFor(() => {
      expect(
        screen.getByText(
          "Unfortunately we do not have information for that place."
        )
      ).toBeInTheDocument();
    });
  });

  test("render 401 error message", async () => {
    render(<CityWeatherError city="london" />);
    await waitFor(() => {
      expect(
        screen.getByText("You are not an authorized user for this request.")
      ).toBeInTheDocument();
    });
  });
});
