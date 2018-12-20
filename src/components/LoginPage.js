import React from 'react'
import { connect } from 'react-redux'
import { firebase, googleAuthProvider, githubAuthProvider } from '../firebase/firebase'
import { startLogin } from '../actions/auth'
import LoginPageFella from '../assets/LoginPageFella.png'

export class LoginPage extends React.Component {

  handleGoogleLogin = () => {
    firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
      this.props.startLogin(result.user.uid)
    })
  }

  handleGithubLogin = () => {
    firebase.auth().signInWithPopup(githubAuthProvider).then((result) => {
      this.props.startLogin(result.user.uid)
    })
  }

  render() {
    return (
      <div id="login-page">
        <h1>MAKERSRICH</h1>
        <button className="login-button" onClick={this.handleGoogleLogin}>Google Login</button>
        <button className="login-button" onClick={this.handleGithubLogin}>Github Login</button>
        <div style={{backgroundImage:`url(${LoginPageFella})`, height:'270px', width:'320px', marginLeft: '70px', marginTop: '50px'}}> </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (uid) => dispatch(startLogin(uid)),
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
