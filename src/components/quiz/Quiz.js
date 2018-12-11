import React from 'react'
import { connect } from 'react-redux'

import QuestionBox from './QuestionBox'
import Results from './Results'


export class Quiz extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    questionsVisibility: '',
    resultsVisibility: 'none',
    currentQuestion: 0
  };
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
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    questions: state.questions
})

export default connect(mapStateToProps)(Quiz)

// <QuestionBox
// // visible={this.state.questionsVisibility}
// // showResults={this.showResults}
// // question={this.state.currentQuestion}
// // answers={this.state.currentQuestion.answers}
// // correctAnswer={this.props.correctAnswer}
// />
// <Results />
