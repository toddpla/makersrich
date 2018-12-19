import React from 'react';
import { shallow } from 'enzyme'
import { Quiz } from '../Quiz'

describe('Quiz', () => {
  let wrapper, startSendResult, startGetQuestion, quiz, auth, startDebitPlayer,
      clearQuiz

  beforeEach(function() {
    clearQuiz = jest.fn()
    startGetQuestion = jest.fn()
    startSendResult = jest.fn()
    startDebitPlayer= jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve(true)
        reject(false)
      });
    })
    auth = {
      uid:'123',
      cash: 200,
      sessionQuestions: []
    }
    quiz = {
      id: 8,
      answers: [
        'one',
        'two',
        'three',
        'four'
      ],
      correctAnswer: '1',
      question: 'What comes after one?'
    }
    wrapper = shallow(
      <Quiz
        quiz={quiz}
        auth={auth}
        startGetQuestion={startGetQuestion}
        startSendResult={startSendResult}
        startDebitPlayer={startDebitPlayer}
        clearQuiz={clearQuiz}
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
      instance.handleClick(1)
    });

    it('calls #startSendResult', () => {
      expect(startSendResult).toHaveBeenCalled()
    });

    it('calls #startGetQuestion', () => {
      expect(startGetQuestion).toHaveBeenLastCalledWith(submission.uid)
    });

    it('increases questionCount', () => {
      expect(instance.state.questionCount).toEqual(1)
    });
  });
})
