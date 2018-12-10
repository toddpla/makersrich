import React from 'react'
import { shallow } from 'enzyme'
import {Quiz} from '../quiz/Quiz'
import QuestionBox from '../quiz/QuestionBox'
import Results from '../quiz/Results'

describe('Quiz', () => {
  it('should have a title box', () => {
    const wrapper = shallow(<Quiz results={[1,2,3]}u/>)

    expect(wrapper.text()).toContain('End of level Quiz')
  })

  it('matches last snapshot', () => {
    const wrapper = shallow(<Quiz results={[1,2,3]}/>)

    expect(wrapper).toMatchSnapshot()
  })

  it('should render a QuestionBox component', () => {
    const wrapper = shallow(<Quiz results={[1,2,3]} />)

    expect(wrapper.containsMatchingElement(<QuestionBox/>)).toEqual(true);
  })

  it('should render a Results component', () => {
    const wrapper = shallow(<Quiz results={[1,2,3]} />)

    expect(wrapper.containsMatchingElement(<Results />)).toEqual(true);
  })

})
