import React from 'react'

export default class Answer extends React.Component {

  handleClick = () => {
    this.props.handleClick(this.props.id)
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.props.answer}
      </div>
    )
  }
}
