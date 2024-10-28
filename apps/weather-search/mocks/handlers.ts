import { rest } from "msw";
import { API_KEY } from "../constants/api";
export const handlers = [
  rest.get(
    `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${API_KEY}&units=imperial`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          weather: [{ icon: "10d", description: "light rain" }],
          main: { temp: 68 },
        })
      );
    }
  ),
];
