import React from 'react'
import Question from './Question'
import Answer from './Answer'
import { connect } from 'react-redux'

import { loadQuestion } from '../../actions/quiz'


export class QuestionBox extends React.Component {

  handleClick = (e, index) => {
    //if questionCount <= 5
    //check answer
    var result = false
    if(this.props.answers[index] == this.props.correctAnswer) {
      result = true
    }
    //send result
    // sendResult(result)
    //load new question
    console.log('here1')
    this.props.loadQuestion()
  }

  render() {
    return (
      <div id='question-box-container'>
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

const mapStateToProps = dispatch => ({

})

const mapDispatchToProps = dispatch => ({
      loadQuestion: () => dispatch(loadQuestion())
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBox)
