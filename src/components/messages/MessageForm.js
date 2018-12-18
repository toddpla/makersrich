import React, { Component } from 'react';
import { startSendMessage } from '../../actions/messages.js'
import { connect } from 'react-redux'

export class MessageForm extends Component {
  onSubmit = (e) => {
    e.preventDefault()
    var message = document.getElementById("messagebox")
    this.props.startSendMessage(message.value)
    message.value = ''
  }
  render() {
    return (
      <div>
      <form onSubmit={this.onSubmit}>
        <input type='text' id="messagebox" placeholder="Enter Message" onFocus={this.props.handleOnFocus}/>
        <button id="submit" value="Submit" />
      </form>

      </div>
    );
  }
};

export const mapDispatchToProps = (dispatch) => ({
  startSendMessage: (message) => dispatch(startSendMessage(message))
});

export default connect(undefined, mapDispatchToProps)(MessageForm)
