import React, { Component } from "react";
import crown from "./crown.svg";
import "./App.css";
import Status from "./components/Status";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInProcess: false,
      board: Array(64).fill(null),
      checkerArray: Array(64).fill(null),
      player: null,
      winner: null,
      hasClicked: false,
      selectedIndex: null,
      jumpedIndex: null,
      moves: Array(),
      flipKing: false
    };
  }

  componentDidMount() {
    this.setState({ showInProcess: true }, () => {
      this.setState({
        showInProcess: false
      });
    });
  }

  checkWinner() {
    if (
      !this.state.checkerArray.includes("Black") &&
      !this.state.checkerArray.includes("kingBlack")
    ) {
      this.setState({
        winner: "Red"
      });
    } else if (
      !this.state.checkerArray.includes("Red") &&
      !this.state.checkerArray.includes("kingRed")
    ) {
      this.setState({
        winner: "Black"
      });
    }
  }

  canMove(index) {
    let move = false;
    let newMoves = Array();

    if (this.state.player === "Black") {
      if (this.state.checkerArray[index + 7] === null) {
        newMoves.push(index + 7);
        move = true;
      }
      if (this.state.checkerArray[index + 9] === null) {
        newMoves.push(index + 9);
        move = true;
      }
      if (
        (this.state.checkerArray[index + 7] === "Red" ||
          this.state.checkerArray[index + 7] === "kingRed") &&
        this.state.checkerArray[index + 14] === null
      ) {
        newMoves.push(index + 14);
        move = true;
      }
      if (
        (this.state.checkerArray[index + 9] === "Red" ||
          this.state.checkerArray[index + 9] === "kingRed") &&
        this.state.checkerArray[index + 18] === null
      ) {
        newMoves.push(index + 18);
        move = true;
      }

      if (this.state.checkerArray[index] === "kingBlack") {
        if (this.state.checkerArray[index - 7] === null) {
          newMoves.push(index - 7);
          move = true;
        }
        if (this.state.checkerArray[index - 9] === null) {
          newMoves.push(index - 9);
          move = true;
        }
        if (
          (this.state.checkerArray[index - 7] === "Red" ||
            this.state.checkerArray[index - 7] === "kingRed") &&
          this.state.checkerArray[index - 14] === null
        ) {
          newMoves.push(index - 14);
          move = true;
        }
        if (
          (this.state.checkerArray[index - 9] === "Red" ||
            this.state.checkerArray[index - 7] === "kingRed") &&
          this.state.checkerArray[index - 18] === null
        ) {
          newMoves.push(index - 18);
          move = true;
        }
      }
    } else {
      if (this.state.checkerArray[index - 7] === null) {
        newMoves.push(index - 7);
        move = true;
      }
      if (this.state.checkerArray[index - 9] === null) {
        newMoves.push(index - 9);
        move = true;
      }
      if (
        (this.state.checkerArray[index - 7] === "Black" ||
          this.state.checkerArray[index - 7] === "kingBlack") &&
        this.state.checkerArray[index - 14] === null
      ) {
        newMoves.push(index - 14);
        move = true;
      }
      if (
        (this.state.checkerArray[index - 9] === "Black" ||
          this.state.checkerArray[index - 9] === "kingBlack") &&
        this.state.checkerArray[index - 18] === null
      ) {
        newMoves.push(index - 18);
        move = true;
      }

      if (this.state.checkerArray[index] === "kingRed") {
        if (this.state.checkerArray[index + 7] === null) {
          newMoves.push(index + 7);
          move = true;
        }
        if (this.state.checkerArray[index + 9] === null) {
          newMoves.push(index + 9);
          move = true;
        }
        if (
          (this.state.checkerArray[index + 7] === "Black" ||
            this.state.checkerArray[index + 7] === "kingBlack") &&
          this.state.checkerArray[index + 14] === null
        ) {
          newMoves.push(index + 14);
          move = true;
        }
        if (
          (this.state.checkerArray[index + 9] === "Black" ||
            this.state.checkerArray[index + 7] === "kingBlack") &&
          this.state.checkerArray[index + 18] === null
        ) {
          newMoves.push(index + 18);
          move = true;
        }
      }
    }

    if (move) {
      this.setState({
        moves: newMoves
      });
    }

    return move;
  }

  updateArrays(gameBoard, checkersArray) {
    this.setState({
      board: gameBoard,
      checkerArray: checkersArray,
      player: this.state.player === "Black" ? "Red" : "Black",
      hasClicked: false,
      selectedIndex: null,
      moves: Array()
    });
  }

  flipKing(newIndex) {
    if (this.state.flipKing) {
      this.setState({
        flipKing: false
      });
      let index = "checker" + newIndex;
      document.getElementById(index).style.transform = "rotateY(360deg)";
    }
  }

  setNewPosition(newIndex) {
    if (
      this.state.checkerArray[this.state.selectedIndex] === "Red" &&
      newIndex < 8
    ) {
      this.checkPosition("king" + this.state.player, newIndex);
      this.setState({
        flipKing: true
      });
    } else if (
      this.state.checkerArray[this.state.selectedIndex] === "Black" &&
      newIndex > 57
    ) {
      this.checkPosition("king" + this.state.player, newIndex);
      this.setState({
        flipKing: true
      });
    } else if (
      this.state.checkerArray[this.state.selectedIndex] ===
      "king" + this.state.player
    ) {
      this.checkPosition("king" + this.state.player, newIndex);
    } else {
      this.checkPosition(this.state.player, newIndex);
    }

    let newCheckerArray = this.state.checkerArray;
    let newboard = this.state.board;

    newboard.splice(this.state.selectedIndex, 1, null);
    newCheckerArray.splice(this.state.selectedIndex, 1, null);

    if (newIndex - this.state.selectedIndex > 10) {
      newboard.splice(
        newIndex - (newIndex - this.state.selectedIndex) / 2,
        1,
        null
      );
      newCheckerArray.splice(
        newIndex - (newIndex - this.state.selectedIndex) / 2,
        1,
        null
      );
    } else if (this.state.selectedIndex - newIndex > 10) {
      newboard.splice(
        this.state.selectedIndex - (this.state.selectedIndex - newIndex) / 2,
        1,
        null
      );
      newCheckerArray.splice(
        this.state.selectedIndex - (this.state.selectedIndex - newIndex) / 2,
        1,
        null
      );
    }

    this.updateArrays(newboard, newCheckerArray);
    this.checkWinner();
  }

  secondClick(index) {
    if (
      (this.state.checkerArray[index] === this.state.player ||
        this.state.checkerArray[index] === "king" + this.state.player) &&
      !this.state.winner
    ) {
      if (this.canMove(index)) {
        document.getElementById(
          this.state.selectedIndex
        ).style.backgroundColor = "#252525";
        document.getElementById(index).style.backgroundColor = "#00a2ff";
        this.setState({
          selectedIndex: index
        });
      }
    } else if (this.state.moves.includes(index)) {
      this.setNewPosition(index);

      document.getElementById(this.state.selectedIndex).style.backgroundColor =
        "#252525";
    }
    this.checkWinner();
  }

  handleClick(index) {
    if (this.state.hasClicked && !this.state.winner) {
      this.secondClick(index);
      this.flipKing(index);
    } else {
      if (
        (this.state.checkerArray[index] === this.state.player ||
          this.state.checkerArray[index] === "king" + this.state.player) &&
        !this.state.winner
      ) {
        if (this.canMove(index)) {
          document.getElementById(index).style.backgroundColor = "#00a2ff";
          this.setState({
            selectedIndex: index,
            hasClicked: true
          });
        }
      }
    }
    this.flipKing(index);
    this.checkWinner();
  }

  setPlayer(player) {
    this.setState({ player });
  }

  checkPosition(name, index) {
    const appStyle = this.state.showInProcess ? { visibility: "hidden" } : null;

    let thisBoard = this.state.board;
    let thisCheckerArray = this.state.checkerArray;

    if (
      (name === "boxBlack" && index < 16 && !this.hasRendered) ||
      name === "Black"
    ) {
      thisBoard[index] = (
        <div
          className="checker checker-b"
          key={index}
          id={"checker" + index}
        ></div>
      );
      thisCheckerArray[index] = "Black";
    } else if (
      (name === "boxBlack" && index >= 48 && !this.hasRendered) ||
      name === "Red"
    ) {
      thisBoard[index] = (
        <div
          className="checker checker-r"
          key={index}
          id={"checker" + index}
        ></div>
      );
      thisCheckerArray[index] = "Red";
    } else if (name === "boxRed") {
      thisCheckerArray[index] = "nullBox";
    } else if (name === "kingRed") {
      thisBoard[index] = (
        <div className="checker" key={index} style={appStyle}>
          <div className="checker-inner" id={"checker" + index}>
            <div className="checker-front checker-r">
              <img src={crown} alt={"KING"} />
            </div>
            <div className="checker-back checker-r"></div>
          </div>
        </div>
      );
      thisCheckerArray[index] = "kingRed";
    } else if (name === "kingBlack") {
      thisBoard[index] = (
        <div className="checker" key={index} style={appStyle}>
          <div className="checker-inner" id={"checker" + index}>
            <div className="checker-front checker-b">
              <img src={crown} alt={"KING"} />
            </div>
            <div className="checker-back checker-b"></div>
          </div>
        </div>
      );
      thisCheckerArray[index] = "kingBlack";
    }
  }

  placeChecker() {
    this.state.board.map((box, index) =>
      this.checkPosition(this.generateClassName(index), index)
    );

    return this.state.board;
  }

  generateClassName(index) {
    return parseInt(index / 8 + index) % 2 === 0 ? "boxBlack" : "boxRed";
  }

  renderBoxes() {
    return this.state.board.map((box, index) => (
      <div
        className={this.generateClassName(index)}
        key={index}
        id={index}
        onClick={() => {
          this.handleClick(index);
        }}
      >
        {box}
      </div>
    ));
  }

  reset() {
    if (this.state.selectedIndex != null) {
      document.getElementById(this.state.selectedIndex).style.backgroundColor =
        "#252525";
    }

    this.setState({
      player: null,
      winner: null,
      board: Array(64).fill(null),
      checkerArray: Array(64).fill(null),
      hasClicked: false,
      selectedIndex: null,
      moves: Array()
    });
    this.hasRendered = false;
  }

  render() {
    const appStyle = this.state.showInProcess ? { visibility: "hidden" } : null;

    return (
      <div className="App">
        <h1>Checkers App</h1>

        <Status
          player={this.state.player}
          setPlayer={e => {
            this.setPlayer(e);
          }}
          winner={this.state.winner}
        />

        <div className="board" style={appStyle}>
          {(this.placeChecker(), (this.hasRendered = true))}
          {this.renderBoxes()}
        </div>
        <button onClick={() => this.reset()}>Reset</button>
      </div>
    );
  }
}

export default App;
