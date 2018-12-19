import React from 'react'

export default class Answer extends React.Component {

  handleClick = () => {

    var div = document.getElementById(`answer-${this.props.id}`)
    if (this.props.correct) {
      div.setAttribute('class', "quiz-answer-box correct-answer")
    } else {
      div.setAttribute('class', "quiz-answer-box wrong-answer")
    }
    setTimeout(() => {
      this.props.handleClick(this.props.id)
      div.setAttribute('class', 'quiz-answer-box' )
    }, 500)
  }

  render() {
    return (
      <div id={`answer-${this.props.id}`} className='quiz-answer-box' onClick={this.handleClick}>
        {this.props.answer}
      </div>
    )
  }
}
