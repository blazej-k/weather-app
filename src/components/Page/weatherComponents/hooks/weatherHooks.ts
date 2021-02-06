import { UpdateWeatherContext, WeatherContext } from "../WeatherContext";
import { useContext } from "react";

export const useWeather = () => useContext(WeatherContext)
export const useUpdateWeather = () => useContext(UpdateWeatherContext)