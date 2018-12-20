import React from 'react'
import { shallow } from 'enzyme'
import Opponent from '../Opponent'

test('renders correctly', () => {
  let opponent = {
    uid: 1
  }
  const wrapper = shallow(<Opponent opponent={opponent}/>)
  expect(wrapper).toMatchSnapshot();
});
