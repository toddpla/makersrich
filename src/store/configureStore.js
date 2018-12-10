import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import authReducer from '../reducers/auth'
import quizReducer from '../reducers/quiz'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      quiz: quizReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store;
}
