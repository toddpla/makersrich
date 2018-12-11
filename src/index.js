import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import { history } from './routers/AppRouter'
import { firebase, subscribe } from './firebase/firebase'
import { login, logout } from './actions/auth'
import { startOnPlayers } from './actions/players'
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore'

const store = configureStore()

store.dispatch(startOnPlayers())

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
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true
  }
}

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    store.dispatch(login(user.uid))
    subscribe()
    renderApp()
    if (history.location.pathname === '/') {
      history.push('/game')
    }
  } else {
    store.dispatch(logout())
    renderApp()
    history.push('/')
  }
})
