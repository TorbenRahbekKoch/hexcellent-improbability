import { useState } from 'preact/hooks'
import './app.css'
import {Game } from './game-engine/Game'
import { createGame } from './games/destroyer-of-mail-boxes/destroyer-of-mail-boxes'
import { HexcellentImprobabilityGame } from "./game-engine/GameDefinition"

export function App() {
  const [game, _] = useState<HexcellentImprobabilityGame>(() => createGame())
  
  return (
    <>
      <Game game={game} state={game.state}></Game>
    </>
  )
}
