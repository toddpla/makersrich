import React from 'react';
import { shallow } from 'enzyme'
import Instructions from '../Instructions'

let wrapper

beforeEach(function() {
  wrapper = shallow(
    <Instructions />
  )
});

describe('Instructions', () => {
  it('renders', function() {
    expect(wrapper).toMatchSnapshot()
  });
})
