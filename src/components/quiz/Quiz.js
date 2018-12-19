import React from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Answer from './Answer'
import { startSendResult, startGetQuestion, clearQuiz } from '../../actions/quiz'
import { startUpdatePlayer, startDebitPlayer, updatePlayer } from '../../actions/auth'
import { QUESTION_PRICE } from '../../constants'

export class Quiz extends React.Component {

  constructor(props) {
    super(props);
    if ( this.canAffordQuestion() ) { this.props.startGetQuestion() }

  }

  canAffordQuestion = () => {
    return this.props.auth.cash >= QUESTION_PRICE
  }

  sendResultToFirebase = (submission) => {
    console.log('start of firebase');
    console.log(submission);
    if (submission.result === true) {
      console.log('result is true');
      this.props.auth.sessionQuestions.push(submission)
      console.log('pushed to array');
      this.props.startSendResult({...submission})
      console.log('pushed to firebasea');
      }
    }

  removeQuiz = () => {
    var quizContainer = document.getElementById('quiz-container')
    var quiz = document.getElementById('quiz')
    quizContainer.removeChild(quiz)
  }

  handleClick = (answerIndex) => {
    console.log('start handleClick');
    this.props.startDebitPlayer(QUESTION_PRICE).then(() => {
      const submission = {
        uid: this.props.auth.uid,
        questionId: this.props.quiz.id,
        result: answerIndex.toString() === this.props.quiz.correctAnswer
      }
      console.log(submission);
      console.log('before firebase');
      this.sendResultToFirebase(submission)
      console.log('after firebase');
      console.log('before can afford');
      if (this.canAffordQuestion()) {
        console.log('after can afford');
        this.props.startGetQuestion(submission.uid)
      } else {
        this.props.clearQuiz()
      }
    })
  }

  handleClose = () => {
    this.props.clearQuiz()
    this.props.closeModal()
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 32) { this.handleClose() }
    })
  }

  render() {

    return(
      <div id='quiz-container'>
        <h1>Welcome to the quiz!</h1>
          { (this.props.quiz.constructor === Object && Object.keys(this.props.quiz).length !== 0  ) ? (
            <div id='quiz'>
              <Question question={this.props.quiz.question}/>
              {this.props.quiz.answers.map((answer, i) => <Answer key={i} id={i} answer={answer} handleClick={this.handleClick} correct={i.toString() === this.props.quiz.correctAnswer} />)}
            </div>
          )
            :
          (
            <div>
              <h2>Come back when you have more money</h2>
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
  startUpdatePlayer: (updates) => dispatch(startUpdatePlayer(updates)),
  startDebitPlayer: (amount) => dispatch(startDebitPlayer(amount)),
  clearQuiz: () => dispatch(clearQuiz()),
  updatePlayer: (updates) => dispatch(updatePlayer(updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
