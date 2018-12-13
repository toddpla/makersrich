import React from 'react'
import styled from "styled-components"
import InvPic from './Inventory.png'

export default class Inventory extends React.Component {


  render() {
  var sectionStyle = {
    backgroundImage: `url(${InvPic})`,
    backgroundPosition: 'center',
    width: 640,
    height: 560
  };
    return (
      <div style={sectionStyle}></div>
    )
  }
}
