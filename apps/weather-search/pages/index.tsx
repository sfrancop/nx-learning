import { useState } from "react";
import CityWeather from "../components/city-weather-refactor";

export function Index() {

  const [city, setCity] = useState<string | null>(null);
  const handleFormSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const cityInput = formdata.get("city");

    if (cityInput !== null) {
      setCity(cityInput.toString());
    }
  };

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="w-screen h-screen bg-slate-200 flex justify-center items-center flex-col overflow-scroll">
      <form
        className="flex flex-col items-center justify-center sm:flex-row"
        onSubmit={(e) => handleFormSumbit(e)}
      >
        <label htmlFor="city" className="font-bold mb-4 sm:mb-0">
          Weather Search:
        </label>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-0">
          <input
            className="ml-2 border px-2 py-1 border-slate-300 rounded-lg h-12 transition-colors duration-300 focus:outline-none focus:border-sky-700 sm:border-r-0 sm:rounded-r-none sm:border-1"
            type="text"
            id="city"
            name="city"
            placeholder="Write a city or country"
            required
          />
          <button
            role="button"
            name="submit"
            aria-label="now you are in the button wich executes your search, if you already wrote a city o country press enter to execute your search, if not, press control option left arrow to got to the input box and then come back here pressing the tab key"
            className="h-12 text-sm border rounded-lg p-2 px-3 bg-sky-700 text-white font-bold focus:outline-none focus:bg-sky-500 hover:bg-sky-600 transition-colors duration-300 active:bg-sky-400 sm:border-none sm:rounded-l-none"
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </form>

      {city && (
        <div
          aria-atomic="true"
          className="mt-12"
          aria-live="assertive"
          role="region"
        >
          <CityWeather key={city} city={city} />
        </div>
      )}
    </div>
  );
}

export default Index;
