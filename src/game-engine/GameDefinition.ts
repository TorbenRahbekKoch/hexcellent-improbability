import { GameState, GlobalVariables, Phase } from "./GameState";
import { produce } from "immer";
import { Signal, signal } from "@preact/signals"
import { Ok } from "pratica";

export type Descriptor = <TVariables>(variables: TVariables) => string

export type Locator = <TVariables>(variables: TVariables) => number

export interface LocationDirections {
    north?: Locator
    northEast?: Locator
    east?: Locator
    southEast?: Locator
    south?: Locator
    southWest?: Locator
    west?: Locator
    northWest?: Locator
    up?: Locator
    down?: Locator
}

export interface Location {
    readonly id: number,
    readonly title: string,
    readonly description: Descriptor
    readonly directions: LocationDirections
}

export interface GameDefinition {
    readonly title: string
    readonly description: string
    readonly startLocation: number
    readonly locations: Location[]
}

export class HexcellentImprobabilityGame {
    constructor(gameDefinition: GameDefinition, state: GameState) {
        this._game = gameDefinition
        this._state = signal(state)
        // this._variables = signal({
        //     currentLocation: -1
        // })
    }

    private _game: GameDefinition
    public get game(): Readonly<GameDefinition> {
        return this._game
    }

    private _state: Signal<GameState>
    public get state(): Signal<GameState> {
        return this._state
    }

    // public get phase() : Readonly<Phase> {
    //     return this._state.phase//.value
    // }

    public set phase(value: Phase) {
        const nextState = produce(
            this._state.peek(),
            state => {
                state.phase = value
            }
        )
        this._state.value = nextState
    }

    public get currentLocation(): Readonly<Location> {
        const location = this._game.locations.find(
            location => location.id === this.variables.currentLocation)
        return location!
    }

    public setCurrentLocation(locationId: number): boolean {
        const location = this._game.locations.find(
            location => location.id === this.variables.currentLocation)
        return Ok(location)
            .cata({
                Ok: _ => {
                    const nextState = produce(
                        this._state.peek(),
                        state => {
                            state.variables.currentLocation = locationId
                        }
                    )
                    this._state.value = nextState
                    return true
                },
                Err: () => false
            })
    }

    /** This is technically a part of the state, but to allow for easy overriden
     * with custom variables it is placed here
     */
    //protected _variables: Signal<GlobalVariables>
    public get variables(): GlobalVariables {
        return this._state.peek().variables
    }
}
