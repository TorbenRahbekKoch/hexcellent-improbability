import { Introduction } from './Introduction'
import { GameState, State } from './State'

export function Game({ gameState }: Props) {

    if (gameState.state.value == State.Introduction) {
        return (
            <Introduction
                title={gameState.game.title} 
                description={gameState.game.description}
                onStartGame={() => gameState.state.value = State.InProgress}>

            </Introduction>)
    }
    return (
        <h1>Game is started!</h1>
    )
}

export interface Props {
    gameState: GameState
}