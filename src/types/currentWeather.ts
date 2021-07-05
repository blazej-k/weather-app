interface WeatherObj {
  coord: {
    lon: number,
    lat: number
  },
  weather: Weather[],
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level?: number,
    grnd_level?: number
  },
  visibility: number,
  wind: {
    speed: number,
    deg: number,
    gust?: number
  },
  clouds: {
    all: number
  },
  snow?: SnowOrRain,
  rain?: SnowOrRain,
  dt: number,
  sys: {
    interface: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
  },
  timezone: number,
  id: number,
  name: string,
  cod: number
}

interface Weather {
  id: number,
  main: string,
  description: string,
  icon: string
}

interface SnowOrRain {
  h_1: number,
  h_3: number,
}

interface WeatherState {
  loading: boolean,
  error: boolean,
  isWeather: boolean
}

