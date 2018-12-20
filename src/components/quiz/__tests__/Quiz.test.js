import React from 'react';
import { shallow } from 'enzyme'
import { Quiz, mapDispatchToProps } from '../Quiz'


describe('Quiz', () => {
  let wrapper, startSendResult, startGetQuestion, quiz, auth, startDebitPlayer,
      clearQuiz, canAffordQuestion, sendResultToFirebase, updatePlayer, startUpdatePlayer, closeModal

  beforeEach(function() {
    clearQuiz = jest.fn()
    closeModal = jest.fn()
    updatePlayer = jest.fn()
    startUpdatePlayer = jest.fn()
    startGetQuestion = jest.fn()
    canAffordQuestion = jest.fn()
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
        closeModal={closeModal}
      />
    )
  });

  test('it renders Quiz', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('calls #canAffordQuestion', () => {
    let instance = wrapper.instance()
    expect(instance.canAffordQuestion()).toEqual(true)
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

    it('calls #removeQuiz', () => {
      document.body.innerHTML =
      '<div id="quiz-container">' +
      '  <div id="quiz" />' +
      '  <div id="button" />' +
      '</div>'
      instance.removeQuiz()
      expect(document.getElementById('quiz')).toEqual(null)
    })

    it('#sendResultToFirebase calls startSendResult', () => {
      instance.sendResultToFirebase(submission)
      expect(startSendResult).toHaveBeenCalled()
    })

    it('calls #startSendResult', () => {
      expect(startSendResult).toHaveBeenCalled()
    });

    it('calls #startGetQuestion', () => {
      expect(startGetQuestion).toHaveBeenLastCalledWith(submission.uid)
    });

    it('hanldeClose calls clearquiz and closeModal', () => {
      instance.handleClose()
      expect(clearQuiz).toHaveBeenCalled()
      expect(closeModal).toHaveBeenCalled()
    })

    it('calls #startDebitPlayer', () => {
      expect(startDebitPlayer).toHaveBeenLastCalledWith(10)
    })
  })
})

test('mapDispatchToProps', () => {

  const dispatch = jest.fn()

  expect(mapDispatchToProps(dispatch).startSendResult('result'))
  expect(mapDispatchToProps(dispatch).startGetQuestion())
  expect(mapDispatchToProps(dispatch).startUpdatePlayer('updates'))
  expect(mapDispatchToProps(dispatch).startDebitPlayer(10))
  expect(mapDispatchToProps(dispatch).clearQuiz())
  expect(mapDispatchToProps(dispatch).updatePlayer('updates'))

  expect(dispatch.mock.calls[0][0]).toEqual(expect.any(Function))
  expect(dispatch.mock.calls[1][0]).toEqual(expect.any(Function))
  expect(dispatch.mock.calls[2][0]).toEqual(expect.any(Function))
  expect(dispatch.mock.calls[3][0]).toEqual(expect.any(Function))
  expect(dispatch.mock.calls[4][0]).toEqual({"quiz": {}, "type": "CLEAR_QUIZ"})
  expect(dispatch.mock.calls[5][0]).toEqual({"type": "UPDATE_PLAYER", "updates": "updates"})

})
