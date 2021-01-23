import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Page from './components/Page'
import ErrorComponent from './components/ErrorComponent'

const App: FC = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Page} />
                <Route component={ErrorComponent} />
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

module.hot.accept()

