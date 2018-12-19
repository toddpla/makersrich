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
import { startOnAddOpponent, startOnRemoveOpponent } from './actions/opponents'
import { startOnBattle} from './actions/battle'
import { startOnMessages} from './actions/messages'
import { startOnEgg } from './actions/egg'
// import LoadingPage from './components/LoadingPage'
import Modal from 'react-modal'

export const store = configureStore()

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

serviceWorker.unregister();

// ReactDOM.render(<LoadingPage />, document.getElementById('root'));

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    Modal.setAppElement('#root')
    hasRendered = true;
  }
};

let hasLoadedData = false;
const loadFirebaseData = (user) => {
  if(!hasLoadedData) {
    subscribe()
    store.dispatch(startLogin(user.uid)).then(() => {
      store.dispatch(startOnAddOpponent())
      store.dispatch(startOnRemoveOpponent())
      store.dispatch(startOnBattle())
      store.dispatch(startOnMessages())
      store.dispatch(startOnEgg())
      renderApp()
      hasLoadedData = true
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
