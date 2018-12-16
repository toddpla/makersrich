import questionsReducer from '../questions'
import questionsData from '../../test/fixtures/questions'


test('should set default state', () => {
  const state = questionsReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual([])
})

test('should set questions', () => {
  const questions = questionsData.fixtures
  const action = {
    type: "SET_QUESTIONS",
    questions
  }
  const state = questionsReducer(undefined, action)
  expect(state).toEqual(questions)
})

test('should add question', () => {
  const question = questionsData.fixtures[0]
  const action = {
    type: "ADD_QUESTION",
    question
  }
  const state = questionsReducer(undefined, action)
  expect(state).toEqual([question])
})
