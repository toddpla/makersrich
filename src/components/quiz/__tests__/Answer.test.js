import React from 'react';
import { shallow } from 'enzyme'
import Answer from '../Answer'

let wrapper, handleClick, instance

beforeEach(function() {
  handleClick = jest.fn()
  wrapper = shallow(
    <Answer
      id={'1'}
      answer={'answer'}
      correct={true}
      handleClick={handleClick}
    />
  )

  document.body.innerHTML =
  '<div id="answer-1">' +
  '</div>'

  instance = wrapper.instance()

});

test('it renders Answer', () => {
  expect(wrapper).toMatchSnapshot()
})
