import React from 'react'
import { shallow } from 'enzyme'
import playersData from '../../../test/fixtures/players'
import { Leaderboard} from '../Leaderboard'
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

let opponents, wrapper, store;

beforeEach(() => {
  opponents = playersData.fixtures
  wrapper = shallow(<Leaderboard opponents={opponents} />)
})

test('should render correctly', () => {
  expect(wrapper).toMatchSnapshot()
})
