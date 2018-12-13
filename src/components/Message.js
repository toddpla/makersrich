import React, { Component } from 'react';
import signs from '../data/maps/level1/signs'

class Message extends Component {
  render() {
    return (
      <div>
        {this.props.message}
      </div>
    )
  }
}
export default Message
