import React, { Component } from 'react';
import { connect } from 'react-redux'
class NewsFeed extends Component {

  render() {
    return (
      <div className="newsfeed-assemble" >
        <div className="newsfeed-message">{this.props.newsfeed[0]}</div>
        <div className="newsfeed-message">{this.props.newsfeed[1]}</div>
        <div className="newsfeed-message">{this.props.newsfeed[2]}</div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  newsfeed: state.newsfeed
})

export default connect(mapStateToProps)(NewsFeed)
