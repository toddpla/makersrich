import React from 'react'
import Question from './Question'
import Answer from './Answer'

export default class QuestionBox extends React.Component {

  render() {
    return (
      <div id='question-box-container'>
        <Question
        question={this.props.question}/>
        <Answer answer={this.props.answers[0]} id='answer-1'/>
        <Answer answer={this.props.answers[1]} id='answer-2'/>
        <Answer answer={this.props.answers[2]} id='answer-3'/>
        <Answer answer={this.props.answers[3]} id='answer-4'/>
      </div>
    )
  }
}
