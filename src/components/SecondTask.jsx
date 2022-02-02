import React, { Component } from "react";

export default class SecondTask extends Component {
    
    state = {
        board: new Array(10).fill(false).map(()=>Array(10).fill(false)),
        gameRunning: false,
        interval: null,
    }
    
    changeCell(e) {
        let col = e.target.getAttribute("col");
        let row = e.target.getAttribute("row");
        let newBoard = this.state.board;
        newBoard[row][col] = !newBoard[row][col];

        this.setState({
            board: newBoard,
        });
    }

    countNeighbours(row, col) {
        let board = this.state.board;
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if(row+i >= 0 && row+i < 10 && col+j >= 0 && col+j < 10 && (i!=0 || j!=0)) {
                    if(board[row+i][col+j])
                        count++;
                }
            }
        }
        // console.log(`[${row}][${col}] = ${count}`);
        return count;
    }

    createNewBoard() {
        let board = this.state.board;
        let newBoard = new Array(10).fill(false).map(()=>Array(10).fill(false));

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let number_of_neighbours = this.countNeighbours(i,j);
                if(board[i][j]) {
                    if(number_of_neighbours == 3 || number_of_neighbours == 2)
                        newBoard[i][j] = true;
                } else {
                    if(number_of_neighbours == 3)
                        newBoard[i][j] = true;
                }
            }
        }

        this.setState({
            board: newBoard,
        })
    }

    toggleGameOfLife() {
        let {interval, gameRunning} = this.state;

        if(gameRunning) {
            clearInterval(interval);
        } else {
            interval = setInterval(() => this.createNewBoard(),500);
        }

        this.setState({
            gameRunning: !gameRunning,
            interval: interval,
        })
    }


    render() {
        const { taskNumber } = this.props;
        const { board, gameRunning } = this.state;

        return (
            <>
                <h1>Tarefa {taskNumber}</h1>
                <table>
                    <tbody>
                        {board.map((row, row_index) => 
                            (<tr>{row.map((cell, col_index) => 
                                // (<td row={row_index} col={col_index} onClick={(e) => this.changeCell(e)} style={cell ? trueCellStyle : falseCellStyle} key={`${row_index}-${col_index}`}>{this.countNeighbours(row_index, col_index)}</td>))}</tr>))}
                                (<td row={row_index} col={col_index} onClick={(e) => this.changeCell(e)} style={cell ? trueCellStyle : falseCellStyle} key={`${row_index}-${col_index}`}></td>))}</tr>))}
                    </tbody>
                </table>
                <button onClick={() => this.toggleGameOfLife()}>{gameRunning ? "Parar" : "Iniciar"}</button>
            </>
        );
    }
}

const trueCellStyle = {
    width: 15,
    height: 15,
    backgroundColor: '#00cc99',
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderColor: 'grey',
}

const falseCellStyle = {
    width: 15,
    height: 15,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderColor: 'grey',
}