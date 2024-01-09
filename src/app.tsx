import { signal } from "@preact/signals"
import { useState } from 'preact/hooks'
import './app.css'
import {Game } from './game-engine/Game'
import { game } from './games/destroyer-of-mail-boxes/destroyer-of-mail-boxes'
import { GameState, State } from './game-engine/State'

export function App() {
  const [gameState, _] = useState<GameState>(() => { return {
    state : signal<State>(State.Introduction),
    game : game 
  }})
  
  return (
    <>
      <Game gameState={gameState}></Game>
    </>
  )
}
