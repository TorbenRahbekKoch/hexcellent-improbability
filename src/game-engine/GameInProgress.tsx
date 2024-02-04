import { Directions } from "./Directions";
import { HexcellentImprobabilityGame } from "./GameDefinition";

export function GameInProgress({ game }: Props) {
    const currentLocation = game.currentLocation

    return (
        <div>
            <p>{currentLocation.description(game.variables)}</p>
            <Directions
                variables={game.variables}
                directions={currentLocation.directions} 
                onDirectionSelected={locationId => game.setCurrentLocation(locationId)} />
        </div>
    )
}

export interface Props {
    game: HexcellentImprobabilityGame
}