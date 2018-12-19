import React from 'react'
import ControlPanel from '../ControlPanel'
import { shallow } from 'enzyme'

let wrapper

beforeEach(function() {
  wrapper = shallow(
    <ControlPanel />
  )
});

test('it renders ControlPanel', () => {
  expect(wrapper).toMatchSnapshot()
})
