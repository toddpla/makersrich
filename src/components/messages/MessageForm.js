import React, { Component } from 'react';
import { startSendMessage } from '../../actions/messages.js'
import { connect } from 'react-redux'
import './chatroom.css'

export class MessageForm extends Component {
  onSubmit = (e) => {
    e.preventDefault()
    var message = document.getElementById("messagebox")
    console.log('here bro');
    this.props.startSendMessage(message.value)
    message.value = ''
    message.blur()
  }

  render() {
    return (
      <div id="message-form">
      <form onSubmit={this.onSubmit}>
        <input type='text' autocomplete="off" id="messagebox" placeholder="Enter Message" onBlur={this.props.handleOffFocus} onFocus={this.props.handleOnFocus}/>
        <button className="send-message-button" id="submit" value="Submit">Submit</button>
      </form>

      </div>
    );
  }
};

export const mapDispatchToProps = (dispatch) => ({
  startSendMessage: (message) => dispatch(startSendMessage(message))
});

export default connect(undefined, mapDispatchToProps)(MessageForm)
