import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import LoginPage from '../components/LoginPage'
import AddQuestionPage from '../components/quiz/AddQuestionPage'
import Quiz from '../components/quiz/Quiz'
import GamePage from '../components/GamePage'
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <div className="container-fluid">
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}/>
        <PrivateRoute path="/quiz" component={Quiz} exact={true}/>
        <PrivateRoute path="/add-question" component={AddQuestionPage} exact={true}/>
        <PrivateRoute path="/game" component={GamePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;
