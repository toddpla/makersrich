import React, { Component } from 'react';
import './control.css'
import NewsFeed from './NewsFeed'
import StatusBar from './StatusBar'
import MessageFeed from '../messages/MessageFeed'
import MessageForm from '../messages/MessageForm'

class ControlPanel extends Component {

  render() {
    return (
      <div id="control-panel">
        <button className="control-panel-button" onClick={this.props.handlePopupLeaderboard}>Leaderboard</button>
        <StatusBar />
        <NewsFeed />
        <MessageForm handleOnFocus={this.props.handleOnFocus} handleOffFocus={this.props.handleOffFocus}/>
        <MessageFeed />
      </div>
    );
  }

}

export default ControlPanel;
