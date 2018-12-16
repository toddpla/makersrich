import React from 'react'
import { connect } from 'react-redux'
import { startGoogleLogin, startGithubLogin } from '../actions/auth'

export const LoginPage = (props) => (
  <div>
    <button onClick={props.startGoogleLogin}>Google Login</button>
    <button onClick={props.startGithubLogin}>Github Login</button>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startGithubLogin: () => dispatch(startGithubLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
