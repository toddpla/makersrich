import React from 'react'
import MessageFeed from '../MessageFeed'
import { shallow } from 'enzyme'


test('renders correctly', () => {
  const wrapper = shallow(<MessageFeed messages={[1,2,3,4]} />)
  expect(wrapper).toMatchSnapshot()
});
