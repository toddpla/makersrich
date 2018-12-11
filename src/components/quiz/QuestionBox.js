import React from 'react'
import Question from './Question'
import Answer from './Answer'
import { connect } from 'react-redux'

import { startSendResult, startGetQuestion } from '../../actions/quiz'


export class QuestionBox extends React.Component {

  handleClick = (answerIndex) => {
    const submission = {
      uid: this.props.auth.uid,
      questionId: this.props.question.id,
      result: answerIndex === this.props.correctAnswer
    }
    this.props.startSendResult({...submission})
    startGetQuestion()
  }

  render() {
    return (
      <div id='question-box-container'>
        <Question
        question={this.props.question.question}/>
      {this.props.question.answers.map((answer, i) => (<Answer key={i} id={i} answer={answer} handleClick={this.handleClick}/>))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  startSendResult: (result) => dispatch(startSendResult(result)),
  startGetQuestion: () => dispatch(startGetQuestion()),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBox)
