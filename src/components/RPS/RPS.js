import React, { Component } from 'react';
import RPSChoice from './RPSChoice'

class RPS extends Component {
  sendChoice = (choice) => {

  }

  render() {
    return (
      <div className='rps'>
      <RPSChoice value='Rock' sendMove={this.sendChoice}/> <br/>
      <RPSChoice value='Paper' sendMove={this.sendChoice}/> <br/>
      <RPSChoice value='Scissors' sendMove={this.sendChoice}/>
      </div>
    );
  }

}

export default RPS;
