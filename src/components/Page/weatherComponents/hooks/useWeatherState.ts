import { useReducer } from "react"

const initState: WeatherState = {
    loading: false,
    error: '',
    isWeather: false
}

const LOADING = 'loading'
const ERROR = 'error'
const SET_WEATHER = 'set_weather'
const CLEAR_STATE = 'celar_state'
const CLEAR_ERROR = 'celar_error'

interface WeatherActions {
    type: typeof LOADING | typeof ERROR | typeof SET_WEATHER | typeof CLEAR_STATE | typeof CLEAR_ERROR,
    payload?: string
}

const weatherStateReducer = (state: WeatherState, action: WeatherActions) => {
    switch (action.type) {
        case LOADING:
            return state = { loading: true, error: '', isWeather: false }
        case ERROR:
            return state = { loading: false, error: action.payload, isWeather: false }
        case SET_WEATHER:
            return state = { loading: false, error: '', isWeather: true }
        case CLEAR_STATE:
            return state = { loading: false, error: '', isWeather: false }
        case CLEAR_ERROR:
            return state = { ...state, error: '' }
        default:
            return state
    }
}

const useWeatherState = () => {
    const [weatherState, setWeatherState] = useReducer(weatherStateReducer, initState)

    const getCurrentWeather = async(ENDPOINT: string) => {
        const currentWeather = await fetch(ENDPOINT)
            .then(res => res.json())
            .then((res: OneCallWeatherObj) => {
                setWeatherState({ type: SET_WEATHER })
                return res
            })
        return currentWeather
    }

    return { weatherState, setWeatherState, getCurrentWeather }
}

export { useWeatherState, LOADING, ERROR, CLEAR_STATE, CLEAR_ERROR }