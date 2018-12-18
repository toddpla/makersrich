import React, { Component } from 'react';
import './control.css'
import NewsFeed from './NewsFeed'
import StatusBar from './StatusBar'

class ControlPanel extends Component {

  render() {
    return (
      <div id="control-panel">
        <button className="control-panel-button" onClick={this.props.handlePopupLevelPlayersList}>Level Players</button>
        <button className="control-panel-button" onClick={this.props.handlePopupLeaderboard}>Leaderboard</button>
        <StatusBar />
        <NewsFeed />
      </div>
    );
  }

}

export default ControlPanel;
