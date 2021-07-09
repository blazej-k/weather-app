import React, { FC, lazy, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Aos from 'aos'
import MetaTags from 'react-meta-tags'
import * as faviconIco from './assets/images/logo.png'
import 'aos/dist/aos.css';
import './style/main.scss';
import { Suspense } from 'react'

const Page = lazy(() => import('./components/Page'))


const App: FC = () => {

    useEffect(() => {
        Aos.init()
    }, [])

    return (
        <>
            <MetaTags>
                <title>WeatherMe</title>
                <meta name="description" content="Modern website that allows you to check weather in any place that you want!" />
                <meta name='keywords' content='weatherMe, weather, rain, sun, holiday, temperature, snow, forecast, weather statistics' />
                <meta name="author" content="Błazej Kania" />
                <meta charSet="utf-8" />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <link rel="shortcut icon" href={faviconIco} />
            </MetaTags>
            <Suspense fallback={<p>loading</p>}>
                <Page />
            </Suspense>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

module.hot.accept()

