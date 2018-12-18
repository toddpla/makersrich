import React, { Component } from 'react';

class RPSChoice extends Component {

  handleClick = () => {
    this.props.sendMove(this.props.value)
  }

  render() {
    return (
      <div className={`rps-choice ${this.props.value}`} value={this.props.value} onClick={this.handleClick}></div>
    );
  }
}

export default RPSChoice;
