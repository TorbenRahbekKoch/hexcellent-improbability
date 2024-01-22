import { GameState, GlobalVariables, Phase } from "./GameState";

export interface Description {
    <TVariables>(variables: TVariables): string;
}

export interface Room {
    id: string,
    title: string,
    description: Description
}

export interface GameDefinition {
    title: string
    description: string
    startRoom: string
    rooms: Room[]
}

export class HexcellentImprobabilityGame {
    constructor(gameDefinition: GameDefinition, state: GameState) {
        this._game = gameDefinition
        this._state = state
        this._variables = {
            currentRoom : ""
        }
    }

    private _game : GameDefinition
    public get game(): Readonly<GameDefinition> {
        return this._game
    }

    private _state: GameState 
    public get state(): Readonly<GameState> {
        return this._state
    }

    public get phase() : Readonly<Phase> {
        return this._state.phase.value
    }

    public set phase(value: Phase) {
        this._state.phase.value = value
    }

    public get currentRoom() : Readonly<Room> {
        const room = this._game.rooms.find(room => room.id === this._state.currentRoom)
        return room!        
    }

    protected _variables: GlobalVariables
    public get variables() : GlobalVariables {
        return this._variables
    }
}
