import React from 'react'

export default class Results extends React.Component {
  render() {
    return (
      <div style={{display: this.props.visible}}>
        {this.props.results.filter(x => x === true).length} / 5 mate
      </div>
    )
  }
}
