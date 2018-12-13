import React from 'react'

export default class Question extends React.Component {
  render() {
    return (
      <div className="quiz-question-box">
        {this.props.question}
      </div>
    )
  }
}
