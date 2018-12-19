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
      handleClick={handleClick}
    />
  )
});

test('it renders Answer', () => {
  expect(wrapper).toMatchSnapshot()
})

// test('calls #handleClick on click', () => {
//   wrapper.find('div').simulate('click')
//   expect(handleClick).toHaveBeenLastCalledWith('1')
// })
