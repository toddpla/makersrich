import React from 'react'
import { shallow } from 'enzyme'
import playersData from '../../../test/fixtures/players'
import { PlayersListItem } from '../PlayersListItem'

let player, wrapper;

beforeEach(() => {
  player = playersData.fixtures[0]
  wrapper = shallow(<PlayersListItem key="1" {...player} />)
})

test('should render correctly', () => {
  expect(wrapper).toMatchSnapshot()
})
