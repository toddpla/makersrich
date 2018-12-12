import React from 'react'
import { shallow } from 'enzyme'
import { Quiz } from '../quiz/Quiz'
import renderer from 'react-test-renderer';

let auth, quiz, startGetQuestion, wrapper;

beforeEach(() => {
  auth = {
    uid: '123'
  }
  quiz = {}
  startGetQuestion = jest.fn()
  wrapper = renderer.create(
    <Quiz
      auth={auth}
      quiz={quiz}
      startGetQuestion={startGetQuestion}
    />
  )
})

test('should render correctly', () => {
  expect(wrapper).toMatchSnapshot()
})
