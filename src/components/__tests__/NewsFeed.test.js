import React from 'react'
import NewsFeed from '../NewsFeed'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'

test('renders correctly', () => {
  const wrapper = renderer.create(<NewsFeed />)
  expect(wrapper).toMatchSnapshot()
});
