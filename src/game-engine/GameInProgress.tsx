import { HexcellentImprobabilityGame } from "./GameDefinition";

export function GameInProgress({game}: Props) {
    const currentRoom = game.currentRoom

    return (
        <p>{currentRoom.description(game.variables)}</p>
    )
}

export interface Props {
    game: HexcellentImprobabilityGame
}