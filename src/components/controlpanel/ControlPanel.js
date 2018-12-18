import React, { Component } from 'react';
import './control.css'
import NewsFeed from './NewsFeed'
import StatusBar from './StatusBar'

class ControlPanel extends Component {

  render() {
    return (
      <div id="control-panel">
        <StatusBar />
        <NewsFeed />
      </div>
    );
  }

}

export default ControlPanel;
