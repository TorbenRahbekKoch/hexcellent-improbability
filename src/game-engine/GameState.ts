import { Signal } from "@preact/signals"

export enum Phase {
    Introduction,
    InProgress,
    Finished
}

export interface GlobalVariables {
    currentRoom : string
}

export interface GameSituation<TVariables> {
    variables: TVariables
}


export interface GameState {
    phase : Signal<Phase>
    currentRoom : string    
}

export interface GameStateWithVariables<TVariables> extends GameState{
    variables: TVariables
}
