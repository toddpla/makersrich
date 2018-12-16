import React from 'react'
import { shallow } from 'enzyme'
import playersData from '../../../test/fixtures/players'
import { LevelPlayers } from '../LevelPlayers'

let opponents, wrapper;

beforeEach(() => {
  opponents = playersData.fixtures
  wrapper = shallow(<LevelPlayers opponents={opponents} />)
})

test('should render correctly', () => {
  expect(wrapper).toMatchSnapshot()
})
