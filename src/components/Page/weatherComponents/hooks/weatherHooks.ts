import { WeatherContext } from "../WeatherContext";
import { useContext } from "react";

export const useWeather = () => useContext(WeatherContext)