import useWeather from "../hooks/use-weather";
import CityWeatherProps from "../types/city-weather-props";

export default function CityWeather({ city }: CityWeatherProps) {
  const { data, error, loading } = useWeather(city);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (data) {
    return (
      <section className="bg-white flex flex-col justify-center items-center gap-2 rounded-lg w-56 h-64 box-content shadow-lg">
        <h1
          aria-label={"the following is the weather information for: " + city}
          className="font-extrabold text-2xl text-center text-slate-600"
        >
          {city.toUpperCase()}
        </h1>
        <div className="flex flex-col gap-0 items-center justify-center">
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            className="w-28"
            alt="weather representative image"
          />
          <p className="text-lg font-medium text-slate-400">
            {data.weather[0].description.charAt(0).toUpperCase() +
              data.weather[0].description.slice(1)}
          </p>
        </div>
        <p className="text-slate-400 text-sm font-meium">
          Temperature:{" "}
          <span className="font-medium text-4xl text-black">
            {data.main.temp.toFixed(0)} °F
          </span>
        </p>
      </section>
    );
  }

  return null;
}
