import React from 'react'
import { connect } from 'react-redux'

import QuestionBox from './QuestionBox'
import Results from './Results'

export class Quiz extends React.Component {

  render() {

    return(
      <div id='quiz-container'>
        <h1>End of level Quiz</h1>
        <QuestionBox />
        <Results />
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
