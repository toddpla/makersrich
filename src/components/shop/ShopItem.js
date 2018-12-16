import React, { Component } from 'react';

class ShopItem extends Component {

  changeSelected = () => {
      this.props.handleSelect(this.props.item)
}

  render() {
    return (
      <div className='shop-item-container'>
        <div className={`shop-item ${this.props.item.properties.type}`} onClick={this.changeSelected}>
        </div>
      </div>
    );
  }

}

export default ShopItem;
