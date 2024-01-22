import { GameInProgress } from './GameInProgress'
import { Introduction } from './Introduction'
import { Phase } from './GameState'
import { HexcellentImprobabilityGame } from './GameDefinition'

export function Game({ game }: Props) {

    if (game.phase == Phase.Introduction) {
        return (
            <Introduction
                title={game.game.title} 
                description={game.game.description}
                onStartGame={() => game.phase = Phase.InProgress}>

            </Introduction>)
    }
    else if (game.phase == Phase.InProgress){
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
}