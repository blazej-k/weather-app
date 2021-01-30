type Current = {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: Weather[]
    rain: any,
    snow: any
}

interface Daily{
    dt: number 
    sunrise: number,
    sunset: number,
    temp: {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number
    },
    feels_like: {
        day: number,
        night: number,
        eve: number,
        morn: number
    },
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    weather: Weather[]
    clouds: number,
    pop: number,
    uvi: number
}

type Hourly = {
    dt: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: Weather[]
    pop: number
}