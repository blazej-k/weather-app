import React, { FC } from 'react'
import Header from './Page/Header';
import Slider from './Page/Slider';
import WeatherProvider from './Page/weatherComponents/WeatherContext';
import WeatherWrapper from './Page/weatherComponents/WeatherWrapper';

const Page: FC = () => {
    return (
        <>
            <Header />
            <WeatherProvider>
                <WeatherWrapper/>
            </WeatherProvider>
            <Slider />
        </>
    );
}

export default Page;