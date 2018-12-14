import React, { Component } from 'react';
import map from '../assets/maps/level1.png'

class Map extends Component {

  render() {
    return (
      <div className="map" style={{backgroundImage: `url('${map}')`, height: '640px', width: '800px', position: 'relative', justifyContent: 'center', alignItems: 'center'}}>

      </div>
    );
  }

}

export default Map;
