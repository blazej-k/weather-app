import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Page from './components/Page'
import ErrorComponent from './ErrorComponent'

const App: FC = () => {
    return (
        <Router>
            <Switch>
                <Route path='/404' exact component={ErrorComponent} />
                <Route component={Page} />
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

