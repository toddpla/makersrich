import React from 'react'
import QuestionBox from './QuestionBox'
import Results from './Results'

export default class Quiz extends React.Component {

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
