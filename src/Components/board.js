import React, { Component } from 'react'
import './board.css';
import Table from './table';
import Modal from './modal';

class Board extends Component {
  initState = {
    rows: 5,
    columns: 6,
    score: 0,
    openCells: 0,
    imgOne: null,
    show: false, 
    resetState: false
  }

  state = {
    ...this.initState
  }

  componentWillUpdate = (nextProps, nextState) =>{
    if(nextState.resetState) {
      this.setState({
        ...this.initState
      });
    }
  }

  // Getting the cell object the user clicked
  onCellClick = (cell) => {
    let cellOne;

    if(!this.state.imgOne) {
      cell.setState({
        isOpen: true
      })
      this.setState({
        imgOne: cell
      })
    } else if (this.state.imgOne === cell) {
      cell.setState({
        isOpen: false
      })
      this.setState({
        imgOne: null
      })
    } else {
      cell.setState({
        isOpen: true
      })

      // If the user founed a match
      if(this.state.imgOne.props.picID === cell.props.picID) {
        cellOne = this.state.imgOne;
  
        cellOne.setState({
          isButtonDisabled: true
        });
        cell.setState({
          isButtonDisabled: true
        })
        
        this.setState({
          score: this.state.score + 10,
          imgOne: null,
          openCells: this.state.openCells + 2
        })

        // Game Over
        if(this.state.openCells + 2 >= this.state.rows * this.state.columns) {
          this.setState({
            show: true
          })
        }
      } else {
          cellOne = this.state.imgOne;
          setTimeout(()=> { 
            cellOne.setState({
              isOpen: false
            });
            cell.setState({
              isOpen: false
            })
          }, 500);
          
          this.setState({
            imgOne: null,
          })
      } 
    } 
  }

  newGame = (e) => {
    e.preventDefault();
    this.setState({
      resetState: true
    });
  }

  handleClose = () => {
    this.setState({
      show: false
    })
  }

  render() {
    return (
      <div className="board">
        <div>
          <div className="score">
            score: {this.state.score}
          </div>
          <button className="start_over" onClick={this.newGame}>Start Over</button>
        </div>
        <div>
          <Table rows={this.state.rows} columns={this.state.columns} onCellClick={this.onCellClick} resetState={this.state.resetState}/>
          <Modal show={this.state.show} score={this.state.score} handleClose={this.handleClose} />
        </div>
      </div>
    );
  }
}

export default Board;