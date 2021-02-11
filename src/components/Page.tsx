import React, { FC } from 'react'
import Footer from './Page/Footer';
import Header from './Page/Header';
import Slider from './Page/Slider';
import WeatherProvider from './Page/weatherComponents/WeatherContext';
import WeatherWrapper from './Page/weatherComponents/WeatherWrapper';

const Page: FC = () => {
    return (
        <>
            <Header />
            <Slider />
            <WeatherProvider>
                <WeatherWrapper/>
            </WeatherProvider>
            <Footer/>
        </>
    );
}

export default Page;