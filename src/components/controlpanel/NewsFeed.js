import React, { Component } from 'react';
import { connect } from 'react-redux'
import database from '../../firebase/firebase'

class NewsFeed extends Component {

  state = {
    newsfeed: []
  }

  componentDidMount(){
    database.ref('newsfeed')
      .on('child_added', snap => {
      this.setState((prevState) => {
        if (prevState.newsfeed.length > 3) prevState.newsfeed.shift()
        prevState.newsfeed.push(snap.val())
        return {
          newsfeed: prevState.newsfeed
        }
      })
    })
  }

  render() {
    return (
      <div id="newsfeed-assemble" >
      <h1>Newsfeed</h1>
        {this.state.newsfeed.map((item, i) => {
          return (
            <div key={i} className="newsfeed-message">
              <strong>{item.displayName && item.displayName.split(" ")[0]}</strong> {item.message}
            </div>
          )
        })}
      </div>
    );
  }
}

export default NewsFeed
