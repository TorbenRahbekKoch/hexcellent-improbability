export enum Phase {
    Introduction,
    InProgress,
    Finished
}

// TODO: Consider naming it SystemVariables instead
export interface GlobalVariables {
    readonly currentLocation : number
}


export interface GameState {
    readonly phase : Phase
    readonly variables : GlobalVariables
    //readonly currentLocation : number
}

export interface GameStateWithVariables<TVariables extends GlobalVariables> extends GameState{
    readonly variables: TVariables
}

export function createInitialState<TVariables extends GlobalVariables>
    (startLocation: number, variables: TVariables) : GameState {
    const actualVariables = {
        ...variables, 
        currentLocation: startLocation
    }

    return {
        phase : Phase.Introduction,
        variables : actualVariables
    } as GameState
}