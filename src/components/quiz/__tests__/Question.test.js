import React from 'react';
import { shallow } from 'enzyme'
import Question from '../Question'

let wrapper

beforeEach(function() {
  wrapper = shallow(
    <Question
      question={'this is a question'}
    />
  )
});

test('it renders Question', () => {
  expect(wrapper).toMatchSnapshot()
})
