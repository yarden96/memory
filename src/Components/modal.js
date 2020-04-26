import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {
  render() {
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <div className="modal-main">
          <button onClick={this.props.handleClose} className="close">&times;</button>
          <p className="game-over">Congratulations!</p>
          <p className="game-over">Your score is: {this.props.score}</p>
        </div>
      </div>
    );
  }
}

export default Modal;