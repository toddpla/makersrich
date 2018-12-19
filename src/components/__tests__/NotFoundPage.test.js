import React from 'react'
import { shallow } from 'enzyme'
import NotFoundPage from '../NotFoundPage'

test('renders correctly', () => {
  const wrapper = shallow(<NotFoundPage />)
  expect(wrapper).toMatchSnapshot();
});
