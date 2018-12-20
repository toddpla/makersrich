import React from 'react'
import { shallow } from 'enzyme'
import Opponent from '../Opponent'

test('renders correctly', () => {
  const wrapper = shallow(<Opponent />)
  expect(wrapper).toMatchSnapshot();
});
