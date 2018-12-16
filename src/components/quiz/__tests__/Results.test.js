import React from 'react';
import { shallow } from 'enzyme'
import Results from '../Results'

let wrapper, results

beforeEach(function() {
  results = [true, false, false, true, true]
  wrapper = shallow(
    <Results results={results}/>
  )
});

test('it renders Results', () => {
  expect(wrapper).toMatchSnapshot()
})
