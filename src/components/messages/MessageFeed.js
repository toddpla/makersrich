import React, { Component } from 'react';
import { connect } from 'react-redux'
import './chatroom.css'

class MessageFeed extends Component {

  render() {
    return (
      <div id="chatroom-container">
        <h1> Messages </h1>
        <ul id="message-feed">
          {this.props.messages.map(message => {
          return (
            <li>{message.message} </li>
          )
        })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages
})

export default connect(mapStateToProps)(MessageFeed);
