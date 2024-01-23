import { Signal, signal } from "@preact/signals"

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
    currentRoom : number
}

export interface GameStateWithVariables<TVariables> extends GameState{
    variables: TVariables
}

export function createInitialState<TVariables extends GlobalVariables>(currentRoom: number, variables: TVariables) {
    return {
        phase : signal<Phase>(Phase.Introduction),
        currentRoom: currentRoom,
        variables : variables
    } 
}