import React from 'react'
import { connect } from 'react-redux'

import QuestionBox from './QuestionBox'
import Results from './Results'
import { startGetQuestion } from '../../actions/quiz'


export class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.props.startGetQuestion()
  }

  showResults = () => {
    this.setState({
      questionsVisibility: 'none',
      resultsVisibility: ''
    })
  }

  render() {
    return(
      <div id='quiz-container'>
        <h1>End of level Quiz</h1>
        { !(Object.keys(this.props.quiz).length === 0 && this.props.quiz.constructor === Object) && (
          <QuestionBox
            question={this.props.quiz}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    quiz: state.quiz
})

const mapDispatchToProps = dispatch => ({
  startGetQuestion: () => dispatch(startGetQuestion())
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

// <QuestionBox
// // visible={this.state.questionsVisibility}
// // showResults={this.showResults}
// // question={this.state.currentQuestion}
// // answers={this.state.currentQuestion.answers}
// // correctAnswer={this.props.correctAnswer}
// />
// <Results />
