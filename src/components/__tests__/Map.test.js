import React from 'react'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import Map from '../Map'

test('renders correctly', () => {
  const wrapper = renderer.create(<Map />).toJSON();
  expect(wrapper).toMatchSnapshot();
});
