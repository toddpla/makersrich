import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className='message'>
        {this.props.message}
        <div className={`message-item ${(this.props.item && this.props.item.type)}`}>
        </div>
      </div>
    )
  }
}
export default Message
