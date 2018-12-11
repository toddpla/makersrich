import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPlayer } from '../actions/players'

class AddPlayerPage extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addPlayer({name: event.target['player-name'].value})
    this.props.history.push('/game')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="player-name">Name</label>
          <input id="player-name" type="text" />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addPlayer: player => dispatch(addPlayer(player))
})

export default connect(undefined, mapDispatchToProps)(AddPlayerPage);
