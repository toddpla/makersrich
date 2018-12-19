import React, { Component } from 'react';
import moment from 'moment'

export class Timer extends Component {

  constructor(props) {
    super(props)
    this.state = {
        countdown: undefined,
        timer: undefined
    }
  }

  componentDidMount() {
    const timer = setInterval(() => {
      if (this.state.countdown <= 0 ) {
        clearInterval(this.state.timer)
        this.props.handleTimeout()
      } else {
        this.setState({countdown: (this.props.end - moment()) / 1000})
      }}, 1000)
    this.setState({timer})
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  render() {
    return (
      <div>
        <h3>
        {this.state.countdown > 0
          ? Math.floor(this.state.countdown)
          : this.state.countdown === undefined ? "" : "Times up"}
          </h3>
      </div>
    );
  }

}

export default Timer;
