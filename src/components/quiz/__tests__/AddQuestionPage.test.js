import React from 'react';
import { shallow } from 'enzyme'
import { AddQuestionPage } from '../AddQuestionPage'
import event from '../../../test/fixtures/addQuestionEvent'

let wrapper, startAddQuestion

beforeEach(function() {
  startAddQuestion = jest.fn()
  wrapper = shallow(
    <AddQuestionPage startAddQuestion={startAddQuestion} />
  )
});

describe('AddQuestionPage', function() {
  it('renders', function() {
    expect(wrapper).toMatchSnapshot()
  });

  it('calls #startAddQuestion', function() {
    const question = {
      question:'What is 1 + 1?',
      answers: [
        '1',
        '2',
        '3',
        '4'
      ],
      correctAnswer: '2'
    }
    wrapper.find('form').simulate('submit', event)
    expect(startAddQuestion).toHaveBeenLastCalledWith(question)
  });

});
