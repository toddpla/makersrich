import React from 'react'

export default class Question extends React.Component {
  render() {
    return (
      <div>
        {this.props.question}
      </div>
    )
  }
}
