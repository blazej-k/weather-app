type OneCallWeatherObj = {
    lon: number,
    lat: number,
    timezone: string,
    timezone_offset: number,
    current: Current,
    hourly: Hourly[]
    daily: Daily[]
    alerts: [
        {
            sender_name: string,
            event: string,
            start: number,
            end: number,
            description: string
        },
    ]
}