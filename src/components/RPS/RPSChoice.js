import React, { Component } from 'react';

class RPSChoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      choice : props.value
    }
  }
  click = () => {
    this.props.sendMove(this.state.choice)
  }

  render() {
    return (
      <button value={this.props.value} onClick={this.click}> {this.props.value}</button>
    );
  }
}

export default RPSChoice;
