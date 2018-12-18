import React, { Component } from 'react';

class RPSChoice extends Component {

  handleClick = () => {
    this.props.sendMove(this.props.value)
  }

  render() {
    return (
      <button value={this.props.value} onClick={this.handleClick}> {this.props.value}</button>
    );
  }
}

export default RPSChoice;
