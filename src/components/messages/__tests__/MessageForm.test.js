import React from 'react'
import MessageForm from '../MessageForm'
import { shallow } from 'enzyme'


test('renders correctly', () => {
  const wrapper = shallow(<MessageForm messages={[1,2,3,4]} />)
  expect(wrapper).toMatchSnapshot()
});
