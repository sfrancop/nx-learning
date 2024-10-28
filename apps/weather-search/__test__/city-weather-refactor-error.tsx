import useWeather from "./use-weather-error";
import CityWeatherProps from "../types/city-weather-props";

export default function CityWeatherError({ city }: CityWeatherProps) {
  const { data, error, loading } = useWeather(city);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (data) {
    return (
      <article
        role="article"
        className="bg-white flex flex-col justify-center items-center p-4 gap-4 rounded-lg w-60 h-80 shadow-lg"
      >
        <h1
          aria-label={"the following is the weather information for: " + city}
          className="font-bold text-4xl text-center"
        >
          {city.toUpperCase()}
        </h1>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          className="w-20 h-20"
          alt="weather representative image"
        />
        <p>
          {data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1)}
        </p>
        <p>
          Temperature:
          <span className="font-bold text-4xl">
            {data.main.temp.toFixed(0)}°F
          </span>
        </p>
      </article>
    );
  }

  return null;
}
