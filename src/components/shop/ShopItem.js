import React, { Component } from 'react';

class ShopItem extends Component {

  changeSelected = () => {
      this.props.handleSelect(this.props.item)
}

  render() {
    return (
      <div className='shop-item' onClick={this.changeSelected}>
        <div className={this.props.item.type}>
        </div>
      </div>
    );
  }

}

export default ShopItem;
