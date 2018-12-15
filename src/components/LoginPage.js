import React from 'react'
import { connect } from 'react-redux'
import { startGoogleLogin } from '../actions/auth'

export const LoginPage = ({ startLogin }) => (
  <div>
    <button onClick={startGoogleLogin}>Login</button>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
