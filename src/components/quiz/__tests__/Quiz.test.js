import React from 'react';
import { shallow } from 'enzyme'
import { Quiz } from '../Quiz'

let wrapper, startSendResult, startGetQuestion, quiz

beforeEach(function() {
  startGetQuestion = jest.fn()

  quiz = {
    id: 8,
    answers: [
      'one',
      'two',
      'three',
      'four'
    ],
    correctAnswer: 'two',
    question: 'What comes after one?'
  }
  wrapper = shallow(
    <Quiz
      quiz={quiz}
      startGetQuestion={startGetQuestion}
    />
  )
});

test('it renders Quiz', () => {
  expect(wrapper).toMatchSnapshot()
})
