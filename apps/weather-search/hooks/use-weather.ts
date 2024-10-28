import { useReducer, useEffect } from "react";
import fetchWeatherData from "../utils/fetch-weather-data";
import { ApiState } from "../types/api-state";
import CityWeatherState from "../types/city-weather-state";

const reducer = (
  state: CityWeatherState,
  action: ApiState
): CityWeatherState => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, data: null, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

const useWeather = (city: string) => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    if (city) {
      fetchWeatherData(city, dispatch);
    }
  }, [city]);

  return state;
};

export default useWeather;
