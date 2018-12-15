import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import { history } from './routers/AppRouter'
import database, { firebase } from './firebase/firebase'
import { startLogin, logout } from './actions/auth'
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore'
import {startSetQuestions} from './actions/questions'
import { startSetOpponents, startOnOpponents } from './actions/opponents'
import LoadingPage from './components/LoadingPage'


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

// ReactDOM.render(<LoadingPage />, document.getElementById('root'));

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

let hasLoadedData = false;
const loadFirebaseData = (user) => {
  if(!hasLoadedData) {
    store.dispatch(startLogin(user.uid)).then(() => {
      store.dispatch(startSetOpponents()).then(() => {
        renderApp()
        hasLoadedData = true
      })
    })
  }
}

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    loadFirebaseData(user)
    if (history.location.pathname === '/') {
      history.push('/game')
    }
  } else {
    store.dispatch(logout())
    renderApp()
    history.push('/')
  }
})
