import React from 'react'

export default class Results extends React.Component {
  render() {
    return (
      <div>
        {this.props.results.filter(x => x === true).length} / 5 mate
      </div>
    )
  }
}
