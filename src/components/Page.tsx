import React, { FC } from 'react'
import Header from './Page/Header';
import Slider from './Page/Slider';
import WeatherWrapper from './Page/weatherComponents/WeatherWrapper';

const Page: FC = () => {
    return (
        <>
            <Header />
            <WeatherWrapper/>
            <Slider />
        </>
    );
}

export default Page;