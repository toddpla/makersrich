import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className='message'>
        {this.props.message}
      </div>
    )
  }
}
export default Message
