import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { Battle } from '../Battle'
import playersData from '../../test/fixtures/players'

let battle, player, startCreditPlayer, startDebitPlayer;

beforeEach(() => {
  player = playersData.fixtures[0]
  startDebitPlayer = jest.fn()
  startCreditPlayer = jest.fn()
  battle = renderer.create(
    <Battle
      player={player}
      startDebitPlayer={startDebitPlayer}
      startCreditPlayer={startCreditPlayer}
    />)

})

test('renders correctly', () => {
  expect(battle).toMatchSnapshot()
})
