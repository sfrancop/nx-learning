import WeatherDesiredData from "./weather-desired-data";

export default interface CityWeatherState {
  data: WeatherDesiredData | null;
  error: string | null;
  loading: boolean;
}
