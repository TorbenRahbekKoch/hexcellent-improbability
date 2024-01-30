import { GameInProgress } from './GameInProgress'
import { Introduction } from './Introduction'
import { GameState, Phase } from './GameState'
import { HexcellentImprobabilityGame } from './GameDefinition'
import { Signal } from '@preact/signals'

export function Game({ game, state }: Props) {

    if (state.value.phase == Phase.Introduction) {
        return (
            <Introduction
                title={game.game.title} 
                description={game.game.description}
                onStartGame={() => game.phase = Phase.InProgress}>

            </Introduction>)
    }
    else if (state.value.phase == Phase.InProgress){
        return (
            <GameInProgress game={game}></GameInProgress>
        )
    }
    return (
        <h1>Game is done!</h1>
    )
}

export interface Props {
    game: HexcellentImprobabilityGame
    state: Signal<GameState>
}