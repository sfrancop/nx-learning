import React from "react";
import WeatherDesiredData from "../types/weather-desired-data";

// to get api key: https://openweathermap.org/appid
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherResult: null | WeatherDesiredData | string;
}

export default class CityWeather extends React.Component<
  CityWeatherProps,
  CityWeatherState
> {
  public constructor(props: CityWeatherProps) {
    super(props);
    this.state = {
      weatherResult: null,
    };
  }

  public async componentDidMount() {
    const { city } = this.props;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this.setState({ weatherResult: data });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ weatherResult: error.message });
      }
    }
  }

  public render() {
    const { city } = this.props;
    const { weatherResult } = this.state;

    const isWeatherData = (data: any): data is WeatherDesiredData => {
      return data && typeof data === "object" && "main" in data;
    };

    let temperatureDisplay;
    let descriptionDisplay;

    if (weatherResult === null) {
      temperatureDisplay = "Loading...";
      descriptionDisplay = "Loading...";
    } else if (isWeatherData(weatherResult)) {
      temperatureDisplay = KtoF(weatherResult.main.temp).toFixed(0) + " °F";
      descriptionDisplay = weatherResult.weather[0].description;
    } else {
      temperatureDisplay = "Error: " + weatherResult;
      descriptionDisplay = "Error: " + weatherResult;
    }

    return (
      <div>
        <h1>{city}</h1>
        <div>Temperature: {temperatureDisplay}</div>
        <div>Description: {descriptionDisplay}</div>
      </div>
    );
  }
}

function KtoF(tempKelvin: number) {
  return ((tempKelvin - 273.15) * 9) / 5 + 32;
}
