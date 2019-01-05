import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Launch from './core/Launch'
import App from './core/App'

const Routes = ({ history }) => (
  <Switch>
    <Route path='/app' component={App} />
    <Route path='/' component={Launch} />
  </Switch>
)

export default Routes
