import React from 'react'
import { shallow } from 'enzyme'
import {Quiz} from '../quiz/Quiz'
import Results from '../quiz/Results'

describe('Quiz', () => {
  it('should have a title box', () => {
    const wrapper = shallow(<Quiz results={[1,2,3]}/>)

    expect(wrapper.text()).toContain('End of level Quiz')
  })

  it('matches last snapshot', () => {
    const wrapper = shallow(<Quiz results={[1,2,3]}/>)

    expect(wrapper).toMatchSnapshot()
  })



})
