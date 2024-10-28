# Challenge overview

This challenge specifically consists of:

- Fix a bug.
- Refactor a code.
- Style the UI.
- Ensure accessibility features.
- Test functionality and UI.

Immediately after read the statement and inspect the code, I think the correct order to do this could be and why:

1. Fix the bug. Because nobody wants to work in a wrong code, it is like live in a lie.
2. Refactor the code. I think it is optimal to do this first than do it when I finished all, since the syntax of hooks, states and others may vary between class components and functional components. Additionally, I agree with the refactor, I like more functional programming for components rather than classes.
3. Style the UI. The priority of an MVP is functionality (as long as the interface is minimally usable), therefore, this is one of the last steeps, although, this part will be always the most important to me too since I am the Web UI Developer and is highly related with the next point. Although I agree about have a Figma for each design since is part of the documentation of the project, you only gave me and idea and I appreciate it and the freedom in this point because I think a Web UI Developer should be at least have sense on what looks good or not and know the resources and tools to launch a product minimally presentable and pretty to the final user.
4. Accessibility. Firstly, congrats for including this point in the coding interview, among all the interviews I have been, is the first that evaluates this and tells me you pay attention to all kind of users and details, as me and I like it.
5. Testing. This is the last step because I would like to test both functionality and UI.

# Development process

## 1. Get an API key and read the API docs

### Objectives

I would like first of all ensure myself about:

- The API is working properly and still available.
- The way of use it is the same as given in this starting project.
- The results of the API are in the same format as the applications expects.

### Results

- API key generated and worked properly.
- API saved in the _.env_ file instead directly in the _city-weather.tsx_  file for securirity, reusability and scalability reasons.

## 2. Fix the bug

### Objectives

- Detect exactly what is the bug.
- Detect exactly the root cause of the bug.
- Mainly solve the bug, without worrying about clean code or other functionalities, just solve the root problem.

### Results

- I found that the UI was not managin the delay caused by the API call, so when the data was ready to use, the UI did notice that event.
- Validating that data is received before rendering or show something else while this happens is crucial for preventing runtime errors and ensuring a smooth user experience. 
- This issue arises primarily due to the asynchronous nature of API calls and how React components manage state.

### Issue explanation

When making an API call request is asynchronous since it's nature. In this case while the request is being processed, the component may attempt to render before the data is received. If we try to access properties of weatherResult before it is populated with data, it can lead to errors like "Cannot read properties of null" or "undefined".

For instance, in the original code, we directly access weatherResult.main.temp and weatherResult.weather.description without checking if weatherResult is defined. If the fetch fails or takes time to resolve, this will cause our application to crash or display incorrect information.

### Solution

To fix this issue, we need to make explicitly this call asynchronus and implement a validation check before rendering any dependent data. Here’s how we can do that:

- Conditional Rendering: We should only attempt to render UI elements that depend on weatherResult if it has been successfully fetched. We can use a loading state or simply check if weatherResult is not null.

- Error Handling: Implementing error handling during the fetch process allows us to handle scenarios where the API call fails gracefully.

My innmediate code result to solve this is the following, as I mentioned before, I am purely worring about firstly sove the bug.

```
import React from "react";

// to get api key: https://openweathermap.org/appid
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherResult: any;
}

export default class CityWeather extends React.Component<
  CityWeatherProps,
  CityWeatherState
> {
  public constructor(props) {
    super(props);
    this.state = {
      weatherResult: null,
    };
  }

  public async componentDidMount() {
    const { city } = this.props;
    
    try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ weatherResult: data });
        } catch (error: any) {
            this.setState({ weatherResult: error.message});
        }
    }
    

  public render() {
    const { city } = this.props;
    const { weatherResult } = this.state;
    return (
      <div>
        <h1>{city}</h1>
        <div>
          Temperature: {weatherResult === null ? "Loading..." : KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
        </div>
        <div>Descripiton: {weatherResult === null ? "Loading..." : weatherResult.weather[0].description}</div>
      </div>
    );
  }
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}
```

## 3. Refactor

### Ojectives

When I refactor a code I think always in have as a result:

- Readable code.
- Reusable code.
- Scalable code.
- Easily modifiable code.
- Single responsability commponents and functions.
- Components and functions not overloaded with unnecessary data.

### Results

#### _city-weather-refactor_ file
```
import useWeather from "../hooks/UseWeather";
import CityWeatherProps from "../types/CityWeatherProps";

export default function CityWeather({city}: CityWeatherProps){
    const { data, error, loading } = useWeather(city);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (data) {
        return (
            <div>
                <h1>{city}</h1>
                <div>Temperature: {data.main.temp.toFixed(0)} &#8457;</div>
                <div>Description: {data.weather[0].description}</div>
            </div>
        );
    }

    return null;
};

```

As a result, this component:

- Uses only what it needs.
- Uses a custom hook for the logic that is not properly its own.
- Hanndle all it's possible states.

### Other relevant results:

- UseWeather custom hook: Extends the useReducer hook to properly change the behavior of the component based on all its states, as well as error handling that may be caused by API calls.

- FetchWeatherData: function dedicated to call the API and change the component states, is used by the useWeather hook.

- API state: type used to store each possible state of the API call.

- WeatherDesiredData: interface tha represents the model of the response given by the API, it only contains the data is used.

### _index_ file

```
import { useState } from "react";
import CityWeather from "../components/city-weather-refactor";

export default function IndexPage() {
  const [city, setCity] = useState<string | null>(null);
  const handleFormSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const cityInput = formdata.get("city");

    if (cityInput !== null) {
      setCity(cityInput.toString());
    }
  }  

  return (
    <div className="py-2">
      <form
        className="flex items-center justify-center"
        onSubmit={e => handleFormSumbit(e)}
      >
        <span>Weather Search:</span>{" "}
        <input
          data-testid="weather-input"
          className="ml-2 border px-2 py-1 border-black"
          type="text"
          name="city"
          required
        />
        <button className="ml-2 text-sm border rounded-lg p-2" type="submit">
          Submit
        </button>
      </form>

      {city && (
        <div className="mt-4">
          <CityWeather key={city} city={city} />
        </div>
      )}
    </div>
  );
}


```

As a result, this component:

- Calls the submit form logic with a function.
- Strictly requires an input city in order to evit nulls or unexpected answers.

## 3. Styles

### Objectives

- A UI faithful to the design.
- An attractive, responsive, understandable and easy to use and navigate interface.

### Results

I managed to make the interface faithful to the design for tablets and computers, for mobiles, I made a small change which was to list the form elements vertically so as not to squeeze the horizontal space of the screen and take advantage of the vertical one instead. 

Additionally, it includes some detailed animations to make the user experience more friendly and fluid. 

