import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import authReducer from '../reducers/auth'
import questionsReducer from '../reducers/questions'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      questions: questionsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store;
}
