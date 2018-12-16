import React from 'react'
import { shallow } from 'enzyme'
import playersData from '../../../test/fixtures/players'
import { PlayersList } from '../PlayersList'

let players, wrapper;

beforeEach(() => {
  players = playersData.fixtures
  wrapper = shallow(<PlayersList players={players} />)
})

test('should render correctly', () => {
  expect(wrapper).toMatchSnapshot()
})
