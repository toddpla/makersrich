import React from 'react'

export default class Answer extends React.Component {

  handleClick = () => {
    this.props.handleClick(this.props.id)
  }

  render() {
    return (
      <div id={`answer-${this.props.id}`} className='quiz-answer-box' onClick={this.handleClick}>
        {this.props.answer}
      </div>
    )
  }
}
