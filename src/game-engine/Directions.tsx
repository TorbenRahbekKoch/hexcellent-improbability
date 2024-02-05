import { Just, Nothing } from "pratica"
import { useEffect } from "preact/hooks"
import { LocationDirections } from "./GameDefinition"
import { GlobalVariables } from "./GameState"

export function Directions({ variables, directions, onDirectionSelected }: Props) {

    function direction(name: string, locator?: (variables: GlobalVariables) => number) {
        if (locator == null)
            return null
        return (
            <button
                class="hxi-select-location-id"
                onClick={() => onDirectionSelected(locator(variables))}>{name}</button>)
    }

    const keyDirectionMap =  {
        'Digit7' : directions.northWest,
        'Numpad7' : directions.northWest,
        'Digit8' : directions.north,
        'Numpad8' : directions.north,
        'Digit9' : directions.northEast,
        'Numpad9' : directions.northEast,
        'Digit4' : directions.west,
        'Numpad4' : directions.west,
        'Digit6' : directions.east,
        'Numpad6' : directions.east,
        'Digit1' : directions.southWest,
        'Numpad1' : directions.southWest,
        'Digit2' : directions.south,
        'Numpad2' : directions.south,
        'Digit3' : directions.southEast,
        'Numpad3' : directions.southEast,
        'Digit5': directions.up,
        'Numpad5': directions.up,
        'Digit0': directions.down,
        'Numpad0': directions.down
    }
    
    type allKeys = keyof typeof keyDirectionMap

    function isKeyOfDirectionMap(key: string): key is allKeys {
        return key in keyDirectionMap;
    }

    function onKeyDown(event: KeyboardEvent) {
        Just(event)
            .chain(event => {
                if (isKeyOfDirectionMap(event.code)){
                    const locator = keyDirectionMap[event.code]
                    return locator != null ? Just(locator) : Nothing
                }
                return Nothing
            })
            .cata({
                Just: locator => { onDirectionSelected(locator(variables)) },
                Nothing: () => { }
            })
    }

    useEffect(() => {
        document.body.addEventListener("keydown", onKeyDown)
        return () => {
            document.body.removeEventListener("keydown", onKeyDown)
        }
    })

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
    variables: GlobalVariables
    directions: LocationDirections
    onDirectionSelected: (locationId: number) => void
}