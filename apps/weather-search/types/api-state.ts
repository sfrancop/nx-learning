import WeatherDesiredData from "./weather-desired-data";

export type ApiState =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: WeatherDesiredData }
  | { type: "FETCH_ERROR"; payload: string };
