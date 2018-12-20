import React, { Component } from 'react';
import { connect } from 'react-redux'
import './chatroom.css'

class MessageFeed extends Component {

  componentDidUpdate() {
    var feed = document.getElementById('message-feed')
    feed.scrollTop = feed.scrollHeight
  }

  render() {
    return (
      <div id="chatroom-container">
        <h1> Messages </h1>
        <ul id="message-feed">
          {this.props.messages.map((message, i) => {
          return (
            <li key={i}><span class="message-name">{message.name.split(' ')[0]}:</span> {message.message} </li>
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
