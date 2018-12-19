import React, { Component } from 'react';
import { connect } from 'react-redux'

class MessageFeed extends Component {
  render() {
    console.log(this.props.messages);
    return (
      <div style= {{zIndex: 0, color:'white'}}>
        <h1> Messages </h1>
        <ul>
          {this.props.messages.map(message => {
            console.log(message);
          return (
            <li> message: {message.message} </li>
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
