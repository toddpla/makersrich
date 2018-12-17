import React, { Component } from 'react';
import map from '../assets/maps/POWLevel1.png'

class Map extends Component {

  render() {
    return (
      <div className="map" style={{
        backgroundImage: `url('${map}')`,
        height: '640px',
        width: '800px',
        position: 'relative'
      }}
      >

      </div>
    );
  }

}

export default Map;
