import { useReducer } from "react"

const initState: WeatherState = {
    loading: false,
    error: false,
    isWeather: false
}

const LOADING = 'loading'
const ERROR = 'error'
const SET_WEATHER = 'set_weather'
const CLEAR_STATE = 'celar_state'
const CLEAR_ERROR = 'celar_error'

interface WeatherActions {
    type: typeof LOADING | typeof ERROR | typeof SET_WEATHER | typeof CLEAR_STATE | typeof CLEAR_ERROR,
}

const weatherStateReducer = (state: WeatherState, action: WeatherActions) => {
    switch (action.type) {
        case LOADING:
            return state = { loading: true, error: false, isWeather: false }
        case ERROR:
            return state = { loading: false, error: true, isWeather: false }
        case SET_WEATHER:
            return state = { loading: false, error: false, isWeather: true }
        case CLEAR_STATE:
            return state = { loading: false, error: false, isWeather: false }
        case CLEAR_ERROR:
            return state = { ...state, error: false }
        default:
            return state
    }
}

const useWeatherState = () => {
    const [weatherState, setWeatherState] = useReducer(weatherStateReducer, initState)

    const getCurrentWeather = async(ENDPOINT: string) => {
        setWeatherState({ type: LOADING })
        const currentWeather = await fetch(ENDPOINT)
            .then(res => res.json())
            .then((res: OneCallWeatherObj) => {
                setWeatherState({ type: SET_WEATHER })
                return res
            })
            .catch(() => {
                setWeatherState({ type: ERROR })
                throw new Error('Sorry, there is some problem. Try later')
            })
        return currentWeather
    }

    return { weatherState, setWeatherState, getCurrentWeather }
}

export { useWeatherState, LOADING, ERROR, CLEAR_STATE, CLEAR_ERROR }