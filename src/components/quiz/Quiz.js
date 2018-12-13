import React from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Answer from './Answer'
import { startSendResult, startGetQuestion } from '../../actions/quiz'

export class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.props.startGetQuestion(this.props.auth.uid)
  }

  state = {
    questionCount: 0,
  }

  showResults = () => {
    this.setState({
      questionsVisibility: 'none',
      resultsVisibility: ''
    })
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
    if (this.state.questionCount === 4) {
      console.log('done!!!');
    }
  }

  render() {

    return(
      <div id='quiz-container'>
        <h1>End of level Quiz</h1>
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
  startGetQuestion: (uid) => dispatch(startGetQuestion(uid))
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
