import React from 'react'
import { connect } from 'react-redux'

import QuestionBox from './QuestionBox'
import Results from './Results'


export class Quiz extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    questionsVisibility: '',
    resultsVisibility: 'none'
  };
}

  showResults = () => {
    console.log('cggsgr')
    this.setState({
      questionsVisibility: 'none',
      resultsVisibility: ''
    })
  }

  render() {

    return(
      <div id='quiz-container'>
        <h1>End of level Quiz</h1>
        <QuestionBox
        visible={this.state.questionsVisibility}
        showResults={this.showResults}
        questionNumber={this.props.results.length}
        question={this.props.question}
        answers={this.props.answers}
        correctAnswer={this.props.correctAnswer}/>
        <Results
        visible={this.state.resultsVisibility}
        results={this.props.results}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.quiz,
  }
}

export default connect(mapStateToProps)(Quiz)
