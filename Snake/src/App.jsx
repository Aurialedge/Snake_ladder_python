import { useState } from 'react'
import Game from "./page/Game.jsx"

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Snake and Ladder Game</h1>
      <Game />
    </div>
  )
}

export default App