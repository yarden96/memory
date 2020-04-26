import React, { Component } from 'react'

class Cell extends Component {
  state = {
    isOpen: false,
    isButtonDisabled: false
  }

  onCellClick = () => {
    this.props.onCellClick(this);
  }

  componentWillUpdate = (nextProps) => {
    if(nextProps.resetState) {
      this.setState({
        isOpen:false,
        isButtonDisabled: false
      })
    }
  }

  render() {
    return (
      <div 
        onClick={!this.state.isButtonDisabled ? this.onCellClick : null} 
        className={this.state.isOpen ? "imgOpen td-cell" : "td-cell"}
        style = {{backgroundImage: this.state.isOpen ? `url(images/image${this.props.picID}.jpg)` : 'none'}}
        > 
      </div>
    );
  }
}

export default Cell;