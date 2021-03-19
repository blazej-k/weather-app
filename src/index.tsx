import React, { FC, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Page from './components/Page'
import Aos from 'aos'
import 'aos/dist/aos.css';
import './style/main.scss';


const App: FC = () => {

    useEffect(() => {
        Aos.init()
    }, [])

    return (
        <Page/>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

module.hot.accept()

