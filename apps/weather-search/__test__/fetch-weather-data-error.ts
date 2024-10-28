import { API_KEY } from "../constants/api";
import { API_RESPONSES } from "../constants/api";
import { ApiState } from "../types/api-state";

const fetchWeatherData = async (
  city: string,
  dispatch: React.Dispatch<ApiState>
) => {
  dispatch({ type: "FETCH_INIT" });

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${""}&units=imperial`
    );

    if (!response.ok) {
      const statusCode = response.status;
      if (statusCode in API_RESPONSES) {
        throw new Error(API_RESPONSES[statusCode]);
      } else if (Number(statusCode.toString().charAt(0)) in API_RESPONSES) {
        throw new Error(API_RESPONSES[Number(statusCode.toString().charAt(0))]);
      }
      throw new Error(API_RESPONSES[0]);
    }

    const data = await response.json();
    dispatch({ type: "FETCH_SUCCESS", payload: data });
  } catch (error) {
    if (error instanceof Error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }
};

export default fetchWeatherData;
