import React from 'react'
import { shallow } from 'enzyme'
import QuestionBox from '../quiz/QuestionBox'
import Question from '../quiz/Question'

describe('QuestionBox', () => {
  it('matches last snapshot', () => {
    const wrapper = shallow(<QuestionBox />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should render a QuestionBox component', () => {
    const wrapper = shallow(<QuestionBox />)

    expect(wrapper.containsMatchingElement(<Question />)).toEqual(true);
  })
})
