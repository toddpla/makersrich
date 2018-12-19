import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import authReducer from '../reducers/auth'
import questionsReducer from '../reducers/questions'
import quizReducer from '../reducers/quiz'
import mapReducer from '../reducers/map'
import shopReducer from '../reducers/shop'
import opponentsReducer from '../reducers/opponents'
import messageReducer from '../reducers/messages'

import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      questions: questionsReducer,
      quiz: quizReducer,
      opponents: opponentsReducer,
      map: mapReducer,
      shop: shopReducer,
      messages: messageReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )
  return store;
}
