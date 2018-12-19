import React from 'react'
import StatusBar from '../StatusBar'
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme'
import { mapStateToProps } from '../StatusBar'

test('it renders StatusBar', () => {
  let wrapper = shallow( <StatusBar /> )
  expect(wrapper).toMatchSnapshot()
})

test('mapStateToProps', () => {

  let state = {
    auth: 'fake auth state'
  }
  expect(mapStateToProps(state).player).toEqual('fake auth state')
})
