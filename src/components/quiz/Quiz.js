import React from 'react'
import QuestionBox from './QuestionBox'

export default class Quiz extends React.Component {

  render() {
    return(
      <div id='quiz-container'>
        <h1>End of level Quiz</h1>
        <QuestionBox />
      </div>
    )
  }
}
