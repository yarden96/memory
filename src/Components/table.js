import React, { Component } from 'react';
import Cell from './cell';
import './table.css';

class Table extends Component {
  state = {
    imagesID: []
  }

  componentWillMount = () => {
    this.renderPics();
  }

  componentWillUpdate = (nextProps) => {
    if(nextProps.resetState) {
      this.setState({
        imagesID:[]
      });
      this.renderPics();
    }
  }

  renderPics = () =>{
    let index = 0;
    let numArr = [];
    let num;
    let numOfPics = 21;

    while(index < (this.props.rows * this.props.columns / 2)) {
      num = Math.floor(Math.random() * numOfPics);
      if(!numArr.includes(num) && num !== 0){
        numArr.push(num, num);
        index++;
      }
    }

    for(let i = numArr.length - 1; i > 0; i--){
      let j = Math.floor(Math.random() * i)
      let temp = numArr[i]
      numArr[i] = numArr[j]
      numArr[j] = temp
    }

    this.setState({
      imagesID: numArr
    })
  }

  renderRows = (startPosition, endPosition) => {
    let data = [];
    
    for (let i = startPosition; i < endPosition; i++) {
        data.push(
          <td key={i}>
            <Cell cellIndex={i} picID={this.state.imagesID[i]} 
                  onCellClick={this.props.onCellClick} resetState={this.props.resetState} />
          </td>);
    }
    return <tr key={startPosition}>{data}</tr>;
  }

  renderTable = () => {
    let rows = [];
    
    for (let i = 0; i < this.state.imagesID.length; i+=this.props.columns) {
      rows.push(this.renderRows(i, i + this.props.columns));
    }
    return <tbody>{rows}</tbody>
  }

  render() {
    return (
      <div className="tableDiv">
        <table >
        {
            this.renderTable()
        }
        </table>
      </div>
      
    )
  }
}

export default Table;