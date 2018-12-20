import React, { Component } from 'react';

class Instructions extends Component {

  render() {
    return (
      <div id="instructions-container">
        <h2>Instructions</h2>
        <p>
        Welcome to MakersRich!<br/>
        Aim of the game - Find rubies and beans and complete quizzes to level up<br/>
        BEWARE! Other players are also competing with you and won't be afraid to challenge you to a showdown of rock, paper, scissors and take your stuff!
        </p>
        <h3>Controls</h3>
        <p>Use the arrow keys to move around</p>
        <p>Press 'Q' to interact with signs</p>
        <p>Press 'E' to dig</p>
        <p>Press 'I' to open your inventory</p>
        <p>Press 'T' to start writing a message</p>

        <p>Press 'Spacebar' to close any pop-ups</p>
      </div>
    );
  }

}

export default Instructions;
