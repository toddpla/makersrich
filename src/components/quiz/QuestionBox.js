import React from 'react'
import Question from './Question'
import Answer from './Answer'
import { connect } from 'react-redux'

import { loadQuestion, sendResult } from '../../actions/questions'


export class QuestionBox extends React.Component {



  handleClick = (e, index) => {
      var result = false
      if(this.props.answers[index] === this.props.correctAnswer) {
        result = true
      }
      this.props.sendResult(result)
      if(this.props.questionNumber < 4){
        this.props.loadQuestion()
      } else {
        this.props.showResults()
      }

  }

  render() {
    return (
      <div id='question-box-container' style={{display: this.props.visible}}>
        <Question
        question={this.props.question}/>
        <Answer answer={this.props.answers[0]} onClick={ (e) =>  {this.handleClick(e, 0)}} id='answer-1'/>
        <Answer answer={this.props.answers[1]} onClick={ (e) =>  {this.handleClick(e, 1)}} id='answer-2'/>
        <Answer answer={this.props.answers[2]} onClick={ (e) =>  {this.handleClick(e, 2)}} id='answer-3'/>
        <Answer answer={this.props.answers[3]} onClick={ (e) =>  {this.handleClick(e, 3)}} id='answer-4'/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
      loadQuestion: () => dispatch(loadQuestion()),
      sendResult: (result) => dispatch(sendResult(result)),
})

export default connect(undefined, mapDispatchToProps)(QuestionBox)
