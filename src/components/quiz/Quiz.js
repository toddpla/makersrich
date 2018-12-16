import React from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Answer from './Answer'
import { startSendResult, startGetQuestion } from '../../actions/quiz'

export class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.props.startGetQuestion()
  }

  state = {
    questionCount: 0,
  }

  handleClick = (answerIndex) => {
    const submission = {
      uid: this.props.auth.uid,
      questionId: this.props.quiz.id,
      result: answerIndex === this.props.correctAnswer
    }
    this.props.startSendResult({...submission})
    this.props.startGetQuestion(submission.uid)
    this.setState((prevState) => ({
      questionCount: prevState.questionCount + 1
    }))
    if (this.state.questionCount === 5) {
      alert('you did it fam!')
    }
  }

  render() {

    return(
      <div id='quiz-container'>
        <h1>Welcome to the quiz!</h1>
          { !(Object.keys(this.props.quiz).length === 0 && this.props.quiz.constructor === Object) && (
            <div>
              <Question question={this.props.quiz.question}/>
              {this.props.quiz.answers.map((answer, i) => <Answer key={i} id={i} answer={answer} handleClick={this.handleClick} />)}
            </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    quiz: state.quiz,
    auth: state.auth,
    questions: state.questions
})

const mapDispatchToProps = dispatch => ({
  startSendResult: (result) => dispatch(startSendResult(result)),
  startGetQuestion: () => dispatch(startGetQuestion())
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
