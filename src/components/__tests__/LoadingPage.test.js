import React from 'react'
import { shallow } from 'enzyme'
import LoadingPage from '../LoadingPage'

test('renders correctly', () => {
  const wrapper = shallow(<LoadingPage />)
  expect(wrapper).toMatchSnapshot();
});
