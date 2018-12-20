import React from 'react';
import { shallow } from 'enzyme'
import Answer from '../Answer'

let wrapper, handleClick

beforeEach(function() {
  handleClick = jest.fn()
  wrapper = shallow(
    <Answer
      id={'1'}
      answer={'answer'}
      correct={true}
    />
  )
});

test('it renders Answer', () => {
  expect(wrapper).toMatchSnapshot()
})
