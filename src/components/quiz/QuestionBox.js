import React from 'react'
import Question from './Question'
import Answer from './Answer'

export default class QuestionBox extends React.Component {

  render() {
    return (
      <div id='question-box-container'>
        <Question />
        <Answer id='answer-1'/>
        <Answer id='answer-2'/>
        <Answer id='answer-3'/>
        <Answer id='answer-4'/>
      </div>
    )
  }
}
