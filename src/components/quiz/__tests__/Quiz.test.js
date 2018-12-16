import React from 'react';
import { shallow } from 'enzyme'
import { Quiz } from '../Quiz'

describe('Quiz', () => {
  let wrapper, startSendResult, startGetQuestion, quiz, auth

  beforeEach(function() {
    startGetQuestion = jest.fn()
    startSendResult = jest.fn()
    auth = {
      uid:'123'
    }
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
        auth={auth}
        startGetQuestion={startGetQuestion}
        startSendResult={startSendResult}
      />
    )
  });

  test('it renders Quiz', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('it calls #startGetQuestion', () => {
    expect(startGetQuestion).toHaveBeenCalled()
  })

  describe('#handleClick', () => {
    let instance, submission

    beforeEach(function() {
      submission = {
        uid: '123',
        questionId: 8,
        result: true
      }

      instance = wrapper.instance()
      instance.handleClick()
    });

    it('calls #startSendResult', () => {
      expect(startSendResult).toHaveBeenLastCalledWith(submission)
    });

    it('calls #startGetQuestion', () => {
      expect(startGetQuestion).toHaveBeenLastCalledWith(submission.uid)
    });
  });
})
