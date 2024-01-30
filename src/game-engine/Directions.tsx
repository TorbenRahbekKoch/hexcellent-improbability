import { HexcellentImprobabilityGame, LocationDirections } from "./GameDefinition"
import { GlobalVariables } from "./GameState"

export function Directions({ game, directions, onDirectionSelected }: Props) {

    function direction(name: string, locator?: (variables: GlobalVariables) => number) {
        if (locator == null)
            return null
        return (
            <span
                class="hxi-select-location-id"
                onClick={() => onDirectionSelected(locator(game.variables))}>{name}</span>)
    }

    return (
        <div>
            {direction("North", directions.north)}
            {direction("Northeast", directions.northEast)}
            {direction("East", directions.east)}
            {direction("Southeast", directions.southEast)}
            {direction("South", directions.south)}
            {direction("Southwest", directions.southWest)}
            {direction("West", directions.west)}
            {direction("Northwest", directions.northWest)}
            {direction("Up", directions.up)}
            {direction("Down", directions.down)}
        </div>
    )
}

export interface Props {
    game: HexcellentImprobabilityGame
    directions: LocationDirections
    onDirectionSelected: (locationId: number) => void
}