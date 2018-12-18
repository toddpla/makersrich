import React from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Answer from './Answer'
import { startSendResult, startGetQuestion } from '../../actions/quiz'
import { startUpdatePlayer } from '../../actions/auth'

export class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.props.startGetQuestion()
    this.state = {
      questionCount: 1,
      correctQuestions: Object.keys(this.props.auth.questions).length
    }
  }

  handleClick = (answerIndex) => {
    const submission = {
      uid: this.props.auth.uid,
      questionId: this.props.quiz.id,
      result: answerIndex.toString() === this.props.quiz.correctAnswer
    }
    if (submission.result === true) {
      this.props.startSendResult({...submission})
      this.setState({
        correctQuestions: this.state.correctQuestions + 1
      })
    }
    if (this.state.questionCount % 5 === 0 && this.state.questionCount > 0) {
      var newLevel = this.state.questionCount / 5
      this.props.startUpdatePlayer({ level: newLevel })
    }
    this.props.startGetQuestion(submission.uid)
    this.setState({
      questionCount: this.state.questionCount + 1
    })
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
  startGetQuestion: () => dispatch(startGetQuestion()),
  startUpdatePlayer: (updates) => dispatch(startUpdatePlayer(updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
