import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import authReducer from '../reducers/auth'

import questionsReducer from '../reducers/questions'
import quizReducer from '../reducers/quiz'

import playersReducer from '../reducers/players'

import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      questions: questionsReducer,
      quiz: quizReducer,
      players: playersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store;
}
