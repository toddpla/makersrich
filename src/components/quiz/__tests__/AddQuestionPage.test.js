import React from 'react';
import { shallow } from 'enzyme'
import AddQuestionPage from '../AddQuestionPage'

let wrapper

beforeEach(function() {
  wrapper = shallow(
    <AddQuestionPage />
  )
});

describe('AddQuestionPage', function() {
  it('renders', function() {
    expect(wrapper).toMatchSnapshot()
  });
});
