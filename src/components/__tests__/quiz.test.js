import React from 'react'
import { shallow } from 'enzyme'
import Quiz from '../quiz/Quiz'
import QuestionBox from '../quiz/QuestionBox'

describe('Quiz', () => {
  it('should have a title box', () => {
    const wrapper = shallow(<Quiz />)

    expect(wrapper.text()).toContain('End of level Quiz')
  })

  it('matches last snapshot', () => {
    const wrapper = shallow(<Quiz />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should render a QuestionBox component', () => {
    const wrapper = shallow(<Quiz />)

    expect(wrapper.containsMatchingElement(<QuestionBox />)).toEqual(true);
  })

})
