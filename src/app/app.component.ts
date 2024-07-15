import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tres-en-raya';

  positions = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]
  playerX = "✖️"
  playerO = "⭕"
  winner = ""
  isWinner = false

  currentPlayer = this.playerX

  pressed(row: number, col: number) {
    if (this.freeBox(row, col)) {
      this.positions[row][col] = this.currentPlayer
      this.checkWinner(this.playerX)
      this.checkWinner(this.playerO)
      this.checkDraw()
      this.changePlayer()
    }
  }
  checkDraw() {
    for (let row of this.positions) {
      for (let col of row) {
        if (col === "") {
          return;
        }
      }
    }
    alert("It's a draw")
    this.reset()
  }
  changePlayer() {
    if (this.currentPlayer === this.playerX) {
      this.currentPlayer = this.playerO
    } else {
      this.currentPlayer = this.playerX
    }
  }

  freeBox(row: number, col: number) {
    return this.positions[row][col] === "";
  }

  checkWinner(player: string) {
    if (this.checkRows(player) || this.checkCols(player) || this.checkDiagonals(player)) {
      this.winner = player
      this.isWinner = true
      // // alert("Ha ganado el jugador " + player)
      // this.reset()
    }
  }
  reset() {
    this.positions = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
    this.currentPlayer = this.playerX
    this.winner = ""
    this.isWinner = false

  }
  checkDiagonals(player: string): boolean {
    return (this.positions[0][0] === player && this.positions[1][1] === player && this.positions[2][2] === player) ||
      (this.positions[0][2] === player && this.positions[1][1] === player && this.positions[2][0] === player)
  }
  checkCols(player: string): boolean {
    for (let i = 0; i < 3; i++) {
      if (this.positions[0][i] === player && this.positions[1][i] === player && this.positions[2][i] === player) {
        return true
      }
    }
    return false
  }
  checkRows(player: string) {
    for (let i = 0; i < 3; i++) {
      if (this.positions[i][0] === player && this.positions[i][1] === player && this.positions[i][2] === player) {
        return true
      }
    }
    return false
  }
}
