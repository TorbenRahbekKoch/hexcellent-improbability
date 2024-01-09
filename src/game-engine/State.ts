import { Signal, signal } from "@preact/signals"
import { GameData } from "./GameData"

export enum State {
    Introduction,
    InProgress,
    Finished
}

export interface GameState {
    state : Signal<State>
    game : GameData
}