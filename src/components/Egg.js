import React, { Component } from 'react';
import { connect } from 'react-redux'
import EggImg from "../assets/egg.png"

class Egg extends Component {

  render() {
    return (
      <div id="egg"
        style={{
          position: 'absolute',
          width: '16px',
          top: this.props.egg.top,
          left: this.props.egg.left,
          height: '16px',
          backgroundPosition: 'center',
          backgroundImage: `url(${EggImg})`
        }}
      >
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  egg: state.egg
})

export default connect(mapStateToProps)(Egg);
