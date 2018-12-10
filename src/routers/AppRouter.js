import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import LoginPage from '../components/LoginPage'
import GamePage from '../components/GamePage'
import AddPlayerPage from '../components/AddPlayerPage'
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <div className="container-fluid">
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}/>
        <PrivateRoute path="/add-player" component={AddPlayerPage} />
        <PrivateRoute path="/game" component={GamePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;
