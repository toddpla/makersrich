import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import { history } from './routers/AppRouter'
import { firebase, subscribe } from './firebase/firebase'
import { startLogin, logout } from './actions/auth'
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore'
import {startSetQuestions} from './actions/questions'
import { startSetOpponents, startOnOpponents } from './actions/opponents'
import { addPlayer } from './actions/players'
import database from './firebase/firebase'

import Quiz from './components/quiz/Quiz'

export const store = configureStore()

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

let hasRendered = false;
const renderApp = (user) => {
  if(!hasRendered) {
    store.dispatch(startLogin(user.uid)).then(() => {
      // store.dispatch(startOnOpponents())
      store.dispatch(startSetOpponents()).then(() => {
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true
      })
    })
  }
}

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    renderApp(user)
    if (history.location.pathname === '/') {
      history.push('/game')
    }
  } else {
    store.dispatch(logout())
    renderApp()
    history.push('/')
  }
})
