import React, { Component } from 'react';
import map from '../assets/maps/proofofwork.png'

class Map extends Component {

  render() {
    return (
      <div className="map"
        style={{backgroundImage: `url('${map}')`,
                height: '672px',
                maxHeight: '672px',
                width: '1024px',
                maxWidth: '1024px',
                overflow: 'auto',
                position: 'relative',
                display: 'block',
                margin: 'auto'
              }}>

      </div>
    );
  }

}

export default Map;
