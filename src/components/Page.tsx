import React, { FC } from 'react'
import Header from './Header';
import Slider from './Slider';
import WeatherWrapper from './weatherComponents/WeatherWrapper';

const Page: FC = () => {
    return (
        <>
            <Header />
            <Slider />
            <WeatherWrapper/>
        </>
    );
}

export default Page;