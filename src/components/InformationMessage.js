import React, { Component } from 'react';

class InformationMessage extends Component {
  render() {
    return (
      <div className='message'>
        {this.props.message}
      </div>
    )
  }
}
export default InformationMessage
